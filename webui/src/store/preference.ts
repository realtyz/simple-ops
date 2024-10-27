import { defineStore } from "pinia";
import { ref } from "vue";
import { darkTheme } from "naive-ui";

export const usePreferenceStore = defineStore("preference", {
  state: () => ({
    themeTag: ref("light"),
    menuCollapsed: ref(false),
    locale: ref(navigator.language === "zh-CN" ? "zhCN" : "en"),
  }),
  getters: {
    theme: (state) => (state.themeTag === "light" ? null : darkTheme),
  },
  actions: {
    changeTheme() {
      if (this.themeTag == "light") {
        this.themeTag = "dark";
      } else {
        this.themeTag = "light";
      }
    },
    updateMenuCollapsed(collapsed: boolean) {
      this.menuCollapsed = collapsed;
    },
    changeLocale(locale: string) {
      this.locale = locale;
    },
  },
  persist: {
    storage: localStorage,
    pick: ["themeTag", "locale", "menuCollapsed"],
  },
});
