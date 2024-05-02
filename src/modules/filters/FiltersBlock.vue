<template>
  <div class="mb-5 pt-3">
    <FiltersBlockDates />
    <FiltersBlockMood />
    <FiltersBlockOccasions />
    <Button
      @click="filtersStore.resetFilters"
      label="Сбросить фильтры"
    />
  </div>
</template>

<script setup>
import FiltersBlockDates from '@/modules/filters/FiltersBlockDates.vue';
import FiltersBlockMood from '@/modules/filters/FiltersBlockMood.vue';
import FiltersBlockOccasions from '@/modules/filters/FiltersBlockOccasions.vue';
import useFiltersStore from '@/stores/filters';
import Button from 'primevue/button';

const filtersStore = useFiltersStore();
</script>
