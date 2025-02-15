import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import auth from "../../../firebase.config";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("User on auth state changed:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  // Sign up with email/password

  const signUp = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (name?.displayName) {
        await updateProfile(userCredential.user, {
          displayName: name.displayName,
        });
        setUser((prevUser) => ({ ...prevUser, displayName: name.displayName }));
      }
      setAuthError(null);
    } catch (error) {
      setAuthError(error.message);
      // Re-throw the error so it can be handle in the form
    }
  };

  const authInfo = {
    user,
    loading,
    authError,
    signUp,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
