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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => { // ekhaner currentUser sheta hosse call back er argument
      console.log("User in onAuthStateChanged", currentUser);
      setUser(currentUser);
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

  const updateUserProfile = async (updates) => {
    try {
      // 1. বর্তমান ইউজার চেক করা
      const user = auth.currentUser;

      if (!user) {
        throw new Error("কোনো ইউজার লগইন করেনি!");
      }

      // ২. Firebase-এ প্রোফাইল আপডেট করা

      await updateProfile(user, updates);

      // ৩. লোকাল স্টেট আপডেট (React State)
      setUser((prev) => ({
        ...prev,
        ...updates,
      }));
    } catch (error) {
      // ৪. এরর হ্যান্ডেলিং
      console.error("প্রোফাইল আপডেটে সমস্যা:", error.message);
      throw error;
    }
  };

  const authInfo = {
    user,
    loading,
    authError,
    signUp,
    updateUserProfile,
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
