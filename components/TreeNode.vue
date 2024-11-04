<template>
  <li
    class="p-2 px-4 ring-1 ring-gray-400 rounded-xl flex justify-between items-center"
    :style="{ 'margin-left': (node.depth - 1) * 20 + 'px' }"
  >
    <div class="flex flex-col gap-y-1">
      <a :href class="text-lg font-bold hover:underline"> {{ label }} </a>
      <span class="text-xs text-slate-400">
        {{ breadcrumbs }}
      </span>
    </div>
    <button v-if="hasChildren" class="ml-2 bg-slate-200 rounded shrink-0 size-8" @click="isOpen = !isOpen">
      {{ isOpen ? "-" : "+" }}
    </button>
  </li>
  <div>
    <Transition name="slide-fade">
      <ul v-if="isOpen && hasChildren" class="flex flex-col gap-y-2">
        <TreeNode v-for="child in node.childs" :key="child.id" :node="child" />
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { getLocaledField } from "~/helpers/getLocaledField";
  import { type TreeNode } from "~/types";

  interface IProps {
    node: TreeNode;
  }

  const props = defineProps<IProps>();
  const label = computed(() => getLocaledField(props.node, "cg_name"));
  const isOpen = ref(false);
  const hasChildren = computed(() => props.node.childs && props.node.childs.length);
  const list = useState<TreeNode[]>("json-list");
  const breadcrumbs = computed(() => {
    const getBreadcrumbLabel = (id: number, index: number, node: TreeNode) => {
      if (index === 0) {
        return getLocaledField(node, "cg_name");
      } else {
        const childNode = node.childs.find((item) => item.id === id);
        return getBreadcrumbLabel(childNode!.id, index - 1, childNode!);
      }
    };

    const rootNode = list.value.find((item) => item.id === props.node.path_to_top[props.node.path_to_top.length - 1])!;
    const breadcrumbs = [...props.node.path_to_top].reverse().map((id, index) => {
      return getBreadcrumbLabel(id, index, rootNode);
    });
    return [...breadcrumbs, label.value].join(" > ");
  });
  const href = computed(() => getLocaledField(props.node, "link"));
</script>
