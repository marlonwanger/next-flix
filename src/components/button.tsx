'use client';

import { signOut } from 'next-auth/react'
import React from 'react'

export default function LogoutButton() {
  return (
    <div>
      <button onClick={() => signOut()} className='h-10 w-full bg-white' >Logout</button>
    </div>
  )
}
