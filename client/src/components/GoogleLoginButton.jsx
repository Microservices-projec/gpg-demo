import { useEffect, useRef } from 'react';
import { apiPost } from '../api';

export default function GoogleLoginButton({ onLogin }) {
  const btnRef = useRef(null);

  useEffect(() => {
    /* global google */
    if (!window.google) return;

    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async ({ credential }) => {
        try {
          const res = await apiPost('/auth/google', { idToken: credential });
          onLogin?.(res.user);
        } catch (error) {
          console.error('Google login failed:', error);
        }
      },
      auto_select: false
    });

    if (btnRef.current) {
      google.accounts.id.renderButton(btnRef.current, { 
        theme: 'outline', 
        size: 'large',
        width: '250px'
      });
    }
  }, [onLogin]);

  return <div ref={btnRef}></div>;
}