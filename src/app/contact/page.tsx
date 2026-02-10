"use client";

import React, { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  message: "",
};

function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "error"; text: string } | null>(
    null
  );

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          date: form.date,
          time: form.time,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Booking failed");
      }
      setForm(initialState);
      setStatus({ type: "ok", text: "Booking received. We will contact you soon." });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setStatus({ type: "error", text: message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-4 md:mx-10 lg:mx-24 xl:mx-40 py-12">
      <h1 className="text-center font-semibold text-4xl">Book an Appointment</h1>
      <p className="text-center text-gray-700 mt-3">
        Share your details and preferred date. We will confirm the appointment shortly.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-10 max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-md p-6 md:p-8 space-y-5"
      >
        <div>
          <h2 className="text-lg font-semibold">Personal Details</h2>
          <p className="text-sm text-gray-500">We will only use this to contact you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="space-y-1">
            <span className="text-sm font-medium text-gray-700">Full Name *</span>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Your full name"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              required
            />
          </label>
          <label className="space-y-1">
            <span className="text-sm font-medium text-gray-700">Email *</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@email.com"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              required
            />
          </label>
          <label className="space-y-1">
            <span className="text-sm font-medium text-gray-700">Phone</span>
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="Phone number"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            />
          </label>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Preferred Schedule</h2>
          <p className="text-sm text-gray-500">We will confirm a time by email.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="space-y-1">
            <span className="text-sm font-medium text-gray-700">Date *</span>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={onChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              required
            />
          </label>
          <label className="space-y-1">
            <span className="text-sm font-medium text-gray-700">Time (optional)</span>
            <input
              name="time"
              type="time"
              value={form.time}
              onChange={onChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            />
          </label>
        </div>

        <label className="space-y-1">
          <span className="text-sm font-medium text-gray-700">Health Goals / Notes</span>
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            placeholder="Tell us about your goals, concerns, or any medical conditions."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full min-h-28"
          />
        </label>

        {status && (
          <div
            className={
              status.type === "ok"
                ? "text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2"
                : "text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2"
            }
          >
            {status.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#DF8020] text-white font-semibold py-3 rounded-lg hover:bg-[#c96f1b] transition-colors disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}

export default Contact;
