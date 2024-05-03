<template>
  <Chart type="line" :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import useConditionsStore from '@/stores/conditions';
import Chart from 'primevue/chart';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

const conditionsStore = useConditionsStore();
const { filteredConditions: conditions } = storeToRefs(conditionsStore);
const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: conditions.value.map((i) => new Date(i.date)),
    datasets: [
      {
        label: 'Настроение',
        data: conditions.value.map((i) => i.mood),
        fill: false,
        borderColor: documentStyle.getPropertyValue('--primary-400'),
        tension: 0.4,
      },
      {
        label: 'Энергия',
        data: conditions.value.map((i) => i.energy),
        fill: false,
        borderColor: documentStyle.getPropertyValue('--gray-400'),
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };
};
const setChartOptions = () => ({
  maintainAspectRatio: false,
  aspectRatio: 0.6,
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day',
      },
    },
  },
});

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

watch(conditions, () => {
  chartData.value = setChartData();
});
</script>
