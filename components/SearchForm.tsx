"use client"

import React from 'react'
import SearchFormReset from './SearchFormReset';
// Removed invalid import of Form

import {Search} from "lucide-react";
const SearchForm = ({query}:{query?:string}) => {
//    const query='Test';

  
    return (
   <form action="/" className="search-form">
    <input 
       name='query'
       defaultValue={query}
       className='search-input'
       placeholder='Search Startups'

    />
    <div className='flex gap-2'>
        {query && <SearchFormReset/>}
        <button type='submit' className='search-btn text-white' title='Search'>
            <Search className='size-5'/>
        </button>
    </div>


   
   </form>
  )
}

export default SearchForm