import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabaseServer } from "@/lib/supabaseServer";

type BookingPayload = {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BookingPayload;

    if (!body?.name || !body?.email || !body?.date) {
      return NextResponse.json(
        { error: "name, email, and date are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from("appointments")
      .insert({
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone?.trim() || null,
        date: body.date,
        time: body.time?.trim() || null,
        message: body.message?.trim() || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const notifyTo = process.env.BOOKING_NOTIFY_TO || gmailUser;

    if (!gmailUser || !gmailPass || !notifyTo) {
      return NextResponse.json(
        { error: "Missing Gmail SMTP env vars" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const adminSubject = `New Appointment: ${body.name} (${body.date}${
      body.time ? ` ${body.time}` : ""
    })`;

    const adminText = [
      `Name: ${body.name}`,
      `Email: ${body.email}`,
      body.phone ? `Phone: ${body.phone}` : null,
      `Date: ${body.date}`,
      body.time ? `Time: ${body.time}` : null,
      body.message ? `Message: ${body.message}` : null,
      "",
      "This booking was saved in Supabase.",
    ]
      .filter(Boolean)
      .join("\n");

    await transporter.sendMail({
      from: `Appointments <${gmailUser}>`,
      to: notifyTo,
      subject: adminSubject,
      text: adminText,
    });

    await transporter.sendMail({
      from: `Aditi Singh <${gmailUser}>`,
      to: body.email,
      subject: "Your appointment request is received",
      text:
        "Thank you for booking an appointment. We have received your request and will contact you shortly.",
    });

    return NextResponse.json({ ok: true, booking: data });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
