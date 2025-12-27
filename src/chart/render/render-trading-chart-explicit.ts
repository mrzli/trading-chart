import { applyFn } from '@gmjs/apply-function';
import {
  PluginExecutionInput,
  PluginExecutionOutput,
  TradingChartInputExplicit,
  TradingChartPlugin,
  TradingChartResult,
} from '../types';
import { sort, toArray } from '@gmjs/value-transformers';

export function renderTradingChartExplicit(
  input: TradingChartInputExplicit,
  plugins: readonly TradingChartPlugin[],
): TradingChartResult {
  const { size, layout } = input;

  const sortedPlugins = applyFn(
    plugins,
    sort((p1, p2) => p1.priority - p2.priority),
    toArray(),
  );

  let pluginOutput: PluginExecutionOutput = { batch: [], context: {} };

  for (const plugin of sortedPlugins) {
    const pluginInput: PluginExecutionInput = {
      chartInput: input,
      batch: pluginOutput.batch,
      context: pluginOutput.context,
    };

    pluginOutput = plugin.execute(pluginInput);
  }

  return { batch: pluginOutput.batch, context: pluginOutput.context };
}
