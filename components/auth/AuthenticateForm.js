import { StytchLogin } from '@stytch/nextjs';
import { Products } from '@stytch/vanilla-js';

import { login_expiration_minutes, signup_expiration_minutes, reset_password_expiration_minutes, BASE_URL, session_duration_minutes } from '../../lib/stytch';

export default function AuthenticateForm() {
  const props = {
    config: {
      products: [Products.emailMagicLinks, Products.passwords],
      emailMagicLinksOptions: {
        loginRedirectURL: `${BASE_URL}/auth/authenticate`,
        loginExpirationMinutes: login_expiration_minutes,
        signupRedirectURL: `${BASE_URL}/auth/authenticate`,
        signupExpirationMinutes: signup_expiration_minutes,
        createUserAsPending: true,
      },
      passwordOptions: {
        loginExpirationMinutes: login_expiration_minutes,
        loginRedirectURL: `${BASE_URL}/auth/authenticate`,
        resetPasswordExpirationMinutes: reset_password_expiration_minutes,
        resetPasswordRedirectURL: `${BASE_URL}/auth/reset-password`,
      },
      sessionOptions: {
        sessionDurationMinutes: session_duration_minutes,
      },
    },
    styles: {
      hideHeaderText: true,
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
    callbacks: {
      onEvent: message => console.log(message),
      onSuccess: message => console.log(message),
      onError: message => console.log(message),
    },
  };

  return <StytchLogin config={props.config} styles={props.styles} callbacks={props.callbacks} />;
}
