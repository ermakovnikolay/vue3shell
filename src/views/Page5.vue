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
export default {
  name: 'Page5',
  data() {
    return {
      pageData: null,
      completed: false,
      pageTitle: 'Page 5'
    }
  },
  computed: {
    loading() {
      return this.$store.getters.isLoading
    },
    submitting() {
      return this.$store.getters.isSubmitting
    }
  },
  async mounted() {
    const data = await this.$store.dispatch('initializePage', 'page5')
    if (data) {
      this.pageData = data
      this.pageTitle = data.title
    }
  },
  methods: {
    async handleContinue() {
      const response = await this.$store.dispatch('handleContinue', {
        pageName: 'page5',
        pageData: this.pageData
      })
      if (response && response.success) {
        this.completed = true
      }
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
