// The grass objects in the background

import { ObjectManager } from "../ObjectManager";
import { CircleRenderer } from "./components/CircleRenderer";
import { SimObject } from "./SimObject";
import { Vec2 } from "./Vector";

// Basically just big circles

export class BackgroundGrass extends SimObject {
  constructor(
    manager: ObjectManager,
    initialPosition: Vec2,
    initialScale: Vec2
  ) {
    super(manager, initialPosition);
    this.addComponent(
      new CircleRenderer(this, initialPosition, initialScale.x, "green")
    ) as CircleRenderer;
  }
}
