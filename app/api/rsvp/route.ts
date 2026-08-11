import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rsvps } from "@/lib/schema";
import { count } from "drizzle-orm";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const SEAT_LIMIT = 40;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, businessName, role, industry, motivation, heardFrom } = body;

    if (!fullName || !email || !phone || !businessName || !role || !industry || !motivation || !heardFrom) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Check seat limit
    let seatCount = 0;
    try {
      const [{ value }] = await db.select({ value: count() }).from(rsvps);
      seatCount = value;
    } catch (dbErr) {
      console.error("DB count error:", dbErr);
      return NextResponse.json({ error: "Database error: " + String(dbErr) }, { status: 500 });
    }

    if (seatCount >= SEAT_LIMIT) {
      return NextResponse.json({ error: "Sorry, all seats are taken." }, { status: 409 });
    }

    // Save RSVP
    try {
      await db.insert(rsvps).values({ fullName, email, phone, businessName, role, industry, motivation, heardFrom });
    } catch (insertErr) {
      console.error("DB insert error:", insertErr);
      return NextResponse.json({ error: "Insert error: " + String(insertErr) }, { status: 500 });
    }

    // Notify admin
    try {
      await resend.emails.send({
        from: "Founders Table <info@unqodigital.com>",
        to: process.env.NOTIFY_EMAIL!,
        subject: `New RSVP — ${fullName}`,
        html: `
          <h2>New Founders Table RSVP</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Business/Organisation:</strong> ${businessName}</p>
          <p><strong>Role:</strong> ${role}</p>
          <p><strong>Industry:</strong> ${industry}</p>
          <p><strong>Motivation:</strong> ${motivation}</p>
          <p><strong>Heard from:</strong> ${heardFrom}</p>
          <p><strong>Seats remaining:</strong> ${SEAT_LIMIT - seatCount - 1}</p>
        `,
      });
    } catch (emailErr) {
      console.error("Admin email error:", emailErr);
    }

    // Confirm to attendee
    try {
      await resend.emails.send({
        from: "Founders Table <info@unqodigital.com>",
        to: email,
        subject: "You're on the list — Founders Table Namibia",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0a0a0a;">You're in, ${fullName.split(" ")[0]}.</h2>
            <p>Thank you for registering for <strong>The Founders Table Namibia</strong>. We have received your RSVP and look forward to seeing you.</p>
            <div style="background: #f5f5f0; padding: 20px; border-radius: 8px; margin: 24px 0;">
              <p style="margin: 0 0 8px;"><strong>📅 Date:</strong> Thursday, 20 August 2026</p>
              <p style="margin: 0 0 8px;"><strong>📍 Venue:</strong> Vinyls Music Café, Windhoek</p>
              <p style="margin: 0;"><strong>🕖 Time:</strong> 18:30 – 21:30</p>
            </div>
            <p>Further details will be shared closer to the event. Feel free to reach out at <a href="mailto:info@unqodigital.com">info@unqodigital.com</a>.</p>
            <p style="color: #888; font-size: 13px; margin-top: 32px;">Unqo Digital Solutions CC · Windhoek, Namibia</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Attendee email error:", emailErr);
    }

    return NextResponse.json({ success: true, seatsRemaining: SEAT_LIMIT - seatCount - 1 });
  } catch (error) {
    console.error("Unhandled error:", error);
    return NextResponse.json({ error: "Something went wrong: " + String(error) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [{ value }] = await db.select({ value: count() }).from(rsvps);
    return NextResponse.json({ total: value, remaining: SEAT_LIMIT - value, limit: SEAT_LIMIT });
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
