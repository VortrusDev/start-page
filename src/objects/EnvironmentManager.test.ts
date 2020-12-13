import { dayNightCycleMinutes, EnvironmentManager, EnvironmentModes } from "../EnvironmentManager";
jest.mock('../EnvironmentManager')

test("day/night cycle minutes are set to 20", () => {
  expect(dayNightCycleMinutes).toBe(20)
});

it("day/night cycle clamps to within 20 mins", () => {
    const envMgr = new EnvironmentManager(EnvironmentModes.TimeBased)

    expect(envMgr.determineTimeOfDay()).toBeLessThanOrEqual(20)
    expect(envMgr.determineTimeOfDay()).toBeGreaterThanOrEqual(0)
})