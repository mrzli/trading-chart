import {
  TradingChartPlugin,
  pluginClear,
  pluginBackground,
  pluginXAxis,
  pluginYAxis,
  pluginVolumeSeries,
  pluginCandleSeries,
  pluginCursor,
} from '../../../chart';

export function getExamplePluginsAll(): readonly TradingChartPlugin[] {
  const plugins: readonly TradingChartPlugin[] = [
    pluginClear({ name: 'clear', priority: 0 }),
    pluginBackground({ name: 'background', priority: 1 }),
    // pluginExample({ name: 'example', priority: 2 }),
    pluginXAxis({ name: 'x-axis', priority: 3 }),
    pluginYAxis({ name: 'y-axis', priority: 3, segmentIndex: 0 }),
    pluginVolumeSeries({
      name: 'volume-series',
      priority: 4,
      segmentIndex: 0,
      heightFraction: 0.2,
    }),
    pluginCandleSeries({
      name: 'candle-series',
      priority: 5,
      segmentIndex: 0,
    }),
    pluginCursor({ name: 'cursor', priority: 6 }),
  ];

  return plugins;
}

export function getExamplePluginsMain(): readonly TradingChartPlugin[] {
  const plugins: readonly TradingChartPlugin[] = [
    pluginClear({ name: 'clear', priority: 0 }),
    pluginBackground({ name: 'background', priority: 1 }),
    // pluginExample({ name: 'example', priority: 2 }),
    pluginXAxis({ name: 'x-axis', priority: 3 }),
    pluginYAxis({ name: 'y-axis', priority: 3, segmentIndex: 0 }),
    pluginVolumeSeries({
      name: 'volume-series',
      priority: 4,
      segmentIndex: 0,
      heightFraction: 0.2,
    }),
    pluginCandleSeries({
      name: 'candle-series',
      priority: 5,
      segmentIndex: 0,
    }),
  ];

  return plugins;
}

export function getExamplePluginsOverlay(): readonly TradingChartPlugin[] {
  const plugins: readonly TradingChartPlugin[] = [
    pluginCursor({ name: 'cursor', priority: 6 }),
  ];

  return plugins;
}
