// Renders backgrounds in general - the color in the background, not necessarily the objects
import { Renderer } from "./Renderer";
import { CanvasId } from "../../helpers";

export class BackgroundRenderer implements Renderer {
  canvasInstance: any = null;
  ctx: any = null;

  constructor() {
    this.start();
  }

  start = () => {
    this.canvasInstance = document.getElementById(CanvasId);
  };
  render = () => {
    console.log("Running render from bgRenderer");
    if (this.canvasInstance == null) {
      let el = document.getElementById(CanvasId);
      if (el == null) {
        return;
      }
      this.canvasInstance = el;
    }

    if (this.ctx == null) {
      let ctx = this.canvasInstance.getContext("2d");
      if (ctx == null) {
        return;
      }
      this.ctx = ctx;
    }

    // Now draw!
    this.ctx.fillStyle = "cyan";
    this.ctx.fillRect(
      0,
      0,
      this.canvasInstance.width,
      this.canvasInstance.height
    );
  };
}
