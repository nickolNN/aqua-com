import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { api } from '@/api';
import {
  authReducer,
  contactsReducer,
  companiesReducer,
  tasksReducer,
  kanbanReducer,
  activitiesReducer,
  dashboardReducer,
  searchReducer,
  settingsReducer,
} from '@/stores';

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'settings'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
  companies: companiesReducer,
  tasks: tasksReducer,
  kanban: kanbanReducer,
  activities: activitiesReducer,
  dashboard: dashboardReducer,
  search: searchReducer,
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
export type TypedReduxSelector = typeof store.dispatch;

export { api };
