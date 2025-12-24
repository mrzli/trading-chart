export const LIST_OF_FONT_WEIGHTS = [
  100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const;

export type FontWeight = (typeof LIST_OF_FONT_WEIGHTS)[number];
