<template>
  <h1>Графики и отчеты</h1>
  <FiltersBlock />
  <ChartBlock class="mb-5" />
  <ReportBlock />
</template>

<script setup>
import ChartBlock from '@/modules/charts/ChartBlock.vue';
import ReportBlock from '@/modules/charts/ReportBlock.vue';
import FiltersBlock from '@/modules/filters/FiltersBlock.vue';
</script>
