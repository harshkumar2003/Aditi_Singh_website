"use client";
import Image from "next/image";
import React from "react";
import {Heart ,Leaf ,Brain , GraduationCap , Hospital , Users , CircleStar } from 'lucide-react'
import Card from "@/components/Card";

function About() {

  const cardCo = [
    {Icon : Heart, heading : 'Holistic Health' , para : "I look at the whole person, considering not just diet but also lifestyle, stress, and emotional well-being." },
    {Icon : Leaf, heading : 'Natural Foods' , para : "My focus is on whole, minimally processed foods that nourish the body from the inside out." },
    {Icon : Brain, heading : 'Evidence-Based' , para : "My recommendations are grounded in the latest scientific research to ensure effective and safe guidance." }
  ]
  const cardCo1 = [
    { Icon: Heart, heading : 'Empathy' , para : "I listen with an open heart to understand your unique story and challenges." },
    { Icon: Brain, heading : 'Integrity' , para : "My practice is built on honesty, transparency, and ethical principles." },
    { Icon: CircleStar, heading : 'Personalization' , para : "There is no one-size-fits-all approach; your plan will be tailored to you." },
    { Icon: Users, heading : 'Compassion' , para : "I provide a supportive, non-judgmental space for your wellness journey." },
    { Icon: GraduationCap, heading : 'Education' , para : "I empower you with knowledge to make informed decisions about your health." },
    { Icon: Leaf, heading : 'Collaboration' , para : "We work together as partners to achieve your health and wellness goals." },
  ]

  const Q1 = [
    {Icon : GraduationCap, heading : "Master's in Food and Nutrition" , para : "IIMT Meerut,Uttar Pradesh" },
    {Icon : GraduationCap, heading : "Bachelor's in Clinical Nutrition and Dietetics" , para : "MDDM College Muzaffarpur,Bihar" },
  ]
  const Q2 = [
    {Icon : Hospital, heading : "Clinical Dietitian" , para : "Jeevak Heart Hospital and Research Institute Pvt. Ltd." },
    
  ]
  const Q3 = [
    {Icon : Users, heading : "Lifetime Member" , para : "The Indian Association for Parenteral and Enteral Nutrition (IAPEN India)" },
    
  ]
  const Q4 = [
    {Icon : CircleStar , para : "Certificate in Diet Modification & Planning" },
    {Icon : CircleStar , para : "Certificate in Nutritional Interventions for PCOS and Thyroid Management" },
    {Icon : CircleStar , para : "Specialised Training in Critical Care Nutrition" },
    
  ]
  return (
      <div className="mt-4 fade-up">
      <div className="px-4 md:px-6 lg:px-8 md:flex justify-evenly items-center gap-8">
        <div className="flex justify-center md:justify-start shrink-0">
          <Image
            src="/about.png"
            alt="Aditi Singh"
            width={400}
            height={400}
            className="rounded-full w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 object-cover object-top"
          />
        </div>
      
        <div className="text-center md:text-left mt-4 md:mt-0 md:w-1/2">
          <h1 className="font-extrabold text-2xl md:text-3xl">About Aditi Singh</h1>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-2">
            A brief, welcoming statement about my passion for helping people
            achieve their health goals through balanced nutrition and mindful
            living.
          </p>
        </div>
      </div>


      <div className="mt-8 px-4 max-w-3xl mx-auto">
        <h1 className="font-extrabold text-2xl md:text-3xl text-center">My Story</h1>
        <p className="text-left sm:text-justify leading-relaxed pt-4 text-sm sm:text-base">
          My journey into the world of nutrition began not in a classroom, but
          from a personal quest for wellness. Growing up, I was always
          fascinated by how food could affect our energy, mood, and overall
          vitality. This curiosity turned into a passion as I witnessed
          firsthand how transformative a mindful approach to eating can be, both
          for myself and for my loved ones. <br /> <br />
          Driven by a desire to understand the
          science behind this magic, I pursued a formal education in dietetics.
          It was here that I discovered my life's purpose: to demystify
          nutrition and empower individuals to build a healthy, joyful
          relationship with food. I believe that wellness is not about
          restriction or deprivation, but about nourishment, balance, and
          self-compassion. My practice is built on the foundation of
          evidence-based science, combined with a deep understanding of the
          unique challenges and triumphs of each individual's health journey.
        </p>
      </div>
      <div className="mt-8 px-4 pb-6">
        <h1 className="font-extrabold text-2xl md:text-3xl text-center">Philosophy & Approach</h1>

        <div className="mt-4  justify-center items-center  grid sm:grid-cols-2 xl:grid-cols-3 gap-3 justify-items-center">
          {cardCo.map((con,index)=>(
          <Card key={index} Icon={con.Icon} heading={con.heading} para={con.para}/>
        ))}
        </div>
      </div>

      <div className="mt-8 px-4 pb-6">
        <h1 className="font-extrabold text-2xl md:text-3xl text-center">My Values</h1>
        <div className="justify-center items-center  grid sm:grid-cols-2  gap-3 mt-4 justify-items-center xl:grid-cols-3">
          {cardCo1.map((con,index)=>(
          <Card key={index} Icon={con.Icon} heading={con.heading} para={con.para}/>
        ))}
        </div>
          
      </div>
      

      <div className="mt-8 px-4 pb-6">
          <h1 className="font-extrabold text-2xl md:text-3xl text-center">Academic Excellence</h1>
          <div className="justify-center items-center  grid sm:grid-cols-2  gap-3 justify-items-center mt-4 ">
              {Q1.map((con,index)=>(
                <Card key={index} Icon={con.Icon} heading={con.heading} para={con.para}/>
              ))}
          </div>
      </div>
      <div className="mt-8 px-4 pb-6">
          <h1 className="font-extrabold text-2xl md:text-3xl text-center">Professional Experience</h1>
          <div className="justify-center items-center  grid sm:grid-cols-2  gap-3 justify-items-center mt-4 xl:grid-cols-1">
              {Q2.map((con,index)=>(
                <Card key={index} Icon={con.Icon} heading={con.heading} para={con.para}/>
              ))}
          </div>
      </div>
      <div className="mt-8 px-4 pb-6">
          <h1 className="font-extrabold text-2xl md:text-3xl text-center">Professional Memberships & Associations</h1>
          <div className="justify-center items-center  grid sm:grid-cols-2  gap-3 justify-items-center mt-4 xl:grid-cols-1">
              {Q3.map((con,index)=>(
                <Card key={index} Icon={con.Icon} heading={con.heading} para={con.para}/>
              ))}
          </div>
      </div>
      <div className="mt-8 px-4 pb-6">
          <h1 className="font-extrabold text-2xl md:text-3xl text-center">Certifications & Specialisations</h1>
          <div className="justify-center items-center  grid sm:grid-cols-2  gap-3 justify-items-center mt-4 xl:grid-cols-3">
              {Q4.map((con,index)=>(
                <Card key={index} Icon={con.Icon}  para={con.para}/>
              ))}
          </div>
      </div>


    </div>
  );
}

export default About;
