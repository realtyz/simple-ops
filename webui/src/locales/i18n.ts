import { createI18n } from "vue-i18n";
import zhCN from "./zhCN";
import en from "./en";
import { usePreferenceStore } from "@/store/preference";
import { storeToRefs } from "pinia";

export default function (store: ReturnType<typeof usePreferenceStore>) {
  const { locale } = storeToRefs(store);
  const i18n = createI18n({
    locale: locale.value,
    fallbackLocale: "en",
    messages: {
      zhCN,
      en,
    },
  });
  return i18n;
}
