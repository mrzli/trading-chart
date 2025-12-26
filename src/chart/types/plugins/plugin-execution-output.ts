import { DrawItem } from '../../../types';

export interface PluginExecutionOutput {
  readonly batch: readonly DrawItem[];
  readonly context: Readonly<Record<string, any>>;
}
