import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { subscribe as subscribeChannel, unsubscribe as unsubscribeChannel } from '@services/tweet';
import { signOut } from '@services/user';
import { updateLocalTweet } from '@actions/tweet';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Explore from '@components/Explore';
import Facts from '@components/Facts';
import Home from '@components/Home';
import PageNotFound from '@components/PageNotFound';
import Profile from '@components/Profile';
import ProtectedRoute from '@route-types/ProtectedRoute';
import Sidebar from '@components/common/Sidebar';

const Main = ({ user, errors }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const updateTweetStats = (payload) => dispatch(updateLocalTweet(payload, user.objectId));

    subscribeChannel('kot-tweet-actions', updateTweetStats);

    return () => unsubscribeChannel('kot-tweet-actions');
  }, [user.objectId]);

  useEffect(() => {
    if (errors.some((error) => error.startsWith('Not existing user token'))) {
      signOut()
        .then(() => window.location.reload());
    }
  }, [errors]);

  return (
    <Container fluid>
      <Row>
        <Col xs={4} md={2}>
          <Sidebar />
        </Col>
        <Col xs={8} md={6} className="mb-5">
          <Switch>
            <ProtectedRoute exact path="/home" component={Home} />
            <Route exact path="/">
              <Redirect to="/explore" />
            </Route>
            <Route exact path="/explore">
              <Explore />
            </Route>
            <ProtectedRoute exact path="/profile" component={Profile} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Col>
        <Col md={4} className="mt-2 d-none d-md-block">
          <Facts />
        </Col>
      </Row>
    </Container>
  );
};

Main.propTypes = {
  user: PropTypes.shape({
    objectId: PropTypes.string,
  }).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ userReducer, tweetReducer }) => ({
  user: userReducer.user,
  errors: userReducer.errors.concat(tweetReducer.errors),
});

export default connect(mapStateToProps)(Main);
