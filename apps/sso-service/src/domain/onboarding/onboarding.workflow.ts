import { createMachine } from 'xstate';

export const machine = createMachine(
  {
    id: 'New Machine',
    initial: 'CHECK_ACCOUNT',
    states: {
      CHECK_ACCOUNT: {
        on: {
          account_not_exist: {
            target: 'EMAIL_VERIFICATION',
          },
          account_exist: {
            target: 'THROW_ERROR',
          },
        },
      },
      EMAIL_VERIFICATION: {
        entry: {
          type: 'send_email_verification',
          params: {},
        },
        on: {
          verify: {
            target: 'ACCOUNT_CREATED',
          },
          wait_3_days: {
            target: 'CANCEL_VERIFICATION',
          },
        },
      },
      THROW_ERROR: {
        type: 'final',
      },
      ACCOUNT_CREATED: {
        on: {
          filling_password: {
            target: 'PASSWORD_FILLED',
          },
        },
      },
      CANCEL_VERIFICATION: {},
      PASSWORD_FILLED: {
        entry: {
          type: 'send_welcome_email',
          params: {},
        },
        on: {
          filling_profile: {
            target: 'PROFILE_FILLED',
          },
        },
      },
      PROFILE_FILLED: {
        entry: {
          type: 'send_guidance_email',
          params: {},
        },
        type: 'final',
      },
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      send_welcome_email: (context, event) => {},

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      send_guidance_email: (context, event) => {},

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      send_email_verification: (context, event) => {},
    },
    services: {},
    guards: {},
    delays: {},
  },
);
