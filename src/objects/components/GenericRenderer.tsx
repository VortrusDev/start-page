// A generic renderer which does things like grab the canvas, etc

import { Renderer } from "./Renderer";
import { CanvasId } from "../../helpers";
import { Vec2 } from "../Vector";
import { SimObject } from "../SimObject";
import { EnvironmentManager } from "../../EnvironmentManager";

export enum RenderModes {
  sourceOver = "source-over",
  sourceIn = "source-in",
  sourceOut = "source-out",
  sourceAtop = "source-atop",
  destinationOver = "destination-over",
  destinationIn = "destination-in",
  destinationOut = "destination-out",
  destinationAtop = "destination-atop",
  lighter = "lighter",
  copy = "copy",
  xor = "xor",
  multiply = "multiply",
  screen = "screen",
  overlay = "overlay",
  darken = "darken",
  lighten = "lighten",
  colorDodge = "color-dodge",
  colorBurn = "color-burn",
  hardLight = "hard-light",
  softLight = "soft-light",
  difference = "difference",
  exclusion = "exclusion",
  hue = "hue",
  saturation = "saturation",
  color = "color",
  luminosity = "luminosity",
}

export class GenericRenderer implements Renderer {
  canvasInstance: any = null;
  ctx: CanvasRenderingContext2D | null = null;
  root: SimObject;
  zIndex: number = 0;
  constructor(root: SimObject) {
    this.start();
    this.root = root;
  }

  start() {
    this.canvasInstance = document.getElementById(CanvasId);
  }

  update() {}

  drawCircle(
    position: Vec2,
    radius: number,
    stroke?: boolean,
    strokeWidth?: number
  ) {
    if (!this.ctx) {
      console.error("No canvas context available to work with.");
      return;
    }
    const oldStrokeWidth = this.ctx.lineWidth;

    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
    if (strokeWidth) this.ctx.lineWidth = strokeWidth;
    if (stroke) this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.lineWidth = oldStrokeWidth;
  }

  changeColor(newColor: any) {
    if (!this.ctx) {
      console.error("No canvas context available to work with.");
      return;
    }
    this.ctx.fillStyle = newColor; // Changes the color to whatever
  }

  changeGlobalCompositeOperation(newOperation: RenderModes) {
    if (!this.ctx) {
      console.error("No canvas context available to work with.");
      return;
    }
    this.ctx.globalCompositeOperation = newOperation;
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
