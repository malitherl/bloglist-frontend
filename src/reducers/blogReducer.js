import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogList(state, action) {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export const { setBlogList } = blogSlice.actions;
export default blogSlice.reducer;
