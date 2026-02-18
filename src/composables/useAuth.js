import { computed, reactive } from 'vue';

const STORAGE_KEY = 'OceanSense.mockAuth';

const state = reactive({
  initialized: false,
  isAuthenticated: false,
  user: null
});

const load = () => {
  if (state.initialized) {
    return;
  }
  state.initialized = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    const data = JSON.parse(raw);
    state.isAuthenticated = !!data?.isAuthenticated;
    state.user = data?.user || null;
  } catch (error) {
    state.isAuthenticated = false;
    state.user = null;
  }
};

const persist = () => {
  const payload = {
    isAuthenticated: state.isAuthenticated,
    user: state.user
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const useAuth = () => {
  load();

  const login = () => {
    state.isAuthenticated = true;
    state.user = {
      name: 'Storm Fjord',
      avatarUrl: ''
    };
    persist();
  };

  const logout = () => {
    state.isAuthenticated = false;
    state.user = null;
    persist();
  };

  return {
    isAuthenticated: computed(() => state.isAuthenticated),
    user: computed(() => state.user),
    login,
    logout
  };
};
