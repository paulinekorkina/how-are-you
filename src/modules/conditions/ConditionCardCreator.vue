<template>
  <form @submit.prevent="submit" class="pt-5">
    <div class="mb-4">
      <condition-card-creator-date-selector v-model="condition.date" />
    </div>

    <!-- mood slider -->
    <div class="mb-5">
      <b>Настроение</b>
      <condition-card-creator-mood-selector v-model="condition.mood" />
    </div>

    <!-- energy slider -->
    <div class="mb-5">
      <b>Энергия</b>
      <condition-card-creator-energy-selector v-model="condition.energy" />
    </div>

    <!-- occasions -->
    {{ conditionToWork.occasions }}

    <!-- emotions -->
    {{ conditionToWork.emotions }}

    <!-- note -->
    {{ conditionToWork.note }}

    <!-- save -->
    <br>
    <Button type="submit" label="Сохранить" class="mt-5" />
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { cloneDeep } from 'lodash';
import Button from 'primevue/button';
import ConditionCardCreatorDateSelector from '@/modules/conditions/ConditionCardCreatorDateSelector.vue';
import useConditionsStore from '@/stores/conditions';
import ConditionCardCreatorMoodSelector from '@/modules/conditions/CoditionCardCreatorMoodSelector.vue';
import ConditionCardCreatorEnergySelector from '@/modules/conditions/ConditionCardCreatorEnergySelector.vue';

const router = useRouter();

const props = defineProps({
  conditionToEdit: {
    type: Object,
    default: null,
  },
});

const conditionsStore = useConditionsStore();

const createNewCondition = () => ({
  id: crypto.randomUUID(),
  date: new Date(),
  mood: 3,
  energy: 3,
  occasions: [],
  emotions: [],
  note: null,
});

const conditionToWork = props.conditionToEdit
  ? cloneDeep(props.conditionToEdit)
  : createNewCondition();

const condition = ref(conditionToWork);

async function submit() {
  if (props.conditionToEdit) {
    // редактируемое состояние
    await conditionsStore.updateCondition(condition.value);
  } else {
    // новое состояние
    await conditionsStore.addCondition(condition.value);
  }
  router.push('/');
}
</script>
