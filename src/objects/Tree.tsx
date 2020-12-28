// Trees for the background

import { EnvironmentManager } from "../EnvironmentManager";
import { ObjectManager } from "../ObjectManager";
import { SimObject } from "./SimObject";
import { Vec2 } from "./Vector";
import { TreeRenderer } from "./components/TreeRenderer";

export class Tree extends SimObject {
  renderer: TreeRenderer;
  constructor(
    objectManager: ObjectManager,
    environmentManager: EnvironmentManager,
    initialPosition?: Vec2,
    initialScale?: Vec2
  ) {
    super(objectManager, environmentManager, initialPosition, initialScale);
    this.renderer = new TreeRenderer(this, environmentManager, 2);
    this.objectManager.RendererList.push(this.renderer);
  }
}
