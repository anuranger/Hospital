import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "@fortawesome/fontawesome-free/css/all.css";
import  store  from './store';

const app = createApp(App);

app.use(router);

app.use(store);

app.mount('#app');


