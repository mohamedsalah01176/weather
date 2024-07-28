'use client'
import React, { useEffect, useState } from 'react'
import cookies from 'js-cookie'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import {  useRouter } from "next/navigation";
import { Alert, Snackbar } from '@mui/material';




export default function Page() {
  const [userName,setUserName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [done,setDone]=useState(false)
  const [type,setType]=useState('password')
  let nav =useRouter()
  const [validEmail,setValidEmail]=useState(false)
  const [validPassword,setValidPassWord]=useState(false)

  
  let regExpretionEmail=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  function testEmail(emailex:any){
    setValidEmail(regExpretionEmail.test(emailex))
  }
  
  let regExpretionPassword=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  function testPassword(passwordex:any){
    setValidPassWord(regExpretionPassword.test(passwordex))
  }

  useEffect(()=>{
    testEmail(email)
    testPassword(password)

  },[email,password])

  
  function handleRegister(e:any){
    e.preventDefault()
    setDone(true)
    console.log(validEmail)
    console.log(validPassword)
    if(userName.length >=3 && validEmail && validPassword){
      cookies.set('userName',userName)
      cookies.set('email',email)
      cookies.set('password',password)
      handleClick()
      setTimeout(()=>{nav.push('/login')},1500)
    }
  }


  function close(){
    nav.push('/login')
  }

  function changeType(){
    if(type ==='password'){
      setType('text')
    }else{
      setType('password')

    }
  }

  // snackBar

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className='min-h-screen bg-[url("/register/pink-clouded-sky-with-mountains_23-2148282498.avif")] bg-cover flex justify-center items-center'>
      <form onSubmit={handleRegister} className='p-5 bg-[#00000075] py-7 rounded-lg border-white border-2 text-[#638acc] text-xl w-[320px] md:w-[600px] flex flex-col gap-7 justify-center  items-center relative'>
      <h1 className='text-4xl text-[#638acc] text-center font-bold'>Registeration</h1>
      <div onClick={()=>close()} className='text-xl bg-[#638acc] rounded-bl-xl  rounded-tr-xl py-1 font-bold px-3 text-white absolute top-5 right-5 group  hover:bg-[#3f5884] transition-all duration-300 cursor-pointer'><p className='group-hover:rotate-180 transition-all duration-300'>X</p></div>
      <div className='flex justify-between items-center  border-b-4 rounded-xl border-solid border-[#405f94] w-full pr-5'>
          <input placeholder='Userame' type='text' onChange={(e)=>setUserName(e.target.value)} className='p-3 bg-transparent text-xl  text-white placeholder:text-[#2a5090 ] placeholder:text-lg  w-full focus:outline-none focus:border-none'/>
          <FaRegUser className='text-2xl text-[#2a5090] mb-2'/>
      </div>
      {userName.length<3 && done === true?
      <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
           the length os userName is less than 3 character
        </Alert>:null}
      <div className='flex justify-between items-center  border-b-4 rounded-xl border-solid border-[#405f94] w-full pr-5'>
          <input placeholder='Email' type='text' onChange={(e)=>setEmail(e.target.value)} className='p-3 bg-transparent text-xl text-white  placeholder:text-[#2a5090 ] placeholder:text-lg  w-full focus:outline-none focus:border-none'/>
          <MdOutlineMail className='text-3xl text-[#2a5090] mb-2'/>
      </div>
      {validEmail === false && done === true?
      <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
           the email inValid
        </Alert>:null}
      <div className='flex justify-between items-center  border-b-4 rounded-xl border-solid border-[#405f94] w-full pr-5'>
            <input placeholder='Password' type={type}  onChange={(e)=>setPassword(e.target.value)} className='p-3 bg-transparent text-xl text-white  placeholder:text-[#2a5090 ] placeholder:text-lg  w-full focus:outline-none focus:border-none'/>
            {password.length >0
            ?
            <TbPasswordUser onClick={()=>changeType()} className=' cursor-pointer text-3xl text-[#2a5090] mb-2'/>
            :
            null
          }
      </div>
      {validPassword === false && done === true?
      <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
           the Password inValid
        </Alert>:null}

      <button type='submit' className=' py-2 px-5 text-lg text-white bg-gradient-to-r from-[#213b68] to-[#051838] rounded-xl w-[80%] hover:bg-gradient-to-l transition-all duration-300'>Register</button>
      </form>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'right' }} >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          the email created 
        </Alert>
      </Snackbar>
    </div>
  )
}
