export default {
  state: {
    ads: []
  },
  mutations: {
    createAd(state, payload) {
      // Добавляем id для совместимости с фронтендом
      const adWithId = { ...payload, id: payload._id }
      state.ads.push(adWithId)
    },
    loadAds(state, payload) {
      // Добавляем id для каждого объявления
      const adsWithId = payload.map(ad => ({ ...ad, id: ad._id }))
      state.ads = adsWithId
    },
    updateAd(state, { title, desc, id }) {
      const ad = state.ads.find(a => a.id === id || a._id === id)
      if (ad) {
        ad.title = title
        ad.desc = desc
      }
    }
  },
  actions: {
    // Загрузить все объявления из БД
    async fetchAds({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/api/ads')
        const ads = await response.json()
        commit('loadAds', ads)
      } catch (err) {
        console.error('Ошибка загрузки:', err)
      }
    },
    
    // Создать объявление в БД с картинкой
    async createAd({ commit, getters }, formData) {
      commit('clearError')
      commit('setLoading', true)
      
      try {
        const token = getters.user?.token || localStorage.getItem('token')
        const userId = getters.user?.id
        
        if (!token || !userId) {
          throw new Error('Пользователь не авторизован')
        }
        
        // Добавляем userId в formData
        formData.append('userId', userId)
        
        const response = await fetch('http://localhost:3000/api/ads', {
          method: 'POST',
          headers: {
            'x-auth-token': token
          },
          body: formData
        })
        
        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Ошибка создания')
        }
        
        const ad = await response.json()
        commit('createAd', ad)
        commit('setLoading', false)
        return ad
      } catch (err) {
        console.error('Ошибка:', err)
        commit('setLoading', false)
        commit('setError', err.message || 'Ошибка создания объявления')
        throw err
      }
    },
    
    // Обновить объявление в БД
    async updateAd({ commit, getters }, { title, desc, id }) {
      commit('clearError')
      commit('setLoading', true)
      
      try {
        const token = getters.user?.token || localStorage.getItem('token')
        
        const response = await fetch(`http://localhost:3000/api/ads/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          },
          body: JSON.stringify({ title, desc })
        })
        
        if (!response.ok) {
          throw new Error('Ошибка обновления')
        }
        
        commit('updateAd', { title, desc, id })
        commit('setLoading', false)
      } catch (err) {
        commit('setLoading', false)
        commit('setError', 'Ошибка редактирования объявления')
        throw new Error('Упс... Ошибка редактирования объявления')
      }
    }
  },
  getters: {
    ads(state) {
      return state.ads
    },
    promoAds(state) {
      return state.ads.filter(ad => ad.promo === true)
    },
    myAds(state, getters) {
      if (!getters.user) return []
      // Приводим к строке для корректного сравнения
      const currentUserId = String(getters.user.id)
      return state.ads.filter(ad => {
        return String(ad.userId) === currentUserId
      })
    },
    adById(state) {
      return id => {
        return state.ads.find(ad => ad.id === id || ad._id === id)
      }
    }
  }
}