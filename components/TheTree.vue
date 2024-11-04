<template>
  <ul class="flex flex-col gap-2">
    <TreeNode v-for="node in list" :key="node.id" :node />
  </ul>
</template>

<script setup lang="ts">
  import type { TreeNode } from "~/types";
  import file from "./public/mock/task_json.txt?raw";

  const list = useState<TreeNode[]>("json-list", () => JSON.parse(file));
</script>
