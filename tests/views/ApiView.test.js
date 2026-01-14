import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import ApiView from '../../src/views/ApiView.vue';

describe('ApiView', () => {
  it('renders the API documentation header', () => {
    const wrapper = mount(ApiView);
    expect(wrapper.find('h1').text()).toBe('Data Access & API');
  });
});
