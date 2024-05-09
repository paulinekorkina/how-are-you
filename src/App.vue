<template>
  <app-header />
  <main class="main container">
    <router-view v-slot="{ Component }">
      <transition name="view" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <ConfirmDialog @click.stop></ConfirmDialog>
</template>

<script setup>
import AppHeader from '@/layouts/AppHeader.vue';
import ConfirmDialog from 'primevue/confirmdialog';
</script>

<style lang="scss">
@import '@/assets/scss/app.scss';
@import '@/assets/scss/animations/animations.scss';
</style>
