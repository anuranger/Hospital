import { createStore } from 'vuex'

const store = createStore({
  state: {
    treeData: {
      name: 'Hospitals',
      index: 0,
      children: [
        {
          name: 'Hospital A',
          index: 'child_1',
          clinicians: {
            people: ['Person A', 'Anita Berge', 'Person C'],
            isOpen: false,
          },
          children: [
            { name: 'Department 1', children: [], index: 'child_1_1' },
            {
              name: 'Department 2',
              index: 'child_1_2',
              children: [{ name: 'Disease 1', index: 'child_1_2_1', children: [] }],
            },
          ],
        },
        {
          name: 'Hospital B',
          index: 'child_2',
          children: [{ name: 'Department 1', index: 'child_2_1', children: [] }],
        },
        {
          name: 'Hospital C',
          index: 'child_3',
          children: [{ name: 'Department 1', index: 'child_3_1', children: [] }],
        },
      ],
    },
    openClinician: '',
  },
  mutations: {
    addNode(state, parentIndex) {
      // Recursive function to find the parent and add a new node
      const findAndAddNode = (nodes) => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].index === parentIndex) {
            nodes[i].children.push({
              name: '',
              index: `${parentIndex}_${nodes[i].children.length}`,
              children: [],
            })
            return true
          }
          if (nodes[i].children && nodes[i].children.length > 0) {
            let found = findAndAddNode(nodes[i].children)
            if (found) return true
          }
        }

        return false
      }

      findAndAddNode(state.treeData.children)
    },
    updateNode(state, { index, name }) {
      // Recursive function to find the parent and add a new node
      const findAndAddNode = (nodes) => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].index === index) {
            nodes[i].name = name
            return true
          }
          if (nodes[i].children && nodes[i].children.length > 0) {
            let found = findAndAddNode(nodes[i].children)
            if (found) return true
          }
        }

        return false
      }

      findAndAddNode(state.treeData.children)
    },
    removeNode(state, index) {
      function findInChild(nodes) {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].index === index) {
            nodes.splice(i, 1)
            return true
          }

          if (nodes[i].children && nodes[i].children.length > 0) {
            let found = findInChild(nodes[i].children)
            if (found) return true
          }
        }
        return false
      }
      findInChild(state.treeData.children, index)
    },
    addClinician(state, { index, name }) {
      const findAndAddNode = (nodes) => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].index === index) {
            if (nodes[i]?.clinicians?.people.length > 0) {
              nodes[i].clinicians.people.push(name)
            } else {
              nodes[i].clinicians = {
                people: [name],
                isOpen: false,
              }
            }

            return true
          }
          if (nodes[i].children && nodes[i].children.length > 0) {
            let found = findAndAddNode(nodes[i].children)
            if (found) return true
          }
        }

        return false
      }
      findAndAddNode(state.treeData.children)
    },
    removeClinician(state, { index, removeIndex }) {
      const findAndAddNode = (nodes) => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].index === index) {
            if (nodes[i]?.clinicians?.people.length > 0) {
              nodes[i].clinicians.people.splice(removeIndex, 1)
            }

            return true
          }
          if (nodes[i].children && nodes[i].children.length > 0) {
            let found = findAndAddNode(nodes[i].children)
            if (found) return true
          }
        }

        return false
      }
      findAndAddNode(state.treeData.children)
    },
    showClinicians(state, index) {
      state.openClinician = index
    },
  },
  actions: {
    addNode({ commit }, payload) {
      commit('addNode', payload)
    },
    updateNode({ commit }, payload) {
      commit('updateNode', payload)
    },
    removeNode({ commit }, index) {
      commit('removeNode', index)
    },
    addClinician({ commit }, index) {
      commit('addClinician', index)
    },
    showClinicians({ commit }, index) {
      commit('showClinicians', index)
    },
    removeClinician({ commit }, payload) {
      commit('removeClinician', payload)
    },
  },
})

export default store
