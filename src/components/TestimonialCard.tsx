import React from 'react'
import Image from 'next/image'

type Props = {
  avatar: string // user image URL
  name: string
  role?: string
  testimonial: string
}

function TestimonialCard({ avatar, name, role, testimonial }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl duration-300 w-full sm:w-80">
      <div className="mb-4">
        <Image 
          src={avatar} 
          alt={name} 
          width={64} 
          height={64} 
          className="rounded-full border-2 border-[#DF8020]" 
        />
      </div>
      <p className="text-gray-700 italic mb-4">"{testimonial}"</p>
      <h3 className="text-lg font-bold text-gray-900">{name}</h3>
      {role && <p className="text-sm text-gray-500">{role}</p>}
    </div>
  )
}

export default TestimonialCard
