import React, { useEffect } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { reset as resetTweetStore } from '@actions/tweet';
import PropTypes from 'prop-types';

const AuthRoute = ({
  isSubmitting, isAuthenticated, component: Component, path, exact,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetTweetStore());
  }, []);

  return (
    <Route path={path} exact={exact}>
      {
        (!isSubmitting && isAuthenticated)
          ? <Redirect to={{ pathname: location.state?.from || '/explore', state: { from: path } }} />
          : <Component />
      }
    </Route>
  );
};

AuthRoute.defaultProps = {
  exact: true,
};
AuthRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  component: PropTypes.instanceOf(Object).isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

const mapStateToProps = ({ userReducer }) => ({
  isAuthenticated: userReducer.isAuthenticated,
  isSubmitting: userReducer.isSubmitting,
});

export default connect(mapStateToProps)(AuthRoute);
