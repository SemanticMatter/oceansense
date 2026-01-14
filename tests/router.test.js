import { describe, it, expect } from 'vitest';
import router from '../src/router/index.js';

describe('router', () => {
  it('registers the expected routes', () => {
    const routes = router.getRoutes().map((route) => ({ name: route.name, path: route.path }));

    expect(routes).toEqual(
      expect.arrayContaining([
        { name: 'index', path: '/' },
        { name: 'node', path: '/node' },
        { name: 'api_view', path: '/api_view' },
        { name: 'datadoc', path: '/datadoc' },
        { name: 'guidelines', path: '/guidelines' }
      ])
    );
  });
});
