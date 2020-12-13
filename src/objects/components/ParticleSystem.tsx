// A particle system. Can render any SimObject as a particle

import { SimObject } from "../SimObject";
import { Vec2 } from "../Vector";
import { Component } from "./Component";

export enum ParticleSystemStartModes {
  Immediate, // Starts immediately
  Delay, // Waits until the time delay is up
}

export interface boundingBox {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export class ParticleSystem implements Component {
  root: SimObject;
  boundingBox: boundingBox;
  spawnTime: number;
  mode: ParticleSystemStartModes;
  timeSinceLastSpawn: number = 0;
  spawnObject: typeof SimObject;
  constructor(
    root: SimObject,
    boundingBox: boundingBox,
    spawnTime: number,
    mode: ParticleSystemStartModes,
    spawnObject: typeof SimObject
  ) {
    this.root = root;
    this.boundingBox = boundingBox;
    this.spawnTime = spawnTime;
    this.mode = mode;
    this.spawnObject = spawnObject;
  }

  start() {
    if ((this.mode = ParticleSystemStartModes.Immediate)) {
      this.spawn();
    }
  }
  update() {
    this.timeSinceLastSpawn += this.root.manager.timeElapsedSinceLastUpdate;
    if (this.timeSinceLastSpawn >= this.spawnTime) {
      this.spawn();
    }
  }

  spawn() {
    // 0, 1
    // multiply by largest x, then
    this.root.manager.addObject(
      new this.spawnObject(
        this.root.manager,
        new Vec2(
          Math.random() * (this.boundingBox.xMax - this.boundingBox.xMin + 1) +
            this.boundingBox.xMin,
          Math.random() * (this.boundingBox.yMax - this.boundingBox.yMin + 1) +
            this.boundingBox.yMin
        )
      )
    );

    this.timeSinceLastSpawn = 0;
  }
}
