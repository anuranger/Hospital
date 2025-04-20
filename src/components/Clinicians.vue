<template>
  <div class="box-clinic">
    <h3>Clinicians in group</h3>
    <p>{{ clinicians?.length }} of {{ clinicians?.length }} records displayed</p>
    <input v-model="searchQuery" placeholder="Find" />
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Remove from Group</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(clinician, index) in filteredClinicians" :key="index">
          <td>{{ clinician }}</td>
          <td>
            <button @click="deleteClinician(index)">
              <delete :size="16" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>


    <!-- Add -->

     <button v-if="!show" :style="{ color: 'blue', padding: '10px', borderRadius: '5px', marginTop: '20px' }" @click="showAddSection">
        Add Clinician
    </button>
     <button v-if="!show" :style="{ color: 'blue', padding: '10px', borderRadius: '5px', marginTop: '20px' }" @click="showClinicians('')">
        Close
    </button>
    <div :style="{ display: 'flex', gap: '10px', marginTop: '20px' }">
     <input v-if="show" type="text" v-model="inputName" placeholder="Name">
        <button v-if="show" @click="updateNodeAction()" class="buttonAdd">Add</button>
      </input>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Delete from 'vue-material-design-icons/Delete.vue'
import { mapState, mapActions } from 'vuex'
import { useStore } from 'vuex'

export default {
  name: 'Clinicians',
  computed: {
    ...mapState(['treeData', 'openClinician']),
  },
   data() {
    return {
      inputName: "", // Bound to the input field
    };
  },
  setup(props) {
    const store = useStore();

    // Map Vuex state to local computed properties
    let treeData = computed(() => store.state.treeData)
    let openClinician = computed(() => store.state.openClinician)

    
    let clinicians = ref([]);
    const findClinicians = () => {
      const find = (nodes) => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].index === openClinician.value) {
            clinicians.value = [...nodes[i]?.clinicians?.people || []]
            console.log( clinicians.value);
            return true
          }
          if (nodes[i].children && nodes[i].children.length > 0) {
            let found = find(nodes[i].children)
            if (found) return true
          }
        }
        return false
      }
      find(treeData.value.children)
    }

    findClinicians()
    const searchQuery = ref('')

    const filteredClinicians = computed(() =>
      clinicians.value.filter((clinician) =>
        clinician.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );

 
    let show = ref(false);

    const showAddSection = () => {
        show.value = !show.value;
    }

    return {
      clinicians,
      searchQuery,
      filteredClinicians,
      showAddSection,
        show,
findClinicians
    }
  },
  components: {
    Delete,
  },
   methods: {
    ...mapActions(["addClinician", "removeClinician", "showClinicians"]),
     updateNodeAction() {
        this.addClinician({ index: this.openClinician, name: this.inputName }).then(()=>{
            this.findClinicians()
            this.inputName= "";
            this.showAddSection();
        });

    },
      deleteClinician(index) {
        this.removeClinician({ index: this.openClinician, removeIndex: index}).then(()=>{
           this.findClinicians()
        });

    }
    }
}
</script>

<style>
.box-clinic {
  border: 1px solid;
  margin-top: 30px;
  width: 60%;
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

img {
  width: 20px;
  height: 20px;
}

.buttonAdd {
    border: 1px solid;
    padding: 2px;
    text-align: center;
}
</style>
