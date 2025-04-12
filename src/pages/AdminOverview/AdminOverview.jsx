import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../../components/Loading";
import { AuthContext } from "../../providers/AuthProvider";
import { FaUsers, FaUserShield, FaChartLine, FaHotel } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";

const AdminOverview = () => {
  const { user, admin, usersData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    recentSignups: 0,
    activeUsers: 0
  });

  useEffect(() => {
    const calculateStats = () => {
      if (usersData && usersData.length > 0) {
        const admins = usersData.filter(u => u.isAdmin);
        setStats({
          totalUsers: usersData.length,
          totalAdmins: admins.length,
          recentSignups: usersData.filter(u => 
            new Date(u.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          ).length,
          activeUsers: usersData.filter(u => u.lastLogin && 
            new Date(u.lastLogin) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          ).length
        });
      }
      setLoading(false);
    };

    calculateStats();
  }, [usersData]);

  if (loading) {
    return <Loading />;
  }

  if (!user || !admin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to view this page. Please contact an administrator.
          </p>
          <Link 
            to="/" 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const StatCard = ({ icon, title, value, color, link }) => (
    <Link to={link} className="hover:scale-105 transition-transform">
      <div className={`bg-white p-6 rounded-xl shadow-md border-t-4 ${color} hover:shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
          <div className={`p-3 rounded-full ${color.replace('border', 'bg')} bg-opacity-10`}>
            {icon}
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <MdOutlineDashboard className="mr-2" /> Admin Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {user.name || 'Admin'}!</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <img 
            src={user.photoURL || 'https://via.placeholder.com/150'} 
            alt="Admin" 
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="font-medium">{user.name}</p>
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              Administrator
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FaUsers className="text-2xl text-blue-600" />}
          title="Total Users"
          value={stats.totalUsers}
          color="border-blue-500"
          link="/admin-panel/user-control"
        />
        <StatCard
          icon={<FaUserShield className="text-2xl text-purple-600" />}
          title="Administrators"
          value={stats.totalAdmins}
          color="border-purple-500"
          link="/admin-panel/admins"
        />
        <StatCard
          icon={<FaChartLine className="text-2xl text-green-600" />}
          title="Recent Signups"
          value={stats.recentSignups}
          color="border-green-500"
          link="/admin-panel/recent-users"
        />
        <StatCard
          icon={<FaHotel className="text-2xl text-orange-600" />}
          title="Active Users"
          value={stats.activeUsers}
          color="border-orange-500"
          link="/admin-panel/active-users"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
        <div className="space-y-4">
          {/* Sample activity items - replace with real data */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <FaUsers className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">New user registration</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          to="/admin-panel/add-admin" 
          className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow"
        >
          <h3 className="font-semibold text-gray-800 mb-2">Add New Admin</h3>
          <p className="text-sm text-gray-600">Grant administrator privileges to users</p>
        </Link>
        <Link 
          to="/admin-panel/manage-properties" 
          className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow"
        >
          <h3 className="font-semibold text-gray-800 mb-2">Manage Properties</h3>
          <p className="text-sm text-gray-600">View and edit all listed properties</p>
        </Link>
        <Link 
          to="/admin-panel/settings" 
          className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow"
        >
          <h3 className="font-semibold text-gray-800 mb-2">System Settings</h3>
          <p className="text-sm text-gray-600">Configure platform settings</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminOverview;