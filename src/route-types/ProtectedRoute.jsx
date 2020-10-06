import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedRoute = ({
  isSubmitting, isAuthenticated, component: Component, path, exact,
}) => (
  <Route path={path} exact={exact}>
    {
        (!isSubmitting && isAuthenticated)
          ? <Component />
          : <Redirect to={{ pathname: '/sign-in', state: { from: path } }} />
      }
  </Route>
);

ProtectedRoute.defaultProps = {
  exact: false,
};
ProtectedRoute.propTypes = {
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

export default connect(mapStateToProps)(ProtectedRoute);
