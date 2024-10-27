import axios from "axios";
import enableMock from "./mock";

const env = import.meta.env.VITE_ENV;

const instance = axios.create({
  baseURL: "/",
  timeout: 1000,
  headers: {},
});

if (env === "development") enableMock(instance);

export default {
  getMenu: () => instance.get("/api/menu"),
  getPhysicalMachines: () => instance.get("/api/physicalMachines"),
};
