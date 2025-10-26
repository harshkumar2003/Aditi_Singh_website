
import Image from 'next/image'
import React from 'react'



function Footer() {
  return (
    <div className='mx-8 pt-4 pb-10 border-t border-[#DF8020] mt-8'>
        <h1 className='text-black text-sm sm:text-base text-center'>@ 2025 Aditi Singh. All Rights Reserved.</h1>
        <div className='flex justify-center pt-4 space-x-2'>
            <Image src='/instagram.svg' alt='instagram' width={20} height={20}/>
            <Image src='/facebook.svg' alt='facebook' width={20} height={20}/>
            <Image src='/youtube.svg' alt='facebook' width={20} height={20}/>
        </div>
    </div>
  )
}

export default Footer