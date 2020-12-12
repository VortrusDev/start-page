// This is the baseline class for all objects that exist on the canvas.
// Everything rendered to the canvas should extend from this at some point.

import { Vec2 } from "./Vector";
import { Component } from "./Component";

export class SimObject {
  position: Vec2 = new Vec2();
  components: Component[] = []; // unlike Unity, I'll just leave this exposed

  constructor(initialPosition?: Vec2) {
    if (initialPosition) {
      this.position = initialPosition;
    }
  }
}
