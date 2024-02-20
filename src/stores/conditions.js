import { defineStore } from 'pinia';
import conditionsJSON from '@/mocks/conditions.json';
import useOccasionsStore from '@/stores/occasions';
import useEmotionsStore from '@/stores/emotions';
import { sortByDate } from '@/common/helpers';
import { MAX_NOTE_LENGTH } from '@/common/const';

const useConditionsStore = defineStore('conditions', {
  state: () => ({
    conditions: conditionsJSON,
  }),
  getters: {
    conditionsExtended: (state) => {
      const occasionsData = useOccasionsStore();
      const emotionsData = useEmotionsStore();

      return state.conditions
        .sort(sortByDate)
        .map((condition) => {
          const occasions = occasionsData.occasions
            .filter((i) => condition.occasions?.includes(i.id));

          const emotions = emotionsData.emotions.filter((i) => condition.emotions?.includes(i.id));

          const trimmedNote = condition.note && condition.note.length > MAX_NOTE_LENGTH ? `${condition.note.substring(0, MAX_NOTE_LENGTH)}…` : condition.note;

          return {
            ...condition,
            occasions,
            emotions,
            trimmedNote,
          };
        });
    },
    getConditionById: (state) => (id) => {
      const condition = state.conditions.find((i) => (i.id === id));

      const date = new Date(condition.date);

      return {
        ...condition,
        date,
      };
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
