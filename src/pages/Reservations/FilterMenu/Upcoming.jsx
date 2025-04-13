import React, { useEffect, useState } from 'react';
import InfoCard from '../../../components/InfoCard/InfoCard';

const STORAGE_KEY = 'userResortsCache';

const Upcoming = () => {
    const [cachedResorts, setCachedResorts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndValidateResorts = () => {
            try {
                setLoading(true);
                setError(null);
                
                const storedData = localStorage.getItem(STORAGE_KEY);
                
                if (!storedData) {
                    throw new Error("No cached resorts found");
                }

                const parsedData = JSON.parse(storedData);
                
                // Handle both old and new storage formats
                const resorts = parsedData.data ? parsedData.data : parsedData;
                
                if (!Array.isArray(resorts) || resorts.length === 0) {
                    throw new Error("Invalid cached data format");
                }

                // Filter for upcoming resorts (if they have a status field)
                const upcomingResorts = resorts.filter(resort => 
                    resort.status?.toLowerCase() === 'upcoming' ||
                    resort.bookingStatus?.toLowerCase() === 'upcoming'
                );

                // If we have upcoming resorts, use them, otherwise use cached resorts
                const displayResorts = upcomingResorts.length > 0 
                    ? upcomingResorts.slice(0, 7) 
                    : resorts.slice(0, 7);

                setCachedResorts(displayResorts);
            } catch (err) {
                console.error("Error processing cached resorts:", err);
                setError(err.message);
                setCachedResorts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAndValidateResorts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-64 gap-2">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-lg font-medium text-gray-500">Could not load reservations</p>
                <p className="text-sm text-gray-400">{error}</p>
            </div>
        );
    }

    if (!cachedResorts || cachedResorts.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-64 gap-2">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-medium text-gray-500">No upcoming reservations</p>
                <p className="text-sm text-gray-400">Try checking back later</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Upcoming Reservations</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cachedResorts.map((resort) => (
                    <InfoCard 
                        key={resort.id} 
                        data={resort}
                        isCached={true}
                        showBadge={resort.status?.toLowerCase() === 'upcoming' || 
                                  resort.bookingStatus?.toLowerCase() === 'upcoming'}
                    />
                ))}
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-500">
                <p>Showing {cachedResorts.length} upcoming reservations</p>
            </div>
        </div>
    );
};

export default Upcoming;