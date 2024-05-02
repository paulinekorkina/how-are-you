import { defineStore } from 'pinia';

const useFiltersStore = defineStore('filters', {
  state: () => ({
    dateFrom: null,
    dateTo: null,
    mood: [],
    occasions: [],
  }),
  getters: {
    filters: (state) => {
      const {
        dateFrom, dateTo, mood, occasions,
      } = state;
      return {
        dateFrom,
        dateTo,
        mood,
        occasions,
      };
    },
  },
  actions: {
    applyFilters({ item, entity }) {
      // console.log(item, entity);
      // this[entity] = item;
      this.$patch({ [entity]: item });
    },
    resetFilters() {
      this.$reset();
    },
  },
});

export default useFiltersStore;
