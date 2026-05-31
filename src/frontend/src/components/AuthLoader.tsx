import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/stores/authSlice';

const authLoaderKey = 'auth_loader_restored';

export function AuthLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.sessionStorage.getItem(authLoaderKey)) {
      const token = localStorage.getItem('token');
      if (token) {
        window.sessionStorage.setItem(authLoaderKey, 'true');
        try {
          const parsed = JSON.parse(atob(token.split('.')[1]));
          if (parsed && parsed.sub) {
            dispatch(loginSuccess({
              token,
              user: {
                id: parsed.sub,
                email: parsed.email || '',
                role: parsed.role || '',
              },
            }));
          }
        } catch {
          // Invalid token, do nothing
        }
      }
    }
  }, [dispatch]);

  return null;
}
