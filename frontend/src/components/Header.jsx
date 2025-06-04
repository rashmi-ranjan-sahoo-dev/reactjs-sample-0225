import React, { useContext, useState } from 'react'
import { FaRegMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import Auth from './Authentication/Auth';
import { AuthContext } from './Authentication/context/AuthProvider';
import Logout from './Authentication/Logout';


const Header = ({ sendDataToApp }) => {

   const [isDark,setIsDark] = useState(false);
   const [isActive,setIsActive] = useState(true);

   function handelData(){
    const updatedvalue = !isDark;
    sendDataToApp(updatedvalue)
    setIsDark(updatedvalue)
    
   }

   function handelActive(){
    setIsActive(!isActive);
   }
   const { isLoggedIn} = useContext(AuthContext)
   console.log(isLoggedIn)

  return (
    
      <div className='flex items-center justify-between w-full h-[100px] sm:h-[120px] bg-amber-50 shadow-lg'>
        <div className='sm:pt-3 sm:ml-20 '>
            <h1 className='text-xl sm:text-4xl p-2'>☀️DoDaily</h1>
             <p className='text-sm sm:text-xl '>Focused on scheduling + clarity</p>
        </div>
          <div className='flex items-center justify-around w-[100px] sm:w-[150px] pt-0 mr-0 sm:pt-3 sm:mr-20'>
            <button 
            className='hover:shadow-lg hover:scale-125 transition-all duration-300 ease-in-out  h-7 w-7 sm:h-10 sm:w-10 flex items-center justify-center text-cyan-500 bg-black rounded-full' 
            onClick={handelData}>{isDark ?<FaRegSun />: <FaRegMoon /> }</button>
            <div onClick={handelActive} className='hover:shadow-lg hover:scale-125 transition-all duration-300 ease-in-out h-7 w-7 sm:h-10 sm:w-10 flex items-center justify-center text-cyan-500 bg-black rounded-full'>
             {isActive ? <MdManageAccounts /> : <Auth />}
            </div>
            {isLoggedIn && <Logout/>}
          </div>
    </div>
  )
}

export default Header
