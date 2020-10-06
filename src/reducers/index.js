import { combineReducers } from 'redux';
import userReducer from '@reducers/user';
import tweetReducer from '@reducers/tweet';

export default combineReducers({
  userReducer,
  tweetReducer,
});
