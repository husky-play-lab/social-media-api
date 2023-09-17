import sgMail from '@sendgrid/mail';

export interface ISendEmail {
  email: string;
}

const API_KEY =
  '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';
sgMail.setApiKey(API_KEY);

export const sendEmail = (data: ISendEmail) => {
  const msg = {
    to: data.email,
    from: 'tech@aiquant.space',
    subject: 'Email Verification',
    html: '<strong>Please click button to verify</strong>',
  };

  sgMail.send(msg);
};
