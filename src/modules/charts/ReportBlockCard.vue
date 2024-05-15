<template>
  <div class="report-cell text-color-secondary">
    {{ humanizeShortDate(condition.date) }}
  </div>
  <div
    class="report-cell report-mood pl-2"
    :class="MoodClass[condition.mood]"
  >
    {{ capitalizeFirstLetter(MoodName[condition.mood]) }}
  </div>
  <div
    class="report-cell"
  >
    {{ capitalizeFirstLetter(EnergyName[condition.energy]) }}
  </div>
  <div class="report-cell">
    <span
      v-for="occasion in condition.occasions"
      :key="occasion.id"
    >{{ occasion.icon }}</span>
  </div>
  <div class="report-cell">
    <span
      v-for="emotion in condition.emotions"
      :key="emotion.id"
    >{{ emotion.icon }}</span>
  </div>
</template>

<script setup>
import { humanizeShortDate, capitalizeFirstLetter } from '@/common/helpers';
import { MoodClass, MoodName, EnergyName } from '@/common/const';

defineProps({
  condition: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blocks/report-block.scss';
</style>
