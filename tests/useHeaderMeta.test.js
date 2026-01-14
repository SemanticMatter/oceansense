import { describe, it, expect, vi } from 'vitest';

const loadHeaderMeta = async () => {
  vi.resetModules();
  const mod = await import('../src/composables/useHeaderMeta.js');
  return mod.useHeaderMeta;
};

describe('useHeaderMeta', () => {
  it('sets and clears the right badge', async () => {
    const useHeaderMeta = await loadHeaderMeta();
    const { rightBadge, setRightBadge, clearRightBadge } = useHeaderMeta();

    expect(rightBadge.value).toBeNull();

    setRightBadge({ label: 'Online', icon: 'fa-signal', tone: 'status' });
    expect(rightBadge.value).toEqual({ label: 'Online', icon: 'fa-signal', tone: 'status' });

    clearRightBadge();
    expect(rightBadge.value).toBeNull();
  });
});
