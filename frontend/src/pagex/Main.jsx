import React, {useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Body from '../components/Body/Body'
import { AuthContext } from '../components/Authentication/context/AuthProvider'


const Main = () => {

  const [isDarkMode,setIsDarkMode] = useState(false)
  const recevedData = (receve)=>{
    setIsDarkMode(receve)
  }
  const {isLoggedIn} = useContext(AuthContext);
  console.log(isLoggedIn)
   useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div 
    className={isDarkMode ?"min-h-screen   dark:bg-gray-900  transition-all duration-300" : "min-h-screen   bg-white  transition-all duration-300"}>
      <Header sendDataToApp = {recevedData} />
      {isLoggedIn ? <Body/> : <Outlet/>}
    </div>
  )
}

export default Main