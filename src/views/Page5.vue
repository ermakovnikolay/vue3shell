<template>
  <div class="page-container">
    <h1>{{ pageTitle }}</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="pageData">
      <p>{{ pageData.content }}</p>
      <p class="timestamp">Loaded at: {{ pageData.timestamp }}</p>
      <button @click="handleContinue" :disabled="submitting">
        {{ submitting ? 'Submitting...' : 'Complete' }}
      </button>
      <p v-if="completed" class="success-message">Flow completed successfully!</p>
    </div>
    <div v-else class="error">Failed to load page data</div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Page5',
  setup() {
    const store = useStore()
    const pageData = ref(null)
    const completed = ref(false)
    const pageTitle = ref('Page 5')

    const loading = computed(() => store.getters.isLoading)
    const submitting = computed(() => store.getters.isSubmitting)

    onMounted(async () => {
      const data = await store.dispatch('initializePage', 'page5')
      if (data) {
        pageData.value = data
        pageTitle.value = data.title
      }
    })

    const handleContinue = async () => {
      const response = await store.dispatch('handleContinue', {
        pageName: 'page5',
        pageData: pageData.value
      })
      if (response && response.success) {
        completed.value = true
      }
    }

    return {
      pageData,
      loading,
      submitting,
      completed,
      pageTitle,
      handleContinue
    }
  }
}
</script>

<style scoped>
.page-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.loading, .error {
  padding: 20px;
  text-align: center;
  color: #666;
}

.timestamp {
  font-size: 12px;
  color: #999;
  margin: 10px 0;
}

button {
  margin-top: 20px;
}

.success-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  border-radius: 4px;
  text-align: center;
}
</style>
