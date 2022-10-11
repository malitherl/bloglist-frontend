import { createSlice } from '@reduxjs/toolkit';

const initialState = '';


const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    messageChange (state, action) {
      console.log(action.payload)
      const message= action.payload
      return message
    },
    messageDefault() {
      return initialState
    }
  }
})




export const { messageChange, messageDefault } = notificationSlice.actions
export default notificationSlice.reducer;
