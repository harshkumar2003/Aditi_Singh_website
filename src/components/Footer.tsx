
import Image from 'next/image'
import React from 'react'



function Footer() {
  return (
    <div className='mx-4 md:mx-10 lg:mx-24 xl:mx-40 pt-8 pb-12 border-t border-[#f1e3d6] mt-10'>
        <div className='flex flex-col items-center gap-4'>
          <p className='text-sm sm:text-base text-gray-700'>© 2025 Aditi Singh. All Rights Reserved.</p>
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
