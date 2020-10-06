import React, { useEffect } from 'react';
import { subscribe as tweetSubscribe, unsubscribe as tweetUnsubscribe, updateTweetStats } from '@services/tweet';
import PropTypes from 'prop-types';
import TweetCard from '@components/common/TweetCard';

const Tweets = ({
  tweets, user, errors, selector, onRefresh,
}) => {
  const actionHandler = (actionType, tweet) => updateTweetStats[actionType](user.objectId, tweet);

  useEffect(() => {
    tweetSubscribe('kot-tweet', onRefresh, selector);

    return () => tweetUnsubscribe('kot-tweet', selector);
  }, [selector]);

  if (errors.length) {
    return (
      <div className="text-danger mt-2">
        <p className="font-weight-bold">
          Since this App is hosted on a Free Tier Plan.
          {' '}
          Sometimes the Tweets may not load and might crash.
          {' '}
          In that case visit back after sometime!
        </p>
        <div>
          <p className="lead font-weight-bold">Error(s):</p>
          <ul style={{ listStyle: 'bullet' }}>
            {
              errors.map((error) => <li key={error}>{error}</li>)
            }
          </ul>
        </div>
      </div>
    );
  }

  return (
    tweets.map((tweet) => (
      <TweetCard
        key={tweet.objectId}
        tweet={tweet}
        author={tweet.user || user}
        user={user}
        onAction={(actionType) => actionHandler(actionType, tweet)}
      />
    ))
  );
};

Tweets.defaultProps = {
  selector: undefined,
};
Tweets.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  tweets: PropTypes.arrayOf(PropTypes.object).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  selector: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
};

export default Tweets;
