// Will manage all SimObjects and their components and keep things in sync

import { Renderer } from "./objects/Renderer";
import { SimObject } from "./objects/SimObject";
import { CanvasId } from "./helpers";
import { Vec2 } from "./objects/Vector";

// Also it runs all render functions and sets the background correctly so that
// there isn't flicker

export class ObjectManager {
  canvasInstance: HTMLCanvasElement | null;
  ObjectList: SimObject[] = [];
  RendererList: Renderer[] = [];

  constructor() {
    this.canvasInstance = document.getElementById(
      CanvasId
    ) as HTMLCanvasElement;

    requestAnimationFrame(this.renderAll);
  }

  createObject = (initialPosition?: Vec2): SimObject => {
    let obj = new SimObject(this, initialPosition);

    this.ObjectList.push(obj);

    return obj;
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

    this.RendererList.forEach((renderer) => {
      renderer.render();
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
