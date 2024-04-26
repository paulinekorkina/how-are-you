import { defineStore } from 'pinia';
import occasionsJSON from '@/mocks/occasions.json';

const useOccasionStore = defineStore('occasion', {
  state: () => ({
    occasions: occasionsJSON,
  }),
  actions: {
    addOccasion(occasion) {
      this.occasions.unshift(occasion);
    },
    updateOccasion(occasion) {
      const index = this.occasions.findIndex(({ id }) => id === occasion.id);

      if (index >= 0) {
        this.occasions.splice(index, 1, occasion);
      }
    },
    archiveOccasion(occasionId) {
      const index = this.occasions.findIndex(({ id }) => id === occasionId);

      if (index >= 0) {
        this.occasions[index].archive = true;
      }
    },
  },
});

export default useOccasionStore;
