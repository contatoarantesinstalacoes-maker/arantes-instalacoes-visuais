"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "arantes-analytics-consent-v1";
const CONSENT_EVENT = "arantes-analytics-consent";

type Consent = "accepted" | "rejected" | null;

function getConsentSnapshot(): Consent {
  const savedConsent = window.localStorage.getItem(STORAGE_KEY);
  return savedConsent === "accepted" || savedConsent === "rejected"
    ? savedConsent
    : null;
}

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CONSENT_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CONSENT_EVENT, onStoreChange);
  };
}

export default function AnalyticsConsent({ gtmId }: { gtmId: string }) {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    () => null,
  );

  function saveConsent(value: Exclude<Consent, null>) {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  function reopenPreferences() {
    window.localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }

  return (
    <>
      {consent === "accepted" ? <GoogleTagManager gtmId={gtmId} /> : null}

      {consent === null ? (
        <section
          aria-label="Preferências de cookies"
          className="fixed inset-x-4 bottom-4 z-[150] mx-auto max-w-3xl rounded-2xl border border-white/15 bg-zinc-950 p-5 shadow-2xl md:flex md:items-center md:justify-between md:gap-8"
        >
          <p className="text-sm leading-6 text-zinc-200">
            Usamos cookies de analytics para medir o uso do site. Você pode
            aceitar ou recusar sem perder acesso ao conteúdo.
          </p>
          <div className="mt-4 flex shrink-0 gap-3 md:mt-0">
            <button
              type="button"
              onClick={() => saveConsent("rejected")}
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white"
            >
              Recusar
            </button>
            <button
              type="button"
              onClick={() => saveConsent("accepted")}
              className="rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500"
            >
              Aceitar
            </button>
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={reopenPreferences}
          className="fixed bottom-3 left-3 z-[70] rounded-full border border-white/15 bg-zinc-950 px-4 py-2 text-xs font-bold text-zinc-200 shadow-lg"
        >
          Preferências de cookies
        </button>
      )}
    </>
  );
}
