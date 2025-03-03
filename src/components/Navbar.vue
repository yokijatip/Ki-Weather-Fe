<script setup>
import { Menu, MapPin, Moon, Sun, UserRound } from 'lucide-vue-next'
import { ref } from 'vue'

// State untuk darkMode
const isDarkMode = ref(false)

// Fungsi Toggle dark Mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value

  // Ubah tema aplikasi berdasarkan state dark mode
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<template>
  <section class="relative">
    <div>
      <!-- Hamburger Menu, Logo, Location, Search Field, Button Dark Mode, Profile -->
      <div
        class="flex items-center justify-between backdrop-blur-md bg-white/50 rounded-lg shadow-lg px-4 py-3"
      >
        <!-- Section 1 (Hamburger Menu, Logo) -->
        <div class="flex items-center gap-2">
          <!-- Hamburger Menu -->
          <button class="">
            <Menu class="text-gray-600" />
          </button>

          <!-- Logo -->
          <div class="mr-12">
            <p class="text-2xl font-semibold text-sky-500 font-oleo ml-2">KiWeather</p>
          </div>

          <!-- Location -->
          <div class="flex items-center space-x-2">
            <!-- Icon Map Pin -->
            <MapPin class="text-gray-700 w-5 h-5" />
            <p class="text-gray-700 text-sm">Bandung, Indonesia</p>
          </div>
        </div>

        <!-- Section 2 (Location, Search Field, Button Dark Mode) -->
        <div class="w-96 flex items-center">
          <!-- Search Field -->
          <div class="w-full flex items-center">
            <input
              type="text"
              placeholder="Search"
              class="w-full px-3 py-2 rounded-md bg-white/40 text-gray-700 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
        </div>

        <!-- Section 3 (Profile) -->
        <div>
          <!-- Profile -->
          <div class="flex items-center gap-4">
            <!-- Image Profile -->
            <div>
              <img class="w-10 h-10 rounded-full" src="../assets/YJP.jpg" alt="" />
            </div>

            <!-- Name Profile -->
            <div>
              <p class="text-gray-800 text-md font-semibold">Yoki Jati Perkasa</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Nav Menu seperti Home, About dll -->
      <nav></nav>
    </div>
  </section>
</template>
