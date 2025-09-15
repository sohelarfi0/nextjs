import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React from 'react'
import { auth } from '@/auth';
import Image from 'next/image';
import { Suspense } from 'react';
import UserStartups from '@/components/UserStartups';
import {StartupCardSkeleton} from '@/components/StartupCard';

export const expermental_ppr=true; 

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
            
              <Image
              src={user.image}
              alt={user.name}
              width={220}
              height={220}
              className='profile-image'
              />
              <p className='textt-30-extrabold mt-7 text-center'>
                @{user?.useername}
              

              </p>
              <p className='mt-1 text-center text-14-normal'>@{user?.bio}</p>
              <div className='flex-1 flex-col gap-5 lg:-mt-5'>
                <p className='text-30-bold'>
                  {session?.user?.email===id?"Your":"All"} Startups

                </p>
                <ul className='card_grid-sm'>
                  <Suspense fallback={<StartupCardSkeleton/>}>
                    <UserStartups id={id} /> 
                  </Suspense>
                  

                </ul>
              </div>

            
            
            </div>
       </div>
    </section>
    
    </>
  )
}

export default page