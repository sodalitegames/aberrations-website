import { useRouter } from 'next/router';
import { Products } from '@stytch/vanilla-js';
import { StytchPasswordReset } from '@stytch/nextjs';

export default function ResetPassword() {
  const router = useRouter();

  const { token } = router.query;

  console.log(token);

  console.log('HELLO');

  const config = {
    passwordOptions: {
      loginExpirationMinutes: 30,
      loginRedirectURL: 'http://localhost:3000/auth/login',
      resetPasswordExpirationMinutes: 30,
      resetPasswordRedirectURL: 'http://localhost:3000/auth/reset-password',
    },
    products: [Products.passwords],
  };

  return <StytchPasswordReset config={config} passwordResetToken={token} />;
}
