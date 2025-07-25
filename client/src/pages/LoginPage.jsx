import React, { useState } from 'react';
import assets from '../assets/assets';

const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* Left */}
      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]'/>
      {/* Right */}
      <form className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          <img src={assets.arrow_icon} alt="" className='w-5 cursor-pointer'/>
        </h2>
        {
           currState === "Sign up" && !isDataSubmitted && (
            <input value={fullName} onChange={(e) => setFullName(e.target.value)}
            type='text' className='p-2 border border-gray-500 rounded-md focus:outline-none'
            placeholder='Full Name' required/>
           )
        }
        {
          !isDataSubmitted && (
            <>
              <input value={email} onChange={(e) => setEmail(e.target.value)}
              type="email" className='p-2 border boder-gray-500 rounded-mdd focus:outline-none focus:ring-2 focus:ring-indigo-500'
              placeholder='Email Address' required/>
              <input value={password} onChange={(e) => setPassword(e.target.value)}
              type="password" className='p-2 border boder-gray-500 rounded-mdd focus:outline-none focus:ring-2 focus:ring-indigo-500'
              placeholder='Password' required/>
            </>
          )
        }
        {
          currState === "Sign up" && isDataSubmitted && (
            <textarea value={bio} onChange={(e) => setBio(e.target.value)}
            rows={4} className='p-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            placeholder='provide a short bio' required
            ></textarea>
          )
        }
      </form>
    </div>
  )
}

export default LoginPage
