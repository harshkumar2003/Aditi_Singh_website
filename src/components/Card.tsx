import React from "react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
 href: string
  Icon: LucideIcon;
  heading: string;
  para: string;
};

function Card({ href , Icon, heading, para }: Props) {
  return (
    <Link href={href} >

        <div className="cursor-pointer bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl duration-300 w-full sm:w-80">
          <div className="bg-[#DF8020]/20 rounded-full p-4 mb-4">
            <Icon className="w-12 h-12 text-[#DF8020]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{heading}</h3>
          <p className="text-gray-600">{para}</p>
        </div>
    </Link>
  );
}

export default Card;
