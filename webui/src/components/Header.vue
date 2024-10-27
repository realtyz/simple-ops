<script setup lang="ts">
import {
  SunnyOutline as LightMode,
  MoonOutline as DarkMode,
  SearchOutline as Search,
} from "@vicons/ionicons5";
import { Github } from "@vicons/fa";
import { Translate } from "@vicons/carbon";
import { ApiApp as Apps } from "@vicons/tabler";
import { usePreferenceStore } from "../store/preference";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

const localeOptions = [
  {
    label: "简体中文",
    key: "zhCN",
  },
  {
    label: "English",
    key: "en",
  },
];

const store = usePreferenceStore();
const { theme } = storeToRefs(store);
const { changeTheme, changeLocale } = store;
const i18n = useI18n();

function selectLocale(key: string) {
  i18n.locale.value = key;
  changeLocale(key);
}

function navigateToGithub() {
  window.open("https://github.com/realtyz");
}
</script>

<template>
  <n-layout-header bordered>
    <n-el tag="div" class="flex h-full justify-between items-center">
      <n-button :focusable="false" quaternary class="ml-5">
        <template #icon>
          <n-icon :component="Apps" />
        </template>
      </n-button>

      <n-space size="large" align="center" class="h-full mr-10">
        <n-switch
          :value="theme !== null"
          @update:value="changeTheme"
          size="large"
        >
          <template #checked-icon>
            <n-icon :component="DarkMode" />
          </template>
          <template #unchecked-icon>
            <n-icon :component="LightMode" />
          </template>
        </n-switch>
        <n-dropdown
          trigger="hover"
          :options="localeOptions"
          @select="selectLocale"
        >
          <n-button strong secondary circle>
            <template #icon>
              <n-icon :component="Translate" />
            </template>
          </n-button>
        </n-dropdown>
        <n-button
          strong
          secondary
          circle
          :focusable="false"
          @click="navigateToGithub"
        >
          <template #icon>
            <n-icon :component="Github" />
          </template>
        </n-button>
        <n-input :placeholder="i18n.t('header.search')" round>
          <template #prefix>
            <n-icon :component="Search" />
          </template>
        </n-input>
        <n-avatar size="large" round> ME </n-avatar>
      </n-space>
    </n-el>
  </n-layout-header>
</template>
