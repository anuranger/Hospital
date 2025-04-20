<template>
  <!-- tree node options -->

  <div class="floaterClass">
    <ul class="dropdown-ul">
      <li class="dropdown-item" @click="(toggleEdit(), closeBox())">
        <pencil-outline :size="16" /> Edit Group
      </li>
      <li class="dropdown-item" @click="(addNode(this.$props.index), toggle(), closeBox())">
        <i class="fas fa-plus"></i> Create Child Group
      </li>
      <li class="dropdown-item" @click="(showClinicians(this.$props.index), closeBox())">
        <i class="fas fa-plus"></i> Add / Remove Clinicians
      </li>
      <li class="dropdown-item" @click="removeNode(this.$props.index)">
        <delete :size="16" /> Remove Group
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue'
import PencilOutline from 'vue-material-design-icons/PencilOutline.vue'
import Delete from 'vue-material-design-icons/Delete.vue'
import { mapActions } from 'vuex'

export default {
  props: {
    name: {
      type: Object,
      required: true,
    },
    index: {
      type: String,
      required: true,
    },
    toggle: {
      type: Function,
    },
    toggleClinicians: {
      type: Function,
    },
    toggleEdit: {
      type: Function,
    },
    closeBox: {
      type: Function,
    },
  },
  components: {
    PencilOutline,
    Delete,
  },
  setup(props) {
    const handleOptionClick = (event, index) => {
      console.log(index)
    }

    return {
      // Returning props for template use

      handleOptionClick,
    }
  },
  methods: {
    ...mapActions(['addNode', 'removeNode', 'showClinicians']),
  },
}
</script>

<style scoped>
/* box style */
.floaterClass {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 1000;
  min-width: 150px;
  min-height: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.floaterClass.active {
  visibility: visible;
  transform: scale(1);
}

.dropdown-ul {
  padding: 0px !important;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}
</style>
