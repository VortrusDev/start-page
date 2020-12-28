// Manages everything related to the environment such as wind speed, etc

export const dayNightCycleMinutes = 3; // 20 mins for a full day night cycle
const bias = 1; // multiplied with the input of the day/night cycle thing to make
// days longer

export enum EnvironmentModes {
  TimeBased, // The environment manager will change day / night cycle and weather cycle
  // based upon the real life time and an algorithm
}

export let bgColor: string; // I know this breaks flow a bit, I'm just doing this to be quick

export class EnvironmentManager {
  windSpeed: number = 1; // negative or positive based on the type of weather
  backgroundValues: string = ""; // Green blue values for the sky
  r: number = 0;
  g: number = 0;
  b: number = 0;
  textR: number = 0;
  textG: number = 0;
  textB: number = 0;
  textColorCallback: () => void;
  constructor(mode: EnvironmentModes, textColorCallback: () => void) {
    this.textColorCallback = textColorCallback;
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
    if (minsForCurrentCycle <= dayNightCycleMinutes / 2) {
      let val = (minsForCurrentCycle / (dayNightCycleMinutes / 2 / 255)) * bias;
      this.r = 0;
      this.g = val;
      this.b = val;
      this.textR = 255 - val;
      this.textG = 255 - val;
      this.textB = 255 - val;
      this.backgroundValues = `rgb(0, ${val * bias}, ${val * bias})`;
    } else {
      let val =
        255 -
        (minsForCurrentCycle - dayNightCycleMinutes / 2) /
          (dayNightCycleMinutes / 2 / 255);
      this.r = 0;
      this.g = val;
      this.b = val;
      this.textR = 255 - val;
      this.textG = 255 - val;
      this.textB = 255 - val;
      this.backgroundValues = `rgb(0, ${val * bias}, ${val * bias})`;
      bgColor = this.backgroundValues;
    }

    this.textColorCallback();

    requestAnimationFrame(this.determineTimeOfDay);
  };
}
