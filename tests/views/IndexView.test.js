import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import IndexView from '../../src/views/IndexView.vue';

describe('IndexView', () => {
  it('renders the dataset cards and inspector placeholder', () => {
    const wrapper = mount(IndexView);

    const cards = wrapper.findAll('.dataset-card');
    expect(cards.length).toBe(4);

    expect(wrapper.text()).toContain('Select a dataset to view');
  });
});
