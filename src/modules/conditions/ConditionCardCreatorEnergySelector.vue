<template>
  <p>{{ EnergyName[energy] }}</p>
  <Slider
    v-model="energy"
    :min="0"
    :max="6"
    class="w-14rem"
  />
</template>

<script setup>
import Slider from 'primevue/slider';
import { computed } from 'vue';
import { EnergyName } from '@/common/const';

const props = defineProps({
  modelValue: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const energy = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>
