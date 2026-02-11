"use client";
import Button from "@/components/Button";
import Card from "@/components/Card";
import TCard from "@/components/TestimonialCard";
// import "./globals.css";
import { BriefcaseBusiness, FileText } from 'lucide-react';
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const cardContent = [
    {Icon : FileText , heading : 'Personalized Nutrition Plans' , para : "Customized meal plans based on your lifestyle, preferences, and health goals."},
    {Icon : FileText , heading : 'Weight Management' , para : "A sustainable and supportive approach to achieving and maintaining a healthy weight."},
    {Icon : BriefcaseBusiness , heading : 'Corporate Wellness' , para : "Engaging workshops and programs to promote a healthy workforce."}
  ]
  const [testimonials, setTestimonials] = useState<
    { avatar_url?: string | null; name: string; role?: string | null; testimonial: string }[]
  >([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/testimonials?limit=2");
        const json = await res.json();
        if (res.ok) {
          setTestimonials(json.testimonials || []);
        }
      } catch {
        // ignore
      }
    }
    load();
  }, []);
  return (
    <>
    {/* hero */}
        <main className="mx-4 md:mx-8 lg:mx-16 xl:mx-40 pt-8 md:pt-12">
          <div className="relative overflow-hidden rounded-3xl surface bg-gradient-to-br from-[#fff1e6] to-white p-6 md:p-10 fade-up">
            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#DF8020]/15 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-[#DF8020]/10 blur-2xl" />
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between lg:px-6 py-4 relative z-10 gap-6 lg:gap-8">
               
              <div className="flex justify-center items-center shrink-0">
                <Image src="/hero.png" alt="" width={320} height={320} className="rounded-2xl float-slow w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 object-cover"/>
              </div>
              <div className="w-full lg:w-1/2 text-center lg:text-left px-2 sm:px-4 lg:px-0 mt-1 lg:mt-0">
                <p className="text-xs uppercase tracking-[0.3em] text-[#DF8020]">Dietitian</p>
                <h1 className="font-extrabold text-2xl md:text-3xl xl:text-4xl text-balance mt-2">Your Journey to a Healthier You Starts Here</h1>
                <p className="mt-3 text-gray-700 text-pretty">Welcome to the practice of Aditi Singh, a dedicated dietitian committed to helping you
                    achieve your wellness goals through personalized nutrition and lifestyle guidance.</p>

                   <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center lg:justify-start items-stretch sm:items-center w-full">
                      <Button href="/contact" className="w-full sm:w-auto">Book an Appointment</Button>
                      <Button href="/about" className="w-full sm:w-auto">Discover My Approach</Button>
                  </div>
              </div>
          </div>
          </div>
           
        </main>

        {/* My services */}

        <div className="mt-20 mx-4 md:mx-10 lg:mx-24 xl:mx-40 mb-4">
            <h1 className="text-center font-semibold text-3xl md:text-4xl">My Services</h1>
          <div className="mx-4 text-center mt-8">
            <h2 className="font-bold text-xl md:text-3xl lg:text-4xl text-balance">Tailored Nutrition for a Balanced Life</h2>
            <p className="mt-2 text-gray-700 text-pretty">I offer a range of services designed to meet your unique needs and help you build a healthy relationshipwith food.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center mt-10 gap-6">
            {cardContent.map((con,index)=>(
              <Card key={index} Icon={con.Icon} heading={con.heading} para={con.para} href="/services"/>
            ))}

          </div>
          
        </div>


        {/* Testimonials */}

        <div className="mt-20 mx-4 md:mx-10 lg:mx-24 xl:mx-40 mb-20">
            <h1 className="text-center font-semibold text-3xl md:text-4xl">What Clients Say</h1>
          {/* <div className="mx-4 text-center mt-8">
            <h2 className="font-bold text-xl md:text-3xl lg:text-4xl text-balance">Tailored Nutrition for a Balanced Life</h2>
            <p className="mt-2 text-gray-700 text-pretty">I offer a range of services designed to meet your unique needs and help you build a healthy relationshipwith food.</p>
          </div> */}

          <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
            {testimonials.length > 0 ? (
              testimonials.map((t, index) => (
                <TCard
                  key={index}
                  avatar={t.avatar_url || undefined}
                  name={t.name}
                  role={t.role || undefined}
                  testimonial={t.testimonial}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 w-full">
                No testimonials yet.
              </p>
            )}

          </div>
          
        </div>

    </>
  );
}
