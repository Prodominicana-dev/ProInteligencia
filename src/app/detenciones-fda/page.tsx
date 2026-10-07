import { cookies } from "next/headers";
import Image from "next/image";
import { COOKIE_NAME, isValidSession } from "./auth";
import { logout } from "./actions";
import LoginForm from "./loginForm";

export const dynamic = "force-dynamic";

const TITLE =
  "Detenciones de embarques a las exportaciones dominicanas (Estados Unidos FDA)";
const DASHBOARD_URL =
  "https://app.powerbi.com/view?r=eyJrIjoiOGRkNzA5ZjctNmM2OC00NTE5LWJiMDYtYWQzOWM3NjdmYzc2IiwidCI6IjEwZWExNTgyLWY4NjMtNGJkNC1hZjA5LTNjNzQ1ZTczNWMwNSIsImMiOjJ9";

export const metadata = {
  title: "Detenciones FDA | ProInteligencia",
  robots: { index: false, follow: false },
};

export default function DetencionesFdaPage() {
  const authenticated = isValidSession(cookies().get(COOKIE_NAME)?.value);

  if (!authenticated) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-b from-light-blue from-[40%] to-dark-blue p-4">
        <Image src="/ProInteligencia.svg" alt="ProInteligencia" width={240} height={40} priority />
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 flex flex-col items-center gap-2 text-center">
            <h1 className="text-base font-semibold text-gray-800">{TITLE}</h1>
            <p className="text-sm text-gray-500">Acceso restringido</p>
          </div>
          <LoginForm />
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-screen flex-col bg-gray-100">
      <header className="flex items-center justify-between gap-4 bg-navy px-4 py-2 text-white">
        <h1 className="text-sm font-semibold sm:text-base">{TITLE}</h1>
        <form action={logout}>
          <button
            type="submit"
            className="whitespace-nowrap rounded-md border border-white/40 px-3 py-1 text-sm hover:bg-white/10"
          >
            Cerrar sesión
          </button>
        </form>
      </header>
      <iframe
        title={TITLE}
        src={DASHBOARD_URL}
        className="w-full flex-1 border-0"
        allowFullScreen
      />
    </main>
  );
}
