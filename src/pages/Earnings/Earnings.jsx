import { useContext, useState, useEffect } from 'react';

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
  const { earningList } = useContext(AuthContext);
  const [yearlyEarnings, setYearlyEarnings] = useState([]);

  useEffect(() => {
    // Filter and sum earnings for each year across all properties
    const yearlySum = {};

    earningList.forEach((property) => {
      Object.entries(property.earnings).forEach(([year, amount]) => {
        // Ensure the amount is a number
        const numericAmount = typeof amount === 'number' ? amount : parseFloat(amount);
        yearlySum[year] = (yearlySum[year] || 0) + numericAmount;
      });
    });

    // Convert the yearly sum into an array of objects
    const yearlyEarningsArray = Object.entries(yearlySum).map(([year, amount]) => ({
      year,
      "Amount Earned": amount,
    }));

    // Sort the array by year (ascending order)
    yearlyEarningsArray.sort((a, b) => a.year.localeCompare(b.year));

    // Set the state with the calculated yearly earnings
    setYearlyEarnings(yearlyEarningsArray);
  }, [earningList]);

  return (
    <div className='container mx-auto my-10'>
      <div className="mx-5">
        <div>
          <h3 className='text-2xl font-semibold uppercase text-center my-6'>
            Yearly Earnings <span className='font-bold'>Chart</span>
          </h3>
          {yearlyEarnings.length > 0 && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={yearlyEarnings}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
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
                <Tooltip />
                <Legend />
                <Bar dataKey="Amount Earned" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className='mx-5'>
          <h3 className='text-2xl font-semibold uppercase text-center my-6'>
            Yearly Earnings <span className='font-bold'>Table</span>
          </h3>
          <table className="w-full table-fixed border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 py-2 px-4">Year</th>
                <th className="border border-gray-300 py-2 px-4">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {yearlyEarnings.map((entry) => (
                <tr key={entry.year}>
                  <td className="border text-center border-gray-300 py-2 px-4">{entry.year}</td>
                  <td className="border text-center border-gray-300 py-2 px-4">
                    ${entry["Amount Earned"].toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
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