import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { createRouter, createMemoryHistory } from 'vue-router';

import GuidelinesView from '../../src/views/GuidelinesView.vue';
import { datasets } from '../../src/assets/data/OceanSense-datasets.js';

const buildRouter = () =>
  createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'index', component: { template: '<div />' } },
      { path: '/datadoc', name: 'datadoc', component: { template: '<div />' } },
      { path: '/node', name: 'node', component: { template: '<div />' } }
    ]
  });

describe('GuidelinesView', () => {
  it('adds and removes the scrollable body class', () => {
    const router = buildRouter();
    const wrapper = mount(GuidelinesView, {
      global: { plugins: [router] }
    });

    expect(document.body.classList.contains('scrollable')).toBe(true);

    wrapper.unmount();
    expect(document.body.classList.contains('scrollable')).toBe(false);
  });

  it('stores dataset context and navigates to documentation', async () => {
    const router = buildRouter();
    const pushSpy = vi.spyOn(router, 'push');
    await router.push('/');
    await router.isReady();

    const wrapper = mount(GuidelinesView, {
      global: { plugins: [router] }
    });

    const select = wrapper.find('select');
    await select.setValue(datasets[0].id);

    const openButton = wrapper.findAll('button').find((btn) =>
      btn.text().toLowerCase().includes('open documentation')
    );

    expect(openButton).toBeTruthy();

    await openButton.trigger('click');
    await nextTick();

    expect(localStorage.getItem('fj_guidelines_dataset')).toBe(datasets[0].id);
    expect(localStorage.getItem('fj_guidelines_target')).toBe('explorer');
    expect(pushSpy).toHaveBeenCalledWith({ name: 'datadoc' });
  });
});
