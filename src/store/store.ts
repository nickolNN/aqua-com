import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { api } from '@/api';
import { authReducer, settingsReducer } from '@/stores';

// Only `auth` is persisted through redux-persist. The settings slice
// persists its theme directly to `localStorage.theme` (see
// settingsSlice.setTheme), so keeping `settings` in the whitelist would
// let a throttled/stale `persist:root` payload overwrite the fresh theme
// on rehydrate after a quick reload.
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        immutableCheck: false,
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type TypedReduxDispatch = AppDispatch;
export type TypedReduxSelector = AppDispatch;

export { api };
