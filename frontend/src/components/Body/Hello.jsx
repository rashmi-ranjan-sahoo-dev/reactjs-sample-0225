import React, { useContext } from 'react'
import { AuthContext } from '../Authentication/context/AuthProvider'

const Hello = () => {

    const { name , isLoggedIn } = useContext(AuthContext)
  return (
    <div>
      <h1 className=' font-bold p-3 sm:p-3 text-xl md:text-6xl sm:text-3xl text-center'>Hello {isLoggedIn && name}, Start planning today</h1>
    </div>
  )
}

export default Hello
