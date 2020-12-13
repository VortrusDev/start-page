// Renderer for particles

import { EnvironmentManager } from "../../EnvironmentManager";
import { SimObject } from "../SimObject";
import { SubtractVectors, Vec2 } from "../Vector";
import { GenericRenderer, RenderModes } from "./GenericRenderer";

export class CloudRenderer extends GenericRenderer {
  environmentManager: EnvironmentManager;

  constructor(root: SimObject, environmentManager: EnvironmentManager) {
    super(root);
    this.environmentManager = environmentManager;
  }

  render() {
    super.render();

    this.changeGlobalCompositeOperation(RenderModes.screen);
    this.changeColor(
      `rgb(${this.environmentManager.g + 30}, ${
        this.environmentManager.g + 30
      }, ${this.environmentManager.b + 30})`
    );

    this.ctx!.globalAlpha = 0.9;
    this.drawCircle(SubtractVectors(this.root.position, new Vec2(5, 4)), 50);
    this.drawCircle(
      SubtractVectors(this.root.position, new Vec2(-100, 10)),
      40
    );
    this.drawCircle(SubtractVectors(this.root.position, new Vec2(-40, 30)), 50);
    this.ctx!.globalAlpha = 1;
    this.changeGlobalCompositeOperation(RenderModes.sourceOver);
  }
}
