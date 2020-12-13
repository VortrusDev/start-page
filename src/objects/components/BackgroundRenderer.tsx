// Renders backgrounds in general - the color in the background, not necessarily the objects
import { GenericRenderer } from "./GenericRenderer";

export class BackgroundRenderer extends GenericRenderer {
  render = () => {
    super.render();
    this.changeColor("red");
    this.ctx!.fillRect(
      0,
      0,
      this.canvasInstance.width,
      this.canvasInstance.height
    );
    this.changeColor("cyan");
  };
}
