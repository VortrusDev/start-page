// The grass objects in the background

import { EnvironmentManager } from "../EnvironmentManager";
import { ObjectManager } from "../ObjectManager";
import { CircleRenderer } from "./components/CircleRenderer";
import { SimObject } from "./SimObject";
import { Vec2 } from "./Vector";

// Basically just big circles

export class BackgroundGrass extends SimObject {
  constructor(
    manager: ObjectManager,
    initialPosition: Vec2,
    initialScale: Vec2,
    environmentManager: EnvironmentManager,
    color?: string
  ) {
    super(manager, environmentManager, initialPosition);
    this.addComponent(
      new CircleRenderer(
        this,
        initialPosition,
        initialScale.x,
        color ? color : "green",
        1
      )
    ) as CircleRenderer;
  }
}
