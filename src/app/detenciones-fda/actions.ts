"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  COOKIE_NAME,
  SESSION_HOURS,
  checkCredentials,
  createSessionToken,
} from "./auth";

export async function login(_prev: string | null, formData: FormData) {
  const user = String(formData.get("user") || "");
  const password = String(formData.get("password") || "");

  if (!checkCredentials(user, password)) {
    // Pequeña pausa para frenar intentos por fuerza bruta.
    await new Promise((r) => setTimeout(r, 1000));
    return "Usuario o contraseña incorrectos.";
  }

  cookies().set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/detenciones-fda",
    maxAge: SESSION_HOURS * 60 * 60,
  });
  redirect("/detenciones-fda");
}

export async function logout() {
  cookies().delete({ name: COOKIE_NAME, path: "/detenciones-fda" });
  redirect("/detenciones-fda");
}
