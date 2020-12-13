// This is the baseline class for all objects that exist on the canvas.
// Everything rendered to the canvas should extend from this at some point.

import { Vec2 } from "./Vector";
import { Component } from "./components/Component";
import { ObjectManager } from "../ObjectManager";
import { BackgroundRenderer } from "./components/BackgroundRenderer";
import { GenericRenderer } from "./components/GenericRenderer";
import { CloudRenderer } from "./components/CloudRenderer";

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

  addComponent = (component: Component): Component => {
    component.root = this;
    this.components.push(component);
    if (
      component instanceof BackgroundRenderer ||
      component instanceof GenericRenderer ||
      component instanceof CloudRenderer
    ) {
      this.manager.RendererList.push(component);
    }

    return this.components[this.components.length - 1]; // Returning the simobject to allow chaining when making objects
  };

  start = () => {
    this.components.forEach((component) => {
      component.start();
    });
  };

  update = () => {};
}
