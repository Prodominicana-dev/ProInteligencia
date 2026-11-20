"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Burbuja flotante de TAIA, la asistente virtual de ProDominicana.
 *
 * Mismo componente que el portal institucional (Institucional/src/components/chatbox/TaiaChatbot.tsx).
 * El chat vive en https://chatbot.prodominicana.gob.do (su propio servidor y despliegue) y aquí
 * se muestra dentro de un iframe. El iframe solo se carga la primera vez que se abre la burbuja,
 * para no sumar peso a la carga inicial del sitio. Permite el micrófono para el modo de voz.
 */
const URL_CHATBOT = "https://chatbot.prodominicana.gob.do/embed";

const ICONO = "/images/taia-avatar.webp";

/* Centro de cada ojo sobre la imagen, en una cuadrícula de 1254 x 1254
   (la misma que usa el avatar dentro del chat). */
const OJOS = [497.5, 821.5];

/* Quien tiene desactivadas las animaciones en su sistema ve el icono quieto. */
const ANIMACION = `
@keyframes taia-flotar {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(-3deg); }
}
@keyframes taia-sombra {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(0.78); opacity: 0.5; }
}
@keyframes taia-parpadear {
  0%, 44%, 48%, 88%, 91%, 94%, 97%, 100% { opacity: 0; }
  45%, 47%, 89%, 90%, 95%, 96% { opacity: 1; }
}
@keyframes taia-saludo-entra {
  0% { opacity: 0; transform: translateY(8px) scale(0.85); }
  60% { opacity: 1; transform: translateY(-2px) scale(1.02); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes taia-punto {
  0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
  40% { opacity: 1; transform: translateY(-3px); }
}
@keyframes taia-texto-entra {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes taia-saludo-flota {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.taia-saludo { animation: taia-saludo-entra 0.45s ease-out both, taia-saludo-flota 4s ease-in-out 0.45s infinite; transform-origin: 100% 100%; }
.taia-punto { animation: taia-punto 1s ease-in-out infinite; }
.taia-texto { animation: taia-texto-entra 0.3s ease-out both; }
.taia-flota { animation: taia-flotar 4s ease-in-out infinite; transform-origin: 50% 85%; }
.taia-sombra { animation: taia-sombra 4s ease-in-out infinite; }
.taia-parpados { opacity: 0; animation: taia-parpadear 6s linear infinite; }
@media (prefers-reduced-motion: reduce) {
  .taia-flota, .taia-sombra, .taia-parpados, .taia-saludo, .taia-punto, .taia-texto { animation: none; }
}
`;

export default function TaiaChatbot() {
  const [abierto, setAbierto] = useState(false);
  const [cargado, setCargado] = useState(false);
  const [visible, setVisible] = useState(false);
  // Saludo en cada carga de página: puntos de "escribiendo" y luego el texto, que queda flotando
  // junto al avatar hasta que la persona lo cierra con la X o abre el chat.
  const [saludo, setSaludo] = useState<"no" | "escribiendo" | "texto">("no");
  const en = (usePathname() || "").startsWith("/en");
  const t = en
    ? { titulo: "TAIA · ProDominicana virtual assistant", cerrar: "Close the chat", abrir: "Open the chat with TAIA, virtual assistant", cerrarBurbuja: "Close the chat with TAIA", saludo: "Hi! I'm TAIA, how can I help you today?", escribiendo: "TAIA is typing", cerrarSaludo: "Close the greeting", iframe: "Chat with TAIA, ProDominicana virtual assistant" }
    : { titulo: "TAIA · Asistente virtual de ProDominicana", cerrar: "Cerrar el chat", abrir: "Abrir el chat con TAIA, asistente virtual", cerrarBurbuja: "Cerrar el chat con TAIA", saludo: "¡Hola! Soy TAIA, ¿en qué puedo ayudarte hoy?", escribiendo: "TAIA está escribiendo", cerrarSaludo: "Cerrar el saludo", iframe: "Chat con TAIA, asistente virtual de ProDominicana" };

  // La burbuja aparece cuando el navegador queda libre, sin competir con la carga inicial
  useEffect(() => {
    const win = window as typeof window & { requestIdleCallback?: (cb: () => void) => number };
    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(() => setVisible(true));
      return () => (window as any).cancelIdleCallback?.(id);
    }
    const id = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const tiempos = [
      setTimeout(() => setSaludo("escribiendo"), 1200),
      setTimeout(() => setSaludo((s) => (s === "escribiendo" ? "texto" : s)), 2400),
    ];
    return () => tiempos.forEach(clearTimeout);
  }, [visible]);

  // Escape cierra el chat
  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => { if (e.key === "Escape") setAbierto(false); };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [abierto]);

  // En el móvil el chat cubre la pantalla: la página de fondo no se desplaza mientras está abierto
  useEffect(() => {
    if (!abierto || !window.matchMedia("(max-width: 639px)").matches) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previo; };
  }, [abierto]);

  if (!visible) return null;

  const abrir = () => { setSaludo("no"); setCargado(true); setAbierto(true); };

  return (
    <>
      {/* En el móvil el chat se abre como una hoja sobre la página oscurecida; tocar fuera lo cierra */}
      {cargado && (
        <div
          aria-hidden="true"
          onClick={() => setAbierto(false)}
          className={`fixed inset-0 z-[9998] bg-[#021F4D]/60 backdrop-blur-[2px] transition-opacity duration-200 sm:hidden
            ${abierto ? "opacity-100" : "pointer-events-none opacity-0"}`}
        />
      )}

      {/* Ventana del chat: se mantiene montada al cerrarla para no perder la conversación.
          No lleva barra de título: el chat ya trae su propia cabecera con el nombre y el avatar,
          y repetirla encima se veía como dos cabeceras de distinto azul. */}
      {cargado && (
        <div
          role="dialog"
          aria-label={t.titulo}
          aria-hidden={!abierto}
          className={`fixed z-[9999] transition-all duration-200 ease-out
            inset-x-2 bottom-2 top-14
            sm:inset-auto sm:bottom-[104px] sm:right-5 sm:h-[640px] sm:max-h-[calc(100dvh-8rem)] sm:w-[400px] sm:origin-bottom-right
            ${abierto ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-95 opacity-0"}`}
        >
          {/* Mismas esquinas que el chat (24 px), para que el borde sea uno solo */}
          <div className="h-full w-full overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-12px_rgba(1,47,115,0.5)] ring-1 ring-[#012F73]/10">
            <iframe
              src={URL_CHATBOT}
              title={t.iframe}
              className="h-full w-full border-none"
              allow="microphone; autoplay; clipboard-write"
            />
          </div>

          {/* Cerrar: flota fuera de la ventana para no tapar los controles del chat.
              En el móvil queda encima de la hoja; en escritorio, en la esquina. */}
          <button
            type="button"
            onClick={() => setAbierto(false)}
            aria-label={t.cerrar}
            title={t.cerrar}
            className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#012F73] shadow-lg ring-1 ring-[#012F73]/10 transition-colors duration-150 hover:bg-[#012F73] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 sm:-right-3 sm:-top-3"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}

      {/* Saludo: globo junto al avatar. Pulsarlo abre el chat; la X lo cierra. */}
      {saludo !== "no" && !abierto && (
        <div role="status" className="taia-saludo fixed bottom-[92px] right-5 z-[10000] flex max-w-[250px] items-start gap-1 rounded-2xl rounded-br-md bg-white py-2.5 pl-4 pr-2 text-[#012F73] shadow-[0_12px_30px_-8px_rgba(1,47,115,0.45)] ring-1 ring-[#012F73]/10">
          <button type="button" onClick={abrir} className="text-left text-sm font-medium leading-snug focus:outline-none focus-visible:underline">
            {saludo === "escribiendo" ? (
              <span className="flex h-5 items-center gap-1 pr-2" aria-label={t.escribiendo}>
                {[0, 0.15, 0.3].map((d) => (
                  <span key={d} className="taia-punto block h-1.5 w-1.5 rounded-full bg-[#012F73]" style={{ animationDelay: `${d}s` }} />
                ))}
              </span>
            ) : (
              <span className="taia-texto block">{t.saludo}</span>
            )}
          </button>
          {saludo === "texto" && (
            <button
              type="button"
              onClick={() => setSaludo("no")}
              aria-label={t.cerrarSaludo}
              title={t.cerrarSaludo}
              className="-mr-0.5 -mt-0.5 shrink-0 rounded-full p-1 text-[#012F73]/50 hover:bg-[#012F73]/10 hover:text-[#012F73] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Burbuja */}
      <button
        type="button"
        onClick={() => (abierto ? setAbierto(false) : abrir())}
        aria-label={abierto ? t.cerrarBurbuja : t.abrir}
        aria-expanded={abierto}
        className={`fixed bottom-2 right-3 z-[10000] h-20 w-20 rounded-full bg-transparent
          transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400
          ${abierto ? "max-sm:hidden" : ""}`}
      >
        {/* El icono va sin fondo: solo la figura de TAIA, que flota despacio y parpadea,
            igual que dentro del chat. El parpadeo son dos párpados dibujados sobre la imagen. */}
        <span aria-hidden="true" className="taia-sombra absolute bottom-[-2px] left-[18px] h-2 w-11 rounded-[50%] bg-[#0B2452]/30 blur-[3px]" />
        <span className="taia-flota relative block h-full w-full">
          <img src={ICONO} alt="" draggable={false} className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_5px_7px_rgba(11,36,82,0.35)]" />
          <svg viewBox="0 0 1254 1254" aria-hidden="true" className="absolute inset-0 h-full w-full">
            <g className="taia-parpados">
              {OJOS.map((cx) => (
                <g key={cx}>
                  <ellipse cx={cx} cy="630" rx="66" ry="70" fill="#FDFCFD" />
                  <path d={`M${cx - 52} 628 Q${cx} 668 ${cx + 52} 628`} stroke="#012B74" strokeWidth="16" fill="none" strokeLinecap="round" />
                </g>
              ))}
            </g>
          </svg>
        </span>
        <style>{ANIMACION}</style>
      </button>
    </>
  );
}
