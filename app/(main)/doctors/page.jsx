import { Card, CardContent } from '@/components/ui/card'
import { SPECIALTIES } from '@/lib/specialities'
import Link from 'next/link'
import React from 'react'

const SpacilitiesPage = () => {
  return (
    <>
       <div className="flex flex-col items-center justify-center mb-10 text-center">
  <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-600 text-transparent bg-clip-text mb-3 tracking-tight drop-shadow-sm">
    Explore Trusted Medical Specialists
  </h1>
  <p className="text-emerald-100 text-lg max-w-xl">
    Select a specialty below to connect with certified and experienced doctors tailored to your needs.
  </p>
</div>

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {SPECIALTIES.map((specialty) => (
    <Link key={specialty.name} href={`/doctors/${specialty.name}`}>
      <Card
        className="group hover:border-emerald-700/40 transition-all duration-300 cursor-pointer 
                   border border-emerald-900/20 h-full bg-background 
                   shadow-[0_2px_6px_rgba(0,255,210,0.05)] hover:shadow-[0_6px_16px_rgba(0,255,210,0.1)]"
      >
        <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
          <div className="w-14 h-14 rounded-full bg-emerald-900/20 flex items-center justify-center mb-4 shadow-inner group-hover:scale-105 transition-transform">
            <div className="text-emerald-400 text-xl">{specialty.icon}</div>
          </div>
          <h3 className="font-semibold text-white text-base group-hover:text-emerald-400 transition-colors">
            {specialty.name}
          </h3>
        </CardContent>
      </Card>
    </Link>
  ))}
</div>


    </>
  )
}

export default SpacilitiesPage
