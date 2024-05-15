<template>
  <div>
    <Dialog
      v-model:visible="visible"
      modal
      :header="modalHeader"
      @click.stop
    >
      <form @submit.prevent="submit">
        <div class="occasion-and-emotion-form-fields">
          <label for="name">Название</label>
          <InputText
            id="name"
            v-model="emotion.name"
            class="flex-auto"
            autocomplete="off"
            maxlength="30"
          />
          <label>Иконка</label>
          <div class="flex-auto">
            {{ emotion.icon }}
          </div>
        </div>
        <EmojiPicker
          v-bind="emojiPickerAttrs"
          @select="onSelectEmoji"
        />
        <div class="flex justify-content-end gap-2 mt-5">
          <Button
            type="button"
            label="Отмена"
            severity="secondary"
            @click="visible = false"
          />
          <Button
            type="submit"
            label="Сохранить"
            :disabled="submitDisabled"
          />
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
import { emojiPickerAttrs } from '@/common/const';

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
