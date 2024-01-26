import { defineStore } from 'pinia';
import conditionsJSON from '@/mocks/conditions.json';
import useOccasionsStore from '@/stores/occasions';
import useEmotionsStore from '@/stores/emotions';

const useConditionsStore = defineStore('conditions', {
  state: () => ({
    conditions: conditionsJSON,
  }),
  getters: {
    conditionsExtended: (state) => {
      const occasionsData = useOccasionsStore();
      const emotionsData = useEmotionsStore();

      return state.conditions.map((condition) => {
        const occasions = occasionsData.occasions
          .filter((i) => condition.occasions?.includes(i.id));

        const emotions = emotionsData.emotions.filter((i) => condition.emotions?.includes(i.id));

        return {
          ...condition,
          occasions,
          emotions,
        };
      });
    },
  },
  actions: {
    addCondition(condition) {
      this.conditions.push(condition);
    },
    updateCondition(condition) {
      const index = this.conditions.findIndex(({ id }) => id === condition.id);

      if (index >= 0) {
        this.conditions.splice(index, 1, condition);
      }
    },
    deleteCondition(conditionId) {
      this.conditions = this.conditions.filter(({ id }) => id !== conditionId);
    },
  },
});

export default useConditionsStore;
