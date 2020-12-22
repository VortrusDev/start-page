// Renderer for trees
import { EnvironmentManager } from "../../EnvironmentManager";
import { SimObject } from "../SimObject";
import { AddVectors, SubtractVectors, Vec2 } from "../Vector";
import { GenericRenderer, RenderModes } from "./GenericRenderer";
export class TreeRenderer extends GenericRenderer {
  environmentManager: EnvironmentManager;

  constructor(
    root: SimObject,
    environmentManager: EnvironmentManager,
    zIndex: number
  ) {
    super(root);
    this.environmentManager = environmentManager;
    this.zIndex = zIndex;
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

    this.drawRect(
      this.root.scale.x > 1
        ? SubtractVectors(
            this.root.position,
            new Vec2(this.root.scale.x * 5, this.root.scale.y * 5)
          )
        : AddVectors(
            this.root.position,
            new Vec2(this.root.scale.x * 5, this.root.scale.y * 5)
          ),
      new Vec2(50 * this.root.scale.x, 100 * this.root.scale.y)
    );

    this.changeColor("green");

    this.drawTriangle(
      new Vec2(
        this.root.position.x + 25,
        this.root.position.y - 200 * this.root.scale.y
      ),
      new Vec2(this.root.scale.x * 175, this.root.scale.y * 250)
    );

    this.drawTriangle(
      new Vec2(
        this.root.position.x + 25,
        this.root.position.y - 275 * this.root.scale.y
      ),
      new Vec2(this.root.scale.x * 150, this.root.scale.y * 225)
    );
  }
}
