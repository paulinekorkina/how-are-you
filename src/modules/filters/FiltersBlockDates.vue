<template>
  <div>
    <span>С</span>
    <Calendar
      v-model="dateFrom"
      showTime
      iconDisplay="input"
      dateFormat="dd.mm.y"
    />
    <span>по</span>
    <Calendar
      v-model="dateTo"
      showTime
      iconDisplay="input"
      dateFormat="dd.mm.y"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Calendar from 'primevue/calendar';
import useConditionsStore from '@/stores/conditions';
import useFiltersStore from '@/stores/filters';

const conditionsStore = useConditionsStore();
const filtersStore = useFiltersStore();

const dateFrom = computed({
  get() {
    return filtersStore.dateFrom || conditionsStore.getMinDate;
  },
  set(value) {
    filtersStore.applyFilters({ item: value, entity: 'dateFrom' });
  },
});

const dateTo = computed({
  get() {
    return filtersStore.dateTo || conditionsStore.getMaxDate;
  },
  set(value) {
    filtersStore.applyFilters({ item: value, entity: 'dateTo' });
  },
});

</script>

<style lang="scss" scoped>
:deep(.p-calendar .p-inputtext) {
  width: 140px;
}
</style>
