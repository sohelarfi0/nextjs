import React from 'react'
import {StartupForm }from '@/components/StartupForm'
import { redirect } from 'next/dist/server/api-utils';
import { auth } from '@/auth';
const page = async() => {
    const  session=await auth();

    if(!session) redirect("/",{status:302});
  return (
    <>
    <section className='pink_container !min-h-[230px]'>
        <h1 className='heading'> Submit  Your Startup</h1>
    </section>
    <StartupForm/>
    </>
  )
}

export default page