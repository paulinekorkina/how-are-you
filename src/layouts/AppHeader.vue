<template>
  <header class="header container flex flex-wrap gap-3">
    <router-link :to="{name: 'home'}">
      <Button label="История состояний" icon="pi pi-calendar" outlined />
    </router-link>
    <router-link :to="{name: 'charts-and-reports'}">
        <Button label="Графики и отчеты" icon="pi pi-chart-bar" outlined />
    </router-link>
    <router-link :to="{name: 'condition-create'}" class="lg:ml-auto">
      <Button label="Добавить состояние" />
    </router-link>
  </header>
</template>

<script setup>
import Button from 'primevue/button';
</script>

<style lang="scss" scoped>
@import '@/assets/scss/layout/header.scss';
</style>
