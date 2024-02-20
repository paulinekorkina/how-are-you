<template>
  <Calendar
    v-model="date"
    showTime
    showIcon
    iconDisplay="input"
    dateFormat="dd M yy"
    :maxDate="new Date()"
  />
</template>

<script setup>
import Calendar from 'primevue/calendar';
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Date,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const date = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>
