<template>
  <app-header />
  <main class="main container">
    <router-view></router-view>
  </main>
</template>

<script setup>
import AppHeader from '@/layouts/AppHeader.vue';
</script>

<style lang="scss">
@import '@/assets/scss/app.scss';
</style>
