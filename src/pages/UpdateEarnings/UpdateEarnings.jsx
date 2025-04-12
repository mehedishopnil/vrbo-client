import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const UpdateEarnings = () => {
  const { yearlyEarnings, updateYearlyEarnings, user, admin, loading } = useContext(AuthContext);
  const [editedEarnings, setEditedEarnings] = useState([]);
  const [notification, setNotification] = useState({ type: '', message: '' });

  // Initialize form with yearly earnings data
  useEffect(() => {
    if (Array.isArray(yearlyEarnings)) {
      setEditedEarnings(
        yearlyEarnings.map(item => ({
          ...item,
          originalAmount: item.amount
        }))
      );
    }
  }, [yearlyEarnings]);

  const handleChange = (index, value) => {
    const updated = [...editedEarnings];
    updated[index].amount = parseFloat(value) || 0;
    setEditedEarnings(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification({ type: '', message: '' });
    
    if (!admin) {
      setNotification({ type: 'error', message: 'Unauthorized access' });
      return;
    }

    try {
      const changes = editedEarnings
        .filter(item => item.amount !== item.originalAmount)
        .map(({ year, amount }) => ({ year, amount }));

      if (changes.length === 0) {
        setNotification({ type: 'info', message: 'No changes detected' });
        return;
      }

      await updateYearlyEarnings(changes);
      
      setNotification({ 
        type: 'success', 
        message: 'Earnings updated successfully!' 
      });
      
      // Update original amounts
      setEditedEarnings(prev => 
        prev.map(item => ({
          ...item,
          originalAmount: item.amount
        }))
      );
      
    } catch (error) {
      console.error('Update failed:', error);
      setNotification({ 
        type: 'error', 
        message: 'Failed to update earnings. Please try again.' 
      });
    }
  };

  const hasChanges = editedEarnings.some(
    item => item.amount !== item.originalAmount
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">Loading earnings data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Update Yearly Earnings</h1>

      {!admin ? (
        <div className="max-w-3xl mx-auto bg-yellow-100 border-l-4 border-yellow-500 p-4">
          <p className="text-yellow-700">
            You need admin privileges to edit earnings data.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            {notification.message && (
              <div className={`mb-4 p-3 rounded border ${
                notification.type === 'error' 
                  ? 'bg-red-100 border-red-400 text-red-700' 
                  : notification.type === 'success' 
                    ? 'bg-green-100 border-green-400 text-green-700' 
                    : 'bg-blue-100 border-blue-400 text-blue-700'
              }`}>
                {notification.message}
              </div>
            )}

            <div className="space-y-4 mb-6">
              {editedEarnings.map((entry, index) => (
                <div 
                  key={`${entry.year}-${index}`} 
                  className="grid grid-cols-12 items-center gap-4 p-3 border-b"
                >
                  <span className="col-span-2 font-medium">{entry.year}</span>
                  <div className="col-span-8 relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={entry.amount}
                      onChange={(e) => handleChange(index, e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-2 text-right">
                    {entry.amount !== entry.originalAmount && (
                      <span className="text-xs text-blue-600">Modified</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {hasChanges ? 'You have unsaved changes' : 'All changes saved'}
              </span>
              <button
                type="submit"
                disabled={!hasChanges || loading}
                className={`px-6 py-2 rounded-md font-medium text-white ${
                  hasChanges 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                } transition-colors`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateEarnings;