"use client";
import Button from "@/components/Button";
// import "./globals.css";
import Image from "next/image";


export default function Home() {
  return (
    <>
    {/* hero */}
        <main className="mx-4 pt-8">
          <div className="flex flex-col md:flex-row-reverse items-center justify-between md:px-12 lg:px-30 xl:px-60 py-8">
              
              <div className=" flex   justify-center items-center ">
                <Image src="/hero_imag.png" alt="" width={300} height={300} className="rounded-xl"/>
              </div>
              <div className="md:w-1/2 text-center md:text-left px-8">
                <h1 className="font-extrabold text-2xl md:text-3xl lg:text-4xl text-balance">Your Journey to a Healthier You Starts Here</h1>
                <p className="mt-3 text-gray-700 text-pretty">Welcome to the practice of Aditi Singh, a dedicated dietitian committed to helping you
      achieve your wellness goals through personalized nutrition and lifestyle guidance.</p>

                   <div className="flex justify-center md:justify-start mt-4">
                      <Button >Book an Appointment</Button>
                  </div>
              </div>

              
          </div>
           
        </main>
    </>
  );
}
