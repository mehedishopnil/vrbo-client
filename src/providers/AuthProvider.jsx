import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";
import Swal from "sweetalert2";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hotelData, setHotelData] = useState([]);
  const [hotelListData, setHotelListData] = useState([]);
  const [earningList, setEarningList] = useState([]);
  const [yearlyEarnings, setYearlyEarnings] = useState({});
  const [usersData, setUsersData] = useState([]);
  const [UserInfo, setUserInfo] = useState([]);

  console.log(yearlyEarnings)
  

  // Fetch all users data
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_Link}/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsersData(data);
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user data
  const updateUser = async (userId, updateData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_Link}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      
      if (!response.ok) throw new Error('Failed to update user');
      
      // Refresh users data if successful
      await fetchAllUsers();
      return await response.json();
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_Link}/users/${userId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete user');
      
      // Refresh users data if successful
      await fetchAllUsers();
      return await response.json();
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  // Fetch yearly earnings
  const fetchYearlyEarnings = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_Link}/yearly-earnings`);
      if (!response.ok) throw new Error('Failed to fetch yearly earnings');
      const data = await response.json();
      setYearlyEarnings(data);
      return data;
    } catch (error) {
      console.error("Error fetching yearly earnings:", error);
      throw error;
    }
  };

  // Update yearly earnings
  const updateYearlyEarnings = async (earningsData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_Link}/yearly-earnings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(earningsData)
      });
      
      if (!response.ok) throw new Error('Failed to update yearly earnings');
      
      // Refresh earnings data if successful
      await fetchYearlyEarnings();
      return await response.json();
    } catch (error) {
      console.error("Error updating yearly earnings:", error);
      throw error;
    }
  };

  // Check admin status when user changes
  useEffect(() => {
    const checkAdminStatus = async (email) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_Link}/users/${email}`);
        if (response.ok) {
          const userData = await response.json();
          setAdmin(userData?.isAdmin || false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setAdmin(false);
      }
    };

    if (user?.email) {
      checkAdminStatus(user.email);
      // Also fetch all users data when admin logs in
      if (admin) {
        fetchAllUsers();
        fetchYearlyEarnings();
      }
    } else {
      setAdmin(false);
    }
  }, [user]);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetch(`${import.meta.env.VITE_API_Link}/hotel-data`).then(res => res.json()).then(setHotelData),
          fetch(`${import.meta.env.VITE_API_Link}/hotels-list`).then(res => res.json()).then(setHotelListData),
          fetch(`${import.meta.env.VITE_API_Link}/all-earnings`).then(res => res.json()).then(setEarningList),
          fetch(`${import.meta.env.VITE_API_Link}/UserInfo`).then(res => res.json()).then(setUserInfo),
          fetchYearlyEarnings()
        ]);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      Swal.fire({
        title: "Successfully Signed In",
        icon: "success",
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error.message || "Invalid credentials",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (email, password, name) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await fetch(`${import.meta.env.VITE_API_Link}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          name: name,
          email: user.email,
          imageURL: user.photoURL || null,
          isAdmin: false,
          createdAt: new Date().toISOString()
        }),
      });

      setUser(user);
      Swal.fire({
        title: "Account Created",
        icon: "success",
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        title: "Creation Failed",
        text: error.message || "Error creating account",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await fetch(`${import.meta.env.VITE_API_Link}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          imageURL: user.photoURL || null,
          isAdmin: false,
          createdAt: new Date().toISOString()
        }),
      });

      setUser(user);
      Swal.fire({
        title: "Google Login Success",
        icon: "success",
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        title: "Google Login Failed",
        text: error.message || "Error with Google login",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setAdmin(false);
      Swal.fire({
        title: "Signed Out",
        icon: "success",
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        title: "Sign Out Failed",
        text: error.message || "Error signing out",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    admin,
    hotelData,
    hotelListData,
    loading,
    earningList,
    yearlyEarnings,
    usersData,
    UserInfo,
    login,
    createUser,
    googleLogin,
    signOut,
    fetchAllUsers,
    updateUser,
    deleteUser,
    fetchYearlyEarnings,
    updateYearlyEarnings
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;