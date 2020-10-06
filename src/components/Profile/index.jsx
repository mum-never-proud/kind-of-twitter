import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchPrimaryTweets } from '@actions/tweet';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import RefetchButton from '@components/common/RefetchButton';
import NoTweets from '@components/common/NoTweets';
import Tweets from '@components/common/Tweets';
import dayjs from 'dayjs';

const Profile = ({
  user, tweets, errors, isFetching,
}) => {
  const dispatch = useDispatch();
  const refreshTweets = () => dispatch(fetchPrimaryTweets());

  useEffect(() => {
    refreshTweets();
  }, []);

  return (
    <div className="mt-2">
      <div className="text-center">
        <Image className="border shadow" src={`https://avatars.dicebear.com/api/human/${user.email}.svg`} width={100} height={100} roundedCircle />
        <div className="font-weight-bold lead mt-3">
          {user.name}
        </div>
        <div className="text-muted mb-5">
          Joined on
          {' '}
          { dayjs(user.created).format('MMMM YYYY') }
        </div>
      </div>
      {
         isFetching
          && (<RefetchButton isFetching={isFetching} onRefetch={refreshTweets} />)
      }
      <div className="mt-5 position-relative">
        <h3>Tweets</h3>
        {
          !errors.lenght && !isFetching && tweets.length === 0 && (<NoTweets />)
        }
        <Tweets
          user={user}
          tweets={tweets}
          errors={errors}
          selector={`ownerId = '${user.objectId}'`}
          isFetching={isFetching}
          onRefresh={refreshTweets}
        />
      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
    objectId: PropTypes.string.isRequired,
  }).isRequired,
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

export default connect(mapStateToProps)(Profile);
