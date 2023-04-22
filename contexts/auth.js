import React, { createContext, useState, useContext, useEffect } from 'react';
import { onAuthStateChanged, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

import firebase from '../lib/firebase';

const auth = getAuth(firebase);
const firestore = getFirestore(firebase);

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
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

      // await setDoc(doc(firestore, 'users', result.uid), {}, {merge: true})
    } catch (e) {
      console.log(e);
      error = e;
    }

    return { result, error };
  };

  const signin = async (email, password) => {
    let result = null;
    let error = null;

    try {
      result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      error = e;
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

  return <AuthContext.Provider value={{ user, loading, signin, signup, signout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
