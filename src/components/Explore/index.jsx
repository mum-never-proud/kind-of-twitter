import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchTweets } from '@actions/tweet';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import NoTweets from '@components/common/NoTweets';
import RefetchButton from '@components/common/RefetchButton';
import Tweets from '@components/common/Tweets';

const Explore = ({
  user, tweets, errors, isFetching,
}) => {
  const dispatch = useDispatch();
  const [hasNewPost, setHasNewPost] = useState(false);
  const refreshTweets = () => {
    setHasNewPost(false);
    dispatch(fetchTweets());
  };

  useEffect(() => {
    refreshTweets();
  }, []);

  return (
    <div className="explore position-relative">
      <Form className="explore--header pb-2 pt-2">
        <Form.Group>
          <Form.Control placeholder="Search Twitter" disabled />
        </Form.Group>
      </Form>
      {
        (!errors.length && !isFetching && tweets.length === 0) && (
          <>
            <NoTweets />
            <p className="text-primary text-center">
              <span className="font-weight-bold">Note:</span>
              {' '}
              You won&apos;t be seing your own tweet in this page.
            </p>
          </>
        )
      }
      {
         (hasNewPost || isFetching)
          && (<RefetchButton isFetching={isFetching} onRefetch={refreshTweets} />)
      }
      <Tweets
        user={user}
        tweets={tweets}
        errors={errors}
        selector={`ownerId != '${user.objectId}'`}
        isFetching={isFetching}
        onRefresh={() => setHasNewPost('true')}
      />
    </div>
  );
};

Explore.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  tweets: PropTypes.arrayOf(PropTypes.object).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ userReducer, tweetReducer }) => {
  const { user } = userReducer;
  const { tweets, isFetching, errors } = tweetReducer;

  return {
    user,
    tweets,
    isFetching,
    errors,
  };
};

export default connect(mapStateToProps)(Explore);
