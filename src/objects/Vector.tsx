// This is the Vec2 type definition for objects. Vec2 is basically
// a position expressed in x and y, with an optional magnitude.

export class Vec2 {
  x: number = 0;
  y: number = 0;
  magnitude: number = 0;

  constructor(initialX?: number, initialY?: number, initialMagnitude?: number) {
    if (initialX) this.x = initialX;
    if (initialY) this.y = initialY;
    if (initialMagnitude) this.magnitude = initialMagnitude;
  }

  // lerp will use Linear Interpolation to move the vector to another point
  // at a steadily decreasing rate
  lerp = (initial: Vec2, final: Vec2, time: number) => {
    const difX = initial.x * (1 - time) + final.x * time,
      difY = initial.y * (1 - time) + final.y * time,
      difMag = initial.magnitude * (1 - time) + final.magnitude * time;

    return new Vec2(difX, difY, difMag);
  };
}
