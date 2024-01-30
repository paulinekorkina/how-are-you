<template>
  <div class="grid">
    <router-link
      :to="{ name: 'condition', params: { id: condition.id }}"
      class="col-12 md:col-6 lg:col-3 flex"
      v-for="condition in conditionsStore.conditionsExtended"
      :key="condition.id"
    >
      <condition-card
        class="col-12 shadow-2 p-3 border-round"
        :condition="condition" />
    </router-link>
  </div>
</template>

<script setup>
import useConditionsStore from '@/stores/conditions';
import ConditionCard from '../modules/conditions/ConditionCard.vue';

const conditionsStore = useConditionsStore();
</script>
