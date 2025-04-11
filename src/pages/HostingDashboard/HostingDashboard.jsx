import { Link, Outlet } from "react-router";
import { Disclosure, Transition } from "@headlessui/react";
import { MdOutlineLuggage, MdMenu, MdClose, MdAddHome } from "react-icons/md";
import { LiaMoneyBillSolid } from "react-icons/lia";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { PiBookOpenText } from "react-icons/pi";
import { FaHome, FaUser } from "react-icons/fa";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { useContext, useState } from "react";
import logo from "../../../src/assets/vrbo_logo.svg";
import { AuthContext } from "../../providers/AuthProvider";
import Loading from "../../components/Loading";


const HostingDashboard = () => {
  const { loading } = useContext(AuthContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading /> {/* Replace with your custom spinner */}
      </div>
    );
  }

  return (
    <div>
      {/* Main Layout */}
      <div className="lg:flex">
        {/* Sidebar for LG screens */}
        <div className="hidden lg:block lg:w-64 lg:flex-shrink-0 bg-slate-200">
          <div className="mt-5 ml-5">
            <Link to="/">
              <img src={logo} className="max-w-28 md:w-32" alt="Marriott Logo" />
            </Link>
          </div>

          <ul className="menu p-4 text-gray-700 font-bold text-lg">
            <li>
              <Link to="listings">
                <HiOutlineHomeModern /> Listings
              </Link>
            </li>
            <li>
              <Link to="reservation">
                <MdOutlineLuggage /> Reservations
              </Link>
            </li>
            <li>
              <Link to="earnings">
                <LiaMoneyBillSolid /> Earnings
              </Link>
            </li>
            <li>
              <Link to="insights">
                <TbBrandGoogleAnalytics /> Insights
              </Link>
            </li>
            <li>
              <Link to="guide-books">
                <PiBookOpenText /> Guidebooks
              </Link>
            </li>
            <li>
              <Link to="create-new-list">
                <MdAddHome /> Create a new list
              </Link>
            </li>

            <div className="border border-gray-400 my-4"></div>

            <li>
              <Link to="/">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <FaUser /> Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Content area */}
        <div className="flex-grow">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-slate-200">
            <Link to="/">
                      <div className="flex items-center gap-3">
                        <img src={logo} className="w-32 md:w-32" alt="Marriott Logo" />
                        
                      </div>
                    </Link>
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <Transition
            show={isMobileMenuOpen}
            enter="transition-transform duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="lg:hidden bg-slate-200 p-4">
              <ul className="menu text-gray-700 font-bold text-lg">
                <li>
                  <Link to="listings" onClick={() => setMobileMenuOpen(false)}>
                    <HiOutlineHomeModern /> Listings
                  </Link>
                </li>
                <li>
                  <Link to="reservation" onClick={() => setMobileMenuOpen(false)}>
                    <MdOutlineLuggage /> Reservations
                  </Link>
                </li>
                <li>
                  <Link to="earnings" onClick={() => setMobileMenuOpen(false)}>
                    <LiaMoneyBillSolid /> Earnings
                  </Link>
                </li>
                <li>
                  <Link to="insights" onClick={() => setMobileMenuOpen(false)}>
                    <TbBrandGoogleAnalytics /> Insights
                  </Link>
                </li>
                <li>
                  <Link to="guide-books" onClick={() => setMobileMenuOpen(false)}>
                    <PiBookOpenText /> Guidebooks
                  </Link>
                </li>
                <li>
                  <Link to="create-new-list" onClick={() => setMobileMenuOpen(false)}>
                    <MdAddHome /> Create a new list
                  </Link>
                </li>

                <div className="border border-gray-400 my-4"></div>

                <li>
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                    <FaHome /> Home
                  </Link>
                </li>
                <li>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <FaUser /> Profile
                  </Link>
                </li>
              </ul>
            </div>
          </Transition>

          {/* Page content */}
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostingDashboard;