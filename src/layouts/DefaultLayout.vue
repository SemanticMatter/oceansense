<template>
  <div class="app">
    <AppHeader />
    <div class="layout-content">
      <RouterView />
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import AppHeader from '../components/layout/AppHeader.vue';
import AppFooter from '../components/layout/AppFooter.vue';
</script>
