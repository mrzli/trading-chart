export const LIST_OF_PATH_OPERATIONS = ['stroke', 'fill', 'both'] as const;

export type PathOperation = (typeof LIST_OF_PATH_OPERATIONS)[number];