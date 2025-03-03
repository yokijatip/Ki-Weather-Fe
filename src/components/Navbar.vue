<script setup>
import { Menu, MapPin, Moon, Sun, UserRound, Home, Info, Cloud, Settings } from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'

// State untuk darkMode
const isDarkMode = ref(false)
// State untuk menu
const isMenuOpen = ref(false)
// Refs untuk elements
const menuRef = ref(null)
const menuButtonRef = ref(null)

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

// Fungsi Toggle Menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Handle click outside
const handleClickOutside = (event) => {
  if (
    isMenuOpen.value &&
    menuRef.value &&
    !menuRef.value.contains(event.target) &&
    !menuButtonRef.value.contains(event.target)
  ) {
    isMenuOpen.value = false
  }
}

// Setup event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
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
          <button
            ref="menuButtonRef"
            @click="toggleMenu"
            class="hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <Menu class="text-gray-600" />
          </button>

          <!-- Logo -->
          <div class="mr-12">
            <p class="text-2xl font-semibold text-gray-700 font-oleo ml-2">KiWeather</p>
          </div>

          <!-- Location -->
          <div class="flex items-center space-x-2">
            <!-- Icon Map Pin -->
            <MapPin class="text-gray-700 w-5 h-5" />
            <p class="text-gray-700 text-sm">Bandung, Indonesia</p>
          </div>
        </div>

        <!-- Section 2 (Search Field, ) -->
        <div class="w-96 flex items-center gap-4">
          <!-- Search Field -->
          <div class="w-full flex items-center">
            <input
              type="text"
              placeholder="Search"
              class="w-full px-3 py-2 rounded-md bg-white/40 text-gray-700 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
        </div>

        <!-- Section 3 (Profile, Button Dark Mode) -->
        <div class="flex items-center gap-4">
          <!-- Dark Mode Toggle -->
          <button
            @click="toggleDarkMode"
            class="p-2 rounded-lg hover:bg-white/60 transition-colors"
            :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          >
            <Sun v-if="isDarkMode" class="w-5 h-5 text-gray-700" />
            <Moon v-else class="w-5 h-5 text-gray-700" />
          </button>

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

      <!-- Nav Menu seperti Home, About dll, Pop-up Menu, jadi ketika Hamburger menu di klik baru muncul menu nya -->
      <nav
        ref="menuRef"
        class="absolute left-0 top-full mt-2 w-64 backdrop-blur-md bg-white/50 shadow-lg rounded-lg transition-all duration-300 transform z-30"
        :class="
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        "
      >
        <ul class="py-2">
          <li>
            <router-link
              to="/"
              class="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-white/60 transition-colors"
            >
              <Home class="w-5 h-5" />
              Home
            </router-link>
          </li>
          <li>
            <router-link
              to="/about"
              class="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-white/60 transition-colors"
            >
              <Info class="w-5 h-5" />
              About
            </router-link>
          </li>
          <li>
            <router-link
              to="/forecast"
              class="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-white/60 transition-colors"
            >
              <Cloud class="w-5 h-5" />
              Forecast
            </router-link>
          </li>
          <li>
            <router-link
              to="/settings"
              class="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-white/60 transition-colors"
            >
              <Settings class="w-5 h-5" />
              Settings
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>
