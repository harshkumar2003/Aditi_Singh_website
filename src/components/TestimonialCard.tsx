import React from 'react'
import Image from 'next/image'

type Props = {
  avatar?: string // user image URL
  name: string
  role?: string
  testimonial: string
}

function TestimonialCard({ avatar, name, role, testimonial }: Props) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl duration-300 w-full sm:w-80">
      <div className="mb-4">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={64}
            height={64}
            className="rounded-full border-2 border-[#DF8020]"
          />
        ) : (
          <div className="w-16 h-16 rounded-full border-2 border-[#DF8020] bg-[#DF8020]/10 flex items-center justify-center text-[#DF8020] font-bold">
            {initials}
          </div>
        )}
      </div>
      <p className="text-gray-700 italic mb-4">"{testimonial}"</p>
      <h3 className="text-lg font-bold text-gray-900">{name}</h3>
      {role && <p className="text-sm text-gray-500">{role}</p>}
    </div>
  )
}

export default TestimonialCard
