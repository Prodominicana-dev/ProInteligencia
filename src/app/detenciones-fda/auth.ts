import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";

// Acceso local, independiente de Auth0. El repositorio es público: aquí solo
// va el hash (scrypt) de la contraseña, nunca la contraseña en texto plano.
// Se puede sobrescribir en el servidor con FDA_USER / FDA_PASS_SALT / FDA_PASS_HASH.
const USER = process.env.FDA_USER || "prointeligencia";
const SALT = process.env.FDA_PASS_SALT || "07e9d45094d59c2fbc37964c2c979ac1";
const HASH =
  process.env.FDA_PASS_HASH ||
  "a88cecc8c9ad09fc3de807e396977a5f8978c332167fea4e43892d3ae1d0c3b8";

export const COOKIE_NAME = "fda_session";
export const SESSION_HOURS = 8;

// Firma de sesión con un secreto del servidor; si no existe, uno aleatorio
// por proceso (las sesiones se pierden al reiniciar, pero nunca son falsificables).
const SECRET =
  process.env.FDA_SESSION_SECRET ||
  process.env.AUTH0_SECRET ||
  randomBytes(32).toString("hex");

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

function sign(value: string) {
  return createHmac("sha256", SECRET).update(value).digest("hex");
}

export function checkCredentials(user: string, password: string) {
  const hash = scryptSync(password, SALT, 32).toString("hex");
  const userOk = safeEqual(user.trim().toLowerCase(), USER.toLowerCase());
  return safeEqual(hash, HASH) && userOk;
}

export function createSessionToken() {
  const expires = String(Date.now() + SESSION_HOURS * 60 * 60 * 1000);
  return `${expires}.${sign(expires)}`;
}

export function isValidSession(token?: string) {
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  return safeEqual(signature, sign(expires)) && Number(expires) > Date.now();
}
