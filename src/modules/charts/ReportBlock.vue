<template>
  <router-link
    :to="{ name: 'condition', params: { id: condition.id }}"
    class="report-card shadow-2 mb-2 p-3 border-round flex-wrap col-12 gap-2"
    v-for="condition in conditionsStore.conditionsExtended"
    :key="condition.id"
  >
    <report-block-card :condition="condition" />
  </router-link>
</template>

<script setup>
import useConditionsStore from '@/stores/conditions';
import ReportBlockCard from './ReportBlockCard.vue';

const conditionsStore = useConditionsStore();
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blocks/report-block.scss';
</style>
