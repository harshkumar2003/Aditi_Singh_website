import React from 'react'
import Link from 'next/link'

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  href: string;
}
const Button : React.FC<ButtonProps> = ({ onClick, children , href }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 border border-[#df8020] bg-gradient-to-r from-[#DF8020] to-[#f29b3d] text-white px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 hover-lift"
    >
      {children}
    </Link>
  )
}

export default Button
