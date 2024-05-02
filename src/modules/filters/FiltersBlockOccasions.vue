<template>
  <div class="mb-5">
    <MultiSelect
      v-model="occasionsSelected"
      :options="occasionsStore.occasions"
      filter
      optionLabel="name"
      placeholder="Выберите события"
      class="w-full md:w-20rem"
      :maxSelectedLabels="0"
      selectedItemsLabel="Выбрано: {0}"
    >
      <template #option="slotProps">
        {{ slotProps.option.icon }} {{ slotProps.option.name }}
      </template>
    </MultiSelect>

    <div v-if="occasionsSelected?.length" class="flex flex-wrap gap-2 mt-3">
      <Chip
        v-for="occasion in occasionsSelected"
        :key="occasion.id"
        :label="`${occasion.icon} ${occasion.name}`"
        removable
        @remove="removeOccasion(occasion.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import useOccasionsStore from '@/stores/occasions';
import useFiltersStore from '@/stores/filters';
import MultiSelect from 'primevue/multiselect';
import Chip from 'primevue/chip';

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

function removeOccasion(occasionId) {
  occasionsSelected.value = occasionsSelected.value.filter(({ id }) => id !== occasionId);
}
</script>
