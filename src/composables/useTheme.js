import { computed, reactive } from 'vue';

const STORAGE_KEY = 'OceanSense.theme';

const themes = {
  sahel: {
    id: 'sahel',
    label: 'Sahel',
    icon: 'fa-sun'
  },
  'sahel-dark': {
    id: 'sahel-dark',
    label: 'Sahel Dark',
    icon: 'fa-moon'
  },
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
  current: themes.sahel
});

const applyTheme = (themeId) => {
  if (typeof document === 'undefined') {
    return;
  }
  document.body.dataset.theme = themeId;
};

const loadTheme = () => {
  const storedRaw = typeof localStorage !== 'undefined'
    ? localStorage.getItem(STORAGE_KEY)
    : null;
  const stored = storedRaw === 'sunlit-lagoon'
    ? 'sahel'
    : storedRaw === 'deep-ocean'
      ? 'sahel-dark'
      : storedRaw;

  if (stored && themes[stored]) {
    state.current = themes[stored];
  }
  applyTheme(state.current.id);
};

export const useTheme = () => {
  loadTheme();

  const setTheme = (themeId) => {
    const next = themes[themeId] || themes.sahel;
    state.current = next;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, next.id);
    }
    applyTheme(next.id);
  };

  const toggleTheme = () => {
    const nextId = state.current.id === 'sahel'
      ? 'sahel-dark'
      : 'sahel';
    setTheme(nextId);
  };

  return {
    theme: computed(() => state.current),
    setTheme,
    toggleTheme
  };
};
