import React, { createContext, useState, useContext, useEffect } from 'react';
import { onAuthStateChanged, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

import firebase from '../lib/firebase';

const auth = getAuth(firebase);
const firestore = getFirestore(firebase);

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const userSnap = await getDoc(doc(firestore, 'users', user.uid));
        setUser({ ...user, data: userSnap.data() });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password) => {
    let result = null;
    let error = null;

    try {
      result = await createUserWithEmailAndPassword(auth, email, password);

      console.log('Result:', result);

      await setDoc(doc(firestore, 'users', result.uid), { email }, { merge: true });
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
      // const resp = await setupAccount({name, subscribe})
    } catch (err) {
      console.log(err);
      error = { status: 'error', message: 'Something went wrong. Please try again later.' };
    }

    return { result, error };
  };

  return <AuthContext.Provider value={{ user, loading, signin, signup, signout, setupAccount }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
