
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer.tsx';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

