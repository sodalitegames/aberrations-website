import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Products } from '@stytch/vanilla-js';
import { StytchPasswordReset, useStytchSession } from '@stytch/nextjs';

import { login_expiration_minutes, reset_password_expiration_minutes, BASE_URL, session_duration_minutes } from '../../lib/stytch';

import PageLayout from '../../layouts/PageLayout';

export default function ResetPassword({ metadata }) {
  const router = useRouter();
  const { session } = useStytchSession();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  const { token } = router.query;

  const props = {
    config: {
      passwordOptions: {
        loginExpirationMinutes: login_expiration_minutes,
        loginRedirectURL: `${BASE_URL}/auth/authenticate`,
        resetPasswordExpirationMinutes: reset_password_expiration_minutes,
        resetPasswordRedirectURL: `${BASE_URL}/auth/reset-password`,
      },
      sessionOptions: {
        sessionDurationMinutes: session_duration_minutes,
      },
      products: [Products.passwords],
    },
    styles: {
      fontFamily: '"Kanit", sans-serif',
      container: {
        width: '100%',
        borderColor: 'transparent',
        backgroundColor: 'transparent',
      },
      buttons: {
        primary: {
          backgroundColor: '#164650',
        },
        secondary: {
          backgroundColor: '#001D3D',
        },
      },
    },
  };

  return (
    <PageLayout title={metadata.title} seo={metadata} full>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <StytchPasswordReset config={props.config} styles={props.styles} passwordResetToken={token} />
      </div>
    </PageLayout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      metadata: {
        title: 'Reset password',
        slug: '/auth/reset-password',
      },
    },
  };
}
