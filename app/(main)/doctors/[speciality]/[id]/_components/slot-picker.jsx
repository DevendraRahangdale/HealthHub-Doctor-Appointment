"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { ChevronRight, Clock } from 'lucide-react';
import React, { useState } from 'react'

const SlotPicker = ({days,onSelectSlot}) => {

    const [selectedSlot,setSelectedSlot]=useState(null);


    const firstDayWithSlots=
    days.find((day)=> day.slots.length>0) ?.date || days[0]?.date;
    const[activeTab,setActiveTab]=useState(firstDayWithSlots);


const handleSlotSelect=(slot)=>{
    setSelectedSlot(slot);
}

const confirmSelection=()=>{
    if(selectedSlot){
        onSelectSlot(selectedSlot);
    }
}



  return (
   <div className="space-y-6">
  <Tabs
    defaultValue={activeTab}
    onValueChange={setActiveTab}
    className="w-full"
  >
    <TabsList className="w-full justify-start overflow-x-auto rounded-md bg-muted/10 border border-emerald-800/20 p-2 space-x-2">
      {days.map((day) => (
        <TabsTrigger
          key={day.date}
          value={day.date}
          disabled={day.slots.length === 0}
          className={`rounded-md px-4 py-2 transition-all duration-300 text-sm font-medium
            ${
              day.slots.length === 0
                ? "opacity-50 cursor-not-allowed bg-muted text-muted-foreground"
                : "bg-emerald-950/10 hover:bg-emerald-800/10 text-white border border-transparent"
            }`}
        >
          <div className="flex gap-2 items-center">
            <span>{format(new Date(day.date), "MMM d")}</span>
            <span className="opacity-80">({format(new Date(day.date), "EEE")})</span>
          </div>
          {day.slots.length > 0 && (
            <span className="ml-2 bg-emerald-900/30 text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded">
              {day.slots.length}
            </span>
          )}
        </TabsTrigger>
      ))}
    </TabsList>

    {days.map((day) => (
      <TabsContent key={day.date} value={day.date} className="pt-6">
        {day.slots.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No available slots for this day.
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">
              {day.displayDate}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {day.slots.map((slot) => (
                <Card
                  key={slot.startTime}
                  onClick={() => handleSlotSelect(slot)}
                  className={`cursor-pointer transition-all duration-200 border-2 group
                    ${
                      selectedSlot?.startTime === slot.startTime
                        ? "border-emerald-600 bg-emerald-900/20"
                        : "border-emerald-800/20 hover:border-emerald-700/40 hover:shadow"
                    }`}
                >
                  <CardContent className="p-3 flex items-center space-x-2">
                    <Clock
                      className={`h-4 w-4 transition-colors duration-200 ${
                        selectedSlot?.startTime === slot.startTime
                          ? "text-emerald-400"
                          : "text-muted-foreground group-hover:text-emerald-300"
                      }`}
                    />
                    <span
                      className={`text-sm transition-colors duration-200 ${
                        selectedSlot?.startTime === slot.startTime
                          ? "text-white font-medium"
                          : "text-muted-foreground group-hover:text-white"
                      }`}
                    >
                      {format(new Date(slot.startTime), "h:mm a")}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </TabsContent>
    ))}
  </Tabs>

  <div className="flex justify-end pt-4">


    <Button
  onClick={confirmSelection}
  disabled={!selectedSlot}
  className={`relative group flex items-center justify-center px-6 py-3 font-semibold rounded-md
    text-white transition-all duration-300
    ${
      selectedSlot
        ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-lg hover:shadow-emerald-700/40"
        : "bg-emerald-900/30 text-emerald-100 cursor-not-allowed opacity-50"
    }`}
>
  <span className="group-hover:tracking-wider transition-all duration-300">
    Continue
  </span>
  <ChevronRight
    className={`ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${
      !selectedSlot ? "text-emerald-200" : "text-white"
    }`}
  />
</Button>



  </div>
</div>

  )
}

export default SlotPicker
