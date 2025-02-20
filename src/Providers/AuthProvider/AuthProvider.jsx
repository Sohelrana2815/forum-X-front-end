import { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import auth from "../../../firebase.config";
import { AuthContext } from "../../Hooks/auth-context";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("User in auth state change:", currentUser);
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign up with email/password

  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(
        "Firebase user created successfully! UID:",
        userCredential.user.uid
      );
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";
      // Firebase error codes
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email already in use";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/weak-password":
          errorMessage = "Password must be at least 6 characters";
          break;
      }
      setAuthError(errorMessage);
      throw error;
    }
  };

  // Sign in with email/password

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("User signed in successfully! UID:", userCredential.user.uid);

      setAuthError(null); // Clear any previous errors
      return userCredential; // Return the user credential
    } catch (error) {
      let errorMessage = "Sign-in failed. Please try again.";
      // Firebase error codes

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "User not found. Please check your email.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid credentials. Please check your email and password and try again.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please try again later.";
          break;
      }

      setAuthError(errorMessage); // Set the error message
      throw error;
    }
  };

  // Sign-out method

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Sign-out error:", error.message);
    }
  };

  const updateUserProfile = async (updates) => {
    try {
      // 1. Check current user
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not logged in");
      }
      // 2. Firebase profile update
      await updateProfile(user, updates);
      // 3. Update the local state (React State)

      setUser((prev) => ({
        ...prev,
        ...updates,
      }));
    } catch (error) {
      // Error handling
      console.error("Profile update problem:", error.message);
      throw error;
    }
  };

  const authInfo = {
    user,
    loading,
    authError,
    signUp,
    signIn,
    signOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Define PropTypes

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
