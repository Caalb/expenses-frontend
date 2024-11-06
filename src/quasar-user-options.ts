import { Notify } from 'quasar'
import './styles/quasar.scss'
import '@quasar/extras/material-icons/material-icons.css'

// To be used on app.use(Quasar, { ... })
export default {
  config: {
    notify: {
      timeout: 3000,
    },
  },
  plugins: {
    Notify,
  },
}
