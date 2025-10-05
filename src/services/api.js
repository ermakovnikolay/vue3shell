// Mock API service for init and submit calls

const mockPageData = {
  page1: {
    title: 'Welcome to Page 1',
    content: 'This is the first page of your journey.',
    timestamp: new Date().toISOString()
  },
  page2: {
    title: 'Page 2 - Getting Started',
    content: 'You are making progress!',
    timestamp: new Date().toISOString()
  },
  page3: {
    title: 'Page 3 - Midway Point',
    content: 'You are halfway through the flow.',
    timestamp: new Date().toISOString()
  },
  page4: {
    title: 'Page 4 - Almost Done',
    content: 'Just one more page to go!',
    timestamp: new Date().toISOString()
  },
  page5: {
    title: 'Page 5 - Completion',
    content: 'Congratulations! You have completed the flow.',
    timestamp: new Date().toISOString()
  }
}

const nextViewMap = {
  page1: '/page2',
  page2: '/page3',
  page3: '/page4',
  page4: '/page5',
  page5: null // Last page, no next view
}

export const initPage = (pageName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: mockPageData[pageName] || { title: 'Unknown Page', content: 'No data available' }
      })
    }, 500) // Simulate network delay
  })
}

export const submitPage = (pageName, formData = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `${pageName} submitted successfully`,
        nextView: nextViewMap[pageName],
        submittedData: formData
      })
    }, 500) // Simulate network delay
  })
}
