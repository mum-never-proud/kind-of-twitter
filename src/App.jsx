import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { validateUserSession } from '@actions/user';
import AuthRoute from '@route-types/AuthRoute';
import ForgotPassword from '@components/ForgotPassword';
import Main from '@components/Main';
import SignIn from '@components/SignIn';
import SignUp from '@components/SignUp';
import '@/App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateUserSession());
  }, []);

  return (
    <Router>
      <Switch>
        <AuthRoute path="/sign-in" component={SignIn} />
        <AuthRoute exact path="/sign-up" component={SignUp} />
        <AuthRoute exact path="/forgot-password" component={ForgotPassword} />
        <Main />
      </Switch>
    </Router>
  );
};

export default App;
