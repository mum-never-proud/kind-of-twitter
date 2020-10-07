import {
  SAVE_TWEET_REQUEST, SAVE_TWEET_SUCCESS, SAVE_TWEET_FAILURE,
  FETCH_TWEETS_REQUEST, FETCH_TWEETS_SUCCESS, FETCH_TWEETS_FAILURE,
  FETCH_PRIMARY_TWEETS_REQUEST, FETCH_PRIMARY_TWEETS_SUCCESS, FETCH_PRIMARY_TWEETS_FAILURE,
  RESET, LOCAL_TWEET_UPDATE, CLEAR_SERVER_ERRORS,
} from '@action-types';
import * as tweetService from '@services/tweet';

const saveTweetRequest = () => ({
  type: SAVE_TWEET_REQUEST,
});

const saveTweetSuccess = (payload) => ({
  type: SAVE_TWEET_SUCCESS,
  payload,
});

const saveTweetFailure = (payload) => ({
  type: SAVE_TWEET_FAILURE,
  payload,
});

const fetchTweetsRequest = () => ({
  type: FETCH_TWEETS_REQUEST,
});

const fetchTweetsSuccess = (payload) => ({
  type: FETCH_TWEETS_SUCCESS,
  payload,
});

const fetchTweetsFailure = (payload) => ({
  type: FETCH_TWEETS_FAILURE,
  payload,
});

const fetchPrimaryTweetsRequest = () => ({
  type: FETCH_PRIMARY_TWEETS_REQUEST,
});

const fetchPrimaryTweetsSuccess = (payload) => ({
  type: FETCH_PRIMARY_TWEETS_SUCCESS,
  payload,
});

const fetchPrimaryTweetsFailure = (payload) => ({
  type: FETCH_PRIMARY_TWEETS_FAILURE,
  payload,
});

const localTweetUpdate = (payload) => ({
  type: LOCAL_TWEET_UPDATE,
  payload,
});

export const clearServerErrors = () => ({
  type: CLEAR_SERVER_ERRORS,
});

export const reset = () => ({
  type: RESET,
});

export const saveTweet = (tweet, headers) => (dispatch) => {
  // before save
  tweet.likes = tweet.likes || [];

  dispatch(saveTweetRequest());
  tweetService.save(tweet)
    .then((payload) => {
      tweetService.notifyChannel('kot-tweet', payload, headers);
      dispatch(saveTweetSuccess(payload));
    })
    .catch(({ message }) => dispatch(saveTweetFailure([message])));
};

export const fetchTweets = () => (dispatch) => {
  dispatch(fetchTweetsRequest());
  tweetService.fetchTweets()
    .then((payload) => dispatch(fetchTweetsSuccess(payload)))
    .catch(({ message }) => dispatch(fetchTweetsFailure([message])));
};

export const fetchPrimaryTweets = () => (dispatch) => {
  dispatch(fetchPrimaryTweetsRequest());
  tweetService.fetchPrimaryTweets()
    .then((payload) => dispatch(fetchPrimaryTweetsSuccess(payload)))
    .catch(({ message }) => dispatch(fetchPrimaryTweetsFailure([message])));
};

export const updateLocalTweet = (payload, userId) => (dispatch) => {
  const { message: tweet, headers: { authorId } } = payload;

  dispatch(localTweetUpdate({ tweet, authorId, userId }));
};

export const resetStore = (dispatch) => {
  dispatch(reset());
};
