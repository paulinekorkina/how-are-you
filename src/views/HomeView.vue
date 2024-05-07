<template>
  <h1>История состояний</h1>
  <FiltersBlock />
  <div class="grid">
    <router-link
      :to="{ name: 'condition', params: { id: condition.id }}"
      class="col-12 md:col-6 lg:col-3 flex"
      v-for="condition in conditionsToRender"
      :key="condition.id"
    >
      <condition-card
        class="col-12 shadow-2 p-3 border-round"
        :condition="condition" />
    </router-link>

    <div
      v-if="conditionsStore.conditions.length === 0"
      class="col-12 mt-5 text-lg text-center"
    >Список состояний пуст. Добавьте первое!</div>

  </div>
  <button v-if="isMoreConditions" type="button" @click="loadMoreConditions">load more</button>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import useConditionsStore from '@/stores/conditions';
import ConditionCard from '@/modules/conditions/ConditionCard.vue';
import FiltersBlock from '@/modules/filters/FiltersBlock.vue';

const conditionsStore = useConditionsStore();

const conditionsCountPerStep = 8;
const renderedConditionsCount = ref(conditionsCountPerStep);

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
</script>
