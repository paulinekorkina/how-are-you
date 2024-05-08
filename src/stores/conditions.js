import { defineStore } from 'pinia';
import mockConditions from '@/mocks/conditions';

import useOccasionsStore from '@/stores/occasions';
import useEmotionsStore from '@/stores/emotions';
import useFiltersStore from '@/stores/filters';

import { sortByDate } from '@/common/helpers';
import { MAX_NOTE_LENGTH } from '@/common/const';

import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(minMax);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

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
    conditions: mockConditions,
  }),
  getters: {
    conditionsExtended: (state) => state.filteredConditions
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
    filteredConditions: (state) => {
      const filtersStore = useFiltersStore();
      const filtersAreEmpty = Object.values(filtersStore.filters)
        .every((value) => !value || (Array.isArray(value) && !value.length));

      if (filtersAreEmpty) {
        return state.conditions;
      }

      // const datesFilter = (condition) => {
      //   const { dateFrom, dateTo } = filtersStore.filters;
      //   return dayjs(condition.date).isBetween(dateFrom, dateTo, 'minute', '[]');
      // };

      const dateFromFilter = (condition) => dayjs(condition.date)
        .isSameOrAfter(filtersStore.filters.dateFrom, 'minute');

      const dateToFilter = (condition) => dayjs(condition.date)
        .isSameOrBefore(filtersStore.filters.dateTo, 'minute');

      const occasionsFilter = (condition) => filtersStore.filters.occasions
        .some((occasion) => condition.occasions?.includes(occasion.id));

      const emotionsFilter = (condition) => filtersStore.filters.emotions
        .some((emotion) => condition.emotions?.includes(emotion.id));

      const moodFilter = (condition) => {
        const [min, max] = filtersStore.filters.mood;
        return min <= condition.mood && condition.mood <= max;
      };

      const energyFilter = (condition) => {
        const [min, max] = filtersStore.filters.energy;
        return min <= condition.energy && condition.energy <= max;
      };

      return state.conditions.filter((condition) => {
        const result = {
          dateFrom: dateFromFilter,
          dateTo: dateToFilter,
          occasions: occasionsFilter,
          emotions: emotionsFilter,
          mood: moodFilter,
          energy: energyFilter,
        };

        return Object.entries(result)
          .every(([key, callback]) => {
            const value = filtersStore.filters[key];
            return !value || (Array.isArray(value) && !value.length) || callback(condition);
          });
      });
    },
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
    getMinDate: (state) => state.conditions?.reduce(
      (res, condition) => dayjs.min(dayjs(res), dayjs(condition.date)).$d,
      state.conditions[0]?.date,
    ),
    getMaxDate: (state) => state.conditions?.reduce(
      (res, condition) => dayjs.max(dayjs(res), dayjs(condition.date)).$d,
      state.conditions[0]?.date,
    ),
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
