import { mapGetOrThrow } from '@gmjs/data-container-util';
import { ensureNever } from '@gmjs/assert';
import {
  MeasureCharWidthData,
  MeasureHeightData,
  MeasureSizeData,
  MeasureWidthData,
  RawMeasureCharWidthData,
  RawMeasureFontData,
  RawMeasureHeightData,
  RawMeasureSizeData,
  RawMeasureWidthData,
} from './types';
import { RAW_MEASURE_FONT_DATA } from './data';

export function measureTextWidth(
  fontFamily: string,
  fontSize: number,
  text: string,
): number {
  const sizeData = getSizeData(fontFamily);
  const { width } = sizeData;

  const numChars = text.length;

  const { type } = width;

  switch (type) {
    case 'proportional': {
      let sumFraction = 0;

      for (let i = 0; i < numChars; i++) {
        const char = text[i];
        let charWidthData = width.value.get(char);
        if (charWidthData === undefined) {
          console.warn(`Unknown width for char: '${char}'.`);
          charWidthData = mapGetOrThrow(width.value, DEFAULT_CHAR);
        }

        const beforeChar = i === 0 ? CHAR_NONE : text[i - 1];
        const charWidth = getCharWidth(charWidthData, beforeChar);
        sumFraction += charWidth;
      }

      return Math.round(sumFraction * fontSize);
    }
    case 'monospaced': {
      return Math.round(width.value * fontSize * numChars);
    }
    default: {
      return ensureNever(type);
    }
  }
}

function getCharWidth(
  charWidthData: MeasureCharWidthData,
  beforeChar: string,
): number {
  const { type } = charWidthData;

  switch (type) {
    case 'constant': {
      return charWidthData.value;
    }
    case 'variable': {
      return (
        charWidthData.value.get(beforeChar) ??
        mapGetOrThrow(charWidthData.value, DEFAULT_CHAR)
      );
    }
    default: {
      return ensureNever(type);
    }
  }
}

export function measureTextHeight(
  fontFamily: string,
  fontSize: number,
): number {
  const sizeData = getSizeData(fontFamily);
  const { height } = sizeData;

  return height.mapping.has(fontSize)
    ? height.mapping.get(fontSize)!
    : Math.round(fontSize * height.factor);
}

function getSizeData(fontFamily: string): MeasureSizeData {
  return mapGetOrThrow(MEASURE_FONT_DATA, fontFamily);
}

const CHAR_NONE = '<none>';
const DEFAULT_CHAR = '8';

const MEASURE_FONT_DATA = toFinalMeasureFontData(RAW_MEASURE_FONT_DATA);

function toFinalMeasureFontData(
  raw: RawMeasureFontData,
): ReadonlyMap<string, MeasureSizeData> {
  return new Map(
    raw.map(([size, measureSizeData]) => [
      size,
      toFinalMeasureSizeData(measureSizeData),
    ]),
  );
}

function toFinalMeasureSizeData(raw: RawMeasureSizeData): MeasureSizeData {
  const { width, height } = raw;

  return {
    width: toFinalMeasureWidthData(width),
    height: toFinalMeasureHeightData(height),
  };
}

function toFinalMeasureWidthData(raw: RawMeasureWidthData): MeasureWidthData {
  const { type, value } = raw;

  switch (type) {
    case 'proportional': {
      return {
        type: 'proportional',
        value: new Map(
          value.map(([char, widthData]) => [
            char,
            toFinalMeasureCharWidthData(widthData),
          ]),
        ),
      };
    }
    case 'monospaced': {
      return {
        type: 'monospaced',
        value,
      };
    }
    default: {
      return ensureNever(type);
    }
  }
}

function toFinalMeasureHeightData(
  raw: RawMeasureHeightData,
): MeasureHeightData {
  const { mapping, factor } = raw;

  return {
    mapping: new Map(mapping),
    factor,
  };
}

function toFinalMeasureCharWidthData(
  raw: RawMeasureCharWidthData,
): MeasureCharWidthData {
  const { type, value } = raw;

  switch (type) {
    case 'constant': {
      return {
        type: 'constant',
        value,
      };
    }
    case 'variable': {
      return {
        type: 'variable',
        value: new Map(raw.value),
      };
    }
    default: {
      return ensureNever(type);
    }
  }
}
