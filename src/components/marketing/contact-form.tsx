"use client";

import { useActionState } from "react";
import { CalendarDays, ChevronDown, CircleCheck, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { submitContact, type ContactState } from "@/app/(marketing)/contact/action";
import { CONTACT_TOPICS } from "@/app/(marketing)/contact/topics";
import { BOOKING_URL } from "@/lib/constants";
import { SittingDogs } from "@/components/marketing/sitting-dogs";

const initialState: ContactState = { success: false };

const control =
  "w-full rounded-[8px] border bg-bg-0 px-[14px] text-[15px] text-fg-1 placeholder:text-fg-5 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

function CalendarLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-line-1 bg-bg-0 px-5 text-[15px] font-medium text-fg-1 transition-colors hover:bg-bg-2 ${className}`}
    >
      <CalendarDays aria-hidden="true" className="h-4 w-4" />
      Open the calendar
      <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      <label htmlFor={id} className="flex items-baseline gap-1 text-[14px] font-medium text-fg-1">
        {label}
        <span className="text-[12px] font-normal text-fg-4">{required ? "Required" : "Optional"}</span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[13px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const err = state.fieldErrors ?? {};
  const fieldProps = (id: string) => ({
    id,
    name: id,
    "aria-invalid": err[id] ? true : undefined,
    "aria-describedby": err[id] ? `${id}-error` : undefined,
    className: `${control} ${id === "message" ? "min-h-[120px] resize-y py-3" : id === "topic" ? "h-[46px] appearance-none pr-10" : "h-[46px]"} ${
      err[id] ? "border-red-400" : "border-line-1"
    }`,
  });

  return (
    <section id="contact-form" className="pb-24 pt-6">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <aside className="order-2 flex flex-col gap-4 rounded-[12px] bg-navy p-8 text-white lg:order-1 lg:w-[520px] lg:shrink-0">
            <SittingDogs width={118} className="hidden lg:ml-[90px] lg:mt-[18px] lg:block" />
            <h2 className="font-display text-[28px] font-extrabold">Product and enterprise</h2>
            <p className="text-[16px] leading-[1.6] text-[#D1D5DB]">
              Architecture fit, team rollout, pricing, governance, and running in your own cloud.
            </p>
            <CalendarLink className="w-full" />
            <p className="text-[12px] text-[#9CA3AF]">Opens our booking page on api.leadconnectorhq.com</p>
          </aside>

          <div className="order-1 min-w-0 flex-1 lg:order-2">
            {state.success ? (
              <div role="status" className="flex flex-col items-start gap-5 rounded-[12px] bg-[#ECFDF3] p-8">
                <CircleCheck aria-hidden="true" className="h-8 w-8 text-[#16A34A]" />
                <h2 className="font-display text-[28px] font-extrabold text-fg-1">Message sent</h2>
                <p className="text-[16px] leading-[1.6] text-fg-3">
                  Thanks, {state.name}. We will reply to {state.email}.
                </p>
                <p className="text-[16px] leading-[1.6] text-fg-3">Want to talk sooner? Book a call and pick a time now.</p>
                <CalendarLink />
              </div>
            ) : (
              <form action={formAction} className="flex flex-col gap-5 rounded-[12px] border border-line-1 p-6 sm:p-8">
                <h2 className="font-display text-[28px] font-extrabold text-fg-1">Tell us enough to start usefully</h2>
                {state.error && (
                  <div className="rounded-[8px] border border-red-200 bg-red-50 p-3 text-[14px] text-red-700" role="alert">
                    {state.error}
                  </div>
                )}
                <div className="flex flex-col gap-5 sm:flex-row sm:gap-4">
                  <Field id="name" label="Name" required error={err.name}>
                    <input {...fieldProps("name")} placeholder="Your name" required autoComplete="name" />
                  </Field>
                  <Field id="email" label="Work email" required error={err.email}>
                    <input {...fieldProps("email")} type="email" placeholder="you@company.com" required autoComplete="email" />
                  </Field>
                </div>
                <Field id="topic" label="Topic" required error={err.topic}>
                  <div className="relative">
                    <select {...fieldProps("topic")} required defaultValue={CONTACT_TOPICS[0]}>
                      {CONTACT_TOPICS.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-[14px] top-[15px] h-4 w-4 text-fg-4" />
                  </div>
                </Field>
                <div className="flex flex-col gap-5 sm:flex-row sm:gap-4">
                  <Field id="company" label="Company" error={err.company}>
                    <input {...fieldProps("company")} placeholder="Company name" autoComplete="organization" />
                  </Field>
                  <Field id="jobTitle" label="Role" error={err.jobTitle}>
                    <input {...fieldProps("jobTitle")} placeholder="Your role" autoComplete="organization-title" />
                  </Field>
                </div>
                <Field id="message" label="What are you building?" required error={err.message}>
                  <textarea {...fieldProps("message")} placeholder="Describe the product, team, current stack, or question." required />
                </Field>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <p className="flex-1 text-[13px] leading-[1.5] text-fg-4">
                    Do not include API keys, credentials, personal customer data, or other secrets.
                  </p>
                  <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-brand px-5 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover disabled:opacity-60"
                  >
                    {pending ? "Sending..." : "Send message"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
