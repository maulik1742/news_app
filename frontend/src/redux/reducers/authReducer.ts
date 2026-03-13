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

interface UserInfo {
  _id: string;
  username: string;
  email: string;
  preferences?: string[];
  token: string;
}

interface AuthState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userInfo: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('userInfo') || 'null') : null,
  loading: false,
  error: null,
};

export const userLoginReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
    case USER_PREFERENCES_REQUEST:
      return { ...state, loading: true, error: null };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, error: null };
    case USER_PREFERENCES_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null,
      };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
    case USER_PREFERENCES_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return { ...state, userInfo: null, error: null };
    default:
      return state;
  }
};
