import {useContext} from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from './context/AuthProvider';

const Signin = ( ) => {

    const navigate = useNavigate();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const { setIsLoggedIn,setName } = useContext(AuthContext)

    const handelSignin = async (e) =>{
      e.preventDefault();   
    
    try{
      const response = await axios.post('http://localhost:3000/api/v1/users/signin',{
        email:email,
        password:password
      })

      alert(response.data.msg);
      setName(response.data.firstName);
      localStorage.setItem("token",response.data.token)
       navigate("/");
        setIsLoggedIn(true)

    }catch(error){
      if(error.response){
        alert(error.response.data.msg || "Login failed")
      }else{
        alert("Network")
      }
    }
  }

  return (
    <div>
      <div 
      className='flex items-center justify-center min-h-screen  w-full bg-blue-600'>
      <form 
      className='sm:w-[30%] w-50 sm:h-110 sm:border-2 p-5 sm:p-10 text-center bg-white border-none rounded-3xl' 
      onSubmit={handelSignin}>
        <h1 className='sm:text-4xl text-2xl sm:pb-5 pb-3'>Signin</h1>
             <h1 className='sm:font-bold sm:pb-5 pb-3'>👋 Hii , Welcome Back</h1>
          <input 
          type="text" 
          name='email' 
          placeholder='email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=' border text-center rounded-2xl sm:p-4 p-2 block w-full sm:text-xl '/>
          <br />
          <input 
          type="text" 
          name='password' 
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=' border text-center rounded-2xl sm:p-4 p-2 block w-full sm:text-xl '
          />
          <br />
          <button 
          className='w-fit sm:text-xl sm:p-2 p-2 rounded-xl bg-blue-600 shadow-lg mb-2' 
          type='submit'>SignUp</button>
          <p>Don't have an account? <a className='font-bold' href="/signup" >Signup</a></p>
      </form>
    </div>
    </div>
  )
}

export default Signin
