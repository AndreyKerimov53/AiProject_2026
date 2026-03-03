class User {
  constructor(id, email, password) {
    this.id = id
    this.email = email
    this.password = password
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      console.log(payload)
      state.user = payload
    }
  },
  actions: {
    registerUser({ commit }, { email, password }) {
      // Очищаем предыдущие ошибки
      commit('clearError')
      // Включаем лоадер
      commit('setLoading', true)

      // Имитация запроса к серверу 
      setTimeout(() => {
        try {
          // Успешная регистрация
          const user = new User(1, email, password)
          commit('setUser', user)
          commit('setLoading', false)
          console.log('User registered:', user)
        } catch (error) {
          // Ошибка регистрации
          commit('setLoading', false)
          commit('setError', error.message || 'Registration failed')
          throw error
        }
      }, 2000) 
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  }
}