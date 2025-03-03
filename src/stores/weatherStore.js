import weatherService from '@/services/weatherService'
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    currentWeather: null,
    forecast: null,
    loading: false,
    error: null,
    searchHistory: [],
    selectedCity: '',
    lastUpdated: null,
  }),

  getters: {
    temperature: (state) => {
      if (!state.currentWeather) return null
      return Math.round(state.currentWeather.main.temp)
    },

    weatherCondition: (state) => {
      if (!state.currentWeather) return null
      return state.currentWeather.weather[0].main
    },

    weatherIcon: (state) => {
      if (!state.currentWeather) return null
      const iconCode = state.currentWeather.weather[0].icon
      return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    },

    // Detail tambahan
    feelsLike: (state) => {
      if (!state.currentWeather) return null
      return Math.round(state.currentWeather.main.feels_like)
    },

    humidity: (state) => {
      if (!state.currentWeather) return null
      return state.currentWeather.main.humidity
    },

    windSpeed: (state) => {
      if (!state.currentWeather) return null
      return state.currentWeather.wind.speed
    },

    cityName: (state) => {
      if (!state.currentWeather) return ''
      return state.currentWeather.name
    },

    countryCode: (state) => {
      if (!state.currentWeather) return ''
      return state.currentWeather.sys.country
    },

    // Formatted data & time
    formattedLastUpdated: (state) => {
      if (!state.lastUpdated) return ''
      return new Date(state.lastUpdated).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      })
    },

    // Process forecast data for better use in components
    processedForecast: (state) => {
      if (!state.forecast) return []

      const dailyData = {}
      const today = new Date().setHours(0, 0, 0, 0)

      // Group forecasts by day
      state.forecast.list.forEach((item) => {
        const date = new Date(item.dt * 1000)
        const day = date.setHours(0, 0, 0, 0)

        // Skip today
        if (day === today) return

        if (!dailyData[day]) {
          dailyData[day] = {
            date: day,
            items: [],
          }
        }

        dailyData[day].items.push(item)
      })

      // Process each day data
      return Object.values(dailyData)
        .map((day) => {
          const temps = day.items.map((item) => item.main.temp)
          const maxTemp = Math.max(...temps)
          const minTemp = Math.min(...temps)

          // Get mid-day forecast as representative
          const midDayForecast =
            day.items.find((item) => {
              const hour = new Date(item.dt * 1000).getHours()
              return hour >= 11 && hour <= 14
            }) || day.items[0]

          return {
            date: new Date(day.date),
            maxTemp: Math.round(maxTemp),
            minTemp: Math.round(minTemp),
            icon: `https://openweathermap.org/img/wn/${midDayForecast.weather[0].icon}@2x.png`,
            description: midDayForecast.weather[0].description,
            wind: midDayForecast.wind.speed,
            humidity: midDayForecast.main.humidity,
          }
        })
        .sort((a, b) => a.date - b.date)
        .slice(0, 5) // Take next 5 days
    },
  },

  actions: {
    async fetchWeather(city) {
      if (!city) return

      this.loading = true
      this.error = null
      this.selectedCity = city

      try {
        this.currentWeather = await weatherService.getCurrentWeather(city)
        this.lastUpdated = new Date()

        // Add to search history if not already there
        if (!this.searchHistory.includes(city)) {
          this.searchHistory.unshift(city)
          // Keep only last 5 searches
          this.searchHistory = this.searchHistory.slice(0, 5)
        }

        // Save to localStorage
        this.saveToLocalStorage()
      } catch (error) {
        this.error = 'Gagal mendapatkan data cuaca. Periksa nama kota dan coba lagi.'
        console.error('Error in fetchWeather:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchForecast(city) {
      if (!city) return

      this.loading = true
      this.error = null

      try {
        this.forecast = await weatherService.getForecast(city)
      } catch (error) {
        this.error = 'Gagal mendapatkan data prakiraan cuaca.'
        console.error('Error in fetchForecast:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchWeatherAndForecast(city) {
      await this.fetchWeather(city)
      if (!this.error) {
        await this.fetchForecast(city)
      }
    },

    async fetchWeatherByCurrentLocation() {
      this.loading = true
      this.error = null

      try {
        // Request permission for user's location
        if (!navigator.geolocation) {
          throw new Error('Geolocation tidak didukung oleh browser Anda')
        }

        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })

        const { latitude, longitude } = position.coords
        this.currentWeather = await weatherService.getWeatherByCoords(latitude, longitude)
        this.lastUpdated = new Date()
        this.selectedCity = this.currentWeather.name

        // Fetch forecast after getting current weather
        await this.fetchForecast(this.currentWeather.name)

        // Save to localStorage
        this.saveToLocalStorage()
      } catch (error) {
        this.error = 'Gagal mendapatkan lokasi atau data cuaca.'
        console.error('Error in fetchWeatherByCurrentLocation:', error)
      } finally {
        this.loading = false
      }
    },

    // Save data to localStorage
    saveToLocalStorage() {
      try {
        localStorage.setItem('weatherApp_city', this.selectedCity)
        localStorage.setItem('weatherApp_history', JSON.stringify(this.searchHistory))
      } catch (error) {
        console.error('Failed to save to localStorage:', error)
      }
    },

    // Load data from localStorage
    loadFromLocalStorage() {
      try {
        const savedCity = localStorage.getItem('weatherApp_city')
        const savedHistory = localStorage.getItem('weatherApp_history')

        if (savedHistory) {
          this.searchHistory = JSON.parse(savedHistory)
        }

        if (savedCity) {
          this.fetchWeatherAndForecast(savedCity)
        }
      } catch (error) {
        console.error('Failed to load from localStorage:', error)
      }
    },
  },
})

export default useWeatherStore
