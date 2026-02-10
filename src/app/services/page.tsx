"use client";

import React from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import {
  FileText,
  BriefcaseBusiness,
  Salad,
  ClipboardList,
  Activity,
  HeartPulse,
} from "lucide-react";

function Services() {
  const services = [
    {
      Icon: FileText,
      heading: "Personalized Nutrition Plans",
      para:
        "Customized meal plans based on your lifestyle, preferences, and health goals.",
    },
    {
      Icon: Activity,
      heading: "Weight Management",
      para:
        "A sustainable, supportive approach to achieving and maintaining a healthy weight.",
    },
    {
      Icon: BriefcaseBusiness,
      heading: "Corporate Wellness",
      para:
        "Engaging workshops and programs that promote a healthy and productive workforce.",
    },
    {
      Icon: ClipboardList,
      heading: "Clinical Nutrition",
      para:
        "Diet support for medical conditions with evidence-based guidance and ongoing follow-ups.",
    },
    {
      Icon: Salad,
      heading: "Lifestyle Coaching",
      para:
        "Daily habits, routines, and mindful eating to build lasting wellness.",
    },
    {
      Icon: HeartPulse,
      heading: "Holistic Health Support",
      para:
        "Stress, sleep, and energy optimization with balanced nutrition and lifestyle steps.",
    },
  ];

  return (
    <div className="mx-4 md:mx-10 lg:mx-24 xl:mx-40 py-12">
      <div className="text-center fade-up">
        <h1 className="font-semibold text-4xl">Services</h1>
        <p className="mt-2 text-gray-700">
          Tailored nutrition and lifestyle guidance designed for real life.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6">
        {services.map((s, index) => (
          <Card
            key={index}
            Icon={s.Icon}
            heading={s.heading}
            para={s.para}
          />
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold">What You Get</h2>
          <p className="mt-2 text-gray-700">
            Clear goals, a practical plan, and ongoing support to help you stay
            consistent and confident.
          </p>
          <p className="mt-2 text-gray-700">Personalized meal guidance.</p>
          <p className="text-gray-700">Weekly check-ins and adjustments.</p>
          <p className="text-gray-700">Habit coaching and motivation.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold">How It Works</h2>
          <p className="mt-2 text-gray-700">
            A simple, structured process to keep you moving forward.
          </p>
          <p className="mt-2 text-gray-700">Consultation and assessment.</p>
          <p className="text-gray-700">Plan creation and nutrition mapping.</p>
          <p className="text-gray-700">Follow-ups and progress review.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold">Best For</h2>
          <p className="mt-2 text-gray-700">
            Busy professionals, families, and anyone seeking sustainable health.
          </p>
          <p className="mt-2 text-gray-700">Weight goals and metabolic health.</p>
          <p className="text-gray-700">Digestive and lifestyle concerns.</p>
          <p className="text-gray-700">Corporate wellness needs.</p>
        </div>
      </div>

      <div className="mt-12 text-center bg-[#DF8020]/10 border border-[#DF8020]/30 rounded-2xl p-8 fade-up">
        <h2 className="text-2xl font-semibold">Ready to Get Started?</h2>
        <p className="mt-2 text-gray-700">
          Book a consultation and take the first step toward a healthier you.
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Button href="/contact">Book an Appointment</Button>
          <Button href="/testimonials">View Testimonials</Button>
        </div>
      </div>
    </div>
  );
}

export default Services;
