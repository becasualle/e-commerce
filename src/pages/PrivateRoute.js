import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// REDIRECTS FROM CHECKOUT WHEN USER IS NOT LOGGED IN
// rest operator to get all props
const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth0();
  // spread operator to push all props
  return <Route {...rest} render={() => {
    // if user doesn't logged in and go to checkout - redirect to HomePage
    return user ? children : <Redirect to="/"></Redirect>
  }}>

  </Route>
};
export default PrivateRoute;
