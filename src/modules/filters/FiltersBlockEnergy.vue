<template>
  <div class="mb-5">
    <p>
      Энергия от: {{ EnergyName[energy[0]] }}, до: {{ EnergyName[energy[1]] }}
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

const filtersStore = useFiltersStore();

const energy = computed({
  get() {
    return filtersStore.energy.length ? filtersStore.energy : [0, 6];
  },
  set(value) {
    filtersStore.applyFilters({ item: value, entity: 'energy' });
  },
});
</script>
