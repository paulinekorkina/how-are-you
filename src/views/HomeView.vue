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
      v-if="conditionsToRender.length === 0"
      class="col-12 mt-5 text-lg text-center"
    >Список состояний пуст. Добавьте первое!</div>

  </div>

  <div v-if="isMoreConditions">
    <div ref="target" class="text-center p-3">Загрузка...</div>
  </div>

</template>

<script setup>
import ConditionCard from '@/modules/conditions/ConditionCard.vue';
import FiltersBlock from '@/modules/filters/FiltersBlock.vue';
import useConditionsPagination from '@/composables/useConditionsPagination';

const { conditionsToRender, isMoreConditions, target } = useConditionsPagination();

</script>
