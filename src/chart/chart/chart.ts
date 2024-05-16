import { Ohlc, Size } from '../types';
import {
  createCanvasChartEventHandlers,
  destroyCanvasChart,
  getCanvasChartOptions,
  getInitialCanvasChartState,
  initializeCanvasChart,
  resizeCanvasChart,
  setCanvasChartData,
} from './impl';
import {
  CanvasChart,
  CanvasChartData,
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartStateWrapper,
} from './types';

export function createCanvasChart(input: CanvasChartInput): CanvasChart {
  const options: CanvasChartOptions = getCanvasChartOptions();

  const stateWrapper: CanvasChartStateWrapper = {
    state: getInitialCanvasChartState(),
  };

  const eventHandlers = createCanvasChartEventHandlers(
    input,
    options,
    stateWrapper,
  );

  return {
    initialize: (): void => {
      initializeCanvasChart(input, options, stateWrapper, eventHandlers);
    },
    destroy: (): void => {
      destroyCanvasChart(input, options, stateWrapper, eventHandlers);
    },
    resize: (size: Size): void => {
      resizeCanvasChart(input, options, stateWrapper, size);
    },
    setData: (data: CanvasChartData): void => {
      setCanvasChartData(input, options, stateWrapper, data);
    },
  };
}
