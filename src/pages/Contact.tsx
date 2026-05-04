import type { FormEvent } from "react";
import { useState } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { SITE_EMAIL } from "../constants/site";

/**
 * Lead form — swap `onSubmit` body for fetch('/api/contact', …).
 */
const Contact = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 700);
  };

  return (
    <div className="bg-lightGray pb-20 pt-10 md:pt-14">
      <div className="page-container grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-primary">Contact</p>
          <h1 className="mt-3 text-3xl font-bold text-text md:text-4xl">Let&apos;s talk</h1>
          <p className="mt-4 max-w-xl text-secondText">
            Enterprise pricing, partnerships, or platform questions — this form is wired for UX only;
            plug your API where indicated in source comments.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 max-w-lg space-y-4 rounded-2xl border border-lightGray2 bg-white p-6 accentuedDropShadow md:p-8"
          >
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-secondText">
                Name
              </span>
              <input
                name="name"
                required
                className="w-full rounded-lg border border-lightGray2 px-4 py-3 text-sm outline-none ring-primary focus:ring-2"
                placeholder="Your name"
                autoComplete="name"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-secondText">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-lightGray2 px-4 py-3 text-sm outline-none ring-primary focus:ring-2"
                placeholder="you@company.com"
                autoComplete="email"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-secondText">
                Topic
              </span>
              <select
                name="topic"
                className="w-full rounded-lg border border-lightGray2 px-4 py-3 text-sm font-semibold outline-none ring-primary focus:ring-2"
                defaultValue="sales"
              >
                <option value="sales">Sales · Enterprise</option>
                <option value="support">Product support</option>
                <option value="press">Press</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-secondText">
                Message
              </span>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full resize-y rounded-lg border border-lightGray2 px-4 py-3 text-sm outline-none ring-primary focus:ring-2"
                placeholder="How can we help?"
              />
            </label>
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn w-full rounded-lg bg-primary py-3 font-bold text-white hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : status === "sent" ? "Sent (mock)" : "Send message"}
            </button>
            {status === "sent" && (
              <p className="text-center text-sm font-semibold text-success" role="status">
                Message recorded locally — connect your backend to persist.
              </p>
            )}
          </form>
        </div>

        <aside className="space-y-6 rounded-2xl border border-lightGray2 bg-white p-6 accentuedDropShadow md:p-8">
          <h2 className="text-lg font-bold text-text">Office</h2>
          <ul className="space-y-5 text-sm text-secondText">
            <li className="flex gap-3">
              <FiPhone className="mt-0.5 shrink-0 text-xl text-primary" aria-hidden />
              <span>(480) 555-0103</span>
            </li>
            <li className="flex gap-3">
              <FiMail className="mt-0.5 shrink-0 text-xl text-primary" aria-hidden />
              <span>{SITE_EMAIL}</span>
            </li>
            <li className="flex gap-3">
              <FiMapPin className="mt-0.5 shrink-0 text-xl text-primary" aria-hidden />
              <span>4517 Washington Ave. Manchester, Kentucky 39495</span>
            </li>
          </ul>
          <p className="text-xs text-secondText">
            Hours: Mon–Fri · 9a–6p ET · Average reply under 4 business hours (mock SLA copy).
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Contact;
