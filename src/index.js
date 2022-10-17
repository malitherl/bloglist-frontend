import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import notificationReducer from './reducers/notificationReducer';
import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import { Container } from '@mui/material'
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    user: userReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Container>
    <Provider store={store}>
      <App />
    </Provider>
  </Container>
);
