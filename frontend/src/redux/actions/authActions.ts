import { Dispatch } from 'redux';
import api from '../../utils/api';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_PREFERENCES_REQUEST,
  USER_PREFERENCES_SUCCESS,
  USER_PREFERENCES_FAIL,
} from '../constants/authConstants';

export const login = (email: string, password: string): any => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await api.post('/auth/login', { email, password });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error: any) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const register = (username: string, email: string, password: string): any => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data } = await api.post('/auth/register', { username, email, password });

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error: any) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updatePreferences = (preferences: string[]): any => async (dispatch: Dispatch, getState: any) => {
  try {
    dispatch({ type: USER_PREFERENCES_REQUEST });

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.put('/auth/preferences', { preferences }, config);

    const updatedUserInfo = {
        ...userInfo,
        preferences: data.preferences,
    };

    dispatch({
      type: USER_PREFERENCES_SUCCESS,
      payload: updatedUserInfo,
    });

    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
  } catch (error: any) {
    dispatch({
      type: USER_PREFERENCES_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};
