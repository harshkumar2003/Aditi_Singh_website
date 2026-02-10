"use client";

import React, { useEffect, useState } from "react";
import TCard from "@/components/TestimonialCard";

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  testimonial: string;
  avatar_url: string | null;
  created_at: string;
};

type FormState = {
  name: string;
  role: string;
  testimonial: string;
  avatar_url: string;
};

const initialState: FormState = {
  name: "",
  role: "",
  testimonial: "",
  avatar_url: "",
};

function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "error"; text: string } | null>(
    null
  );

  async function loadAll() {
    const res = await fetch("/api/testimonials");
    const json = await res.json();
    if (res.ok) {
      setItems(json.testimonials || []);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

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
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          role: form.role,
          testimonial: form.testimonial,
          avatar_url: form.avatar_url,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || "Failed to submit testimonial");
      }
      setForm(initialState);
      setStatus({ type: "ok", text: "Thank you! Your testimonial was added." });
      await loadAll();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setStatus({ type: "error", text: message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-4 md:mx-10 lg:mx-24 xl:mx-40 py-12 fade-up">
      <h1 className="text-center font-semibold text-4xl">Testimonials</h1>
      <p className="text-center text-gray-700 mt-2">
        Share your experience. Your feedback helps others.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-md p-6 md:p-8 space-y-5"
      >
        <div>
          <h2 className="text-lg font-semibold">Your Details</h2>
          <p className="text-sm text-gray-500">Shown publicly with your testimonial.</p>
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
            <span className="text-sm font-medium text-gray-700">Role (optional)</span>
            <input
              name="role"
              value={form.role}
              onChange={onChange}
              placeholder="e.g., Teacher, Freelancer"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            />
          </label>
        </div>

        <label className="space-y-1">
          <span className="text-sm font-medium text-gray-700">Avatar URL (optional)</span>
          <input
            name="avatar_url"
            value={form.avatar_url}
            onChange={onChange}
            placeholder="https://..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium text-gray-700">Your Testimonial *</span>
          <textarea
            name="testimonial"
            value={form.testimonial}
            onChange={onChange}
            placeholder="Share your experience..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full min-h-32"
            required
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
          {loading ? "Submitting..." : "Submit Testimonial"}
        </button>
      </form>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((t) => (
          <TCard
            key={t.id}
            avatar={t.avatar_url || undefined}
            name={t.name}
            role={t.role || undefined}
            testimonial={t.testimonial}
          />
        ))}
        {items.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No testimonials yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Testimonials;
