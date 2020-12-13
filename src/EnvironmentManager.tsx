// Manages everything related to the environment such as wind speed, etc

const dayNightCycleMinutes = 20; // 20 mins for a full day night cycle

export enum EnvironmentModes {
  TimeBased, // The environment manager will change day / night cycle and weather cycle
  // based upon the real life time and an algorithm
}

export class EnvironmentManager {
  windSpeed: number = 1;
  gbValues: string = ""; // Green blue values for the sky
  constructor(mode: EnvironmentModes) {
    requestAnimationFrame(this.determineTimeOfDay);
  }

  determineTimeOfDay = () => {
    // / 1000 = secs / 60 = mins % 20 = what I want

    // 0 = midnight, 20 = midnight, 10 is noon

    // rgb(0, 255, 255) is cyan, rgb(0,0,0) is pitch black,
    // so values 0 to 10 should increase to 255 and values
    // 10 to 20 should decrease from 255 to 0

    // currentVal / (10 / 255) = gb value if less than 10
    // 255 - ((currentVal - 10) / (10 / 255)) if greater than 10

    let minsForCurrentCycle = (Date.now() / 1000 / 60) % dayNightCycleMinutes;
    console.log(minsForCurrentCycle);
    if (minsForCurrentCycle <= 10) {
      let val = minsForCurrentCycle / (10 / 255);
      this.gbValues = `rgb(0, ${val}, ${val})`;
    } else {
      let val = 255 - (minsForCurrentCycle - 10) / (10 / 255);
      this.gbValues = `rgb(0, ${val}, ${val})`;
    }

    requestAnimationFrame(this.determineTimeOfDay);
  };
}
