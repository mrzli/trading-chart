export const LIST_OF_LINE_JOINS = ['bevel', 'round', 'miter'] as const;

export type LineJoin = (typeof LIST_OF_LINE_JOINS)[number];
