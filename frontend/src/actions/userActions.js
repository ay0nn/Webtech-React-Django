import { useDispatch } from 'react-redux'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_REQUEST, // Import the new constant
    USER_REGISTER_SUCCESS, // Import the new constant
    USER_REGISTER_FAIL,
} from '../constants/userConstants'
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            '/api/users/login/',
            { 'username': email, 'password': password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const logout = () => async (dispatch) => {
    try {
      // Perform any additional logout-related tasks (if needed)
  
      // Dispatch the USER_LOGOUT action to clear user info from state
      dispatch({ type: USER_LOGOUT });
  
      // Clear user info from local storage
      localStorage.removeItem('userInfo');
    } catch (error) {
      // Handle any errors that might occur during logout (optional)
    }
  };
  export const register = (name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const { data } = await axios.post(
        '/api/users/register/',
        { 'name':name, 'email': email,'password': password },
        config
      );
  
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
  
      // Optionally, you can dispatch the login action here to automatically log in the user after successful registration.
      // dispatch(login(email, password));
  
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };