import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useStytch } from '@stytch/nextjs';

import { session_duration_minutes } from '../../lib/stytch';
import Loader from '../../components/dashboard/components/Loader';

export default function VerifyEmail() {
  const router = useRouter();
  const stytch = useStytch();

  useEffect(() => {
    (async () => {
      const { token } = router.query;

      if (token) {
        try {
          const resp = await stytch.magicLinks.authenticate(token, {
            session_duration_minutes,
          });

          if (resp) {
            router.push('/dashboard');
          }
        } catch (e) {
          router.push('/dashboard');
        }
      }
    })();
  }, [stytch, router]);

  return <Loader />;
}
