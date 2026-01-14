export interface CreateChartCanvasesReturnValue {
  readonly root: HTMLDivElement;
  readonly chartMain: HTMLCanvasElement;
  readonly chartOverlay: HTMLCanvasElement;
  // readonly infoContainer: HTMLDivElement;
}

export function createChartDom(
): CreateChartCanvasesReturnValue {
  const root = document.createElement('div');
  root.id = 'chart-wrapper';
  root.style.width = '100%';
  root.style.height = '100%';
  root.style.position = 'relative';
  root.style.outline = 'none';
  root.tabIndex = 0;

  const chartMain = document.createElement('canvas');
  chartMain.id = 'chart-main';
  chartMain.tabIndex = 0;
  chartMain.style.position = 'absolute';
  chartMain.style.top = '0';
  chartMain.style.left = '0';
  chartMain.style.outline = 'none';
  chartMain.style.width = '1000px';
  chartMain.style.height = '1000px';

  const chartOverlay = document.createElement('canvas');
  chartOverlay.id = 'chart-overlay';
  chartOverlay.tabIndex = 0;
  chartOverlay.style.position = 'absolute';
  chartOverlay.style.top = '0';
  chartOverlay.style.left = '0';
  chartOverlay.style.outline = 'none';
  chartOverlay.style.pointerEvents = 'none';
  chartOverlay.style.width = '1000px';
  chartOverlay.style.height = '1000px';

  // const infoContainer = document.createElement('div');
  // infoContainer.style.position = 'absolute';
  // infoContainer.style.top = '0.5rem';
  // infoContainer.style.left = '0.5rem';

  root.appendChild(chartMain);
  root.appendChild(chartOverlay);
  // root.appendChild(infoContainer);

  return { root, chartMain, chartOverlay /*, infoContainer */ };
}
