// Clouds for use in the background

import { ObjectManager } from "../ObjectManager";
import { CloudRenderer } from "./components/CloudRenderer";
import { Rigidbody } from "./components/Rigidbody";
import { SimObject } from "./SimObject";
import { Vec2 } from "./Vector";

export class Cloud extends SimObject {
  rigid: Rigidbody = new Rigidbody(this);
  constructor(manager: ObjectManager, position?: Vec2) {
    super(manager, position);
    this.addComponent(new CloudRenderer(this));
    this.rigid.constantForce = new Vec2(3, 0);
    this.addComponent(this.rigid);
  }
}
