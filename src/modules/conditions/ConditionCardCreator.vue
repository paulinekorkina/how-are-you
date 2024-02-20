<template>
  <div class="pt-5">
    <div class="mb-4">
      <condition-card-creator-date-selector v-model="condition.date" />
    </div>

    <!-- mood slider -->
    {{ conditionToWork.mood }}

    <!-- energy slider -->
    {{ conditionToWork.energy }}

    <!-- occasions -->
    {{ conditionToWork.occasions }}

    <!-- emotions -->
    {{ conditionToWork.emotions }}

    <!-- note -->
    {{ conditionToWork.note }}

    <!-- save -->
    <br>
    <Button label="Сохранить" class="mt-5" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { cloneDeep } from 'lodash';
import Button from 'primevue/button';
import ConditionCardCreatorDateSelector from '@/modules/conditions/ConditionCardCreatorDateSelector.vue';

const props = defineProps({
  conditionToEdit: {
    type: Object,
    default: null,
  },
});

const createNewCondition = () => ({
  date: new Date(),
  mood: 4,
  energy: 4,
  occasions: [],
  emotions: [],
  note: null,
});

const conditionToWork = props.conditionToEdit
  ? cloneDeep(props.conditionToEdit)
  : createNewCondition();

const condition = ref(conditionToWork);
</script>
