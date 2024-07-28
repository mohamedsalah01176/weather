"use client"
import  cookies  from "js-cookie";
import Link from "next/link";
import {  useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function Header() {
  const [search,setSearch]=useState('')
  let router=useRouter()
  let email=cookies.get('email')


  useEffect(()=>{
    if(email){
      if(search.length > 0){
        router.push(`/?search=${search.replace(" ","-").toLowerCase()}`)
      }else{
        router.push(`/`)
      }
    }else{
      router.push(`register`)
    }
  },[search])
  
  return (
    <div className='flex justify-between items-center backdrop-blur-md text-white p-7'>
        <div className='text-xl capitalize md:text-4xl font-bold '>dailyweather</div>
        <div className='w-[150px] sm:w-[200px] md:w-[400px] bg-white p-3 rounded-lg text-black flex items-center'>
            <input placeholder='Search by location' onChange={(e:any)=>{setSearch(e.target.value)}} className=' flex-grow  text-lg border-none outline-none overflow-x-hidden ' type='text'/>
            <IoSearch className="text-2xl"/>
        </div>
        <div className='flex items-center gap-2 flex-col sm:flex-row text-lg sm:text-2xl'>
            <Link href={'/login'}>Log in</Link>
            |
            <Link href={'/register'}>sign up</Link>
        </div>
    </div>
  )
}
