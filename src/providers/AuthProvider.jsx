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
import app from "../../firebase/firebase.config";
import Swal from "sweetalert2";

// Create AuthContext
export const AuthContext = createContext();

// Initialize Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  // State variables
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hotelData, setHotelData] = useState([]);
  const [hotelListData, setHotelListData] = useState([]);
  const [earningList, setEarningList] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [UserInfo, setUserInfo] = useState([]);


  // Fetch hotel data
  useEffect(() => {
    const fetchHotelData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_Link}/hotel-data`
        );
        if (!response.ok) {
          throw new Error(
            `Error fetching hotelData.json: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setHotelData(data);
      } catch (error) {
        console.error("Error fetching hotelData.json:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, []);

 


  // Fetch hotel list data
  useEffect(() => {
    const fetchHotelListData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_Link}/hotels-list`
        );
        if (!response.ok) {
          throw new Error(
            `Error fetching hotelListData.json: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setHotelListData(data);
      } catch (error) {
        console.error("Error fetching hotelListData.json:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelListData();
  }, []);

  // Fetch earning list
  useEffect(() => {
    const fetchEarningList = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_Link}/all-earnings`
        );
        if (!response.ok) {
          throw new Error(
            `Error fetching earningList.json: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setEarningList(data);
      } catch (error) {
        console.error("Error fetching earningList.json:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEarningList();
  }, []);

  // Handle user login with email and password
  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      Swal.fire({
        title: "Successfully Signed In",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Login failed:", error);
      Swal.fire({
        title: "Login Failed",
        text: error.message || "Invalid email or password. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle user creation with email and password
  const createUser = async (email, password, name) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send user info to the server
      await fetch(`${import.meta.env.VITE_API_Link}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          name: name,
          email: user.email,
          imageURL: user.photoURL || null,
        }),
      });

      setUser(user);
      Swal.fire({
        title: "Account Created Successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("User creation failed:", error);
      Swal.fire({
        title: "User Creation Failed",
        text: error.message || "An error occurred. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Send user info to the server
      await fetch(`${import.meta.env.VITE_API_Link}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          imageURL: user.photoURL || null,
        }),
      });

      setUser(user);
      Swal.fire({
        title: "Successfully Signed In with Google",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Google Login Failed:", error);
      Swal.fire({
        title: "Google Login Failed",
        text: error.message || "An error occurred during Google login. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };


  // Fetch user data from the server when the authenticated user's email changes
 useEffect(() => {
  if (user?.email) {
    const fetchUsersData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_Link}/users/${user.email}`);
        if (!response.ok) {
          throw new Error(
            `Error fetching user data: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setUsersData(data); // Store the fetched user data in state
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  } else {
    setUsersData(null); // Clear user data if no user is logged in
  }
}, [user?.email]);


// // Fetch users list
// const fetchUserByEmail = async (email) => {
//   try {
//     const response = await fetch(`${import.meta.env.VITE_API_Link}/users/${email}`);
//     if (!response.ok) {
//       throw new Error('User not found or server error');
//     }
//     const user = await response.json();
//     console.log('User data:', user);
//     return user;
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return null;
//   }
// };

// // Usage
// fetchUserByEmail();


// Fetch userInfo list
useEffect(() => {
  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_Link}/UserInfo`
      );
      if (!response.ok) {
        throw new Error(
          `Error fetching userInfo.json: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching userInfo.json:", error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchUserInfo();
}, []);





  // Handle user sign-out
  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      Swal.fire({
        title: "Successfully Signed Out",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Sign out failed:", error);
      Swal.fire({
        title: "Sign Out Failed",
        text: error.message || "An error occurred. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Context value
  const authInfo = {
    user,
    hotelData,
    hotelListData,
    loading,
    earningList,
    usersData,
    UserInfo,
    login,
    createUser,
    googleLogin,
    signOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;