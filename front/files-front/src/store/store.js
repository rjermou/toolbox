import { configureStore } from '@reduxjs/toolkit';
import files from './slices/files';

const store = configureStore({
  reducer: {
    files
  }
});

export default store;