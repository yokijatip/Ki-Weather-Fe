import axios from 'axios'

// Buat instance axios untuk cuaca
const weatherApi = axios.create({
  // Get URL from environment variable
  baseURL: process.env.BASE_URL,
  params: {
    key: process.env.MASTER_API_KEY,
    units: 'M',
  },
})

export const weatherService = {
  // Mendapatkan cuaca saat ini berdasarkan nama kota
  async getCurrentWeather(city) {
    try {
      const response = await weatherApi.get('/current', {
        params: {
          q: city,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching weather data:', error)
      throw error
    }
  },

  // Mendapatkan prakiraan cuaca untuk 7 hari berdasarkan nama kota
  async getForecastWeather(city) {
    try {
      const response = await weatherApi.get('/current', {
        params: {
          q: city,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching weather data:', error)
      throw error
    }
  },

  // Mendapatkan cuaca saat ini berdasarkan Koordinart
  async getWeatherByCoords(lat, lon) {
    try {
      const response = await weatherApi.get('/current', {
        params: { lat, lon },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching weather data:', error)
      throw error
    }
  },
}

export default weatherService
