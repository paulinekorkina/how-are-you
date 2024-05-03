<template>
  <div class="mb-5">
    <p>
      Настроение от:
      <span
        :class="MoodClass[mood[0]]"
        class="mood-selector-label"
      >{{ MoodName[mood[0]] }},</span>
      до:
      <span
        :class="MoodClass[mood[1]]"
        class="mood-selector-label"
      >{{ MoodName[mood[1]] }}</span>
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

const filtersStore = useFiltersStore();

const mood = computed({
  get() {
    return filtersStore.mood.length ? filtersStore.mood : [0, 6];
  },
  set(value) {
    filtersStore.applyFilters({ item: value, entity: 'mood' });
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blocks/mood-selector.scss';
</style>
