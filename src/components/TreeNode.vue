<template>
  <div ref="parent">
    <!-- tree nodes -->
    <div class="box">
        <span v-if="node.children.length === 0" class="icon" >
         
      </span>
      <span @click="toggle('top')" v-if="node.children.length" class="icon" >
        <i :class="isOpen ? 'fa fa-minus-square' : 'fas fa-plus-square'"></i>
      </span>
      <span v-if="node.name !== '' && !isEdit" @click="toggle" class="nodeName">{{ node.name }}</span>
      <input v-if="node.name == '' || isEdit" type="text" v-model="inputName" placeholder="Your Name">
        <button v-if="node.name == '' || isEdit" @click="updateNodeAction">Add</button>
      </input>
      <dots-vertical v-if="node.index !== 0" @click="displayFloater($event)" />
      <Options
        v-if="floater"
        :style="boxStyle"
        :name="node.name"
        :index="node.index"
        :closeBox="closeFloater"
        :toggle = "toggle"
        :toggleClinicians = "toggleClinicians"
        :toggleEdit = "toggleEdit"
      />
    </div>
    <ul v-if="isOpen" class="treenode">
      <li v-for="(child, index) in node.children" :key="index">
        <tree-node :node="child" />
      </li>
    </ul>
    
  </div>
  
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import DotsVertical from 'vue-material-design-icons/DotsVertical.vue'
import Options from './Options.vue'
import {mapActions} from 'vuex';

export default {
  name: 'TreeNode',
  props: {
    node: { type: Object, required: true },
  },
  data() {
    return {
      inputName: "", // Bound to the input field
    };
  },
  
  components: {
    TreeNode: () => import('./TreeNode.vue'),
    DotsVertical,
    Options,
  },
  setup(props) {
    const isOpen = ref(false)
    const isEdit = ref(false)

    const toggle = () => {
      isOpen.value = !isOpen.value
    }

    const toggleEdit = () => {
      isEdit.value = !isEdit.value
    }

    // toggle clinicians
    /*const isOpenClini = ref(false)

    const toggleClinicians = () => {
      isOpenClini.value = !isOpenClini.value
    }*/


    const floater = ref(false)
    const boxStyle = ref({})
    const parent = ref(null)


    const displayFloater = (event) => {
      floater.value = !floater.value
      boxStyle.value = {
        top: `${event && event.clientY}px`,
        left: `${event && event.clientX}px`,
      } 
    }

    const closeFloater = (event) => {
      floater.value = false
      }



    if (props.node.name === '') {
      floater.value = !floater.value
    }

    const closeBox = (event) => {
      if (parent.value && !parent.value.contains(event.target)) {
        floater.value = false
      }
    }

    // Add event listener on mount
    onMounted(() => {
      document.addEventListener('click', closeBox)
    })

    // Remove event listener on unmount
    onUnmounted(() => {
      document.removeEventListener('click', closeBox)
    })

    return { isOpen, toggle, floater, displayFloater, boxStyle, parent, closeFloater, toggleEdit, isEdit }
  },
   methods: {
    ...mapActions(["updateNode"]), // Map the Vuex action
    updateNodeAction() {
        this.updateNode({ index: this.node.index, name: this.inputName }).then(()=>{
        if(this.isEdit) {
             this.toggleEdit();
        }
        });
    },
  },
}
</script>

<style scoped>
span {
  cursor: pointer;
  font-weight: bold;
}

.treenode {
  list-style-type: none;
  margin-left: 20px;
}

.box {
  display: grid;
  grid-template-columns: repeat(3, 25px fit-content(100%) 0.5fr);
  
  width: fit-content;
}

.nodeName{
   
    }
</style>
