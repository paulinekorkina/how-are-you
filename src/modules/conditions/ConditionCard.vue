<template>
  <div>
    <div class="flex align-items-center">
      <div class="mood-badge mr-3" :class="MoodClass[condition.mood]"></div>
      <span class="font-bold text-xl">{{ MoodName[condition.mood] }}</span>
    </div>
    <Divider />

    <p class="text-sm">{{ humanizeFullDate(condition.date) }}</p>
    <p class="text-lg mb-5">{{ capitalizeFirstLetter(EnergyName[condition.energy]) }}</p>

    <div v-if="condition.occasions.length" class="flex flex-wrap gap-2 text-xs">
      <Chip
        :key="occasion.id"
        v-for="occasion in condition.occasions"
        :label="`${occasion.icon} ${occasion.name}`"
        class="text-sm" />
    </div>

    <Divider v-if="condition.emotions.length"/>
    <div v-if="condition.emotions.length" class="flex flex-wrap gap-2">
      <Chip
        :key="emotion.id"
        v-for="emotion in condition.emotions"
        :label="`${emotion.icon} ${emotion.name}`"
        class="text-sm" />
    </div>
    <div v-if="condition.note">
      <Divider />
      <p>{{ condition.note }}</p>
    </div>
  </div>
</template>

<script setup>
import Divider from 'primevue/divider';
import Chip from 'primevue/chip';
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
  .mood-badge {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .awful {
    background-color: #592763;
  }

  .bad {
    background-color: #9d1a70;
  }

  .meh {
    background-color: #e73c3c;
  }

  .normal {
    background-color: #ff9cab;
  }

  .good {
    background-color: #8baffb;
  }

  .excellent {
    background-color: #53d8dd;
  }

  .wonderful {
    background-color: #4df358;
  }
</style>
