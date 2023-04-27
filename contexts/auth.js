import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  onAuthStateChanged,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updatePassword as _updatePassword,
  updateEmail as _updateEmail,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

import firebase from '../lib/firebase';

import api, { forgotPassword as _forgotPassword, setupAccount as _setupAccount, sendEmailVerification as _sendEmailVerification } from '../apis/internal';

const auth = getAuth(firebase);
const firestore = getFirestore(firebase);

const AuthContext = createContext({});

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
      if (user) {
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
      result = await createUserWithEmailAndPassword(auth, email, password);

      console.log('Result:', result);

      // await setDoc(doc(firestore, 'users', result.uid), { email }, { merge: true });
    } catch (err) {
      console.log(err);
      error = { status: 'error', message: 'Something went wrong. Please try again later.' };
    }

    return { result, error };
  };

  const signin = async (email, password) => {
    let result = null;
    let error = null;

    try {
      result = await signInWithEmailAndPassword(auth, email, password);

      console.log('Result:', result);
    } catch (err) {
      console.log(err);
      error = { status: 'error', message: 'Something went wrong. Please try again later.' };
    }

    return { result, error };
  };

  const signout = async () => {
    let result = null;
    let error = null;

    try {
      result = await signOut(auth);
    } catch (err) {
      error = err;
    }

    return { result, error };
  };

  const setupAccount = async (name, subscribe) => {
    let result = null;
    let error = null;

    try {
      const resp = await _setupAccount({ name, subscribe });
      await auth.currentUser.reload();
      result = resp.data;
    } catch (err) {
      console.log(err);
      error = { status: 'error', message: 'Something went wrong. Please try again later.' };
    }

    return { result, error };
  };

  const forgotPassword = async email => {
    let result = null;
    let error = null;

    try {
      const resp = await _forgotPassword(email);
      result = resp.data;
    } catch (err) {
      console.log(err);
      error = { status: 'error', message: 'Something went wrong. Please try again later.' };
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
      console.log(err);
      error = { status: 'error', message: 'Something went wrong. Please try again later.' };
    }

    return { result, error };
  };

  const updateUser = async displayName => {
    let result = null;
    let error = null;

    try {
      await updateProfile(auth.currentUser, { displayName });
      await auth.currentUser.reload();
      result = { status: 'success', message: 'Profile successfully updated.' };
    } catch (err) {
      console.log(err);
      error = { status: 'error', message: 'Something went wrong. Please try again later.' };
    }

    return { result, error };
  };

  const updatePassword = async newPassword => {
    let result = null;
    let error = null;

    try {
      await _updatePassword(auth.currentUser, newPassword);
      await auth.currentUser.reload();
      result = { status: 'success', message: 'You password has been successfully updated.' };
    } catch (err) {
      console.log(err);
      error = { status: 'error', message: 'Something went wrong. Please try again later.' };
    }

    return { result, error };
  };

  const updateEmail = async newEmail => {
    let result = null;
    let error = null;

    try {
      await _updateEmail(auth.currentUser, newEmail);
      await auth.currentUser.reload();
      result = { status: 'success', message: 'Profile successfully updated.' };
    } catch (err) {
      console.log(err);
      error = { status: 'error', message: 'Something went wrong. Please try again later.' };
    }

    return { result, error };
  };

  return (
    <AuthContext.Provider value={{ user, data, loading, signin, signup, signout, setupAccount, forgotPassword, sendEmailVerification, updatePassword, updateEmail, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
