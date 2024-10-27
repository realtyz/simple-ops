<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePreferenceStore } from "./store/preference";
import { zhCN, enUS, dateZhCN, dateEnUS } from "naive-ui"

const store = usePreferenceStore();
const { theme, locale } = storeToRefs(store);

</script>

<template>
  <n-config-provider :theme="theme" :locale="locale === 'zhCN' ? zhCN : enUS"
    :date-locale="locale === 'zhCN' ? dateZhCN : dateEnUS">
    <RouterView />
  </n-config-provider>
</template>

<style scoped></style>
