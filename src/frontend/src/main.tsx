import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { router } from './router';
import { store, persistor } from './store';
import { setMockMode } from './api';
import { ThemeProvider } from './components/ThemeContext';
import { AuthProvider } from './components/AuthContext';
import './styles/tailwind.css';

// Enable mock mode for all RTK Query requests
setMockMode(true);

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AuthProvider>
            <ThemeProvider>
              <RouterProvider router={router} />
            </ThemeProvider>
          </AuthProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>,
  );
}
