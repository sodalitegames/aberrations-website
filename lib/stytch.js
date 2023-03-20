// import { createStytchHeadlessClient } from '@stytch/nextjs/headless';
import { createStytchUIClient } from '@stytch/nextjs/ui';

export const stytch = createStytchUIClient(process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN);
