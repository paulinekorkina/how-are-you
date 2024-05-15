<template>
  <form
    class="pt-3"
    @submit.prevent="submit"
  >
    <div class="mb-4">
      <ConditionCardCreatorDateSelector v-model="condition.date" />
    </div>

    <div class="mb-5">
      <p class="font-bold">
        Настроение
      </p>
      <ConditionCardCreatorMoodSelector v-model="condition.mood" />
    </div>

    <div class="mb-5">
      <p class="font-bold">
        Энергия
      </p>
      <ConditionCardCreatorEnergySelector v-model="condition.energy" />
    </div>

    <div class="mb-5">
      <p class="font-bold">
        События
      </p>
      <ConditionCardCreatorOccasionsSelector v-model="condition.occasions" />
    </div>

    <div class="mb-5">
      <p class="font-bold">
        Эмоции
      </p>
      <ConditionCardCreatorEmotionsSelector v-model="condition.emotions" />
    </div>

    <div class="mb-7">
      <p class="font-bold">
        Заметка
      </p>
      <ConditionCardCreatorNoteEditor v-model="condition.note" />
    </div>

    <Button
      type="submit"
      label="Сохранить"
      :disabled="!condition.date"
    />

    <Button
      v-if="props.conditionToEdit"
      type="button"
      label="Удалить"
      outlined
      class="ml-2"
      @click="$emit('delete-condition')"
    />

    <router-link
      v-else
      :to="{name: 'home'}"
    >
      <Button
        type="button"
        label="Отмена"
        outlined
        class="ml-2"
      />
    </router-link>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { cloneDeep } from 'lodash';
import useConditionsStore from '@/stores/conditions';
import ConditionCardCreatorDateSelector from '@/modules/conditions/ConditionCardCreatorDateSelector.vue';
import ConditionCardCreatorMoodSelector from '@/modules/conditions/ConditionCardCreatorMoodSelector.vue';
import ConditionCardCreatorEnergySelector from '@/modules/conditions/ConditionCardCreatorEnergySelector.vue';
import ConditionCardCreatorOccasionsSelector from '@/modules/conditions/ConditionCardCreatorOccasionsSelector.vue';
import ConditionCardCreatorEmotionsSelector from '@/modules/conditions/ConditionCardCreatorEmotionsSelector.vue';
import ConditionCardCreatorNoteEditor from '@/modules/conditions/ConditionCardCreatorNoteEditor.vue';
import Button from 'primevue/button';

const router = useRouter();

const props = defineProps({
  conditionToEdit: {
    type: Object,
    default: null,
  },
});

defineEmits(['delete-condition']);

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
  if (!condition.value.date) return;

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
