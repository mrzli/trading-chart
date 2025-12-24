export const LIST_OF_FILL_RULES = ['nonzero', 'evenodd'] as const;

export type FillRule = (typeof LIST_OF_FILL_RULES)[number];
