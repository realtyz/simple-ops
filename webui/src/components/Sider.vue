<script setup lang="ts">
import { computed, h, type Component } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { NIcon } from "naive-ui";
import {
  SettingsOutline as Settings,
  AccessibilityOutline as Permissions,
} from "@vicons/ionicons5";
import {
  DashboardOutlined as Dashboard,
  PropertySafetyOutlined as Asset,
} from "@vicons/antd";
import logoUrl from "@/assets/vue.svg?url";
import { usePreferenceStore } from "@/store/preference";

const store = usePreferenceStore();
const { updateMenuCollapsed } = store;
const { menuCollapsed } = storeToRefs(store);

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const { t } = useI18n();
const menuOptions = computed(() => [
  {
    label: t("menu.dashboard"),
    key: "/dashboard",
    icon: renderIcon(Dashboard),
  },
  {
    label: t("menu.assets"),
    key: "/assets",
    icon: renderIcon(Asset),
    children: [
      {
        label: t("menu.physicalMachines"),
        key: "/assets/physicalMachines",
      }
    ]
  },
  {
    label: t("menu.accessControl"),
    key: "/accessControl",
    icon: renderIcon(Permissions),
  },
  {
    label: t("menu.settings"),
    key: "/settings",
    icon: renderIcon(Settings),
  },
]);

const router = useRouter();

function clickMenuOption(key: string) {
  router.push(key);
}

const route = useRoute();
</script>

<template>
  <n-layout-sider show-trigger collapse-mode="width" :collapsed="menuCollapsed" :collapsed-width="72" :width="240"
    @collapse="updateMenuCollapsed(true)" @expand="updateMenuCollapsed(false)" bordered :native-scrollbar="false"
    inverted>
    <n-el tag="p" class="flex justify-center items-center p-4">
      <n-image :preview-disabled="true" width="30" :src="logoUrl" />
    </n-el>
    <n-menu :value="route.path" :options="menuOptions" :collapsed="menuCollapsed" :collapsed-width="72"
      :collapsed-icon-size="24" @update:value="clickMenuOption" inverted />
  </n-layout-sider>
</template>
