// This is a mask for cutting out other shapes

import { SimObject } from "./SimObject";
import { ObjectManager } from "../ObjectManager";
import { EnvironmentManager } from "../EnvironmentManager";
import { CircleRenderer } from "./components/CircleRenderer";
import { Vec2 } from "./Vector";
import { RenderModes } from "./components/GenericRenderer";

// For now, I'm just gonna make it a circle

export class Mask extends SimObject {
  constructor(
    manager: ObjectManager,
    initialPosition: Vec2,
    initialScale: Vec2,
    environmentManager: EnvironmentManager,
    color: string
  ) {
    super(manager, environmentManager, initialPosition);
    this.addComponent(
      new CircleRenderer(this, initialPosition, initialScale.x, color, 3)
    ) as CircleRenderer;
  }
}
