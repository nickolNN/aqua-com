import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/api';
import {
  authReducer,
  contactsReducer,
  companiesReducer,
  tasksReducer,
  activitiesReducer,
  dashboardReducer,
  searchReducer,
  settingsReducer,
} from '@/stores';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
    companies: companiesReducer,
    tasks: tasksReducer,
    activities: activitiesReducer,
    dashboard: dashboardReducer,
    search: searchReducer,
    settings: settingsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/REHYDRATE'],
        immutableCheck: false,
      },
    }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { api };
