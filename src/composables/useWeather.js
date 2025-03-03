import { ref, computed } from 'vue'
import weatherService from '../services/weatherService'

export function useWeather() {
  const currentWeather = ref(null)
  const forecast = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const lastUpdated = ref(null)

  // Suhu dalam celcius default dari API
  const temperature = computed(() => {
    if (!currentWeather.value) return null
    return Math.round(currentWeather.value.main.temp)
  })

  // Kondisi Cuaca
  const weatherCondition = computed(() => {
    if (!currentWeather.value) return null
    return currentWeather.value.weather[0].main
  })

  // Deskripsi Cuaca
  const weatherDescription = computed(() => {
    if (!currentWeather.value) return null
    return currentWeather.value.weather[0].description
  })

  // Icon cuaca
  const weatherIcon = computed(() => {
    if (!currentWeather.value) return null
    const iconCode = currentWeather.value.weather[0].icon
    return `http://openweathermap.org/img/w/${iconCode}.png`
  })

  // Kelembaban
  const humidity = computed(() => {
    if (!currentWeather.value) return null
    return currentWeather.value.main.humidity
  })

  // Kecepatan angin
  const windSpeed = computed(() => {
    if (!currentWeather.value) return null
    return currentWeather.value.wind.speed
  })

  // Mendapatkan cuaca saat ini berdasarkan nama kota
  const fetchWeather = async (city) => {
    if (!city) return

    loading.value = true
    error.value = null

    try {
      currentWeather.value = await weatherService.getCurrentWeather(city)
      lastUpdated.value = new Date()
    } catch (err) {
      error.value = 'Gagal mendapatkan data cuaca. Periksa nama kota dan coba lagi.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Mendapatkan prakiraan cuaca untuk 5 hari
  const fetchForecast = async (city) => {
    if (!city) return

    loading.value = true
    error.value = null

    try {
      forecast.value = await weatherService.getForecast(city)
    } catch (err) {
      error.value = 'Gagal mendapatkan data prakiraan cuaca.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Mendapatkan cuaca berdasarkan lokasi saat ini
  const fetchWeatherByCurrentLocation = async () => {
    loading.value = true
    error.value = null

    try {
      // Minta izin untuk mengakses lokasi pengguna
      if (!navigator.geolocation) {
        throw new Error('Geolocation tidak didukung oleh browser Anda')
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      const { latitude, longitude } = position.coords
      currentWeather.value = await weatherService.getWeatherByCoords(latitude, longitude)
      lastUpdated.value = new Date()
    } catch (err) {
      error.value = 'Gagal mendapatkan lokasi atau data cuaca.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Format tanggal dari UNIX timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return ''
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
}

export default useWeather
