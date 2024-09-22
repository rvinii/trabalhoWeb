import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')


// Importar o Pinia
import { createPinia } from 'pinia';

// Importar o Bootstrap CSS e JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);

// Usar o Pinia
app.use(createPinia());
app.use(router);
app.mount('#app');