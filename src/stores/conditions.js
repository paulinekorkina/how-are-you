import { defineStore } from 'pinia';
import conditionsJSON from '@/mocks/conditions.json';
import useOccasionsStore from '@/stores/occasions';
import useEmotionsStore from '@/stores/emotions';
import { sortByDate } from '@/common/helpers';
import { MAX_NOTE_LENGTH } from '@/common/const';

function getOccasionsByIds(ids) {
  const occasionsData = useOccasionsStore();
  return occasionsData.occasions.filter((i) => ids?.includes(i.id));
}

function getEmotionsByIds(ids) {
  const emotionsData = useEmotionsStore();
  return emotionsData.emotions.filter((i) => ids?.includes(i.id));
}

const useConditionsStore = defineStore('conditions', {
  state: () => ({
    conditions: conditionsJSON,
  }),
  getters: {
    conditionsExtended: (state) => state.conditions
      .sort(sortByDate)
      .map((condition) => {
        const occasions = getOccasionsByIds(condition.occasions);
        const emotions = getEmotionsByIds(condition.emotions);

        const trimmedNote = condition.note && condition.note.length > MAX_NOTE_LENGTH ? `${condition.note.substring(0, MAX_NOTE_LENGTH)}…` : condition.note;

        return {
          ...condition,
          occasions,
          emotions,
          trimmedNote,
        };
      }),
    getConditionById: (state) => (id) => {
      const condition = state.conditions.find((i) => (i.id === id));

      const occasions = getOccasionsByIds(condition.occasions);
      const emotions = getEmotionsByIds(condition.emotions);

      const date = new Date(condition.date);

      return {
        ...condition,
        occasions,
        emotions,
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
