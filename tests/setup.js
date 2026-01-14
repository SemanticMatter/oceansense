import { afterEach } from 'vitest';

afterEach(() => {
  document.body.className = '';
  localStorage.clear();
});

if (!window.scrollTo) {
  window.scrollTo = () => {};
}

if (!('innerText' in HTMLElement.prototype)) {
  Object.defineProperty(HTMLElement.prototype, 'innerText', {
    get() {
      return this.textContent;
    },
    set(value) {
      this.textContent = value;
    }
  });
}
