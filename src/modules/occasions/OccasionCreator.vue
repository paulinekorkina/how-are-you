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
            v-model="occasion.name"
            class="flex-auto"
            autocomplete="off"
            maxlength="30"
          />
          <label>Иконка</label>
          <div class="flex-auto">
            {{ occasion.icon }}
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
import useOccasionsStore from '@/stores/occasions';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import EmojiPicker from 'vue3-emoji-picker';
import { emojiPickerAttrs } from '@/common/const';

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

const emit = defineEmits(['update:modelValue', 'selectNewOccasion', 'updateOccasion']);

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
  archive: false,
});

const newOccasion = ref(createNewOccasion());

const occasionToWork = computed(() => (props.occasionToEdit
  ? props.occasionToEdit
  : newOccasion.value));

const occasion = ref(occasionToWork);

const modalHeader = computed(() => (props.occasionToEdit ? 'Редактировать событие' : 'Новое событие'));

const submitDisabled = computed(() => !occasion.value.name || !occasion.value.icon);

function onSelectEmoji(emoji) {
  occasion.value.icon = emoji.i;
}

async function submit() {
  if (props.occasionToEdit) {
    // редактируемое событие
    await occasionsStore.updateOccasion({ ...occasion.value });
    emit('updateOccasion', occasion.value);
  } else {
    // новое событие
    await occasionsStore.addOccasion({ ...occasion.value });
    emit('selectNewOccasion', occasion.value);
    newOccasion.value = createNewOccasion();
  }

  visible.value = false;
}
</script>

<style lang="scss">
@import 'vue3-emoji-picker/css';
@import '@/assets/scss/blocks/occasion-and-emotion-creator.scss';
</style>
