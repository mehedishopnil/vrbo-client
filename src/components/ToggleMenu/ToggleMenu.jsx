import React from 'react';
import { FaSearch, FaQuestionCircle } from 'react-icons/fa';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { IoMdMail } from 'react-icons/io';
import { BsFlag } from 'react-icons/bs';
import { Link } from 'react-router';

const ToggleMenu = ({ closeMenu }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Unlock instant savings with Member Prices.
      </h3>

      {/* Sign In Button */}
      <Link to="/login" onClick={closeMenu}>
        <button className="w-full bg-blue-600 text-white font-medium py-2 rounded-full hover:bg-blue-700 transition">
          Sign in
        </button>
      </Link>

      {/* Learn More */}
      <p className="text-gray-800 font-semibold text-sm text-center mt-2 cursor-pointer hover:underline">
        Learn more
      </p>

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
      </div>
    </div>
  );
};

export default ToggleMenu;