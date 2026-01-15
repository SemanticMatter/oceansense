import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { createRouter, createMemoryHistory } from 'vue-router';

const buildRouter = () =>
  createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'index', component: { template: '<div />' } },
      { path: '/datadoc', name: 'datadoc', component: { template: '<div />' } },
      { path: '/node', name: 'node', component: { template: '<div />' } },
      { path: '/api_view', name: 'api_view', component: { template: '<div />' } },
      { path: '/guidelines', name: 'guidelines', component: { template: '<div />' } }
    ]
  });

const loadComponent = async () => {
  vi.resetModules();
  const mod = await import('../src/components/layout/AppHeader.vue');
  return mod.default;
};

describe('AppHeader', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('logs in and toggles the auth menu', async () => {
    const router = buildRouter();
    await router.push('/');
    await router.isReady();

    const AppHeader = await loadComponent();
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router]
      }
    });

    const loginButton = wrapper.find('.auth-area .btn');
    expect(loginButton.exists()).toBe(true);
    expect(loginButton.text()).toBe('Login');

    await loginButton.trigger('click');
    await nextTick();

    const authButton = wrapper.find('.auth-button');
    expect(authButton.exists()).toBe(true);
    expect(authButton.text()).toContain('Storm Fjord');

    await authButton.trigger('click');
    await nextTick();
    expect(wrapper.find('.auth-menu').exists()).toBe(true);

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();
    expect(wrapper.find('.auth-menu').exists()).toBe(false);
  });

  it('toggles the theme from the header', async () => {
    const router = buildRouter();
    await router.push('/');
    await router.isReady();

    const AppHeader = await loadComponent();
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [router]
      }
    });

    const toggle = wrapper.find('.theme-toggle');
    expect(toggle.exists()).toBe(true);

    const before = document.body.dataset.theme || 'deep-ocean';
    await toggle.trigger('click');
    await nextTick();
    expect(document.body.dataset.theme).not.toBe(before);
  });
});
