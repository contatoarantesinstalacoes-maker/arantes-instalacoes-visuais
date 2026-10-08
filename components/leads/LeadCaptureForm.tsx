"use client";

import { LEAD_CONSENT_POLICY_VERSION } from "@/lib/consent";
import { trackLeadConversion, trackWhatsAppClick } from "@/lib/gtm";
import {
  LEAD_FORM_CONTEXT_EVENT,
} from "@/components/leads/LeadFormLink";
import { useEffect, useRef, useState, type FormEvent } from "react";

const whatsappUrl = `https://wa.me/5511962600528?text=${encodeURIComponent(
  "Olá! Tentei solicitar um orçamento pelo site e gostaria de continuar pelo WhatsApp.",
)}`;

const services = [
  "Fachadas Comerciais",
  "Letras Caixa",
  "Revestimento em ACM",
  "Adesivação",
  "Painéis e Totens",
  "Eventos e Estandes",
  "Trabalhos em Altura",
  "Atendimento Corporativo",
  "Outro",
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  message: string;
  privacy: boolean;
  marketing: boolean;
};

type SubmissionIdentity = {
  fingerprint: string;
  id: string;
  capturedAt: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  city: "",
  service: "",
  message: "",
  privacy: false,
  marketing: false,
};

function currentLandingContext() {
  const url = new URL(window.location.href);
  url.hash = "";

  return {
    landing_page: url.toString(),
    utm: {
      source: url.searchParams.get("utm_source"),
      medium: url.searchParams.get("utm_medium"),
      campaign: url.searchParams.get("utm_campaign"),
      term: url.searchParams.get("utm_term"),
      content: url.searchParams.get("utm_content"),
    },
  };
}

function createSubmissionId() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `${Date.now()}:${Math.random().toString(36).slice(2)}`;
}

export default function LeadCaptureForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [formLocation, setFormLocation] = useState("cta");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submissionIdentity = useRef<SubmissionIdentity | null>(null);

  useEffect(() => {
    function applyContext(event: Event) {
      const detail = (event as CustomEvent<{
        formLocation?: string;
        service?: string;
      }>).detail;

      if (detail?.formLocation) setFormLocation(detail.formLocation);
      if (detail?.service) {
        setForm((current) => ({ ...current, service: detail.service ?? "" }));
      }
    }

    window.addEventListener(LEAD_FORM_CONTEXT_EVENT, applyContext);
    return () =>
      window.removeEventListener(LEAD_FORM_CONTEXT_EVENT, applyContext);
  }, []);

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus("idle");
    setErrorMessage("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const landingContext = currentLandingContext();
    const fingerprint = JSON.stringify({ form, landingContext });
    if (submissionIdentity.current?.fingerprint !== fingerprint) {
      submissionIdentity.current = {
        fingerprint,
        id: createSubmissionId(),
        capturedAt: new Date().toISOString(),
      };
    }
    const identity = submissionIdentity.current;

    const payload = {
      submission_id: identity.id,
      name: form.name,
      phone: form.phone,
      email: form.email || null,
      city: form.city || null,
      service: form.service || null,
      message: form.message,
      ...landingContext,
      consent: {
        privacy: form.privacy,
        marketing: form.marketing,
        captured_at: identity.capturedAt,
        policy_version: LEAD_CONSENT_POLICY_VERSION,
      },
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`lead_submission_${response.status}`);
      }

      const result = (await response.json()) as { replayed?: boolean };
      trackLeadConversion({
        formLocation,
        replayed: Boolean(result.replayed),
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Não foi possível enviar agora. Continue pelo WhatsApp sem perder seu atendimento.",
      );
    }
  }

  const inputClass =
    "mt-2 min-h-12 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30";

  if (status === "success") {
    return (
      <div
        role="status"
        className="mt-10 rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-8 text-left"
      >
        <h3 className="text-2xl font-black text-white">
          Solicitação recebida.
        </h3>
        <p className="mt-3 leading-7 text-zinc-200">
          Seus dados foram enviados com segurança. A equipe continuará o
          atendimento pelos contatos informados.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mt-10 text-left"
      aria-label="Solicitação de orçamento"
      noValidate={false}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="font-bold text-zinc-200">
          Nome
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={120}
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className={inputClass}
          />
        </label>

        <label className="font-bold text-zinc-200">
          WhatsApp
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            minLength={10}
            maxLength={30}
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={inputClass}
          />
        </label>

        <label className="font-bold text-zinc-200">
          E-mail <span className="font-normal text-zinc-400">(opcional)</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            className={inputClass}
          />
        </label>

        <label className="font-bold text-zinc-200">
          Cidade <span className="font-normal text-zinc-400">(opcional)</span>
          <input
            name="city"
            autoComplete="address-level2"
            maxLength={120}
            value={form.city}
            onChange={(event) => update("city", event.target.value)}
            className={inputClass}
          />
        </label>

        <label className="font-bold text-zinc-200 md:col-span-2">
          Serviço
          <select
            name="service"
            value={form.service}
            onChange={(event) => update("service", event.target.value)}
            className={inputClass}
          >
            <option value="">Selecione, se souber</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>

        <label className="font-bold text-zinc-200 md:col-span-2">
          Conte sobre o projeto
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={2_000}
            rows={5}
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            className={inputClass}
            placeholder="Informe medidas, local, prazo e o que precisa instalar."
          />
        </label>
      </div>

      <div className="mt-6 space-y-4">
        <label className="flex min-h-12 items-start gap-3 text-sm leading-6 text-zinc-300">
          <input
            name="privacy"
            type="checkbox"
            required
            checked={form.privacy}
            onChange={(event) => update("privacy", event.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-blue-600"
          />
          Autorizo o uso dos dados informados para responder a esta solicitação
          de orçamento.
        </label>

        <label className="flex min-h-12 items-start gap-3 text-sm leading-6 text-zinc-300">
          <input
            name="marketing"
            type="checkbox"
            checked={form.marketing}
            onChange={(event) => update("marketing", event.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-blue-600"
          />
          Quero receber novidades e ofertas da Arantes Visual.
        </label>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="min-h-14 rounded-full bg-blue-600 px-9 py-4 text-base font-black text-white shadow-xl shadow-blue-600/30 transition hover:bg-blue-500 disabled:cursor-wait disabled:opacity-60"
        >
          {status === "submitting" ? "Enviando..." : "Enviar solicitação"}
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("lead_form_fallback")}
          className="min-h-12 rounded-full border border-white/20 px-7 py-3 text-center font-bold text-white transition hover:border-green-400"
        >
          Continuar pelo WhatsApp
        </a>
      </div>

      <p aria-live="polite" className="mt-5 min-h-7 text-sm text-amber-300">
        {status === "error" ? errorMessage : ""}
      </p>
    </form>
  );
}
