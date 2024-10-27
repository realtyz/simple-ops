<script setup lang="ts">
import Table from "@/components/QueryTable.vue";
import { h, ref } from "vue";
import { NSpace, NButton, type DataTableColumns } from "naive-ui";
import requests from "@/api/requests";

type Row = {
    id: string
    hostname: string;
    oobIp: string;
    inbIps: string;
};

const searchFields = [
    {
        key: "hostname",
        label: "主机名",
        type: "text",
    },
    {
        key: "oobIp",
        label: "带外IP",
        type: "text",
    },
]

const columns: DataTableColumns = [
    {
        type: "selection",
        fixed: "left"
    },
    {
        title: "ID",
        key: "id",
    },
    {
        title: "主机名",
        key: "hostname",
    },
    {
        title: "管理IP",
        key: "oobIp",
    },
    {
        title: "业务IP",
        key: "inbIps",
    },
    {
        title: "操作",
        key: "actions",
        render: (rawData, index) =>
            h(NSpace, { size: "small" }, () => [
                h(
                    NButton,
                    {
                        quaternary: true,
                        type: "info",
                    },
                    { default: () => "查看" }
                ),
                h(
                    NButton,
                    {
                        quaternary: true,
                        type: "error",
                    },
                    { default: () => "删除" }
                ),
            ]),
    },
];

const req = (params: any, page: number, pageSize: number) => {
    console.log(params, page, pageSize)
    return requests.getPhysicalMachines().then(res => res.data)
}

const tableRef = ref<InstanceType<typeof Table>>()
const batchDelete = () => {
    console.log(tableRef.value?.getCheckedKeys())
}
</script>

<template>
    <n-grid x-gap="24" :cols="10">
        <n-grid-item span="2">
            <n-card class="h-full"></n-card>
        </n-grid-item>
        <n-grid-item span="8">
            <Table title="主机列表" :get-row-key="(row: Row) => row.id" :query="req" :search-fields="searchFields"
                :columns="columns" ref="tableRef">
                <template #checkbox-toolbar>
                    <n-space size="large">
                        <n-button quaternary type="error" @click="batchDelete">批量删除</n-button>
                    </n-space>
                </template>
                <template #actions>
                    <n-space size="large">
                        <n-button tertiary type="primary">添加主机</n-button>
                        <n-button tertiary type="primary">批量导入</n-button>
                    </n-space>
                </template>
            </Table>
        </n-grid-item>
    </n-grid>
</template>
