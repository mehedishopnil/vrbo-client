import React, { useContext } from 'react';
import { FaSearch, FaQuestionCircle } from 'react-icons/fa';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { IoMdMail } from 'react-icons/io';
import { BsFlag } from 'react-icons/bs';
import { Link } from 'react-router';
import { AuthContext } from '../../providers/AuthProvider';

const ToggleMenu = ({ closeMenu }) => {
  const { user, signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
    closeMenu();
  };

  return (
    <div className="bg-white rounded-lg p-4">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {user ? `Welcome back, ${user.displayName || 'User'}` : 'Unlock instant savings with Member Prices.'}
      </h3>

      {/* Sign In/Sign Out Button */}
      {user ? (
        <></>
      ) : (
        <Link to="/login" onClick={closeMenu}>
          <button className="w-full bg-blue-600 text-white font-medium py-2 rounded-full hover:bg-blue-700 transition">
            Sign in
          </button>
        </Link>
      )}

      {/* Learn More - Only show when not logged in */}
      {!user && (
        <p className="text-gray-800 font-semibold text-sm text-center mt-2 cursor-pointer hover:underline">
          Learn more
        </p>
      )}

      {/* Menu Items */}
      <div className="space-y-5 py-5">
        <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600">
          <IoMdMail className="text-xl" />
          <span>Inbox</span>
        </div>

        <hr className="text-gray-300" />

        <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600">
          <FaSearch className="text-xl" />
          <span>Shop travel</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600">
          <FaQuestionCircle className="text-xl" />
          <span>Support</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600">
          <BsFlag className="text-xl" />
          <span>English. USD $</span>
        </div>

        <hr className="text-gray-300" />

        <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600">
          <MdOutlineTravelExplore className="text-xl" />
          <span>List your property</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600">
          <span>Trips</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600">
          <span>Feedback</span>
        </div>

        {/* Sign Out Button at the bottom - Only shown when user is logged in */}
        {user && (
          <>
            <hr className="text-gray-300" />
            <button 
              onClick={handleSignOut}
              className="w-full text-left flex items-center gap-3 text-gray-700 hover:text-blue-600"
              style={{ border: 'none', background: 'none', padding: 0 }}
            >
              <span>Sign out</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ToggleMenu;