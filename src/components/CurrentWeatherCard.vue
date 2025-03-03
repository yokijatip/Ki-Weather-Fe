<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Thermometer, ChevronDown } from 'lucide-vue-next'

// State untuk waktu
const currentTime = ref(new Date())
// State untuk dropdown
const isDropdownOpen = ref(false)
const dropdownRef = ref(null)
const dropdownButtonRef = ref(null)
// State untuk unit suhu yang dipilih
const selectedUnit = ref('celsius') // celsius atau fahrenheit

// Format waktu ke 12 jam format dengan AM/PM
const formatTime = (date) => {
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

// Fungsi untuk mengubah unit suhu
const changeUnit = (unit) => {
  selectedUnit.value = unit
  isDropdownOpen.value = false
}

// Handle click outside untuk dropdown
const handleClickOutside = (event) => {
  if (
    isDropdownOpen.value &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target) &&
    !dropdownButtonRef.value.contains(event.target)
  ) {
    isDropdownOpen.value = false
  }
}

// Interval untuk update waktu
let timeInterval

// Setup interval dan event listeners ketika component mounted
onMounted(() => {
  // Update setiap detik
  timeInterval = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)

  // Add click outside listener
  document.addEventListener('click', handleClickOutside)
})

// Cleanup interval dan event listeners ketika component unmounted
onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <!-- Container -->
  <div class="">
    <!-- Card -->
    <div class="bg-white/50 rounded-lg shadow-lg px-4 py-3">
      <!-- Content Card -->
      <div>
        <!-- Header Content -->
        <div class="flex items-center justify-between">
          <!-- Left Content -->
          <div class="flex flex-col items-start justify-evenly gap-1">
            <p class="text-sm text-gray-500">Current Weather</p>
            <!-- Clock -->
            <p class="text-xl text-gray-800 font-semibold">{{ formatTime(currentTime) }}</p>
          </div>
          <!-- Right Content -->
          <div class="relative">
            <!-- Dropdown Satuan Skala Suhu -->
            <button
              ref="dropdownButtonRef"
              @click="isDropdownOpen = !isDropdownOpen"
              class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/60 transition-colors"
            >
              <Thermometer class="w-5 h-5 text-gray-700" />
              <span class="text-gray-700">{{ selectedUnit === 'celsius' ? '°C' : '°F' }}</span>
              <ChevronDown class="w-4 h-4 text-gray-700" />
            </button>

            <!-- Dropdown Menu -->
            <div
              ref="dropdownRef"
              class="absolute right-0 top-full mt-2 w-42 backdrop-blur-md bg-white/50 shadow-lg rounded-lg transition-all duration-300 transform z-30"
              :class="
                isDropdownOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              "
            >
              <ul class="py-2">
                <li>
                  <button
                    @click="changeUnit('celsius')"
                    class="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-white/60 transition-colors"
                    :class="{ 'bg-white/40': selectedUnit === 'celsius' }"
                  >
                    °C (Celsius)
                  </button>
                </li>
                <li>
                  <button
                    @click="changeUnit('fahrenheit')"
                    class="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-white/60 transition-colors"
                    :class="{ 'bg-white/40': selectedUnit === 'fahrenheit' }"
                  >
                    °F (Fahrenheit)
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
