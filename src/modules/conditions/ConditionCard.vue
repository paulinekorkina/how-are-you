<template>
  <div class="condition-card">
    <Button
      icon="pi pi-trash"
      severity="secondary"
      text
      size="small"
      @click.stop.prevent="deleteCondition"
    />

    <div
      class="condition-card-header flex flex-column pl-2"
      :class="MoodClass[condition.mood]"
    >
      <span class="text-xs mb-1 text-color-secondary">
        {{ humanizeFullDate(condition.date) }}
      </span>
      <span class="font-bold mb-1">
        {{ capitalizeFirstLetter(MoodName[condition.mood]) }}
      </span>
      <span class="text-sm">
        {{ capitalizeFirstLetter(EnergyName[condition.energy]) }}
      </span>
    </div>

    <Divider />

    <div
      v-if="condition.occasions.length"
      class="flex flex-wrap gap-2"
    >
      <span
        v-for="occasion in condition.occasions"
        :key="occasion.id"
        class="text-xs"
      >{{ occasion.icon }} {{ occasion.name }}</span>
    </div>

    <Divider v-if="condition.occasions.length && condition.emotions.length" />

    <div
      v-if="condition.emotions.length"
      class="flex flex-wrap gap-2"
    >
      <span
        v-for="emotion in condition.emotions"
        :key="emotion.id"
        class="text-xs"
      >{{ emotion.icon }} {{ emotion.name }}</span>
    </div>

    <div v-if="condition.trimmedNote">
      <Divider />
      <p class="text-xs">
        {{ condition.trimmedNote }}
      </p>
    </div>
  </div>
</template>

<script setup>
import useConditionsStore from '@/stores/conditions';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import { humanizeFullDate, capitalizeFirstLetter } from '@/common/helpers';
import { MoodClass, MoodName, EnergyName } from '@/common/const';

const props = defineProps({
  condition: {
    type: Object,
    required: true,
  },
});

const conditionsStore = useConditionsStore();

function deleteCondition() {
  conditionsStore.deleteCondition(props.condition.id);
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blocks/condition-card.scss';
</style>
