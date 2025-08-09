import React from 'react'
import { Card, CardContent } from './ui/card'
import { PricingTable } from '@clerk/nextjs'

const Pricing = () => {
  return (
    <Card className="border-emerald-900/30 shadow-lg bg-gradient-to-b from-emerald-950/30 to-transparent hover:border-emerald-600 hover:shadow-6xl hover:scale-[1.02] transition-all duration-300">
        <CardContent >
            <PricingTable
            checkoutProps={{
                appearance:{
                    elements:{
                        drawerRoot:{
                            zIndex:200,
                        }
                    }
                }
            }}
              />
        </CardContent>


    </Card>
  )
}

export default Pricing
