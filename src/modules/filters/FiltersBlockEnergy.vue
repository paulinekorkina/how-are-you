<template>
  <div class="mb-5">
    <p>
      Энергия от: {{ energyFromText }}, до: {{ energyToText }}
    </p>
    <Slider
      v-model="energy"
      range
      :min="0"
      :max="6"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import useFiltersStore from '@/stores/filters';
import Slider from 'primevue/slider';
import { EnergyName } from '@/common/const';
import { useMediaQuery } from '@vueuse/core';

const filtersStore = useFiltersStore();

const energy = computed({
  get() {
    return filtersStore.energy.length ? filtersStore.energy : [0, 6];
  },
  set(value) {
    filtersStore.applyFilters({ item: value, entity: 'energy' });
  },
});

const isLargeScreen = useMediaQuery('(min-width: 992px)');

const energyFromText = computed(() => (isLargeScreen.value
  ? EnergyName[energy.value[0]] : energy.value[0]));
const energyToText = computed(() => (isLargeScreen.value
  ? EnergyName[energy.value[1]] : energy.value[1]));
</script>
