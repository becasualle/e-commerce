import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  const [myUser, setMyUser] = useState(null)

  useEffect(() => {
    // console.log(`'user': ${user}`);
    // console.log(`'isAuthenticated': ${isAuthenticated}`);
    // console.log(`'isLoading': ${isLoading}`);
    if (user) {
      setMyUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      setMyUser(false);
      localStorage.setItem('user', null)
    }
    console.log(myUser);

  }, [user]);

  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser, isLoading }}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
