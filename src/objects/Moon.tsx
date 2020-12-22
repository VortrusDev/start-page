// The moon to show the current phase

import { SimObject } from "./SimObject";
import { ObjectManager } from "../ObjectManager";
import { EnvironmentManager } from "../EnvironmentManager";
import { CircleRenderer } from "./components/CircleRenderer";
import { Vec2 } from "./Vector";

export class Moon extends SimObject {
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
        color ? color : "yellow",
        3
      )
    ) as CircleRenderer;
  }
}
