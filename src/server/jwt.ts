import cookie from "cookie";
import jwt from "jsonwebtoken";
import { env } from "~/env.mjs";

export const expiresInMs = 7 * 24 * 60 * 60 * 1000; // 7 days

type Payload = { user_id: string };

const encrypt = (payload: Payload) => {
  const token = jwt.sign(payload, env.JWT_KEY, {
    expiresIn: `${expiresInMs}`,
  });
  const tokenCookie = cookie.serialize("token", token, {
    expires: new Date(Date.now() + expiresInMs),
    httpOnly: env.NODE_ENV !== "development",
    path: "/",
  });
  return { token, tokenCookie };
};

const decrypt = (token: string) => {
  return jwt.decode(token) as Payload | null;
};

const myJwt = { encrypt, decrypt };

export { myJwt as jwt };
