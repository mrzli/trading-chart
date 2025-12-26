import { PluginExecutionInput } from './plugin-execution-input';
import { PluginExecutionOutput } from './plugin-execution-output';

export interface TradingChartPlugin {
  readonly name: string;
  readonly priority: number;
  readonly execute: (input: PluginExecutionInput) => PluginExecutionOutput;
}
