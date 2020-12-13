// Renders backgrounds in general - the color in the background, not necessarily the objects
import { EnvironmentManager } from "../../EnvironmentManager";
import { SimObject } from "../SimObject";
import { GenericRenderer } from "./GenericRenderer";

export class BackgroundRenderer extends GenericRenderer {
  environmentManager: EnvironmentManager;
  constructor(root: SimObject, environmentManager: EnvironmentManager) {
    super(root);
    this.environmentManager = environmentManager;
  }
  render = () => {
    super.render();
    this.changeColor(this.environmentManager.backgroundValues);
    this.ctx!.fillRect(
      0,
      0,
      this.canvasInstance.width,
      this.canvasInstance.height
    );
    this.changeColor(this.environmentManager.backgroundValues);
  };
}
