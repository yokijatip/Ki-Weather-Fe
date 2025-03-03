<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Layout from './components/Layout.vue'
</script>

<template>
  <!-- Gradient Background -->
  <div class="bg-gradient-to-r from-cyan-300 to-blue-300 min-h-screen">
    <Layout>
      <header>
        <div class="">
          <Navbar />
        </div>
      </header>

      <main>
        <RouterView />
      </main>
    </Layout>
  </div>
</template>

<style scoped></style>
