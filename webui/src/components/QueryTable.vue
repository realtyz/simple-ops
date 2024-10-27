<script lang="ts" setup>
import { RefreshOutline as Refresh } from "@vicons/ionicons5";
import { type PaginationProps, type DataTableColumns, DataTableRowKey } from 'naive-ui';
import { ref, reactive, Ref, onMounted } from 'vue';

type SearchField = {
  key: string
  label: string
  type: string
}

type DataSource = {
  total: number
  data: object[]
}

type DataQuery = (params: any, page: number, pageSize: number) => Promise<DataSource>

const props = defineProps<{
  // 标题
  title: string
  // 表头定义
  columns: DataTableColumns
  // 搜索栏定义
  searchFields: SearchField[]
  // 获取唯一key的方式
  getRowKey: (rowData: any) => string | number,
  // 异步数据获取接口
  query: DataQuery
}>()

const checkedRowKeys = ref<DataTableRowKey[]>([])

// const handleCheck = (rowKeys: DataTableRowKey[]) => {
//   checkedRowKeys.value = rowKeys
// }

const searchParams = reactive(props.searchFields.reduce((res, item) => ({
  ...res,
  [item.key]: ""
}), {} as Record<string, string | null>))

const loading = ref(false)
const rowData: Ref<object[]> = ref([])
const paginationReactive = reactive<PaginationProps>({
  pageSizes: [10, 20, 50],
  defaultPageSize: 10,
  showSizePicker: true,
});

const search = async (page: number | null, pageSize: number | null) => {
  loading.value = true
  const qPage = page || paginationReactive.page || 1
  const qPageSize = pageSize || paginationReactive.pageSize || 10
  const res = await props.query(searchParams, qPage, qPageSize)
  rowData.value = res.data
  paginationReactive.page = qPage
  paginationReactive.pageCount = Math.ceil(res.total / qPageSize)
  paginationReactive.pageSize = qPageSize
  loading.value = false
}

const reset = () => {
  Object.keys(searchParams).forEach(k => searchParams[k] = null)
}

defineExpose({
  reloadTable: search,
  getCheckedKeys: () => checkedRowKeys.value
})

onMounted(() => search(null, null))
</script>

<template>
  <n-card class="mb-6">
    <n-grid x-gap="12" :cols="4">
      <n-grid-item span="3">
        <n-form :show-feedback="false" label-placement="left" ref="formRef" inline :label-width="80" class="mt-2 mb-2">
          <n-grid x-gap="12" y-gap="16" :cols="4">
            <n-grid-item v-for="field in searchFields" :key="field.key">
              <n-form-item :label="field.label">
                <n-input v-model:value="searchParams[field.key]" :placeholder="`请输入${field.label}`" />
              </n-form-item>
            </n-grid-item>
          </n-grid>
        </n-form>
      </n-grid-item>
      <n-grid-item span="1">
        <n-el tag="div" class="flex h-full justify-end items-center">
          <n-space size="large">
            <n-button class="w-[90px]" type="primary" @click="() => search(null, null)">查询</n-button>
            <n-button class="w-[90px]" @click="reset">重置</n-button>
          </n-space>
        </n-el>
      </n-grid-item>
    </n-grid>
  </n-card>
  <n-card>
    <n-el class="flex justify-between items-center mb-5" tag="div">
      <n-el tag="div" class="flex items-center">
        <n-el tag="p" class="ml-3 mr-6 text-xl font-bold">{{ props.title }}</n-el>
        <slot v-if="checkedRowKeys.length > 0" name="checkbox-toolbar" />
      </n-el>

      <n-space size="large">
        <slot name="actions"></slot>
        <n-button :focusable="false" @click="() => search(null, null)" circle quaternary>
          <template #icon>
            <n-icon :component="Refresh" />
          </template>
        </n-button>
      </n-space>
    </n-el>
    <n-data-table remote :row-key="props.getRowKey" :bordered="false" :loading="loading" :columns="columns"
      :data="rowData" :pagination="paginationReactive" @update:page="(page: number) => search(page, null)"
      @update:page-size="(pageSize: number) => search(null, pageSize)" v-model:checked-row-keys="checkedRowKeys" />
  </n-card>
</template>
