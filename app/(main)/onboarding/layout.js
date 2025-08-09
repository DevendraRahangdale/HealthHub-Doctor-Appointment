import { getCurrentUser } from '@/actions/onboarding';
import { redirect } from 'next/navigation';

import React from 'react'

export const matadata={
  title:"Onboarding-HealthHub",
  description:"Complete your profile to get started with HealthHub",
};

const onboardingLayout =async ({children}) => {

const user=await getCurrentUser();
if(user){
  if(user.role==="PATIENT"){
    redirect("/doctors");
  } else if(user.role==="DOCTOR"){
    if(user.verificationStatus==="VARIFIED"){
      redirect("/doctor");
    }
    else{
      redirect("/doctor/verification");
    }
  }
  else if(user.role==="ADMIN"){
    redirect("/admin");

  }
}

  return (
  <div className="container mx-auto px-4 py-16">
  <div className="w-full max-w-5xl mx-auto bg-[#0c1f1f] hover:border hover:border-teal-900 transition-all duration-300 p-10 rounded-2xl shadow-md hover:shadow-teal-400/20">
    <div className="text-center mb-10">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-teal-300 via-emerald-400 to-teal-200 text-transparent bg-clip-text mb-3">
        Welcome to HealthHub
      </h1>
      <p className="text-lg text-gray-300">
        Let us know how you'd like to experience better healthcare.
      </p>
    </div>

    {children}
  </div>
</div>




  )
}

export default onboardingLayout;
