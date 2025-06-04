import React, {} from 'react'
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';
import { useState } from 'react';
import { AuthContext } from './context/AuthProvider';

const Signup = () => {

const navigate = useNavigate();
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [firstName,setFirstName] = useState('')
const [lastName,setLastName] = useState('')

    function redirectUser(){
        navigate("/");
    }
    const handleSignup = async (e) =>{
      e.preventDefault();

      try{
        const response = await axios.post('http://localhost:3000/api/v1/users/signup',{
          email:email,
          password:password,
          firstName: firstName,
          lastName: lastName

        })
         if(response.data.msg){
           alert(response.data.msg);
         }else{
           alert(response.data.error);
         }

      }catch(error){
        if(error.response){
          alert(error.response.data.msg || "Signin failed")
        }else{
          alert("Network error")
        }
      }
    }

  return (
    <div 
    className='flex items-center justify-center min-h-screen w-full bg-blue-600'>
      <form 
      className='sm:w-[30%] w-50 sm:h-125 sm:border-2 p-5 sm:p-10 text-center bg-white border-none rounded-3xl'
      onSubmit={handleSignup}
      >
        <h1 
        className='sm:text-4xl text-2xl sm:pb-5 pb-3'>SignUp</h1>
          <input 
          type="text" 
          name='firstname'  
          placeholder='first name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)} 
          className='border text-center rounded-2xl sm:p-4 p-2 block w-full sm:text-xl' />
          <br />
          <input 
          type="text" 
          name='lastname' 
          placeholder='last name' 
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className='border text-center rounded-2xl sm:p-4 p-2 block w-full sm:text-xl' />
          <br />
          <input 
          type="text" 
          name='email' 
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          className='border text-center rounded-2xl sm:p-4 p-2 block w-full sm:text-xl '/>
          <br />
          <input 
          type="text" 
          name='password' 
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border text-center rounded-2xl sm:p-4 p-2 block w-full sm:text-xl '/>
          <br />
          <button 
          onClick={redirectUser} 
          className='w-fit sm:text-xl mb-2 p-2 rounded-xl bg-blue-600 shadow-lg ' type='submit'>SignUp</button>
      </form>
    </div>
  )
}

export default Signup
