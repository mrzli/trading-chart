import { clamp } from '@gmjs/number-util';
import { CanvasChartStateWrapper } from '../../types';

export function processState(stateWrapper: CanvasChartStateWrapper): void {
  const { state } = stateWrapper;

  stateWrapper.state = {
    ...state,
    seriesPosition: {
      ...state.seriesPosition,
      itemSpan: clamp(
        state.seriesPosition.itemSpan,
        MIN_ITEM_SPAN,
        MAX_ITEM_SPAN,
      ),
    },
  };
}

const MIN_ITEM_SPAN = 20;
const MAX_ITEM_SPAN = 500;
