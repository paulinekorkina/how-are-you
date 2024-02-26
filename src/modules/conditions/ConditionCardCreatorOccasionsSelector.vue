<template>
  <div>
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
import Chip from 'primevue/chip';
import useOccasionsStore from '@/stores/occasions';
import MultiSelect from 'primevue/multiselect';

const props = defineProps({
  modelValue: {
    type: Array,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const occasionsStore = useOccasionsStore();

const occasionsSelected = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

function removeOccasion(occasionId) {
  occasionsSelected.value = occasionsSelected.value.filter(({ id }) => id !== occasionId);
}
</script>
