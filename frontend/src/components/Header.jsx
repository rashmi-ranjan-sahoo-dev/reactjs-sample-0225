import React, { useContext, useState } from 'react'
import { MdManageAccounts } from "react-icons/md";
import Auth from './Authentication/Auth';
import { AuthContext } from './Authentication/context/AuthProvider';
import Logout from './Authentication/Logout';
import axios from 'axios';
import { useEffect } from 'react';


const Header = () => {

   const [isActive,setIsActive] = useState(true);
   const [portfilePic, setProfilePic] = useState(null)

  

   function handelActive(){
    setIsActive(!isActive);
   }
   const { isLoggedIn} = useContext(AuthContext)
   console.log(isLoggedIn)

     useEffect(() => {
    const loadRandomPic = async () => {
      const randomId = Math.floor(Math.random() * 1000); // 0 - 999
      try {
        const response = await axios.get(`https://picsum.photos/id/${randomId}/info`);
        setProfilePic(response.data.download_url);
      } catch (error) {
        console.error('Failed to load profile image:', error);
      }
    };

    loadRandomPic();
  }, []);
  return (
    
      <div className='flex items-center justify-between w-full h-[100px] sm:h-[120px] bg-amber-50 shadow-lg'>
        <div className='ml-6 sm:pt-3 sm:ml-20 flex items-center '>
                        {portfilePic && <img src={portfilePic} alt="Profile" className="mx-auto w-10 sm:w-14 h-10 sm:h-14 rounded-full " />}
                        <div className='sm:text-4xl font-bold '>
                            Task Board
                        </div>
        </div>
          <div className='flex items-center justify-around w-[100px] sm:w-[150px] pt-0 mr-0 sm:pt-3 sm:mr-20'>
            <div onClick={handelActive} className='hover:shadow-lg hover:scale-125 transition-all duration-300 ease-in-out h-7 w-7 sm:h-10 sm:w-10 flex items-center justify-center text-cyan-500 bg-black rounded-full'>
             {isActive ? <MdManageAccounts /> : <Auth />}
            </div>
            {isLoggedIn && <Logout/>}
          </div>
    </div>
  )
}

export default Header
