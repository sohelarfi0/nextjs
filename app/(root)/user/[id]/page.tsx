import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React from 'react'
import { auth } from '@/auth';

const page = async ({params}:{params:Promise<{id:string}>}) => {
  
  const id=(await params).id;
  const session =await auth();
  const user=await client.fetch(AUTHOR_BY_ID_QUERY,{id});
  if(!user) return notFound();


  
  
    return (
    <>
    <section className='profile_container'>
        <div className='profile_card'>
            <div className='profile_title'>
                <h3 className='test-24-black uppercase text-center line-clamp-1'>
                    {user.name}
                </h3>
            </div>
        </div>
    </section>
    
    </>
  )
}

export default page