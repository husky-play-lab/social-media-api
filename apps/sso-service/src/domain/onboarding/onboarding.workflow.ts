/* eslint-disable @typescript-eslint/no-unused-vars */
import { createMachine } from 'xstate';

export const machine = createMachine(
  {
    id: 'New Machine',
    initial: 'CHECK_ACCOUNT',
    states: {
      CHECK_ACCOUNT: {
        on: {
          check_account: [
            {
              target: 'THROW_ERROR',
              cond: 'account_exist',
            },
            {
              target: 'EMAIL_VERIFICATION',
            },
          ],
        },
      },
      THROW_ERROR: {
        type: 'final',
      },
      EMAIL_VERIFICATION: {
        entry: {
          type: 'sendEmailVerification',
          params: {},
        },
        on: {
          verify: [
            {
              target: 'ACCOUNT_CREATED',
              cond: 'within_3_days',
            },
            {
              target: 'CANCEL_VERIFICATION',
            },
          ],
        },
      },
      ACCOUNT_CREATED: {
        on: {
          filling_password: {
            target: 'PASSWORD_FILLED',
          },
        },
      },
      CANCEL_VERIFICATION: {
        type: 'final',
      },
      PASSWORD_FILLED: {
        on: {
          filling_profile: {
            target: 'PROFILE_FILLED',
          },
        },
      },
      PROFILE_FILLED: {
        entry: {
          type: 'sendWelcomeEmail',
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
      sendEmailVerification: (context, event) => {},

      sendWelcomeEmail: (context, event) => {},
    },
    services: {},
    guards: {
      account_exist: (context, event) => {
        return false;
      },
      within_3_days: (context, event) => {
        return false;
      },
    },
    delays: {},
  },
);
