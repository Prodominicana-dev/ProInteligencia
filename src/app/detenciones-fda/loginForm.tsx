"use client";
import { useFormState, useFormStatus } from "react-dom";
import { login } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-navy py-2.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
    >
      {pending ? "Verificando..." : "Entrar"}
    </button>
  );
}

export default function LoginForm() {
  const [error, formAction] = useFormState(login, null);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="user" className="mb-1 block text-sm font-medium text-gray-700">
          Usuario
        </label>
        <input
          id="user"
          name="user"
          autoComplete="username"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-navy focus:ring-1 focus:ring-navy"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-navy focus:ring-1 focus:ring-navy"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <SubmitButton />
    </form>
  );
}
