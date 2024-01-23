import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import 'primevue/resources/themes/lara-light-indigo/theme.css';

const app = createApp(App);

app.mount('#app');
app.use(PrimeVue);
