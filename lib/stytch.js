// import { createStytchHeadlessClient } from '@stytch/nextjs/headless';
import { createStytchUIClient } from '@stytch/nextjs/ui';

export const stytch = createStytchUIClient(process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN);

export const session_duration_minutes = 129600;
export const login_expiration_minutes = 30;
export const signup_expiration_minutes = 30;
export const reset_password_expiration_minutes = 30;
