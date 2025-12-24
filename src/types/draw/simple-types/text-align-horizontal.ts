export const LIST_OF_TEXT_ALIGN_HORIZONTAL = [
  'left',
  'center',
  'right',
] as const;

export type TextAlignHorizontal =
  (typeof LIST_OF_TEXT_ALIGN_HORIZONTAL)[number];
