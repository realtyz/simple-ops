import { createApp } from "vue";
import "@/style.css";
import App from "@/App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import naiveui from "naive-ui";
import router from "@/router";
import createI18n from "@/locales/i18n";
import { usePreferenceStore } from "./store/preference";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia);
app.use(naiveui);
app.use(router);

const preferenceStore = usePreferenceStore();
const i18n = createI18n(preferenceStore);
app.use(i18n);

app.mount("#app");
