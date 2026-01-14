import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import DefaultLayout from '../src/layouts/DefaultLayout.vue';

describe('DefaultLayout', () => {
  it('renders header, content, and footer slots', () => {
    const wrapper = mount(DefaultLayout, {
      global: {
        stubs: {
          AppHeader: { template: '<div class="header-stub" />' },
          AppFooter: { template: '<div class="footer-stub" />' },
          RouterView: { template: '<div class="router-stub" />' }
        }
      }
    });

    expect(wrapper.find('.header-stub').exists()).toBe(true);
    expect(wrapper.find('.router-stub').exists()).toBe(true);
    expect(wrapper.find('.footer-stub').exists()).toBe(true);
  });
});
