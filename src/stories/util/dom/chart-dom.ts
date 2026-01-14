export interface CreateChartCanvasesReturnValue {
  readonly root: HTMLDivElement;
  readonly chartMain: HTMLCanvasElement;
  readonly chartOverlay: HTMLCanvasElement;
  readonly infoContainer: HTMLDivElement;
}

export function createChartDom(
  width: number,
  height: number,
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

  const chartOverlay = document.createElement('canvas');
  chartOverlay.id = 'chart-overlay';
  chartOverlay.tabIndex = 0;
  chartOverlay.style.position = 'absolute';
  chartOverlay.style.top = '0';
  chartOverlay.style.left = '0';
  chartOverlay.style.outline = 'none';
  chartOverlay.style.pointerEvents = 'none';

  const dpr = globalThis.devicePixelRatio ?? 1;
  const canvasWidth = Math.max(1, Math.floor(width * dpr));
  const canvasHeight = Math.max(1, Math.floor(height * dpr));

  chartMain.width = canvasWidth;
  chartMain.height = canvasHeight;
  chartOverlay.width = canvasWidth;
  chartOverlay.height = canvasHeight;

  const infoContainer = document.createElement('div');
  infoContainer.style.position = 'absolute';
  infoContainer.style.top = '0.5rem';
  infoContainer.style.left = '0.5rem';

  root.appendChild(chartMain);
  root.appendChild(chartOverlay);
  root.appendChild(infoContainer);

  const mainContext = chartMain.getContext('2d')!;
  const overlayContext = chartOverlay.getContext('2d')!;

  mainContext.setTransform(dpr, 0, 0, dpr, 0, 0);
  overlayContext.setTransform(dpr, 0, 0, dpr, 0, 0);

  return { root, chartMain, chartOverlay, infoContainer };
}
