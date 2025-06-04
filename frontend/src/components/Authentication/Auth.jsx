
import { BrowserRouter, Routes, Route, Link,  Outlet } from "react-router-dom";

const Auth = () => {

  return (
   <div 
   className=" bg-[#e28743] relative sm:top-18 top-17 right-10 sm:left-2  border-black text-black p-4 rounded w-fit mt-10">
  <div 
  className='hover:bg-gray-600 text-white hover:border-none transition-all ease-in-out duration-300 h-fit w-fit border-1 p-2 m-1 rounded-xl sm:bg-transparent bg-gray-600'>
    <Link to='/signup'>signup</Link>
  </div>
  <div 
  className='hover:bg-gray-600 text-white hover:border-none sm:bg-transparent bg-gray-600 transition-all ease-in-out h-fit w-fit border-1 p-2 ml-12 rounded-xl '>
    <Link to="/signin">signin</Link>
  </div>
  <div 
  className="absolute -top-2 sm:left-13 left-26 w-2 h-2 
              border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-amber-600 ">
  </div>
</div>
  )
}

export default Auth
