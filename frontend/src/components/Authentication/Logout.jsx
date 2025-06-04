import {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthProvider';

const Logout = () => {
  const navigate = useNavigate();
  
  const {setIsLoggedIn} = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
    
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white sm:text-[13px] text-[8px] sm:p-2 p-1 rounded-full shadow"
    >
      Logout
    </button>
  );
};

export default Logout;
