// Will manage all SimObjects and their components and keep things in sync

import { Renderer } from "./objects/components/Renderer";
import { SimObject } from "./objects/SimObject";
import { CanvasId, cullingDeadzone, deadzone } from "./helpers";
import { Vec2 } from "./objects/Vector";
import { GenericRenderer } from "./objects/components/GenericRenderer";
import { EnvironmentManager, EnvironmentModes } from "./EnvironmentManager";

// Also it runs all render functions and sets the background correctly so that
// there isn't flicker

export class ObjectManager {
  canvasInstance: HTMLCanvasElement | null;
  ObjectList: SimObject[] = [];
  RendererList: Renderer[] = [];
  timeElapsedSinceLastUpdate: number = 0;
  environmentManager: EnvironmentManager;
  constructor(environmentManager: EnvironmentManager) {
    this.canvasInstance = document.getElementById(
      CanvasId
    ) as HTMLCanvasElement;

    this.environmentManager = environmentManager;

    requestAnimationFrame(this.renderAll);
    requestAnimationFrame(this.updateAll);
  }

  // Creates a blank object
  createObject = (initialPosition?: Vec2): SimObject => {
    let obj = new SimObject(this, this.environmentManager, initialPosition);

    this.ObjectList.push(obj);

    return obj;
  };

  // Adds an object instantiated with new() elsewhere
  addObject = (obj: SimObject): SimObject => {
    this.ObjectList.push(obj);

    return obj;
  };

  removeObject = (obj: SimObject) => {
    let index = 0;
    let arrNum = this.ObjectList.length;
    this.ObjectList.forEach((object) => {
      if (obj === object) {
        this.ObjectList.splice(index, 1);
      }
      index++;
    });

    if (this.ObjectList.length === arrNum) {
      console.error("Failed to remove object from ObjectList: ", obj);
    }
  };

  updateAll = () => {
    if (!this.canvasInstance) return;
    this.ObjectList.forEach((obj) => {
      if (
        obj.position.x < -deadzone ||
        obj.position.x > this.canvasInstance!.width + deadzone ||
        obj.position.y < -deadzone ||
        obj.position.y > this.canvasInstance!.height + deadzone
      ) {
        this.removeObject(obj);
      }

      // If object survives culling, update its components
      obj.components.forEach((component) => {
        component.update();
      });
    });

    const t1 = performance.now();
    requestAnimationFrame(this.updateAll);
    this.timeElapsedSinceLastUpdate = performance.now() - t1;
  };

  renderAll = () => {
    if (!this.canvasInstance) {
      let inst = document.getElementById(CanvasId) as HTMLCanvasElement;
      if (inst == null) {
        requestAnimationFrame(this.renderAll);
        return;
      }
      this.canvasInstance = inst;
    }

    this.canvasInstance
      .getContext("2d")
      ?.clearRect(0, 0, this.canvasInstance.width, this.canvasInstance.height);

    // Rendering clouds last so they're drawn over the grass, so we need an index
    // so that we can render them in order by manipulating the rendererlist

    this.RendererList.sort((a, b) => {
      return (a as GenericRenderer).zIndex - (b as GenericRenderer).zIndex;
    });

    this.RendererList.forEach((renderer) => {
      if (
        renderer.root.position.x > -cullingDeadzone &&
        renderer.root.position.x <
          this.canvasInstance!.width + cullingDeadzone &&
        renderer.root.position.y > -cullingDeadzone &&
        renderer.root.position.y < this.canvasInstance!.height + cullingDeadzone
      ) {
        renderer.render();
      }
    });

    this.drawCanvasToBackground();
    requestAnimationFrame(this.renderAll);
  };

  drawCanvasToBackground = () => {
    document.body.style.background = `url(${this.canvasInstance!.toDataURL()})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
  };
}
