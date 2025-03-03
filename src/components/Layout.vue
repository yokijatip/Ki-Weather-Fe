<script setup>
// Menggunakan Tailwind CSS untuk mengatur padding/margin berdasarkan ukuran layar
const containerClass = [
  'min-h-screen', // Minimal tinggi layar penuh
  'flex', // Flexbox untuk layout
  'flex-col', // Kolom utama (header, main, footer)
]

const contentClass = [
  'flex-1', // Konten utama akan mengisi sisa ruang
  'p-2', // Padding default
  'sm:p-2', // Padding untuk layar kecil
  'md:p-4', // Padding untuk layar medium
  'lg:p-6', // Padding untuk layar besar
  'xl:px-24 py-6', // Padding untuk layar extra besar
  '2xl:px-82 py-6', // Padding untuk layar sangat besar
]
</script>

<template>
  <div :class="containerClass">
    <main :class="contentClass">
      <slot />
    </main>
  </div>
</template>
