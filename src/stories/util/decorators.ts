import type { Decorator, StoryFn } from '@storybook/html';

export const fullscreenDecorator: Decorator = (
  storyFn: StoryFn,
): any => {
  // @ts-ignore
  const content = storyFn()

  const wrapper = document.createElement('div');
  wrapper.style.margin = '0';
  wrapper.style.padding = '0';
  wrapper.style.width = '100vw';
  wrapper.style.height = '100vh';
  wrapper.style.boxSizing = 'border-box';
  // optional: wrapper.style.background = '#111'; // to visualize

  // Append the story content
  if (content instanceof HTMLElement) {
    wrapper.appendChild(content);
  } else if (typeof content === 'string') {
    wrapper.innerHTML = content;
  } else {
    wrapper.textContent = 'Story content not rendered';
  }

  return wrapper;
}
