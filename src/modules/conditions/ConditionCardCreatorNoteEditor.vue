<template>
  <Textarea
    v-model="note"
    rows="5"
    cols="30"
    maxlength="1000"
  />
</template>

<script setup>
import Textarea from 'primevue/textarea';
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const note = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>
