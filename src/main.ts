import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const chemToolsApp = createApp(App)

chemToolsApp
  .use(router)
  .mount('#app')
