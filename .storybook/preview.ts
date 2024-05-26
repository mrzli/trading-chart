import type { Preview } from '@storybook/html';
import '../src/_non-build/local/index.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
  },
  decorators: [],
};

export default preview;
