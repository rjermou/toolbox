import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import files from './slices/files';
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';


const store = configureStore({
  reducer: {
    files
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export default store;