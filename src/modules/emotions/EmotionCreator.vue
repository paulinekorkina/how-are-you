<template>
  <div>
    <Dialog v-model:visible="visible" modal :header="modalHeader" @click.stop>
      <form @submit.prevent="submit">
        <div class="flex align-items-center gap-3 mb-3">
          <label for="name" class="font-semibold w-6rem">Название</label>
          <InputText
            v-model="emotion.name"
            id="name"
            class="flex-auto"
            autocomplete="off"
            maxlength="30"
          />
        </div>
        <div class="creator-icon flex align-items-center gap-3 mb-5">
          <label class="font-semibold w-6rem">Иконка</label>
          <div class="flex-auto">{{ emotion.icon }}</div>
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
          <Button type="submit" label="Сохранить" :disabled="submitDisabled"></Button>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import useEmotionsStore from '@/stores/emotions';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import EmojiPicker from 'vue3-emoji-picker';

const props = defineProps({
  emotionToEdit: {
    type: Object,
    default: null,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'selectNewEmotion', 'updateEmotion']);

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const emotionsStore = useEmotionsStore();

const createNewEmotion = () => ({
  id: crypto.randomUUID(),
  name: '',
  icon: '',
  archive: false,
});

const newEmotion = ref(createNewEmotion());

const emotionToWork = computed(() => (props.emotionToEdit
  ? props.emotionToEdit
  : newEmotion.value));

const emotion = ref(emotionToWork);

const modalHeader = computed(() => (props.emotionToEdit ? 'Редактировать эмоцию' : 'Новая эмоция'));

const submitDisabled = computed(() => !emotion.value.name || !emotion.value.icon);

function onSelectEmoji(emoji) {
  emotion.value.icon = emoji.i;
}

async function submit() {
  if (props.emotionToEdit) {
    // редактируемая эмоция
    await emotionsStore.updateEmotion({ ...emotion.value });
    emit('updateEmotion', emotion.value);
  } else {
    // новая эмоция
    await emotionsStore.addEmotion({ ...emotion.value });
    emit('selectNewEmotion', emotion.value);
    newEmotion.value = createNewEmotion();
  }

  visible.value = false;
}
</script>

<style lang="scss">
@import 'vue3-emoji-picker/css';
@import '@/assets/scss/blocks/occasion-and-emotion-creator.scss';
</style>
