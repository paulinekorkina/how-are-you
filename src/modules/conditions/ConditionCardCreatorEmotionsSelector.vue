<template>
  <div>
    <MultiSelect
      v-model="emotionsSelected"
      :options="emotionsShown"
      filter
      option-label="name"
      placeholder="Выберите эмоции"
      class="w-full md:w-20rem"
      :max-selected-labels="0"
      selected-items-label="Выбрано: {0}"
    >
      <template #option="slotProps">
        {{ slotProps.option.icon }} {{ slotProps.option.name }}
        <span
          class="edit-icon pi pi-pencil ml-auto"
          @click.stop.prevent="openEmotionEditor(slotProps.option)"
        />
        <span
          class="archive-icon pi pi-trash ml-2"
          @click.stop.prevent="confirmArchive(slotProps.option.id)"
        />
      </template>
      <template #footer>
        <div class="py-2 px-3">
          <Button
            label="Создать эмоцию"
            link
            @click="openEmotionCreator"
          />
        </div>
      </template>
    </MultiSelect>
    <div
      v-if="emotionsSelected?.length"
      class="flex flex-wrap gap-2 mt-3"
    >
      <Chip
        v-for="emotion in emotionsSelected"
        :key="emotion.id"
        :label="`${emotion.icon} ${emotion.name}`"
        removable
        @remove="removeEmotion(emotion.id)"
      />
    </div>

    <EmotionCreator
      v-model="visible"
      :emotion-to-edit="emotionToEdit"
      @select-new-emotion="selectNewEmotion"
      @update-emotion="updateEmotion"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import useEmotionsStore from '@/stores/emotions';
import Chip from 'primevue/chip';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import EmotionCreator from '@/modules/emotions/EmotionCreator.vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const emotionsStore = useEmotionsStore();

const confirm = useConfirm();

const emotionsSelected = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const emotionsShown = computed(() => emotionsStore.emotions
  .filter((item) => !item.archive || emotionsSelected.value
    .find(({ id }) => id === item.id)));

const visible = ref(false);
const emotionToEdit = ref(null);

function removeEmotion(emotionId) {
  emotionsSelected.value = emotionsSelected.value.filter(({ id }) => id !== emotionId);
}

function openEmotionEditor(emotion) {
  emotionToEdit.value = { ...emotion };
  visible.value = true;
}

function openEmotionCreator() {
  emotionToEdit.value = null;
  visible.value = true;
}

function selectNewEmotion(newEmotion) {
  emotionsSelected.value.push(newEmotion);
}

function updateEmotion(updatedEmotion) {
  const index = emotionsSelected.value.findIndex(({ id }) => id === updatedEmotion.id);

  if (index >= 0) {
    emotionsSelected.value.splice(index, 1, updatedEmotion);
  }
}

async function archiveEmotion(emotionId) {
  await emotionsStore.archiveEmotion(emotionId);
  emotionsSelected.value = emotionsSelected.value.filter(({ id }) => id !== emotionId);
}

function confirmArchive(emotionId) {
  confirm.require({
    message: 'Удалить эмоцию?',
    header: 'Подтверждение',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Отмена',
    acceptClass: 'ml-3',
    acceptLabel: 'Удалить',
    accept: () => {
      archiveEmotion(emotionId);
    },
  });
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blocks/occasions-and-emotions-selector.scss';
</style>
