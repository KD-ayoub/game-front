import Link from 'next/link'
import React from 'react'
import { Header, SideBar } from '@/app/components';
 
export default function Chat() {
  return (
    <main className="h-screen bg-[#0B0813] relative w-full max-w-[2880px]">
      <Header />
      <SideBar />
    </main>
  )
}
