import { Provider } from 'react-redux';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { router } from './router';
import { store } from './store';
import './styles/tailwind.css';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <BrowserRouter>
        <RouterProvider router={router} />
      </BrowserRouter>
    </Provider>,
  );
}
