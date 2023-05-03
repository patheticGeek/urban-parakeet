import { env } from "~/env.mjs";

const getBaseUrl = () => {
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return `http://localhost:${env.PORT}`;
};

export type MailContent = { subject: string; body: string };

export const verificationEmail = (token: string): MailContent => ({
  subject: "Verify your email - Wisdom Circle",
  body: `
  <html>
    <head></head>
    <body>
      <p>Hello,</p>
      <br />
      <p>Please verify your email by clicking the link below.</p>
      <p><a href="${getBaseUrl()}/auth/verifyEmail?token=${token}">Verify my email</a></p>
      <br />
      <p>If you did not request this, please ignore this email.</p>
      <br />
      <p>Thanks,</p>
      <p>Wisdom Circle</p>
    </body>
  </html>
  `,
});
