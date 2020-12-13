// Clouds for use in the background

import { ObjectManager } from "../ObjectManager";
import { CloudRenderer } from "./components/CloudRenderer";
import { SimObject } from "./SimObject";
import { Vec2 } from "./Vector";

export class Cloud extends SimObject {
  constructor(manager: ObjectManager, position?: Vec2) {
    super(manager, position);
    this.addComponent(new CloudRenderer(this));
  }
}
