// This is the baseline class for all objects that exist on the canvas.
// Everything rendered to the canvas should extend from this at some point.

import { Vec2 } from "./Vector";
import { Component } from "./components/Component";
import { ObjectManager } from "../ObjectManager";
import { BackgroundRenderer } from "./components/BackgroundRenderer";

export class SimObject {
  position: Vec2 = new Vec2();
  components: Component[] = []; // unlike Unity, I'll just leave this exposed
  manager: ObjectManager; // Manages everything about the object

  constructor(manager: ObjectManager, initialPosition?: Vec2) {
    if (initialPosition) {
      this.position = initialPosition;
    }

    this.manager = manager;
  }

  addComponent = (component: Component) => {
    this.components.push(component);
    if (component instanceof BackgroundRenderer) {
      this.manager.RendererList.push(component);
    }
  };

  start = () => {
    this.components.forEach((component) => {
      component.start();
    });
  };
}
