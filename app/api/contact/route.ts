import { NextResponse } from "next/server";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedProjectTypes = new Set([
  "Website development",
  "Web application",
  "UI / UX design",
  "Product prototype",
  "Custom software",
  "Something else"
]);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Please submit a valid contact form." }, { status: 400 });
    }
    const payload = body as Record<string, unknown>;
    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    const email = typeof payload.email === "string" ? payload.email.trim() : "";
    const projectType = typeof payload.projectType === "string" ? payload.projectType.trim() : "";
    const message = typeof payload.message === "string" ? payload.message.trim() : "";
    const website = typeof payload.website === "string" ? payload.website.trim() : "";

    // Quietly accept honeypot submissions without sending email.
    if (website) return NextResponse.json({ ok: true });

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json({ error: "Please enter a name between 2 and 80 characters." }, { status: 400 });
    }
    if (!emailPattern.test(email) || email.length > 160) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (message.length < 10 || message.length > 4000) {
      return NextResponse.json({ error: "Your message should be between 10 and 4,000 characters." }, { status: 400 });
    }
    if (projectType && !allowedProjectTypes.has(projectType)) {
      return NextResponse.json({ error: "Please choose a valid project type." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      return NextResponse.json(
        { error: "The contact form is not connected yet. Please use the email or social links, or configure the Resend settings." },
        { status: 503 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeProjectType = escapeHtml(projectType || "Not specified");
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry: ${projectType || "New project"}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#151515;max-width:640px">
            <h2>New portfolio enquiry</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Project type:</strong> ${safeProjectType}</p>
            <hr />
            <p><strong>Message</strong></p>
            <p>${safeMessage}</p>
          </div>
        `
      })
    });

    if (!resendResponse.ok) {
      const providerError = await resendResponse.json().catch(() => null);
      console.error("Resend delivery failed:", providerError ?? resendResponse.statusText);
      return NextResponse.json({ error: "Your message could not be delivered right now. Please try again later." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Something went wrong while processing your message." }, { status: 500 });
  }
}
