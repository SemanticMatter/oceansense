import { computed, reactive } from 'vue';

const state = reactive({
  rightBadge: null
});

export const useHeaderMeta = () => {
  const setRightBadge = (badge) => {
    state.rightBadge = badge;
  };

  const clearRightBadge = () => {
    state.rightBadge = null;
  };

  return {
    rightBadge: computed(() => state.rightBadge),
    setRightBadge,
    clearRightBadge
  };
};
