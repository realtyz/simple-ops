import { createWebHistory, createRouter } from "vue-router";

import MenuLayout from "@/views/MenuLayout.vue";
import NotFound from "@/views/NotFound.vue";
import Dashboard from "@/views/Dashboard.vue";
import PhysicalMachineView from "./views/assets/PhysicalMachineView.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: MenuLayout,
    children: [
      { path: "dashboard", component: Dashboard },
      { path: "assets/physicalMachines", component: PhysicalMachineView },
      { path: "accessControl", component: Dashboard },
      { path: "/:pathMatch(.*)", component: NotFound },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
