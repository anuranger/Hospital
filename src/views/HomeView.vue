<template>
  <TreeView />
  <Clinicians v-if="openClinician && openClinician !== ''" />
</template>

<script>
import TreeView from './../components/TreeView.vue'
import Clinicians from './../components/Clinicians.vue'
import { mapState } from 'vuex'

export default {
  setup(props) {},
  computed: {
    ...mapState(['treeData', 'openClinician']),
  },
  components: {
    Clinicians,
    TreeView,
  },
}
</script>
