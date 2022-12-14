import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, sendEmailVerification, signInWithPopup, signOut, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import app from '../firebase/firebase.config';
import toast from 'react-hot-toast';


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  }


  const updateUserProfile = (name, photo) => {
    setLoading(true)
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    })
  }


  const signInWithEmail = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }



  const signInWithProvider = (provider) => {
    setLoading(true)
    return signInWithPopup(auth, provider)
  }

  const verify = () => {
    setLoading(true)
    return sendEmailVerification(auth.currentUser)
  }



  const resetPass = (email) => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = () => {
    setLoading(true)
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem('AccessToken')
        toast.success('Log-out successful');
      }).catch((error) => {
        // An error happened.
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe();
  }, [])


  const authInfo = {
    user,
    createUser,
    signInWithEmail,
    signInWithProvider,
    updateUserProfile,
    verify,
    resetPass,
    logOut,
    loading,
    setLoading
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;