import { defineStore } from 'pinia';

const useFiltersStore = defineStore('filters', {
  state: () => ({
    dateFrom: null,
    dateTo: null,
    mood: [],
    energy: [],
    occasions: [],
    emotions: [],
  }),
  getters: {
    filters: (state) => {
      const {
        dateFrom, dateTo, mood, energy, occasions, emotions,
      } = state;
      return {
        dateFrom,
        dateTo,
        mood,
        energy,
        occasions,
        emotions,
      };
    },
  },
  actions: {
    applyFilters({ item, entity }) {
      this.$patch({ [entity]: item });
    },
    resetFilters() {
      this.$reset();
    },
  },
});

export default useFiltersStore;
