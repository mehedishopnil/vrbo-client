
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col items-center">
        {/* Links Section */}
        <div className="flex items-center mb-4 space-x-4">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">About Us</a>
          <a href="#" className="hover:text-gray-300">Services</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </div>

        {/* Copyright Section */}
        <p className="text-gray-400 text-sm mb-4">
          &copy; 2024 All rights reserved.
        </p>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="#" className="text-white hover:text-gray-300">
            <FaFacebook />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <FaTwitter />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;