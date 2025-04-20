
<template>
  <div>
    <div class="box">
      <span @click="toggle('top')">
        <i :class="isOpen.top ? 'fa fa-minus' : 'fas fa-plus'"></i>
      </span>
    </div>
    <ul>
      <li>
        <span @click="toggle('hospitalA')">
          <i class="fas fa-hospital"></i> Hospital A
        </span>
        <ul v-if="isOpen.hospitalA">
          <li>
            <span @click="toggle('shoulder')">
              <i class="fas fa-procedures"></i> Shoulder
            </span>
          </li>
          <li>
            <span @click="toggle('knee')">
              <i class="fas fa-procedures"></i> Knee
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const isOpen = reactive({
      hospitalA: true,
      shoulder: false,
      knee: false
    });


  

    const toggle = (section) => {
      isOpen[section] = !isOpen[section];
    };

    return {
      isOpen,
      toggle,
    };
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

.box {
  padding: 2px;
  border: 1px solid;
  width: fit-content;
}
</style>
