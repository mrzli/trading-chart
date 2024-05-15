import { Decorator } from '@storybook/html';

export function decoratorPadding(
  document: Document,
  padding: string,
): Decorator {
  return (story) => {
    const wrapper = document.createElement('div');
    wrapper.style.padding = padding;
    wrapper.append(story() as Element);
    return wrapper;
  };
}
