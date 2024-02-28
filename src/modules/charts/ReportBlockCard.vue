<template>
  <div class="text-color-secondary">
    {{ humanizeShortDate(condition.date) }}
  </div>
  <div
    class="report-card-mood ml-3 pl-1"
    :class="MoodClass[condition.mood]"
  >{{ capitalizeFirstLetter(MoodName[condition.mood]) }}</div>
  <span @click="deleteCondition" class="pi pi-trash ml-auto text-color-secondary"></span>
</template>

<script setup>
import useConditionsStore from '@/stores/conditions';
import { humanizeShortDate, capitalizeFirstLetter } from '@/common/helpers';
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
@import '@/assets/scss/blocks/report-card.scss';
</style>
