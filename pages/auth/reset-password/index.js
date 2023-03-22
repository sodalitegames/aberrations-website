import { useRouter } from 'next/router';
import { Products } from '@stytch/vanilla-js';
import { StytchPasswordReset } from '@stytch/nextjs';

import { login_expiration_minutes, reset_password_expiration_minutes } from '../../../lib/stytch';

export default function ResetPassword() {
  const router = useRouter();

  const { token } = router.query;

  console.log(token);

  console.log('HELLO');

  const config = {
    passwordOptions: {
      loginExpirationMinutes: login_expiration_minutes,
      loginRedirectURL: 'http://localhost:3000/auth/login',
      resetPasswordExpirationMinutes: reset_password_expiration_minutes,
      resetPasswordRedirectURL: 'http://localhost:3000/auth/reset-password',
    },
    products: [Products.passwords],
  };

  return <StytchPasswordReset config={config} passwordResetToken={token} />;
}
