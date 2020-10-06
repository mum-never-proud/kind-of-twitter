import React, { useEffect } from 'react';
import { GiStarStruck } from 'react-icons/gi';
import { connect, useDispatch } from 'react-redux';
import { fetchPrimaryTweets } from '@actions/tweet';
import PropTypes from 'prop-types';
import RefetchButton from '@components/common/RefetchButton';
import Tweets from '@components/common/Tweets';
import TweetForm from '@components/common/TweetForm';

const Home = ({
  user, tweets, isFetching, errors,
}) => {
  const dispatch = useDispatch();
  const refreshTweets = () => dispatch(fetchPrimaryTweets());

  useEffect(() => {
    refreshTweets();
  }, []);

  return (
    <div className="home">
      <div className="home--header d-flex justify-content-between pb-2 pt-2 border-bottom">
        <h3 className="font-weight-bold lead">Home</h3>
        <GiStarStruck className="text-primary" size={24} />
      </div>
      <div className="home--form">
        <TweetForm />
      </div>
      {
         (isFetching)
          && (<RefetchButton isFetching={isFetching} onRefetch={refreshTweets} />)
      }
      {
        (!isFetching || tweets.length > 0)
          && (
            <Tweets
              user={user}
              tweets={tweets}
              errors={errors}
              selector={`ownerId = '${user.objectId}'`}
              isFetching={isFetching}
              onRefresh={refreshTweets}
            />
          )
      }
      {
        (!errors.length && tweets.length === 0) && (
          <div className="text-center">
            <p className="lead font-weight-bold">Welcome to Twitter!</p>
            <p className="text-muted">This is the best place to see what’s happening in your world. Find some people and topics to follow now.</p>
          </div>
        )
      }
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  tweets: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ userReducer, tweetReducer }) => {
  const { userTweets: tweets, isFetching, errors } = tweetReducer;

  return {
    user: userReducer.user,
    tweets,
    isFetching,
    errors,
  };
};

export default connect(mapStateToProps)(Home);
