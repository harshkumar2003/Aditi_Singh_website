import React from 'react'
import Link from 'next/link'

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  href: string;
}
const Button : React.FC<ButtonProps> = ({ onClick, children , href }) => {
  return (
    <Link href={href}  onClick={onClick} className='border border-[#DF8020] bg-[#DF8020] text-white px-4 py-2  rounded-lg'>
              {children}
    </Link>
  )
}

export default Button