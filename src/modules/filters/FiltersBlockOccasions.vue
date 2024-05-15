<template>
  <div>
    <MultiSelect
      v-model="occasionsSelected"
      :options="occasionsStore.occasions"
      filter
      option-label="name"
      placeholder="События"
      :max-selected-labels="0"
      selected-items-label="Выбрано: {0}"
    >
      <template #option="slotProps">
        {{ slotProps.option.icon }} {{ slotProps.option.name }}
      </template>
    </MultiSelect>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import useOccasionsStore from '@/stores/occasions';
import useFiltersStore from '@/stores/filters';
import MultiSelect from 'primevue/multiselect';

const occasionsStore = useOccasionsStore();
const filtersStore = useFiltersStore();

const occasionsSelected = computed({
  get() {
    return filtersStore.occasions;
  },
  set(value) {
    filtersStore.applyFilters({ item: value, entity: 'occasions' });
  },
});
</script>
