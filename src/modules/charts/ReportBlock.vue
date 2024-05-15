<template>
  <transition-group
    name="condition"
    class="report-block"
    tag="div"
  >
    <router-link
      v-for="condition in conditionsToRender"
      :key="condition.id"
      :to="{ name: 'condition', params: { id: condition.id }}"
      class="report-card shadow-2 mb-2 p-3 border-round flex-wrap col-12 gap-2"
    >
      <ReportBlockCard :condition="condition" />
    </router-link>
  </transition-group>

  <div
    v-if="conditionsToRender.length === 0"
    class="col-12 mt-5 text-lg text-center"
  >
    Список состояний пуст. Добавьте первое!
  </div>

  <div v-if="isMoreConditions">
    <div
      ref="target"
      class="text-center p-3"
    >
      Загрузка...
    </div>
  </div>
</template>

<script setup>
import useConditionsPagination from '@/composables/useConditionsPagination';
import ReportBlockCard from './ReportBlockCard.vue';

const { conditionsToRender, isMoreConditions, target } = useConditionsPagination();
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blocks/report-block.scss';
@import '@/assets/scss/animations/animations.scss';
</style>
