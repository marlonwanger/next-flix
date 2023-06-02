import FavoriteComponent from '@/components/profiles/favorite'
import React from 'react'

export default function ProfilesPage() {
  return (
    <div className='flex items-center h-full justify-center'>
      <div className="flex flex-col">
        <h1 className='text-3xl md:text-6xl text-white text-center'>Who is watching?</h1>
        <div className='flex items-center justify-center gap-8 mt-10'>
          <FavoriteComponent />
        </div>
      </div>
    </div>
  )
}
