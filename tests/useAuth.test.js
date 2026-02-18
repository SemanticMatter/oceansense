import { describe, it, expect, vi, beforeEach } from 'vitest';

const loadAuth = async () => {
  vi.resetModules();
  const mod = await import('../src/composables/useAuth.js');
  return mod.useAuth;
};

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('restores authentication state from localStorage', async () => {
    localStorage.setItem(
      'OceanSense.mockAuth',
      JSON.stringify({
        isAuthenticated: true,
        user: { name: 'Test User', avatarUrl: 'avatar.png' }
      })
    );

    const useAuth = await loadAuth();
    const { isAuthenticated, user } = useAuth();

    expect(isAuthenticated.value).toBe(true);
    expect(user.value).toEqual({ name: 'Test User', avatarUrl: 'avatar.png' });
  });

  it('logs in and persists credentials', async () => {
    const useAuth = await loadAuth();
    const { isAuthenticated, user, login, logout } = useAuth();

    login();

    expect(isAuthenticated.value).toBe(true);
    expect(user.value?.name).toBe('Storm Fjord');

    const stored = JSON.parse(localStorage.getItem('OceanSense.mockAuth'));
    expect(stored.isAuthenticated).toBe(true);
    expect(stored.user?.name).toBe('Storm Fjord');

    logout();
    expect(isAuthenticated.value).toBe(false);
    expect(user.value).toBeNull();
  });

  it('clears state when stored data is invalid', async () => {
    localStorage.setItem('OceanSense.mockAuth', 'not-json');

    const useAuth = await loadAuth();
    const { isAuthenticated, user } = useAuth();

    expect(isAuthenticated.value).toBe(false);
    expect(user.value).toBeNull();
  });
});
