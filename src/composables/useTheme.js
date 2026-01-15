import { computed, reactive } from 'vue';

const STORAGE_KEY = 'fjordlab.theme';

const themes = {
  'deep-ocean': {
    id: 'deep-ocean',
    label: 'Deep Ocean',
    icon: 'fa-moon'
  },
  'sunlit-lagoon': {
    id: 'sunlit-lagoon',
    label: 'Sunlit Lagoon',
    icon: 'fa-sun'
  }
};

const state = reactive({
  current: themes['deep-ocean']
});

const applyTheme = (themeId) => {
  if (typeof document === 'undefined') {
    return;
  }
  document.body.dataset.theme = themeId;
};

const loadTheme = () => {
  const stored = typeof localStorage !== 'undefined'
    ? localStorage.getItem(STORAGE_KEY)
    : null;
  if (stored && themes[stored]) {
    state.current = themes[stored];
  }
  applyTheme(state.current.id);
};

export const useTheme = () => {
  loadTheme();

  const setTheme = (themeId) => {
    const next = themes[themeId] || themes['deep-ocean'];
    state.current = next;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, next.id);
    }
    applyTheme(next.id);
  };

  const toggleTheme = () => {
    const nextId = state.current.id === 'deep-ocean'
      ? 'sunlit-lagoon'
      : 'deep-ocean';
    setTheme(nextId);
  };

  return {
    theme: computed(() => state.current),
    setTheme,
    toggleTheme
  };
};
