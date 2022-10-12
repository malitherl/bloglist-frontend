import { createSlice } from '@reduxjs/toolkit';

const initialState = null;


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser (state, action) {
      console.log(state)
      return action.payload
    },
    logout () {
      return initialState
    }
  }
})




export const { setUser, logout } = userSlice.actions
export default userSlice.reducer;
