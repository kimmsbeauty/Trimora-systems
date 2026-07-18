import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { ContactCard } from "@/components/contact-card";

export const metadata = buildMetadata({
  title: "Contact — Trimora Systems",
  description: "Get in touch with Trimora Systems — by email, WhatsApp, or find us in Nyeri, Kenya.",
  path: "/contact",
});

const CONTACT_METHODS = [
  {
    id: "email",
    icon: <Mail className="text-accent-ink" size={24} strokeWidth={1.75} aria-hidden="true" />,
    title: "Email",
    description: "support@trimorasystems.com — we aim to respond the same business day.",
    copyValue: "support@trimorasystems.com",
    copiedDescription: "Copied! Paste it into your email app.",
  },
  {
    id: "whatsapp",
    icon: <MessageCircle className="text-accent-ink" size={24} strokeWidth={1.75} aria-hidden="true" />,
    title: "WhatsApp",
    description: "+254 702 904 562 — for a quicker back-and-forth.",
    href: "https://wa.me/254702904562",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="font-display text-3xl sm:text-4xl text-ink mb-3 text-center">
          Get in touch
        </h1>
        <p className="text-ink-muted text-center max-w-xl mx-auto mb-14 leading-relaxed">
          Questions about Trimora POS, pricing, or whether we&apos;re a fit for your business?
          We&apos;d like to hear from you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {CONTACT_METHODS.map((method) => (
            <ContactCard key={method.id} {...method} />
          ))}
        </div>

        <div className="border-t border-rule pt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-xl mx-auto text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <span className="flex items-center gap-2 text-sm font-medium text-ink">
              <MapPin className="text-accent-ink" size={18} strokeWidth={1.75} aria-hidden="true" />
              Office
            </span>
            <p className="text-sm text-ink-muted leading-relaxed">
              Prestige Plaza, 3rd Floor
              <br />
              Kimathi Street, Nyeri, Kenya
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-start gap-2">
            <span className="flex items-center gap-2 text-sm font-medium text-ink">
              <Clock className="text-accent-ink" size={18} strokeWidth={1.75} aria-hidden="true" />
              Hours
            </span>
            <p className="text-sm text-ink-muted leading-relaxed">
              Monday – Friday
              <br />
              8:00am – 5:00pm EAT
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
