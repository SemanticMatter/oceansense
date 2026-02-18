import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import NodeView from '../../src/views/NodeView.vue';

describe('NodeView', () => {
  it('updates the inspector title when selecting a node', async () => {
    const wrapper = mount(NodeView, { attachTo: document.body });
    await nextTick();

    const titleEl = wrapper.find('.inspector-panel h2');
    expect(titleEl.exists()).toBe(true);
    expect(titleEl.element.innerText).toContain('oceanlab@sensor-things');

    window.loadNode('pml_apics_uk');
    await nextTick();

    expect(titleEl.element.innerText).toContain('apics@pml');

    wrapper.unmount();
  });

  it('clears inputs when registering a new node', async () => {
    const wrapper = mount(NodeView, { attachTo: document.body });
    await nextTick();

    const inputs = wrapper.findAll('input.input');
    expect(inputs.length).toBeGreaterThan(0);

    inputs.forEach((input) => input.element.value = 'filled');

    window.showAddNode();
    await nextTick();

    inputs.forEach((input) => {
      expect(input.element.value).toBe('');
    });

    wrapper.unmount();
  });
});
