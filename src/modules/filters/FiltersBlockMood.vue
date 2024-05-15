<template>
  <div class="mb-5">
    <p class="flex gap-1">
      Настроение от:
      <span
        :class="MoodClass[mood[0]]"
        class="mood-selector-label"
      >{{ moodFromText }}</span>
      до:
      <span
        :class="MoodClass[mood[1]]"
        class="mood-selector-label"
      >{{ moodToText }}</span>
    </p>
    <Slider
      v-model="mood"
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
import { MoodClass, MoodName } from '@/common/const';
import { useMediaQuery } from '@vueuse/core';

const filtersStore = useFiltersStore();

const mood = computed({
  get() {
    return filtersStore.mood.length ? filtersStore.mood : [0, 6];
  },
  set(value) {
    filtersStore.applyFilters({ item: value, entity: 'mood' });
  },
});

const isLargeScreen = useMediaQuery('(min-width: 992px)');

const moodFromText = computed(() => (isLargeScreen.value ? `${MoodName[mood.value[0]]},` : ''));
const moodToText = computed(() => (isLargeScreen.value ? MoodName[mood.value[1]] : ''));
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blocks/mood-selector.scss';
</style>
