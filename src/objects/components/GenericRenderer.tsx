// A generic renderer which does things like grab the canvas, etc

import { Renderer } from "./Renderer";
import { CanvasId } from "../../helpers";

export class GenericRenderer implements Renderer {
  canvasInstance: any = null;
  ctx: any = null;

  constructor() {
    this.start();
  }

  start() {
    this.canvasInstance = document.getElementById(CanvasId);
  }

  render() {
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
  }
}
