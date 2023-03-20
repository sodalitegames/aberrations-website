import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useStytch, useStytchSession } from '@stytch/nextjs';

export default function Authenticate() {
  const router = useRouter();
  const stytch = useStytch();
  const { session } = useStytchSession();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    } else {
      const { token } = router.query;
      stytch.magicLinks.authenticate(token, {
        session_duration_minutes: 60,
      });
    }
  }, [stytch, session, router]);

  return <div>Loading</div>;
}
