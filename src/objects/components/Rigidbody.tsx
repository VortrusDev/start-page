// Basic rigidbody-style physics

import { SimObject } from "../SimObject";
import { AddVectors, Vec2 } from "../Vector";
import { Component } from "./Component";

export class Rigidbody implements Component {
  root: SimObject;
  constantForce: Vec2 = new Vec2(); // A constant force moves the object at a constant rate
  constructor(root: SimObject) {
    this.root = root;
  }

  start() {}

  update() {
    this.root.position = AddVectors(this.root.position, this.constantForce);
  }
}
