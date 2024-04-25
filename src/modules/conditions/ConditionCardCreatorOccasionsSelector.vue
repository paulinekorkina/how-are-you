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
        <span
          @click.stop.prevent="openOccasionEditor(slotProps.option)"
          class="occasion-edit-icon pi pi-pencil ml-auto"
        ></span>
      </template>
      <template #footer>
        <div class="py-2 px-3">
          <Button
            @click="openOccasionCreator"
            label="Создать событие"
            link
          />
        </div>
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

    <occasion-creator
      @select-new-occasion="selectNewOccasion"
      @update-occasion="updateOccasion"
      :occasion-to-edit="occasionToEdit"
      v-model="visible"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Chip from 'primevue/chip';
import Button from 'primevue/button';
import useOccasionsStore from '@/stores/occasions';
import MultiSelect from 'primevue/multiselect';
import OccasionCreator from '@/modules/occasions/OccasionCreator.vue';

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

const visible = ref(false);
const occasionToEdit = ref(null);

function removeOccasion(occasionId) {
  occasionsSelected.value = occasionsSelected.value.filter(({ id }) => id !== occasionId);
}

function openOccasionEditor(occasion) {
  occasionToEdit.value = { ...occasion };
  visible.value = true;
}

function openOccasionCreator() {
  occasionToEdit.value = null;
  visible.value = true;
}

function selectNewOccasion(newOccasion) {
  occasionsSelected.value.push(newOccasion);
}

function updateOccasion(updatedOccasion) {
  const index = occasionsSelected.value.findIndex(({ id }) => id === updatedOccasion.id);

  if (index >= 0) {
    occasionsSelected.value.splice(index, 1, updatedOccasion);
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blocks/occasions-selector.scss';
</style>
