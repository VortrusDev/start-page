// Renderer for trees
import { EnvironmentManager } from "../../EnvironmentManager";
import { SimObject } from "../SimObject";
import { SubtractVectors, Vec2 } from "../Vector";
import { GenericRenderer, RenderModes } from "./GenericRenderer";
export class TreeRenderer extends GenericRenderer {
  environmentManager: EnvironmentManager;

  constructor(root: SimObject, environmentManager: EnvironmentManager) {
    super(root);
    this.environmentManager = environmentManager;
  }

  render() {
    super.render();

    /*
    this.changeColor(
      `rgb(${this.environmentManager.g + 30}, ${
        this.environmentManager.g + 30
      }, ${this.environmentManager.b + 30})`
    );
    */
    this.changeColor("brown");

    this.drawRect(this.root.position, new Vec2(100, 100));
  }
}
