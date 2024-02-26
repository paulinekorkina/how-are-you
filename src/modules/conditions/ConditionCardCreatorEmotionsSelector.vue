<template>
  <div>
    <MultiSelect
      v-model="emotionsSelected"
      :options="emotionsStore.emotions"
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
    <div v-if="emotionsSelected?.length" class="flex flex-wrap gap-2 mt-3">
      <Chip
        v-for="emotion in emotionsSelected"
        :key="emotion.id"
        :label="`${emotion.icon} ${emotion.name}`"
        removable
        @remove="removeEmotion(emotion.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Chip from 'primevue/chip';
import useEmotionsStore from '@/stores/emotions';
import MultiSelect from 'primevue/multiselect';

const props = defineProps({
  modelValue: {
    type: Array,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const emotionsStore = useEmotionsStore();

const emotionsSelected = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

function removeEmotion(emotionId) {
  emotionsSelected.value = emotionsSelected.value.filter(({ id }) => id !== emotionId);
}
</script>
