<template>
  <div>
    <MultiSelect
      v-model="emotionsSelected"
      :options="emotionsStore.emotions"
      filter
      option-label="name"
      placeholder="Эмоции"
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
import useEmotionsStore from '@/stores/emotions';
import useFiltersStore from '@/stores/filters';
import MultiSelect from 'primevue/multiselect';

const emotionsStore = useEmotionsStore();
const filtersStore = useFiltersStore();

const emotionsSelected = computed({
  get() {
    return filtersStore.emotions;
  },
  set(value) {
    filtersStore.applyFilters({ item: value, entity: 'emotions' });
  },
});
</script>
