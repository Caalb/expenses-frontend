import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import 'quasar/dist/quasar.sass'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import quasarUserOptions from './quasar-user-options'
import router from './router'

const app = createApp(App).use(Quasar, quasarUserOptions)

app.use(createPinia())
app.use(router)

app.mount('#app')
