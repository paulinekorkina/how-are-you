<template>
  <form @submit.prevent="submit" class="pt-5">
    <div class="mb-4">
      <condition-card-creator-date-selector v-model="condition.date" />
    </div>

    <!-- mood slider -->
    <div class="mb-5">
      <p class="font-bold">Настроение</p>
      <condition-card-creator-mood-selector v-model="condition.mood" />
    </div>

    <!-- energy slider -->
    <div class="mb-5">
      <p class="font-bold">Энергия</p>
      <condition-card-creator-energy-selector v-model="condition.energy" />
    </div>

    <!-- occasions -->
    <div class="mb-5">
      <p class="font-bold">События</p>
      <condition-card-creator-occasions-selector v-model="condition.occasions" />
    </div>

    <!-- emotions -->
    <div class="mb-5">
      <p class="font-bold">Эмоции</p>
      <condition-card-creator-emotions-selector v-model="condition.emotions" />
    </div>

    <!-- note -->
    <div class="mb-7">
      <p class="font-bold">Заметка</p>
      <condition-card-creator-note-editor v-model="condition.note" />
    </div>

    <!-- save -->
    <Button type="submit" label="Сохранить" />
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
import ConditionCardCreatorOccasionsSelector from '@/modules/conditions/ConditionCardCreatorOccasionsSelector.vue';
import ConditionCardCreatorEmotionsSelector from '@/modules/conditions/ConditionCardCreatorEmotionsSelector.vue';
import ConditionCardCreatorNoteEditor from '@/modules/conditions/ConditionCardCreatorNoteEditor.vue';

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
  const conditionToSubmit = {
    ...condition.value,
    occasions: condition.value.occasions.map((i) => i.id),
    emotions: condition.value.emotions.map((i) => i.id),
  };

  if (props.conditionToEdit) {
    // редактируемое состояние
    await conditionsStore.updateCondition(conditionToSubmit);
  } else {
    // новое состояние
    await conditionsStore.addCondition(conditionToSubmit);
  }
  router.push('/');
}
</script>
