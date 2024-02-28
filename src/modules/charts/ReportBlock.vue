<template>
  <router-link
    :to="{ name: 'condition', params: { id: condition.id }}"
    class="col-12 shadow-2 mb-2 p-3 border-round flex"
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
