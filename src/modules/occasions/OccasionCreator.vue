<template>
  <div>
    <Dialog v-model:visible="visible" modal :header="modalHeader" :style="{ width: '25rem' }">
      <span class="p-text-secondary block mb-5">Update your information.</span>
      <form @submit.prevent="submit" class="flex justify-content-end gap-2">
        <Button type="button" label="Отмена" severity="secondary" @click="visible = false"></Button>
        <Button type="submit" label="Сохранить"></Button>
      </form>
    </Dialog>
  </div>

</template>

<script setup>
import { ref, computed } from 'vue';
import { cloneDeep } from 'lodash';
import useOccasionsStore from '@/stores/occasions';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const props = defineProps({
  occasionToEdit: {
    type: Object,
    default: null,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const occasionsStore = useOccasionsStore();

const createNewOccasion = () => ({
  id: crypto.randomUUID(),
  name: '',
  icon: '',
});

const occasionToWork = props.occasionToEdit
  ? cloneDeep(props.occasionToEdit)
  : createNewOccasion();

const occasion = ref(occasionToWork);

const modalHeader = props.occasionToEdit ? 'Редактировать событие' : 'Новое событие';

async function submit() {
  if (props.occasionToEdit) {
    // редактируемое событие
    await occasionsStore.updateOccasion(occasion);
  } else {
    // новое событие
    await occasionsStore.addOccasion(occasion);
  }

  visible.value = false;
}
</script>
