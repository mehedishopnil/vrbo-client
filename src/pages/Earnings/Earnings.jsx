import { useContext, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { AuthContext } from '../../providers/AuthProvider';

const Earnings = () => {
  const { yearlyEarnings } = useContext(AuthContext);

  // Convert data to chart/table-friendly format
  const formattedEarnings = useMemo(() => {
    if (!Array.isArray(yearlyEarnings)) return [];
  
    return yearlyEarnings.map(item => ({
      year: item.year,
      "Amount Earned": item.amount
    }));
  }, [yearlyEarnings]);
  

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).replace('$', '');
  };

  return (
    <div className='container mx-auto my-10'>
      <div className="mx-5">
        <div className="flex justify-between items-center mb-6">
          <h3 className='text-2xl font-semibold uppercase'>
            Yearly Earnings <span className='font-bold'>Chart</span>
          </h3>
        </div>

        {formattedEarnings.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={formattedEarnings}
              margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis
                tickFormatter={(value) =>
                  `$${value.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}`
                }
              />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, "Amount Earned"]}
              />
              <Legend />
              <Bar dataKey="Amount Earned" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}

        <div className='mx-5 mt-10'>
          <h3 className='text-2xl font-semibold uppercase text-center my-6'>
            Yearly Earnings <span className='font-bold'>Table</span>
          </h3>
          <table className="w-full table-fixed border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 py-2 px-4">Year</th>
                <th className="border border-gray-300 py-2 px-4">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {formattedEarnings.map((entry) => (
                <tr key={entry.year}>
                  <td className="border text-center border-gray-300 py-2 px-4">
                    {entry.year}
                  </td>
                  <td className="border text-center border-gray-300 py-2 px-4">
                    ${formatCurrency(entry["Amount Earned"])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
