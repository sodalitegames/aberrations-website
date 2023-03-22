import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useStytch, useStytchSession } from '@stytch/nextjs';

import { session_duration_minutes } from '../../lib/stytch';

import Loader from '../../components/dashboard/components/Loader';

export default function Login() {
  const router = useRouter();
  const stytch = useStytch();
  const { session } = useStytchSession();

  console.log('session:', session);

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    } else {
      const { token } = router.query;
      console.log('token: ', token);
      alert(token);
      if (token) {
        stytch.magicLinks.authenticate(token, {
          session_duration_minutes,
        });
      }
    }
  }, [stytch, session, router]);

  return <Loader />;
}
