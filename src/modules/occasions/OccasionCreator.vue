<template>
  <div>
    <Dialog v-model:visible="visible" modal :header="modalHeader">
      <form @submit.prevent="submit">
        <div class="flex align-items-center gap-3 mb-3">
          <label for="name" class="font-semibold w-6rem">Название</label>
          <InputText v-model="occasion.name" id="name" class="flex-auto" autocomplete="off" />
        </div>
        <div class="occasion-creator-icon flex align-items-center gap-3 mb-5">
          <label class="font-semibold w-6rem">Иконка</label>
          <div class="flex-auto">{{ occasion.icon }}</div>
        </div>
        <EmojiPicker
          :native="true"
          @select="onSelectEmoji"
          :display-recent="true"
        />
        <div class="flex justify-content-end gap-2 mt-5">
          <Button
            type="button"
            label="Отмена"
            severity="secondary"
            @click="visible = false"
          ></Button>
          <Button type="submit" label="Сохранить"></Button>
        </div>
      </form>
    </Dialog>
  </div>

</template>

<script setup>
import { ref, computed } from 'vue';
import useOccasionsStore from '@/stores/occasions';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import EmojiPicker from 'vue3-emoji-picker';

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

const occasionToWork = computed(() => (props.occasionToEdit
  ? { ...props.occasionToEdit }
  : createNewOccasion()));

const occasion = ref(occasionToWork);

const modalHeader = computed(() => (props.occasionToEdit ? 'Редактировать событие' : 'Новое событие'));

function onSelectEmoji(emoji) {
  occasion.value.icon = emoji.i;
}

async function submit() {
  if (props.occasionToEdit) {
    // редактируемое событие
    await occasionsStore.updateOccasion(occasion.value);
  } else {
    // новое событие
    await occasionsStore.addOccasion(occasion.value);
  }

  visible.value = false;
}
</script>

<style lang="scss">
@import 'vue3-emoji-picker/css';
@import '@/assets/scss/blocks/occasion-creator.scss';
</style>
