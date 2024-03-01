<template>
  <h1>Графики и отчеты</h1>
  <chart-block class="mb-5" />
  <div class="report-block">
    <report-block />
  </div>
</template>

<script setup>
import ChartBlock from '@/modules/charts/ChartBlock.vue';
import ReportBlock from '@/modules/charts/ReportBlock.vue';
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blocks/report-block.scss';
</style>
