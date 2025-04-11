import { useContext, useState } from "react";
import { Link } from "react-router";
import { MdMenu } from "react-icons/md";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { ImSpinner8 } from "react-icons/im";
import Swal from "sweetalert2";
import logo from "../../../src/assets/vrbo_logo.svg";
import ToggleMenu from "../../components/ToggleMenu/ToggleMenu";
import { AuthContext } from "../../providers/AuthProvider";

const Header = () => {
  // const { user, signOut, usersData, loading } = useContext(AuthContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  const { user, usersData, loading, signOut } = useContext(AuthContext);

  const isUserLoggedIn = !!user; // Check if user is logged in

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev);
  };

  // Function to close the profile menu
  const closeProfileMenu = () => {
    setProfileMenuOpen(false);
  };

  // Handle signOut with SweetAlert2
  const handleSignOut = () => {
    Swal.fire({
      title: "Logged Out Successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      signOut(); // Call the signOut function from AuthContext
    });
  };

  return (
    <div className="container mx-auto bg-white shadow-md py-5 px-5 relative">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-3">
            <img src={logo} className="w-24 md:w-32" alt="Expedia Logo" />
          </div>
        </Link>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-5">
          {/* Get the App Button */}
          <button className="flex items-center gap-1  md:gap-2 rounded-full border border-gray-400 px-2 py-1 md:py-2 md:px-4 hover:bg-gray-700 hover:text-white transition-colors duration-200">
            <IoMdDownload className="text-blue-500 hover:text-white" />{" "}
            <span className="text-[15px] md:text-xl">Get the App</span>
          </button>

          {/* Profile Icon and Sign Out Icon */}
          <div className="flex items-center gap-3">
            {loading ? (
              <ImSpinner8 className="text-2xl animate-spin text-gray-500" />
            ) : isUserLoggedIn ? (
              <>
                <button
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-red-600"
                >
                  <FaSignOutAlt className="text-2xl" />
                </button>
                <button onClick={toggleProfileMenu}>
                  {usersData?.imageURL ? (
                    <img
                      src={usersData.imageURL}
                      alt="Profile"
                      className="w-[30px] h-[30px] rounded-full"
                    />
                  ) : (
                    <FaUserCircle className="text-3xl text-gray-700" />
                  )}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn btn-sm  rounded-full bg-gray-600 text-white  hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <MdMenu size={24} />
          </button>
        </div>

        {/* Profile Menu */}
        {isProfileMenuOpen && (
          <div className="absolute right-5 top-16 bg-white shadow-lg rounded-lg p-4 z-50">
            <ToggleMenu closeMenu={closeProfileMenu} />
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50">
            <ul className="p-4 text-gray-700 font-bold text-xl space-y-3">
              <li>
                <Link to="/" onClick={toggleMobileMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/resorts" onClick={toggleMobileMenu}>
                  Resorts
                </Link>
              </li>
              <li>
                <Link
                  to="/hosting-dashboard/listings"
                  onClick={toggleMobileMenu}
                >
                  My Hosting
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={toggleMobileMenu}>
                  Contact
                </Link>
              </li>
            </ul>
            <div className="w-full border border-gray-300"></div>
            <ul className="p-4 text-gray-700 font-bold text-xl">
              {loading ? (
                <div className="flex justify-center">
                  <ImSpinner8 className="animate-spin text-gray-500" />
                </div>
              ) : isUserLoggedIn ? (
                <div className="space-y-2">
                  <li>
                    <Link to="/hosting-dashboard/add-property">
                      Add Property
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut}>Log Out</button>
                  </li>
                  <li>
                    <Link to="/profile" onClick={toggleMobileMenu}>
                      Profile
                    </Link>
                  </li>
                </div>
              ) : (
                <>
                  <li>
                    <Link to="/login" onClick={toggleMobileMenu}>
                      Log In
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={toggleMobileMenu}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10 font-semibold text-lg text-gray-700">
          <Link to="/">Home</Link>
          <Link to="/resorts">Resorts</Link>
          <Link to="/hosting-dashboard/listings">My Hosting</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Desktop Profile & Auth Buttons */}
        <div className="hidden md:flex gap-5 justify-end">
          {loading ? (
            <ImSpinner8 className="text-2xl animate-spin text-gray-500" />
          ) : isUserLoggedIn ? (
            <div className="flex gap-5 items-center">
              <button
                onClick={handleSignOut}
                className="text-gray-700 hover:text-red-600"
              >
                <FaSignOutAlt className="text-2xl" />
              </button>
              <Link to="/profile">
                {usersData?.imageURL ? (
                  <img
                    src={usersData.imageURL}
                    alt="Profile"
                    className="w-[50px] h-[50px] rounded-full"
                  />
                ) : (
                  <FaUserCircle className="text-4xl text-gray-700" />
                )}
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm bg-gray-600 text-white hover:bg-blue-700"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
