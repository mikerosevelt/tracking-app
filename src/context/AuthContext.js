import AsyncStorage from '@react-native-async-storage/async-storage';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';
import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signup':
    case 'signin':
      return { token: action.payload, errorMessage: '' };
    case 'signout':
      return { token: null, errorMessage: '' };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('t');
  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('TrackList');
  } else {
    navigate('Signup');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'clear_error_message' });
};

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerApi.post('/auth/signup', {
        email,
        password,
      });
      await AsyncStorage.setItem('t', response.data.token);
      dispatch({ type: 'signup', payload: response.data.token });
      navigate('TrackList');
    } catch (error) {
      dispatch({ type: 'add_error', payload: 'Something went wrong!' });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerApi.post('/auth/signin', {
        email,
        password,
      });
      await AsyncStorage.setItem('t', response.data.token);
      dispatch({ type: 'signin', payload: response.data.token });
      navigate('TrackList');
    } catch (error) {
      dispatch({ type: 'add_error', payload: 'Something went wrong!' });
    }
  };

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('t');
  dispatch({ type: 'signout' });
  navigate('Signin');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
);
