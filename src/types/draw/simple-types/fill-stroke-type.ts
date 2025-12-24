export const LIST_OF_FILL_STROKE_TYPES = ['stroke', 'fill', 'both'] as const;

export type FillStrokeType = (typeof LIST_OF_FILL_STROKE_TYPES)[number];
