import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  onAuthStateChanged,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile as _updateProfile,
  updatePassword as _updatePassword,
  updateEmail as _updateEmailFB,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import firebase from 'lib/firebase';

import api, {
  sendPasswordReset as _sendPasswordReset,
  setupAccount as _setupAccount,
  sendEmailVerification as _sendEmailVerification,
  updateEmail as _updateEmailAPI,
  updateSubscriber,
} from 'apis/internal';

const auth = getAuth(firebase);
const firestore = getFirestore(firebase);

const AuthContext = createContext({});

const handleLoginError = code => {
  switch (code) {
    case 'auth/user-not-found':
      return { status: 'error', message: 'No account found. Please sign up.' };
    case 'auth/wrong-password':
      return { status: 'error', message: 'Invalid password. Please try again.' };
    case 'auth/invalid-email':
      return { status: 'error', message: 'Email is invalid. Please try again.' };
    case 'auth/missing-password':
      return { status: 'error', message: 'You must provide a password. Please try again.' };
    default:
      return { status: 'error', message: 'An error occurred. Please try again later.' };
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState(null);

  const fetchData = async uid => {
    const userSnap = await getDoc(doc(firestore, 'users', uid));
    return userSnap.data();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      console.log('on auth state changed!');
      if (user) {
        console.log('user condition triggered!');
        const idToken = await user.getIdToken();
        const userData = await fetchData(user.uid);
        setUser(user);
        setData(userData);
        setToken(idToken);
      } else {
        setUser(null);
        setData(null);
        setToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }, [token]);

  const signup = async (email, password) => {
    let result = null;
    let error = null;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      result = { status: 'success', message: 'You have successfully signed up.' };
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          error = { status: 'error', message: 'There is already an account associated with that email.' };
          break;
        case 'auth/weak-password':
          error = { status: 'error', message: 'Passwords must be at least 6 characters long.' };
          break;
        case 'auth/invalid-email':
          error = { status: 'error', message: 'Email is invalid. Please try again.' };
          break;
        case 'auth/missing-email':
          error = { status: 'error', message: 'You must provide an email. Please try again.' };
          break;
        case 'auth/missing-password':
          error = { status: 'error', message: 'You must provide a password. Please try again.' };
          break;
        default:
          error = { status: 'error', message: 'An error occurred. Please try again later.' };
          break;
      }
    }

    return { result, error };
  };

  const signin = async (email, password) => {
    let result = null;
    let error = null;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      result = { status: 'success', message: 'You have successfully signed in.' };
    } catch (err) {
      error = handleLoginError(err.code);
    }

    return { result, error };
  };

  const signout = async () => await signOut(auth);

  const setupAccount = async (name, subscribe) => {
    let result = null;
    let error = null;

    try {
      const resp = await _setupAccount({ name, subscribe });
      result = resp.data;
    } catch (err) {
      if (err.response && err.response.data) {
        const { status, message } = err.response.data;
        error = { status: status || 'error', message: message || 'An error occurred. Please try again later.' };
      }

      if (!error) {
        error = { status: 'error', message: 'An error occurred. Please try again later.' };
      }
    }

    return { result, error };
  };

  const sendPasswordReset = async email => {
    let result = null;
    let error = null;

    try {
      const resp = await _sendPasswordReset(email);
      result = resp.data;
    } catch (err) {
      if (err.response && err.response.data) {
        const { status, message } = err.response.data;
        error = { status: status || 'error', message: message || 'An error occurred. Please try again later.' };
      }

      if (!error) {
        error = { status: 'error', message: 'An error occurred. Please try again later.' };
      }
    }

    return { result, error };
  };

  const sendEmailVerification = async () => {
    let result = null;
    let error = null;

    try {
      const resp = await _sendEmailVerification();
      result = resp.data;
    } catch (err) {
      if (err.response && err.response.data) {
        const { status, message } = err.response.data;
        error = { status: status || 'error', message: message || 'An error occurred. Please try again later.' };
      }

      if (!error) {
        error = { status: 'error', message: 'An error occurred. Please try again later.' };
      }
    }

    return { result, error };
  };

  const updateProfile = async displayName => {
    let result = null;
    let error = null;

    try {
      await _updateProfile(auth.currentUser, { displayName });
      await updateSubscriber({ name: displayName });
      result = { status: 'success', message: 'Profile successfully updated.' };
    } catch (err) {
      error = { status: 'error', message: 'An error occurred. Please try again later.' };
    }

    return { result, error };
  };

  const updatePassword = async (oldPassword, newPassword, retry) => {
    let result = null;
    let error = null;

    try {
      await _updatePassword(auth.currentUser, newPassword);
      result = { status: 'success', message: 'You password has been successfully updated.' };
    } catch (err) {
      switch (err.code) {
        case 'auth/requires-recent-login':
          if (retry) {
            error = { status: 'error', message: 'You must reauthenticate to perform this action.' };
            break;
          }

          try {
            const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);
            await reauthenticateWithCredential(auth.currentUser, credential);
            const { result: _result, error: _error } = await updatePassword(auth.currentUser, newPassword, true);
            result = _result;
            error = _error;
          } catch (err) {
            error = handleLoginError(err.code);
          }
          break;
        case 'auth/weak-password':
          error = { status: 'error', message: 'Passwords must be at least 6 characters long.' };
          break;
        default:
          error = { status: 'error', message: 'An error occurred. Please try again later.' };
          break;
      }
    }

    return { result, error };
  };

  const updateEmail = async (password, newEmail, retry) => {
    let result = null;
    let error = null;

    try {
      // If no email, return error
      if (!newEmail) {
        error = { status: 'error', message: 'You must provide an email. Please try again.' };
        return { result, error };
      }

      // Set prev email
      const prevEmail = auth.currentUser.email;

      // Update email in firebase auth
      await _updateEmailFB(auth.currentUser, newEmail);

      // Set next email
      const nextEmail = auth.currentUser.email;

      // Update email in firestore and mongodb
      try {
        const resp = await _updateEmailAPI({ prevEmail, nextEmail });
        result = resp.data;
      } catch (err) {
        error = { status: 'error', message: 'Your email was updated, but an error occurred propogating the changes.' };
        return { result, error };
      }

      // Set success message
      result = { status: 'success', message: 'Your email has been successfully updated.' };
    } catch (err) {
      switch (err.code) {
        case 'auth/requires-recent-login':
          if (retry) {
            error = { status: 'error', message: 'You must reauthenticate to perform this action.' };
            break;
          }

          try {
            const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
            await reauthenticateWithCredential(auth.currentUser, credential);
            const { result: _result, error: _error } = await updateEmail(password, newEmail, true);
            result = _result;
            error = _error;
          } catch (err) {
            error = handleLoginError(err.code);
          }
          break;
        case 'auth/invalid-email':
          error = { status: 'error', message: 'Email is invalid. Please try again.' };
          break;
        case 'auth/email-already-in-use':
          error = { status: 'error', message: 'There is already an account associated with that email.' };
          break;
        default:
          error = { status: 'error', message: 'An error occurred. Please try again later.' };
          break;
      }
    }

    return { result, error };
  };

  return (
    <AuthContext.Provider value={{ user, data, loading, signin, signup, signout, setupAccount, sendPasswordReset, sendEmailVerification, updatePassword, updateEmail, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
