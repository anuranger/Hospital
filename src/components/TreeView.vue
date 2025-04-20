<template>
  <div>
    <tree-node :node="treeData" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TreeNode from './TreeNode.vue';


export default {
    computed: {
        ...mapState(['treeData']),
    },
    components: { TreeNode },   
};
</script>
