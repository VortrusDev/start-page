// Renders circles

import { SimObject } from "../SimObject";
import { Vec2 } from "../Vector";
import { GenericRenderer, RenderModes } from "./GenericRenderer";

export class CircleRenderer extends GenericRenderer {
  position: Vec2 = new Vec2();
  radius: number = 1;
  color: string = "green";
  stroke: boolean | undefined = false;
  strokeWidth: number | undefined = 1;
  renderMode: RenderModes | undefined;
  constructor(
    root: SimObject,
    position: Vec2,
    radius: number,
    color: string,
    zIndex: number,
    stroke?: boolean,
    strokeWidth?: number,
    mode?: RenderModes
  ) {
    super(root);
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
    this.zIndex = zIndex;
    this.renderMode = mode;
  }

  render() {
    super.render();
    this.changeColor(this.color);
    let defaultRenderMode: any;
    if (this.renderMode) {
      defaultRenderMode = this.ctx?.globalCompositeOperation;
      this.changeGlobalCompositeOperation(this.renderMode);
    }
    this.drawCircle(this.position, this.radius, this.stroke, this.strokeWidth);

    if (this.renderMode) {
      this.changeGlobalCompositeOperation(defaultRenderMode!);
    }
  }
}
