
import Image from 'next/image'
import React from 'react'



function Footer() {
  return (
    <div className='mx-4 md:mx-10 lg:mx-24 xl:mx-40 pt-8 pb-12 border-t border-[#DF8020] mt-10'>
        <div className='flex flex-col items-center gap-4'>
          <p className='text-sm sm:text-base text-gray-700'>© 2026 Aditi Singh. All Rights Reserved.</p>
          <p className='text-sm sm:text-base text-gray-700'>
            Developed by{" "}
            <a
              href='https://www.devfostertech.com/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[#DF8020] hover:underline'
            >
              Dev Foster Tech
            </a>
          </p>
          <div className='flex justify-center gap-3'>
              <div className="p-2 rounded-full border border-[#f1e3d6] bg-white soft-shadow">
                <Image src='/instagram.svg' alt='instagram' width={18} height={18}/>
              </div>
              <div className="p-2 rounded-full border border-[#f1e3d6] bg-white soft-shadow">
                <Image src='/facebook.svg' alt='facebook' width={18} height={18}/>
              </div>
              <div className="p-2 rounded-full border border-[#f1e3d6] bg-white soft-shadow">
                <Image src='/youtube.svg' alt='youtube' width={18} height={18}/>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Footer
