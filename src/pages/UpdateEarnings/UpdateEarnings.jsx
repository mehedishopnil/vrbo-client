import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const UpdateEarnings = () => {
  const { yearlyEarnings, updateYearlyEarnings, user } = useContext(AuthContext);
  const [editedEarnings, setEditedEarnings] = useState([]);

  // Populate editable fields from context data
  useEffect(() => {
    if (Array.isArray(yearlyEarnings)) {
      setEditedEarnings(
        yearlyEarnings.map((item) => ({
          _id: item._id,
          year: item.year,
          amount: item.amount,
        }))
      );
    }
  }, [yearlyEarnings]);

  const handleChange = (index, value) => {
    const updated = [...editedEarnings];
    updated[index].amount = parseFloat(value) || 0;
    setEditedEarnings(updated);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof updateYearlyEarnings === 'function') {
      updateYearlyEarnings(editedEarnings);
      console.log('Submitted earnings update:', editedEarnings);
    }
  };

  return (
    <div className="container mx-auto my-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Update Yearly Earnings</h1>

      {Array.isArray(editedEarnings) && editedEarnings.length > 0 ? (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
          {editedEarnings.map((entry, index) => (
            <div key={entry._id} className="flex items-center justify-between gap-4 border-b pb-2">
              <label className="font-medium">{entry.year}</label>
              <input
                type="number"
                value={entry.amount}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-40 px-2 py-1 border rounded text-right"
              />
            </div>
          ))}

          {user?.isAdmin && (
            <button
              type="submit"
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Submit Changes
            </button>
          )}
        </form>
      ) : (
        <p className="text-center text-gray-500">No earnings data found.</p>
      )}
    </div>
  );
};

export default UpdateEarnings;
