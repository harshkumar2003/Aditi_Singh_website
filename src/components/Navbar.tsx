"use client";
import {useState} from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import {TextAlignJustify , X}  from "lucide-react";
import Image from 'next/image';
import Button from './Button';

function Navbar() {
    const pathname = usePathname();
    const [isOpen , setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(prev => !prev);

    const navLinks = [
        {name: 'Home' , href:'/'},
        {name : 'About',href: '/about'},
        {name : 'Services',href: '/services'},
        {name : 'Why me',href: '/why-me'},
        {name : 'Testimonials',href: '/testimonials'},
        // {name : 'Contact',href: '/contact'},

    ]
  return (
    <nav className='   mx-8 py-1 border-b border-[#DF8020]'>
        <div className='  flex  items-center justify-between pt-4 md:mx-10 mx-4'>
            <div className=''>
                <Link href='/'><Image src='/logo.svg' alt="logo" width={160} height={0} className=' cursor-pointer'/></Link>
            </div>
            

            {/* desktop menu */}
            <div>
                <div className='hidden md:flex space-x-6 text-[#DF8020] text-lg font-medium'>
                    {navLinks.map((link)=>(
                        <Link key={link.name} href={link.href} className={`${pathname === link.href ? "border-b-2 border-[#000] " : ""} hover:[#DF8020] transition-colors duration-200`}>{link.name}</Link>
                    ))}
                </div>
            </div>

            <div className='hidden md:flex'>
                 <Button onClick={() => setIsOpen(false)}>Book an Appointment</Button>
            </div>
            {/* mobile Menu */}

            <div className='md:hidden flex z-50'>
                <button onClick={toggleMenu} className='focus:outline-none'>{isOpen ?<X size={35} className='text-[#DF8020]'/> : <TextAlignJustify size={24}/>} </button>

            </div>

        </div>
        {/* mobile overlay */}
        
        <div className={`text-[#DF8020] fixed inset-0 bg-white flex flex-col items-center justify-center gap-8 text-lg font-medium md:hidden z-40 transform transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}  className={`${pathname === link.href ? "border-b-2 border-[#000] " : ""} hover:[#DF8020] transition-colors duration-200`} onClick={() => setIsOpen(false)}>{link.name}</Link>
            ))}

            {/* <Link href='/contact' onClick={() => setIsOpen(false)} className='border border-[#DF8020] bg-[#DF8020] text-white px-4 py-2 rounded-lg'>
              Book an Appointment
            </Link> */}
            <Button onClick={() => setIsOpen(false)}>Book an Appointment</Button>

        </div>

    </nav>
  )
}

export default Navbar