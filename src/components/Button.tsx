"use client";
import React from 'react'
import Link from 'next/link'

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}
const Button : React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <Link href='/contact'  onClick={onClick} className='border border-[#DF8020] bg-[#DF8020] text-white px-4 py-2 rounded-lg'>
              {children}
    </Link>
  )
}

export default Button