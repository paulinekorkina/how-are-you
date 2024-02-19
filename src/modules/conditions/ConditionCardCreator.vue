<template>
  <div>
    <!-- timepicker -->
    {{ conditionToWork.date }}

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
    <Button label="Сохранить" />
  </div>
</template>

<script setup>
import { cloneDeep } from 'lodash';
import Button from 'primevue/button';

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

</script>
