<script setup lang="ts">
// import { computed } from "vue";
import Header from "../components/Header.vue";
import Sider from "../components/Sider.vue";
// import { useRoute } from "vue-router";
// import { useI18n } from "vue-i18n";

// const route = useRoute();
// const { t } = useI18n();
// const breadcrumbItems = computed(() =>
//   route.path
//     .split("/")
//     .filter((subPath) => subPath.length > 0)
//     .map((subPath) => t(`menu.${subPath}`))
// );
</script>

<template>
  <n-layout class="h-[100vh]" has-sider>
    <Sider />
    <n-layout>
      <Header class="h-[64px]"></Header>
      <n-layout class="h-[calc(100%-64px)] p-[24px]" :native-scrollbar="false">
        <!-- <n-breadcrumb v-if="breadcrumbItems.length > 1" class="mb-[24px]">
          <n-breadcrumb-item v-for="item in breadcrumbItems">{{
            item
          }}</n-breadcrumb-item>
        </n-breadcrumb> -->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>