export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      console.log('setUser:', payload)
      state.user = payload
      if (payload) {
        localStorage.setItem('token', payload.token)
        localStorage.setItem('userId', payload.id)
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
      }
    }
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      
      try {
        const response = await fetch('http://localhost:3000/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })
        
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.message || 'Ошибка регистрации')
        }
        
        commit('setUser', {
          id: data.userId,
          email: data.email,
          token: data.token
        })
        commit('setLoading', false)
      } catch (err) {
        commit('setLoading', false)
        commit('setError', err.message || 'Ошибка регистрации')
        throw err
      }
    },
    
    async loginUser({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      
      try {
        const response = await fetch('http://localhost:3000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })
        
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.message || 'Ошибка логина')
        }
        
        commit('setUser', {
          id: data.userId,
          email: data.email,
          token: data.token
        })
        commit('setLoading', false)
      } catch (err) {
        commit('setLoading', false)
        commit('setError', err.message || 'Ошибка логина или пароля')
        throw err
      }
    },
    
    logoutUser({ commit }) {
      commit('setUser', null)
    },
    
    // Проверка токена при загрузке приложения
    checkAuth({ commit }) {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      
      if (token && userId) {
        commit('setUser', {
          id: userId,
          token: token
        })
      }
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    isUserLoggedIn(state) {
      return state.user !== null
    }
  }
}