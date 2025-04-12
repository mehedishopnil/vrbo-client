import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const UserControl = () => {
  const { usersData, user } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false); // trigger refresh after actions

  const handleMakeAdmin = async (email) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_Link}/users/admin/${email}`, {
        method: "PATCH",
      });
      if (res.ok) {
        Swal.fire("Success", "User promoted to admin", "success");
        setRefresh(!refresh); // trigger re-render
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not make admin", "error");
    }
  };

  const handleRemoveAdmin = async (email) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_Link}/users/remove-admin/${email}`, {
        method: "PATCH",
      });
      if (res.ok) {
        Swal.fire("Success", "Admin rights removed", "success");
        setRefresh(!refresh);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not remove admin", "error");
    }
  };

  const handleDeleteUser = async (email) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_Link}/users/${email}`, {
          method: "DELETE",
        });
        if (res.ok) {
          Swal.fire("Deleted!", "User has been removed.", "success");
          setRefresh(!refresh);
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Could not delete user", "error");
      }
    }
  };

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-semibold mb-6">User Control</h1>

      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((u, index) => (
              <tr key={u.email} className="border-b">
                <td>{index + 1}</td>
                <td className="py-2">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.isAdmin ? "Yes" : "No"}</td>
                <td className="space-x-2 py-2">
                  {!u.isAdmin && (
                    <button
                      onClick={() => handleMakeAdmin(u.email)}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
                    >
                      Make Admin
                    </button>
                  )}
                  {u.isAdmin && u.email !== user.email && (
                    <button
                      onClick={() => handleRemoveAdmin(u.email)}
                      className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-200"
                    >
                      Remove Admin
                    </button>
                  )}
                  {u.email !== user.email && (
                    <button
                      onClick={() => handleDeleteUser(u.email)}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserControl;
