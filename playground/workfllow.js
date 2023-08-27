/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createMachine, interpret } = require('xstate');

const onboardingMachine = createMachine(
  {
    id: 'New Machine',
    initial: 'CHECK_ACCOUNT',
    states: {
      CHECK_ACCOUNT: {
        on: {
          check_account: [
            {
              target: 'THROW_ERROR',
              cond: 'checkAccountExist',
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
              cond: 'verifyWithin3Days',
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
      checkAccountExist: (context, event) => {
        console.log(event.query);
        return true;
      },
      verifyWithin3Days: (context, event) => {
        return false;
      },
    },
    delays: {},
  },
);

const onboardingInstance = interpret(onboardingMachine)
  .onTransition((state) => console.log(state.value))
  .start();

onboardingInstance.send({
  type: 'check_account',
  query: { email: 'phonghiavan@gmail.com' },
});
