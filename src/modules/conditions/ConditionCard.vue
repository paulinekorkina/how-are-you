<template>
  <div class="condition-card">
    <Button icon="pi pi-trash" severity="secondary" text size="small"/>

    <div class="flex align-items-center">
      <div class="condition-card-badge mr-2" :class="MoodClass[condition.mood]"></div>
      <span class="font-bold">{{ MoodName[condition.mood] }}</span>
    </div>

    <Divider />

    <p class="text-xs">{{ humanizeFullDate(condition.date) }}</p>
    <p class="text-sm mb-4">{{ capitalizeFirstLetter(EnergyName[condition.energy]) }}</p>

    <div
      v-if="condition.occasions.length"
      class="flex flex-wrap gap-1"
    >
      <Chip
        :key="occasion.id"
        v-for="occasion in condition.occasions"
        :label="`${occasion.icon} ${occasion.name}`"
        class="text-xs py-0 pl-2 pr-2" />
    </div>

    <Divider v-if="condition.emotions.length"/>

    <div v-if="condition.emotions.length" class="flex flex-wrap gap-1">
      <Chip
        :key="emotion.id"
        v-for="emotion in condition.emotions"
        :label="`${emotion.icon} ${emotion.name}`"
        class="text-xs py-0 pl-2 pr-2" />
    </div>

    <div v-if="condition.trimmedNote" class="mt-3">
      <p class="text-xs">{{ condition.trimmedNote }}</p>
    </div>
  </div>
</template>

<script setup>
import Divider from 'primevue/divider';
import Chip from 'primevue/chip';
import Button from 'primevue/button';
import { humanizeFullDate, capitalizeFirstLetter } from '@/common/helpers';
import { MoodClass, MoodName, EnergyName } from '@/common/const';

defineProps({
  condition: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blocks/condition-card.scss'
</style>
