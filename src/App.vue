<template>
  <app-header />
  <main class="main container">
    <router-view></router-view>
  </main>
  <ConfirmDialog @click.stop></ConfirmDialog>
</template>

<script setup>
import AppHeader from '@/layouts/AppHeader.vue';
import ConfirmDialog from 'primevue/confirmdialog';
</script>

<style lang="scss">
@import '@/assets/scss/app.scss';
</style>
