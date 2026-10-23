import Script from "next/script";
import { CalendarDays, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BOOKING_URL, CONTACT_FORM_ID } from "@/lib/constants";
import { SittingDogs } from "@/components/marketing/sitting-dogs";

// The form itself lives in GoHighLevel (Apso sub-account, "Apso website contact").
// Its fields, styling (custom CSS), thank-you message and notifications are edited there.
export function ContactForm() {
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
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[8px] border border-line-1 bg-bg-0 px-5 text-[15px] font-medium text-fg-1 transition-colors hover:bg-bg-2"
            >
              <CalendarDays aria-hidden="true" className="h-4 w-4" />
              Open the calendar
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <p className="text-[12px] text-[#9CA3AF]">Opens our booking page on api.leadconnectorhq.com</p>
          </aside>

          <div className="order-1 min-w-0 flex-1 rounded-[12px] border border-line-1 p-6 sm:p-8 lg:order-2">
            <h2 className="mb-5 font-display text-[28px] font-extrabold text-fg-1">Tell us enough to start usefully</h2>
            <iframe
              src={`https://api.leadconnectorhq.com/widget/form/${CONTACT_FORM_ID}`}
              id={`inline-${CONTACT_FORM_ID}`}
              title="Apso website contact"
              className="block min-h-[640px] w-full border-0 sm:min-h-[460px]"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-activation-type="alwaysActivated"
              data-deactivation-type="neverDeactivate"
              data-form-name="Apso website contact"
              data-layout-iframe-id={`inline-${CONTACT_FORM_ID}`}
              data-form-id={CONTACT_FORM_ID}
            />
            <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
          </div>
        </div>
      </Container>
    </section>
  );
}
