<template>
  <div class="page-container">
    <h1>{{ pageTitle }}</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="pageData">
      <p>{{ pageData.content }}</p>
      <p class="timestamp">Loaded at: {{ pageData.timestamp }}</p>
      <button @click="handleContinue" :disabled="submitting">
        {{ submitting ? 'Submitting...' : 'Continue' }}
      </button>
    </div>
    <div v-else class="error">Failed to load page data</div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Page1',
  setup() {
    const store = useStore()
    const pageData = ref(null)
    const pageTitle = ref('Page 1')

    const loading = computed(() => store.getters.isLoading)
    const submitting = computed(() => store.getters.isSubmitting)

    onMounted(async () => {
      const data = await store.dispatch('initializePage', 'page1')
      if (data) {
        pageData.value = data
        pageTitle.value = data.title
      }
    })

    const handleContinue = async () => {
      await store.dispatch('handleContinue', {
        pageName: 'page1',
        pageData: pageData.value
      })
    }

    return {
      pageData,
      loading,
      submitting,
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
</style>
