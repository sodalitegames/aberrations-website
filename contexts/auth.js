import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

import api from '../lib/auth-api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUserFromCookies() {
      console.log('I RAN');
      const token = Cookies.get('token');
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        try {
          const { data } = await api.get('/users/getMe');
          const user = data.data.user;
          if (user) setUser(user);
        } catch (e) {
          console.log(e);
          // logout();
        }
      }
      setLoading(false);
    }

    const token = Cookies.get('token');

    console.log(token);

    if (!user) {
      loadUserFromCookies();
    }
  }, [user]);

  const setCookie = (user, token, path) => {
    Cookies.set('token', token, { expires: 60 });
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(user);
    window.location = path;
  };

  const login = async (email, password, path) => {
    try {
      const { data } = await api.post('/auth/password_login', { email, password });
      console.log(data);
      if (data.token && data.data.user) {
        setCookie(data.data.user, data.token, path || '/dashboard');
      } else {
        return { status: data.status, message: data.message };
      }
    } catch (e) {
      return { status: 'fail', message: 'Something went wrong on our end. Please try again later.' };
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    delete api.defaults.headers.Authorization;
  };

  const signup = async (name, email, password, passwordConfirm, subscribe, path) => {
    try {
      const { data } = await api.post('/auth/signup', { name, email, password, passwordConfirm, subscribe });

      if (data.token && data.data.user) {
        setCookie(data.data.user, data.token, path || '/dashboard');
      } else {
        return { status: data.status, message: data.message };
      }
    } catch (e) {
      return { status: 'fail', message: 'Something went wrong on our end. Please try again later.' };
    }
  };

  const forgotPassword = async email => {
    try {
      const {
        data: { status, message },
      } = await api.post('/auth/forgotPassword', { email });
      return { status, message };
    } catch (e) {
      return { status: 'fail', message: 'Something went wrong on our end. Please try again later.' };
    }
  };

  const resetPassword = async (resetToken, password, passwordConfirm) => {
    const url = `/auth/resetPassword/${resetToken}`;
    try {
      const {
        data: {
          data: { user },
          token,
        },
      } = await api.patch(url, { password, passwordConfirm });
      if (token && user) {
        setCookie(user, token, '/dashboard?reset=success');
      } else {
        return { status: 'fail', message: 'Something went wrong on our end, please try again later.' };
      }
    } catch (e) {
      return { status: 'fail', message: 'Something went wrong on our end, please try again later.' };
    }
  };

  const sendVerificationEmail = async () => {
    try {
      const { data } = await api.get(`/auth/sendVerificationEmail`);
      return data;
    } catch (e) {
      return { status: 'fail', message: 'Something went wrong, please try again later.' };
    }
  };

  const verifyEmailStart = async email => {
    try {
      const { data } = await api.post(`/auth/verify_email_start`, { email });
      console.log('verify email start:', data);
      return { status: 'success', message: 'Verification email has been sent. Please check your inbox.' };
    } catch (e) {
      console.log(e);
      console.log(e.response);
      return { status: 'fail', message: 'Something went wrong, please try again later.' };
    }
  };

  const verifyEmail = async token => {
    try {
      const { data } = await api.post(`/auth/verify_email`, { token });
      console.log('verfiy email:', data);
      return data;
    } catch (e) {
      console.log(e);
      console.log(e.response);
      return { status: 'fail', message: 'Invalid or expired token. Please try again later.' };
    }
  };

  const updateUserEmail = async (currentEmail, email) => {
    try {
      const { data } = await api.patch(`/auth/updateEmail`, { currentEmail, email });
      return data;
    } catch (e) {
      return { status: 'fail', message: 'Something went wrong on our end. Please try again later' };
    }
  };

  const verifyEmailUpdate = async verificationToken => {
    try {
      const { data } = await api.get(`/auth/verifyEmailUpdate/${verificationToken}`);
      return data;
    } catch (e) {
      return { status: 'fail', message: 'Invalid or expired token. Please try again later.' };
    }
  };

  const updateUser = async updateData => {
    try {
      const { data } = await api.patch('/users/updateMe', updateData);
      return data;
    } catch (e) {
      return { status: 'fail', message: 'Something went wrong on our end. Please try again later' };
    }
  };

  const updateUserPassword = async (passwordCurrent, password, passwordConfirm) => {
    // validation
    if (password.length < 8 || passwordConfirm.length < 8) {
      return { status: 'fail', message: 'Password must be at least 8 characters in length.' };
    }

    try {
      const { data } = await api.patch('/auth/updatePassword', { passwordCurrent, password, passwordConfirm });
      if (data.token && data.data.user) {
        setCookie(data.data.user, data.token, '/dashboard/account-settings?password=success');
      } else {
        return { status: data.status, message: data.message };
      }
    } catch (e) {
      return { status: 'fail', message: 'Something went wrong. Please try again later' };
    }
  };

  const deleteUser = async () => {
    try {
    } catch (e) {}
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        setUser,
        login,
        loading,
        logout,
        signup,
        forgotPassword,
        resetPassword,
        sendVerificationEmail,
        verifyEmail,
        updateUserEmail,
        verifyEmailUpdate,
        updateUser,
        updateUserPassword,
        verifyEmailStart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
