"use client";

import { useRef, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim() ?? "";
const formEndpoint = /^[a-z0-9]+$/i.test(formId) ? `https://formspree.io/f/${formId}` : "";

export const hasContactForm = Boolean(formEndpoint || siteConfig.email);

export default function ContactForm() {
  const submitting = useRef(false);
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; error?: boolean } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return;

    const subject = `Portfolio enquiry: ${data.get("projectType")}`;

    if (!formEndpoint && siteConfig.email) {
      const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setFeedback({ message: "Send the draft from your email app to complete delivery." });
      return;
    }

    if (!formEndpoint) return;
    submitting.current = true;
    setPending(true);
    setFeedback(null);
    data.set("subject", subject);

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error("Form submission failed");
      form.reset();
      setFeedback({ message: "Your message was submitted." });
    } catch {
      setFeedback({ error: true, message: "Your message could not be submitted. Try again or message me on Instagram." });
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      action={formEndpoint || undefined}
      method="post"
      aria-busy={pending}
    >
      <div className="form-row">
        <label>Your name
          <input name="name" type="text" autoComplete="name" required minLength={2} maxLength={80} disabled={pending} />
        </label>
        <label>Your email
          <input name="email" type="email" autoComplete="email" required maxLength={160} disabled={pending} />
        </label>
      </div>
      <label>What are you thinking about?
        <select name="projectType" disabled={pending}>
          <option>Product idea</option>
          <option>Website or storefront</option>
          <option>Prototype feedback</option>
          <option>Research collaboration</option>
          <option>Something else</option>
        </select>
      </label>
      <label>Your message
        <textarea name="message" required minLength={10} maxLength={4000} rows={5} disabled={pending} />
      </label>
      <label className="honeypot" aria-hidden="true">Leave this field empty
        <input name="_gotcha" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="form-bottom">
        <button className="button button-primary form-submit" type="submit" disabled={pending}>
          {pending ? "Sending…" : formEndpoint ? "Send message" : "Open email draft"}
          <Send size={15} />
        </button>
      </div>
      <div role="status">
        {feedback && <p className={`form-feedback ${feedback.error ? "error" : ""}`}>{feedback.message}</p>}
      </div>
    </form>
  );
}
