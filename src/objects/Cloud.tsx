// Clouds for use in the background

import { EnvironmentManager } from "../EnvironmentManager";
import { ObjectManager } from "../ObjectManager";
import { CloudRenderer } from "./components/CloudRenderer";
import { Rigidbody } from "./components/Rigidbody";
import { SimObject } from "./SimObject";
import { Vec2 } from "./Vector";

export class Cloud extends SimObject {
  rigid: Rigidbody = new Rigidbody(this);
  constructor(
    objectManager: ObjectManager,
    environmentManager: EnvironmentManager,
    position?: Vec2
  ) {
    super(objectManager, environmentManager, position);
    this.addComponent(new CloudRenderer(this, environmentManager));
    this.rigid.constantForce = new Vec2(3, 0);
    this.addComponent(this.rigid);
  }
}
