import './index.css';
import iconAsset from './assets/icon.svg';
import iconLogo from '/icon.svg';
import { setupCounter } from './counter.ts';
import { setupChart } from './chart.ts';

const HTML = `
<div>
  <div class="hidden">
    <div class="inline-flex">
      <a href="https://example.org" target="_blank" rel='noreferrer'>
        <img src="${iconLogo}" class="icon" alt="Icon" style="width: 64px; height: 64px" />
      </a>
      <a href="https://example.org" target="_blank" rel='noreferrer'>
        <img src="${iconAsset}" class="icon" alt="Asset" style="width: 64px; height: 64px" />
      </a>
    </div>
    <h1>Vite + TypeScript</h1>
    <div class>
      <button id="counter" type="button" class="bg-gray-300 m-2 px-3 py-1 rounded"></button>
    </div>
    <p class="read-the-docs">
      Click one of the logos to navigate to example.org
    </p>
  </div>
  <div id="chart-container" class="p-2 w-screen h-screen">
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
</div>
`;

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

function execute(): void {
  const rootElement = selectOrThrow<HTMLDivElement>(document, '#root');
  rootElement.innerHTML = HTML;

  // const counterElement = selectOrThrow<HTMLButtonElement>(document , '#counter');
  // setupCounter(counterElement);

  const chartWrpperElement = selectOrThrow<HTMLDivElement>(
    document,
    '#chart-wrapper',
  );
  const chartElement = selectOrThrow<HTMLCanvasElement>(document, '#chart');

  setupChart(chartWrpperElement, chartElement);
}

execute();
