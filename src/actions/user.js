import {
  SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE,
  SIGN_UP_REQUEST, SIGN_UP_FAILURE, SIGN_OUT_SUCCESS,
  CLEAR_SERVER_ERRORS,
} from '@action-types';
import {
  signIn, signUp, signOut, validateSession,
} from '@services/user';

const signInRequest = () => ({
  type: SIGN_IN_REQUEST,
});

const signInSuccess = (payload) => ({
  type: SIGN_IN_SUCCESS,
  payload,
});

const signInFailure = (payload) => ({
  type: SIGN_IN_FAILURE,
  payload,
});

const signUpRequest = () => ({
  type: SIGN_UP_REQUEST,
});

const signUpFailure = (payload) => ({
  type: SIGN_UP_FAILURE,
  payload,
});

const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
});

export const clearServerErrors = () => ({
  type: CLEAR_SERVER_ERRORS,
});

export const signInUser = (credentials) => (dispatch) => {
  dispatch(signInRequest());
  signIn(credentials)
    .then((user) => dispatch(signInSuccess(user)))
    .catch(({ message }) => {
      dispatch(signInFailure([message]));
    });
};

export const signUpUser = (credentials) => (dispatch) => {
  dispatch(signUpRequest());
  signUp(credentials)
    .then(() => dispatch(signInUser(credentials)))
    .catch(({ message }) => dispatch(signUpFailure([message])));
};

export const signOutUser = () => (dispatch) => {
  signOut()
    .then(() => dispatch(signOutSuccess()));
};

export const validateUserSession = () => (dispatch) => {
  dispatch(signInRequest());
  validateSession()
    .then((user) => {
      if (user) {
        dispatch(signInSuccess(user));
      } else {
        dispatch(signInFailure());
      }
    })
    .catch(() => signOutUser()(dispatch));
};
