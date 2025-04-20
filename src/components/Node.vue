
<template>
  <div>
    <div>
      <span @click="toggle('top')" >
        <i :class="isOpen.top ? 'fas fa-minus-square' : 'fas fa-plus-square'"></i>
      </span>
    </div>
   <span @click="toggle">{{ JSON.stringify(node) }}</span>
    <ul v-if="isOpen">
      <li v-for="(child, index) in node.children" :key="index">
        <tree-node :node="child" />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    node: { type: Object, required: true },
  },
  components: { TreeNode: () => import('./TreeNode.vue') },
  setup(props) {
    const isOpen = ref(false);

    const toggle = () => {
      isOpen.value = !isOpen.value;
    };

    return { isOpen, toggle };
  },
};
</script>


<style scoped>
ul {
  list-style-type: none;
}

i {
  margin-right: 8px;
}

span {
  cursor: pointer;
}

.boxed-span {
  display:flex;
  align-items: center;

}

.box {
  padding: 2px;
  border: 1px solid;
  width: fit-content;
}
</style>
