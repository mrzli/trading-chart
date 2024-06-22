import './styles/index.css';
import { setupChart } from './src/setup-chart';
import {
  HTMLCanvasElementProps,
  HTMLDivElementProps,
  createHtmlElementFactory,
} from './dom';

async function execute(): Promise<void> {
  const rootElement = selectOrThrow<HTMLDivElement>(document, '#root');

  const h = createHtmlElementFactory(document);

  const chartProps: HTMLCanvasElementProps = {
    id: 'chart',
    tabIndex: 0,
    style: {
      backgroundColor: '#DDDDDD',
    },
    width: 2000,
    height: 1000,
  };
  const chartElement = h('canvas', chartProps);

  const chartWrapperProps: HTMLDivElementProps = {
    id: 'chart-wrapper',
    className: 'p-[10px] w-full h-full bg-orange-500',
    style: {
      backgroundColor: '#161A25',
    },
  };

  const chartWrapperElement = h('div', chartWrapperProps);
  chartWrapperElement.append(chartElement);

  const chartContainerProps: HTMLDivElementProps = {
    id: 'chart-container',
    className: 'w-screen h-screen',
  };
  const chartContainerElement = h('div', chartContainerProps);

  chartWrapperElement.append(chartElement);
  chartContainerElement.append(chartWrapperElement);
  rootElement.append(chartContainerElement);

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
