import { env } from "~/env.mjs";
import { verificationEmail, type MailContent } from "./templates";

const send = (emails: Array<string>, content: MailContent) => {
  return fetch("https://api.sendinblue.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": env.SIB_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "Hello",
        email: "hello@patheticgeek.dev",
      },
      to: emails.map((email) => ({ email })),
      subject: content.subject,
      htmlContent: content.body,
    }),
  });
};

export const mail = {
  send,
  templates: {
    verification: verificationEmail,
  },
};
