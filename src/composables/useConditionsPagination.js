import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import useConditionsStore from '@/stores/conditions';
import { useIntersectionObserver } from '@vueuse/core';

export default function useConditionsPagination() {
  const conditionsStore = useConditionsStore();

  const conditionsCountPerStep = 8;
  const renderedConditionsCount = ref(conditionsCountPerStep);
  const target = ref(null);

  const { conditionsExtended: conditions } = storeToRefs(conditionsStore);

  const conditionsToRender = computed(() => conditions.value
    .slice(0, Math.min(conditions.value.length, renderedConditionsCount.value)));

  const isMoreConditions = computed(() => conditions.value.length > renderedConditionsCount.value);

  const loadMoreConditions = () => {
    renderedConditionsCount.value += conditionsCountPerStep;
  };

  watch(conditions, () => {
    renderedConditionsCount.value = conditionsCountPerStep;
  });

  useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        loadMoreConditions();
      }
    },
  );

  return {
    conditionsToRender, isMoreConditions, target,
  };
}
