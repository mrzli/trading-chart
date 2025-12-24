export const LIST_OF_TEXT_ALIGN_VERTICAL = [
  'top',
  'middle',
  'bottom',
  'baseline',
] as const;

export type TextAlignVertical = (typeof LIST_OF_TEXT_ALIGN_VERTICAL)[number];
