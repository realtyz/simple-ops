import MockAdapter from "axios-mock-adapter";
import type { AxiosInstance } from "axios";

export default function (instance: AxiosInstance) {
  const mock = new MockAdapter(instance, { delayResponse: 500 });

  mock.onGet("/api/menu").reply(200, {
    menu: [{ key: "home", label: "主页", icon: "HomeOutline" }],
  });

  mock.onGet("/api/physicalMachines").reply(200, {
    total: 100,
    data: [
      {
        id: "1",
        hostname: "测试",
        oobIp: "10.17.111.12",
        inbIps: "10.44.207.29",
      },
      {
        id: "2",
        hostname: "测试",
        oobIp: "10.17.111.12",
        inbIps: "10.44.207.29",
      },
      {
        id: "3",
        hostname: "测试",
        oobIp: "10.17.111.12",
        inbIps: "10.44.207.29",
      },
      {
        id: "4",
        hostname: "测试",
        oobIp: "10.17.111.12",
        inbIps: "10.44.207.29",
      },
      {
        id: "5",
        hostname: "测试",
        oobIp: "10.17.111.12",
        inbIps: "10.44.207.29",
      },
      {
        id: "6",
        hostname: "测试",
        oobIp: "10.17.111.12",
        inbIps: "10.44.207.29",
      },
      {
        id: "7",
        hostname: "测试",
        oobIp: "10.17.111.12",
        inbIps: "10.44.207.29",
      },
      {
        id: "8",
        hostname: "测试",
        oobIp: "10.17.111.12",
        inbIps: "10.44.207.29",
      },
      {
        id: "9",
        hostname: "测试",
        oobIp: "10.17.111.12",
        inbIps: "10.44.207.29",
      },
      {
        id: "10",
        hostname: "测试",
        oobIp: "10.17.111.12",
        inbIps: "10.44.207.29",
      }
    ],
  });
}
