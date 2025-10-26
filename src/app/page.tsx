"use client";
import Button from "@/components/Button";
import Card from "@/components/Card";
import TCard from "@/components/TestimonialCard";
// import "./globals.css";
import Image from "next/image";
import { FileText ,BriefcaseBusiness} from 'lucide-react';

export default function Home() {

  const cardContent = [
    {Icon : FileText , heading : 'Personalized Nutrition Plans' , para : "Customized meal plans based on your lifestyle, preferences, and health goals."},
    {Icon : FileText , heading : 'Weight Management' , para : "A sustainable and supportive approach to achieving and maintaining a healthy weight."},
    {Icon : BriefcaseBusiness , heading : 'Corporate Wellness' , para : "Engaging workshops and programs to promote a healthy workforce."}
  ]
  const testimonials = [
  {
    avatar: "/avatars/user1.jpg",
    name: "Harsh Kumar",
    role: "Full Stack Developer",
    testimonial: "This platform helped me achieve my goals faster!"
  },
  {
    avatar: "/avatars/user2.jpg",
    name: "Ishan Singh",
    role: "UI/UX Designer",
    testimonial: "The design and user experience are just amazing."
  }
]
  return (
    <>
    {/* hero */}
        <main className="mx-4 pt-10">
          <div className="flex flex-col md:flex-row-reverse items-center justify-between md:px-12 lg:px-30 xl:px-60 py-4">
              
              <div className=" flex   justify-center items-center ">
                <Image src="/hero_imag.png" alt="" width={300} height={300} className="rounded-xl"/>
              </div>
              <div className="md:w-1/2 text-center md:text-left px-8 mt-4">
                <h1 className="font-extrabold text-2xl md:text-3xl lg:text-4xl text-balance">Your Journey to a Healthier You Starts Here</h1>
                <p className="mt-3 text-gray-700 text-pretty">Welcome to the practice of Aditi Singh, a dedicated dietitian committed to helping you
                    achieve your wellness goals through personalized nutrition and lifestyle guidance.</p>

                   <div className="flex justify-center md:justify-start mt-4 space-x-2">
                      <Button href="/contact">Book an Appointment</Button>
                      <Button href="/about">Discover My Approach</Button>
                  </div>
              </div>
          </div>
           
        </main>

        {/* My services */}

        <div className="mt-36 mx-4 mb-4">
            <h1 className="text-center font-semibold text-4xl">My Services</h1>
          <div className="mx-4 text-center mt-8">
            <h2 className="font-bold text-xl md:text-3xl lg:text-4xl text-balance">Tailored Nutrition for a Balanced Life</h2>
            <p className="mt-2 text-gray-700 text-pretty">I offer a range of services designed to meet your unique needs and help you build a healthy relationshipwith food.</p>
          </div>

          <div className="md:flex justify-center space-x-6 space-y-3 pt-14">
            {cardContent.map((con,index)=>(
              <Card key={index} Icon={con.Icon} heading={con.heading} para={con.para} href="/services"/>
            ))}

          </div>
          
        </div>


        {/* Testimonials */}

        <div className="mt-28 mx-4 mb-20">
            <h1 className="text-center font-semibold text-4xl">What Clients Say</h1>
          {/* <div className="mx-4 text-center mt-8">
            <h2 className="font-bold text-xl md:text-3xl lg:text-4xl text-balance">Tailored Nutrition for a Balanced Life</h2>
            <p className="mt-2 text-gray-700 text-pretty">I offer a range of services designed to meet your unique needs and help you build a healthy relationshipwith food.</p>
          </div> */}

          <div className="md:flex justify-center space-x-6 space-y-3 pt-14">
            {testimonials.map((t,index)=>(
              <TCard key={index} avatar={t.avatar} name={t.name} role={t.role} testimonial={t.testimonial} />
            ))}

          </div>
          
        </div>

    </>
  );
}
