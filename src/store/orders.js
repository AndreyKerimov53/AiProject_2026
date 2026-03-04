export default {
  state: {
    orders: []
  },
  mutations: {
  },
  actions: {
    async createOrder({ commit }, { name, phone, adId, userId }) {
      console.log(name)
      console.log(phone)
      console.log(adId)
      console.log(userId)
      commit('clearError')
      
      let isRequestOk = true
      let promise = new Promise(function(resolve) {
        setTimeout(() => resolve('Done'), 3000)
      })
      
      if (isRequestOk) {
        await promise.then(() => {

        })
      } else {
        await promise.then(() => {
          commit('setError', 'Ошибка создания заказа')
          throw new Error('Упс... Ошибка создания заказа')
        })
      }
    }
  },
  getters: {
  }
}