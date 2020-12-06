// Original Snippet: https://gist.github.com/endel/dfe6bb2fbe679781948c
// Heavily modified to fit Typescript standards

const Phases: Array<{ name: string; details: string }> = [
  {
    name: "new moon",
    details:
      "The new moon represents a new beginning. Use this time to set intentions for the rest of the month! 📅",
  },
  {
    name: "waxing crescent",
    details:
      "The moon's power is building! Use this time to build yourself up alongside it.",
  },
  {
    name: "quarter",
    details:
      "The quarter moon is upon us! Use this time to reflect on your accomplishments and prepare for the full moon!",
  },
  {
    name: "waxing gibbous",
    details:
      "The moon is almost entirely uncloaked! Hone in on your intentions for the full moon, and make sure to pay attention to the small things in life.",
  },
  {
    name: "full moon",
    details:
      "The full moon has arrived!! This is the most powerful time of the month, and it is an exemplary time for spells or rituals. Use this time wisely!",
  },
  {
    name: "waning gibbous",
    details:
      "The full moon has just passed - take this time to reflect and to re-adjust your intentions. ",
  },
  {
    name: "third quarter",
    details:
      "The third quarter is a great time to let go of strife - it has no need to weigh you down.",
  },
  {
    name: "waning crescent",
    details:
      "The power of the moon is diminished quite a bit. Take this time to reflect on things that have affected you which are out of your control - think about how to change those for the better.",
  },
];

export const getCurrentMoonPhase = () => {
  const date = new Date();
  let year: any = date.getFullYear(),
    month: any = date.getMonth(),
    day: any = date.getDate();

  let yearsElapsed: any = 0;
  let monthsElapsed: any = 0;
  let julianDays: any = 0;
  let b: any = 0;

  if (month < 3) {
    year--;
    month += 12;
  }

  month++;
  yearsElapsed = 365.25 * year;
  monthsElapsed = 30.6 * month;
  julianDays = yearsElapsed + monthsElapsed + day - 694039.09;
  julianDays /= 29.5305882;
  b = parseInt(julianDays);
  julianDays -= b;
  b = Math.round(julianDays * 8);

  if (b >= 8) b = 0;
  return { details: Phases[b].details, name: Phases[b].name };
};
