import { Spinner } from '@material-tailwind/react'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex items-center justify-center w-full h-screen'>
        <Spinner />
    </div>
  )
}
