import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import AppFooter from '../src/components/layout/AppFooter.vue';

describe('AppFooter', () => {
  it('renders the current year and partner logos', () => {
    const wrapper = mount(AppFooter);

    const year = new Date().getFullYear();
    expect(wrapper.text()).toContain(year.toString());

    const logos = wrapper.findAll('.footer-logos img');
    expect(logos.length).toBe(2);
  });
});
