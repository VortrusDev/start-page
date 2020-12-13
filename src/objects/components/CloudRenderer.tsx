// Renderer for particles

import { SubtractVectors, Vec2 } from "../Vector";
import { GenericRenderer, RenderModes } from "./GenericRenderer";

export class CloudRenderer extends GenericRenderer {
  render() {
    super.render();

    this.changeGlobalCompositeOperation(RenderModes.screen);
    this.changeColor("white");
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
