<template>
  <p class="mood-selector-label" :class="MoodClass[mood]">{{ MoodName[mood] }}</p>
  <Slider
    v-model="mood"
    :min="0"
    :max="6"
    class="w-14rem"
  />
</template>

<script setup>
import Slider from 'primevue/slider';
import { computed } from 'vue';
import { MoodClass, MoodName } from '@/common/const';

const props = defineProps({
  modelValue: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const mood = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blocks/mood-selector.scss';
</style>
