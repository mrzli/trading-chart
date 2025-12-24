export const LIST_OF_LINE_CAPS = ['butt', 'round', 'square'] as const;

export type LineCap = (typeof LIST_OF_LINE_CAPS)[number];
