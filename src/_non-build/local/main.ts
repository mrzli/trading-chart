import './styles/index.css';
import { setupChart } from './src/setup-chart';

const HTML = `
<div id="chart-container" class="w-screen h-screen">
  <div id="chart-wrapper" class="p-[10px] w-full h-full" style="background-color: #161A25;">
    <canvas
      id="chart"
      tabIndex="0"
      style="background-color: #DDDDDD;"
      width="2000"
      height="1000"
    />
  </div>
</div>
`;

async function execute(): Promise<void> {
  const rootElement = selectOrThrow<HTMLDivElement>(document, '#root');
  rootElement.innerHTML = HTML;

  const chartWrapperElement = selectOrThrow<HTMLDivElement>(
    document,
    '#chart-wrapper',
  );
  const chartElement = selectOrThrow<HTMLCanvasElement>(document, '#chart');

  await setupChart(chartWrapperElement, chartElement);
}

function selectOrThrow<T extends HTMLElement>(
  document: Document,
  selector: string,
): T {
  const element = document.querySelector<T>(selector);
  if (element === null) {
    throw new Error(`Element with selector "${selector}" not found.`);
  }

  return element;
}

execute().finally(() => {});
