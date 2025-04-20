import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  treeData: {
    name: 'Hopitals',
    children: [
      { name: 'Hospital A', children: [{ name: 'Department 1', children: [] }, { name: 'Department 1', children: [{ name: 'Disease 1', children: [] }] }] },
      { name: 'Hospital B', children: [{ name: 'Department 1', children: [] }] },
      { name: 'Hospital C', children: [{ name: 'Department 1', children: [] }] }
    ],
  }
};

const treeSlice = createSlice({
  name: 'tree',
  initialState: initialState,
  reducers: {
    updateTree(state, action) {
      state.treeData = action.payload;
    },
  },
});

export const { updateTree } = treeSlice.actions;
export default treeSlice.reducer;
