import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import DatadocView from '../../src/views/DatadocView.vue';
import { useHeaderMeta } from '../../src/composables/useHeaderMeta.js';

const createLeafletStub = () => {
  const map = {
    setView: () => map,
    fitBounds: () => {},
    invalidateSize: () => {}
  };

  const layerGroup = {
    addTo: () => layerGroup,
    clearLayers: () => {}
  };

  return {
    map: () => map,
    tileLayer: () => ({ addTo: () => {} }),
    layerGroup: () => layerGroup,
    circleMarker: () => ({ addTo: () => ({ bindPopup: () => {} }) }),
    rectangle: () => ({ addTo: () => {} })
  };
};

describe('DatadocView', () => {
  beforeEach(() => {
    window.L = createLeafletStub();
    const { clearRightBadge } = useHeaderMeta();
    clearRightBadge();
  });

  it('initializes the datadoc UI and header badge', async () => {
    const wrapper = mount(DatadocView, { attachTo: document.body });
    await nextTick();

    const { rightBadge } = useHeaderMeta();
    expect(rightBadge.value?.label).toBe('Node Online');

    expect(window.ui).toBeTruthy();

    const cards = wrapper.findAll('.dataset-card');
    expect(cards.length).toBeGreaterThan(0);

    wrapper.unmount();
    expect(rightBadge.value).toBeNull();
  });
});
