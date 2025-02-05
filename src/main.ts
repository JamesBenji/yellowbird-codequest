import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueFire } from 'vuefire';
import { firebaseApp } from './plugins/vuefire';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(VueFire, { firebaseApp });
// app.use(VueFire, {
//   firebaseApp,
//   modules: [
//     VueFireAuth(),
//   ],
// });
app.use(router);
app.mount('#app');
