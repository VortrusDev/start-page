// Renders circles

import { SimObject } from "../SimObject";
import { Vec2 } from "../Vector";
import { GenericRenderer } from "./GenericRenderer";

export class CircleRenderer extends GenericRenderer {
  position: Vec2 = new Vec2();
  radius: number = 1;
  color: string = "green";
  stroke: boolean | undefined = false;
  strokeWidth: number | undefined = 1;
  constructor(
    root: SimObject,
    position: Vec2,
    radius: number,
    color: string,
    stroke?: boolean,
    strokeWidth?: number
  ) {
    super(root);
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
  }

  render() {
    super.render();
    this.changeColor(this.color);
    this.drawCircle(this.position, this.radius, this.stroke, this.strokeWidth);
  }
}
