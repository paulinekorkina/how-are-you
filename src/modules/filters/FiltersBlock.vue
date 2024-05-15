<template>
  <div class="filters-wrapper mb-6 pt-3">
    <FiltersBlockDates class="filters-dates" />
    <FiltersBlockOccasions class="filters-occasions" />
    <FiltersBlockEmotions class="filters-emotions" />
    <FiltersBlockMood class="filters-mood" />
    <FiltersBlockEnergy class="filters-energy" />
    <Button
      label="Сбросить"
      class="filters-reset"
      @click="filtersStore.resetFilters"
    />
  </div>
</template>

<script setup>
import FiltersBlockDates from '@/modules/filters/FiltersBlockDates.vue';
import FiltersBlockMood from '@/modules/filters/FiltersBlockMood.vue';
import FiltersBlockEnergy from '@/modules/filters/FiltersBlockEnergy.vue';
import FiltersBlockOccasions from '@/modules/filters/FiltersBlockOccasions.vue';
import FiltersBlockEmotions from '@/modules/filters/FiltersBlockEmotions.vue';
import useFiltersStore from '@/stores/filters';
import Button from 'primevue/button';

const filtersStore = useFiltersStore();
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blocks/filters.scss';
</style>
