import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router";
import { Transition } from "@headlessui/react";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import logo from "../../../src/assets/vrbo_logo.svg";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdAttachMoney, MdViewQuilt } from "react-icons/md";

const AdminPanel = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuItemClick = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="lg:flex h-screen">
      {/* Sidebar for LG screens */}
      <div className="hidden lg:block lg:w-64 lg:flex-shrink-0 bg-slate-200 h-screen">
        <ul className="menu p-4 text-gray-700 font-bold text-lg">
          <li>
            <Link to="admin-overview">
              <MdViewQuilt /> Admin Overview
            </Link>
          </li>
          <li>
            <Link to="user-control">
              <AiOutlineUsergroupAdd /> User Control
            </Link>
          </li>
          <li>
            <Link to="earnings-update">
              <MdAttachMoney /> Earnings Update
            </Link>
          </li>
          <li>
            <Link to="admin-control">
              <RiAdminLine /> Admin Control
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile navigation */}
      <div className="lg:hidden fixed top-0 w-full bg-gray-800 text-white p-4 z-50">
        <div className="flex items-center justify-between">
          <Link to="/" className="z-20">
            <img src={logo} alt="Logo" className="w-10 h-10" />
          </Link>
          <h1 className="text-xl font-bold">AdminPanel</h1>
          <button onClick={toggleMobileMenu} className="text-xl">
            <BsFillMenuButtonWideFill />
          </button>
        </div>

        <Transition
          show={mobileMenuOpen}
          enter="transition-transform duration-300"
          enterFrom="-translate-y-full"
          enterTo="translate-y-0"
          leave="transition-transform duration-300"
          leaveFrom="translate-y-0"
          leaveTo="-translate-y-full"
        >
          <div className="bg-gray-200 p-4 absolute top-0 left-0 right-0 mt-12 z-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold"></h2>
              <button onClick={toggleMobileMenu} className="text-2xl text-gray-700">
                <IoMdClose />
              </button>
            </div>
            <ul className="menu text-gray-700 font-bold text-xl">
              <li>
                <button onClick={() => handleMenuItemClick("/admin-panel/admin-overview")}>
                  <MdViewQuilt /> Admin Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleMenuItemClick("/admin-panel/user-control")}>
                  <AiOutlineUsergroupAdd /> User Control
                </button>
              </li>
              <li>
                <button onClick={() => handleMenuItemClick("/admin-panel/earnings-update")}>
                  <MdAttachMoney /> Earnings Update
                </button>
              </li>
              <li>
                <button onClick={() => handleMenuItemClick("/admin-panel/admin-control")}>
                  <RiAdminLine /> Admin Control
                </button>
              </li>

              <div className="divider"></div>

              <li>
                <button onClick={() => handleMenuItemClick("/")}>
                  <FaHome /> Home
                </button>
              </li>
            </ul>
          </div>
        </Transition>
      </div>

      {/* Content area */}
      <div className="lg:flex-grow mt-16 lg:mt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
