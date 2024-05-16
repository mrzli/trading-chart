export function estimateTextHeight(fontSize: number): number {
  return Math.ceil(fontSize);
}

export function estimateTextWidth(fontSize: number, text: string): number {
  const separatorWidth = Math.ceil(fontSize / 4);
  const digitWidth = Math.ceil(fontSize / 2 + 1);

  let width = 0;
  for (const char of text) {
    width += char === '.' || char === ' ' ? separatorWidth : digitWidth;
  }

  // add for buffering
  width += digitWidth;

  // round to the nearest larger 5
  width = Math.ceil(width / 5) * 5;

  return width;
}
