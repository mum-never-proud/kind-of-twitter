import {
  SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE,
  SIGN_UP_REQUEST, SIGN_UP_FAILURE, SIGN_OUT_SUCCESS,
  CLEAR_SERVER_ERRORS,
} from '@action-types';

const initialState = {
  isAuthenticated: false,
  isSubmitting: false,
  user: {},
  errors: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_REQUEST:
    case SIGN_UP_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: [],
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isSubmitting: false,
        user: action.payload,
        errors: [],
      };
    case SIGN_IN_FAILURE:
    case SIGN_UP_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        errors: action.payload || [],
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: {},
        errors: [],
        userTweets: [],
        isAuthenticated: false,
      };
    case CLEAR_SERVER_ERRORS:
      return {
        ...state,
        errors: [],
      };
    default:
      return state;
  }
}
