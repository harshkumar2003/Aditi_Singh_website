"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  href?: string
  Icon?: LucideIcon;
  heading?: string;
  para: string;
};

function Card({ href ="#" , Icon, heading, para }: Props) {
  return (
    <Link href={href} onClick={(e)=>{
      if(!href || href === "#") e.preventDefault();
    }}>

        <div className="cursor-pointer surface rounded-2xl p-6
                     flex flex-col items-center text-center transition-transform transform
                     hover:-translate-y-1 hover:shadow-xl duration-300 hover-lift fade-up
                     w-72 md:w-80 min-h-[250px]">
          {Icon && (
          <div className="bg-[#DF8020]/15 rounded-full p-4 mb-4">
            <Icon className="w-11 h-11 text-[#DF8020]" />
          </div>
        )}
          {heading && (<h3 className="text-xl font-bold text-gray-900 mb-2">{heading}</h3>)}
          <p className="text-gray-600">{para}</p>
        </div>
    </Link>
  );
}

export default Card;
