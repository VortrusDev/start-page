import { getCurrentMoonPhase } from "./helpers";

test("gets current moon phase", () => {
  expect(getCurrentMoonPhase()).toBeDefined();
});
