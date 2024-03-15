import { defineStore } from 'pinia';
import occasionsJSON from '@/mocks/occasions.json';

const useOccasionStore = defineStore('occasion', {
  state: () => ({
    occasions: occasionsJSON,
  }),
  actions: {
    addOccasion(occasion) {
      this.occasions.push(occasion);
    },
    updateOccasion(occasion) {
      const index = this.occasions.findIndex(({ id }) => id === occasion.id);

      if (index >= 0) {
        this.occasions.splice(index, 1, occasion);
      }
    },
    deleteOccasion(occasionId) {
      this.occasions = this.occasions.filter(({ id }) => id !== occasionId);
    },
  },
});

export default useOccasionStore;
