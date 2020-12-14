import { dayNightCycleMinutes, EnvironmentManager, EnvironmentModes } from "./EnvironmentManager";
jest.mock('../EnvironmentManager')

test("day/night cycle minutes are set to 20", () => {
  expect(dayNightCycleMinutes).toBe(20)
});
