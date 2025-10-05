import { createStore } from 'vuex'
import { initPage, submitPage } from '../services/api'
import router from '../router'

export default createStore({
  state: {
    pageData: {},
    loading: false,
    submitting: false
  },
  mutations: {
    SET_PAGE_DATA(state, { page, data }) {
      state.pageData[page] = data
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_SUBMITTING(state, submitting) {
      state.submitting = submitting
    }
  },
  actions: {
    setPageData({ commit }, payload) {
      commit('SET_PAGE_DATA', payload)
    },
    async initializePage({ commit }, pageName) {
      commit('SET_LOADING', true)
      try {
        const response = await initPage(pageName)
        if (response.success) {
          commit('SET_PAGE_DATA', { page: pageName, data: response.data })
          return response.data
        }
        return null
      } catch (error) {
        console.error('Error loading page:', error)
        return null
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async handleContinue({ commit }, { pageName, pageData }) {
      commit('SET_SUBMITTING', true)
      try {
        const response = await submitPage(pageName, { pageData })
        if (response.success && response.nextView) {
          router.push(response.nextView)
        } else if (!response.nextView) {
          console.log('Flow completed - this is the last page')
        }
        return response
      } catch (error) {
        console.error('Error submitting page:', error)
        return null
      } finally {
        commit('SET_SUBMITTING', false)
      }
    }
  },
  getters: {
    getPageData: (state) => (page) => {
      return state.pageData[page]
    },
    isLoading: (state) => state.loading,
    isSubmitting: (state) => state.submitting
  }
})
