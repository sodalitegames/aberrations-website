import React, { createContext, useState, useContext, useEffect } from 'react';
import { Auth } from '@aws-amplify/auth';

import api from 'apis/internal';

Auth.configure({
  userPoolId: process.env.NEXT_PUBLIC_AWS_AMPLIFY_USER_POOL_ID,
  userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_AMPLIFY_USER_POOL_WEB_CLIENT_ID,
  region: process.env.NEXT_PUBLIC_AWS_AMPLIFY_REGION,
});

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        if (currentUser) {
          setUser(currentUser);
          setLoading(false);
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setUser(null);
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }, [token]);

  const signin = async (email, password) => {
    const currentUser = await Auth.signIn(email, password);
    setUser(currentUser);
    setLoading(false);
  };

  const signup = async (email, password, name) => {
    await Auth.signUp({
      username: email,
      password,
      attributes: {
        given_name: 'temporary',
        family_name: 'temporary',
        email,
        name,
      },
    });
  };

  const confirmSignup = async (email, code) => {
    await Auth.confirmSignUp(email, code);
  };

  const resendSignupCode = async email => {
    await Auth.resendSignUp(email);
  };

  const signout = async () => {
    await Auth.signOut();
    setUser(null);
    setLoading(false);
  };

  const forgotPassword = async email => {
    await Auth.forgotPassword(email);
  };

  const resetPassword = async (email, code, password) => {
    await Auth.forgotPasswordSubmit(email, code, password);
  };

  return <AuthContext.Provider value={{ user, loading, signin, signup, signout, confirmSignup, resendSignupCode, forgotPassword, resetPassword }}>{children}</AuthContext.Provider>;
};
