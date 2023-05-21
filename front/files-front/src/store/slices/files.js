import { createSlice } from "@reduxjs/toolkit";

export const filesSlice = createSlice({
  name: "files",
  initialState: {
    data: {
      list: [],
      filter: null
    }
  },
  reducers: {
    setFilesList: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { setFilesList } = filesSlice.actions;

const files = filesSlice.reducer;
export default files;

