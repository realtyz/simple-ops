<script setup lang="ts">
import imgUrl from "@/assets/404.svg?url"
</script>

<template>

  <n-result
    status="404"
    title="404 资源不存在"
    description="生活总归带点荒谬"
    class="h-full"
  >
  <template #icon>
    <n-image
    width="300"
    :src="imgUrl"
  />
    </template>
    <template #footer>
      <n-button>找点乐子吧</n-button>
    </template>
  </n-result>
</template>
