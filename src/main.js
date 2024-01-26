import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import 'primeflex/primeflex.css';
import 'primevue/resources/themes/lara-light-indigo/theme.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount('#app');
app.use(PrimeVue);
