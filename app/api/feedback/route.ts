import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, rating, interest, comments, notify } = body;

    await resend.emails.send({
      from: "Founders Table <info@unqodigital.com>",
      to: process.env.NOTIFY_EMAIL!,
      subject: `Founders Table Feedback — ${name}`,
      html: `
        <h2>New Feedback Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Rating:</strong> ${rating}</p>
        <p><strong>Interest:</strong> ${interest || "None selected"}</p>
        <p><strong>Comments:</strong> ${comments || "None"}</p>
        <p><strong>Notify for Edition 2:</strong> ${notify ? "Yes" : "No"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send feedback" }, { status: 500 });
  }
}
