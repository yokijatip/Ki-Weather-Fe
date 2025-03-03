<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Layout from './components/Layout.vue'
</script>

<template>
  <!-- Gradient Background -->
  <div class="bg-linear-to-bl from-[#6aaefc] to-[#d2c4ba] min-h-screen">
    <Layout>
      <header>
        <div class="">
          <Navbar />
        </div>
      </header>

      <main class="md:my-6">
        <RouterView />
      </main>
    </Layout>
  </div>
</template>

<style scoped></style>
