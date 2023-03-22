import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useStytch } from '@stytch/nextjs';

import { session_duration_minutes } from '../../lib/stytch';
import Loader from '../../components/dashboard/components/Loader';

export default function Authenticate() {
  const router = useRouter();
  const stytch = useStytch();

  const [resp, setResp] = useState(null);

  useEffect(() => {
    (async () => {
      const { token } = router.query;

      if (token) {
        const resp = await stytch.magicLinks.authenticate(token, {
          session_duration_minutes,
        });

        setResp(resp);
      }
    })();
  }, [stytch, router]);

  console.log(resp);

  if (resp) {
    return JSON.stringify(resp);
  }

  return <Loader />;
}
