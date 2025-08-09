import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const PageHeader = ({
    icon,
    title,
    backLink= "/",
    backLabel="Back to Home",
}) => {
  return (
     <div className="flex flex-col gap-5 mb-8">
  {/* Back Button */}
  <Link href={backLink ?? "/"}>
    <Button
      variant="outline"
      size="sm"
      className="group flex items-center border-emerald-600 hover:border-emerald-400 hover:bg-emerald-900/10 transition-all duration-200 shadow-sm"
    >
      <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
      <span className="text-base text-emerald-300 font-medium">
        {backLabel ?? "Back"}
      </span>
    </Button>
  </Link>

  {/* Icon + Title */}
  <div className="flex items-center gap-3">
    {React.isValidElement(icon) && (
      <div className="p-2 bg-emerald-950 rounded-full shadow-md border border-emerald-800">
        {React.cloneElement(icon, {
          className: "h-10 w-10 text-emerald-400",
        })}
      </div>
    )}
    <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-500 text-transparent bg-clip-text drop-shadow-sm">
      {title}
    </h1>
  </div>
</div>

  )
}

export default PageHeader
