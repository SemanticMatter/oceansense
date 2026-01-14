import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import App from '../src/App.vue';

describe('App', () => {
  it('renders the default layout', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          DefaultLayout: { template: '<div class="layout-stub" />' }
        }
      }
    });

    expect(wrapper.find('.layout-stub').exists()).toBe(true);
  });
});
