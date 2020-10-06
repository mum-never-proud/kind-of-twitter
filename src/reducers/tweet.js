import {
  SAVE_TWEET_REQUEST, SAVE_TWEET_SUCCESS, SAVE_TWEET_FAILURE,
  FETCH_TWEETS_REQUEST, FETCH_TWEETS_SUCCESS, FETCH_TWEETS_FAILURE,
  FETCH_PRIMARY_TWEETS_REQUEST, FETCH_PRIMARY_TWEETS_SUCCESS, FETCH_PRIMARY_TWEETS_FAILURE,
  RESET, LOCAL_TWEET_UPDATE, CLEAR_SERVER_ERRORS,
} from '@action-types';

const initialState = {
  isSubmitting: false,
  isFetching: false,
  tweets: [],
  userTweets: [],
  errors: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_TWEET_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: [],
      };
    case SAVE_TWEET_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        user: action.payload,
        errors: [],
      };
    case SAVE_TWEET_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        errors: action.payload,
      };
    case FETCH_PRIMARY_TWEETS_REQUEST:
    case FETCH_TWEETS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_TWEETS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        tweets: action.payload,
      };
    case FETCH_PRIMARY_TWEETS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userTweets: action.payload,
      };
    case FETCH_PRIMARY_TWEETS_FAILURE:
    case FETCH_TWEETS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.payload,
      };
    case LOCAL_TWEET_UPDATE: {
      const { tweet: { tweetId, likes }, authorId, userId } = action.payload;
      const tweetBucketName = authorId === userId ? 'userTweets' : 'tweets';
      const newState = { ...state };

      newState[tweetBucketName] = state[tweetBucketName].map((tweet) => {
        if (tweet.objectId === tweetId) {
          tweet.likes = likes;
        }

        return tweet;
      });

      return {
        ...newState,
      };
    }
    case CLEAR_SERVER_ERRORS:
      return {
        ...state,
        errors: [],
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}
