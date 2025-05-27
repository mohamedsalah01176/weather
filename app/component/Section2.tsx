import React, { useEffect, useState } from 'react'
import { FaCloud } from 'react-icons/fa'
import { getUniqueItems } from '../helpers/sameItem'
import Image from 'next/image'

interface props {
  res:{
    data: {
      list: [{
        dt_txt: string
      }]
    }
  }
}



export default async function Section2({res}:props) {





  let dataUniq=getUniqueItems(res.data?.list,'dt_txt')

  function getNumberData(){
    let day=dataUniq.map((item:any)=>
       new Date(item.dt_txt.slice(0,10))
    )
    let numday=day.map((item:any)=>
      item.getDay() 
    )
    return {...numday}
 
  }
  getNumberData()
  
  return ( 
    <div className='pb-5'>
      <h1 className='text-3xl font-semibold ml-[5%] mt-10 mb-4'>Daily Weather Update</h1>

      <div className='flex justify-center gap-7 items-center flex-wrap mt-3 container m-auto '>
        {dataUniq.map((item:any,index:number)=>
          <div key={index} className='bg-[#2f4259]/60 w-[250px] flex flex-col gap-4 py-5 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:-translate-y-2'>
          <div>
            <h1 className='font-bold'>
              {              getNumberData()[index] === 0?"Sunday": getNumberData()[index] === 1?"Monday":getNumberData()[index] === 2?"Tuesday":getNumberData()[index] === 3?"Wednesday":getNumberData()[index] === 4?"Thursday":getNumberData()[index] === 5?"Friday":"Sunday"}
            </h1>
            <p className='text-sm'>{item.dt_txt.slice(0,10)}</p>
          </div>
          <div className='flex flex-col sm:flex-row items-center gap-2 justify-center'>
          {item.weather[0].main.toLocaleLowerCase() === 'clouds' || item.weather[0].main.toLocaleLowerCase() === 'party clouds'?
                  <Image src={'/icons/cloudy-forecast-sun-svgrepo-com.svg'} alt='icon' width={100} height={100} className='w-[60px] h-[60px]' />
                  :
                  item.weather[0].main.toLocaleLowerCase() === 'clear'?
                  <Image src={'/icons/cloudy-svgrepo-com.svg'} alt='icon' width={100} height={100} className='w-[60px] h-[60px]' />
                  :
                  item.weather[0].main.toLocaleLowerCase() === 'rain'?
                  <Image src={'/icons/rain-alt-svgrepo-com.svg'} alt='icon' width={100} height={100} className='w-[60px] h-[60px]' />
                  :
                  <Image src={'/icons/clouds.svg'} alt='icon' width={100} height={100} className='w-[60px] h-[60px]' />
                     } 
              <div className='text-2xl  font-bold text-white relative'>{item.main.temp}
                        <p className='absolute top-0 -right-7 text-xl'><span className='absolute -top-2 -left-[14px]'>o</span> C</p>
                    </div>
          </div>
            <p className='text-sm'>{item.weather[0].main}</p>
        </div>
        )}
      </div>
    
    </div>
  )
}
