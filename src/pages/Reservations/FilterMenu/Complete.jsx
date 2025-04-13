import React, { useEffect, useState } from 'react';
import InfoCard from '../../../components/InfoCard/InfoCard';
import Loading from '../../../components/Loading';

const STORAGE_KEY = 'userResortsCache';

const Complete = () => {
    const [completedResorts, setCompletedResorts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCompletedReservations = () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const cachedData = localStorage.getItem(STORAGE_KEY);
                
                if (!cachedData) {
                    throw new Error("No cached reservations found");
                }

                // Handle both old and new storage formats
                const parsedData = JSON.parse(cachedData);
                const resorts = parsedData.data ? parsedData.data : parsedData;
                
                if (!Array.isArray(resorts)) {
                    throw new Error("Invalid cached data format");
                }

                // Filter completed reservations (multiple possible status values)
                const completed = resorts.filter(resort => 
                    ['completed', 'complete', 'finished'].includes(resort.status?.toLowerCase()) ||
                    ['completed', 'complete', 'finished'].includes(resort.bookingStatus?.toLowerCase())
                );

                // If no completed found but have cached resorts, use them with warning
                if (completed.length === 0 && resorts.length > 0) {
                    setError("No completed reservations found - showing recent resorts");
                    setCompletedResorts(resorts.slice(0, 6));
                } else {
                    setCompletedResorts(completed.slice(0, 6));
                }
            } catch (err) {
                console.error("Error loading reservations:", err);
                setError(err.message);
                setCompletedResorts([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadCompletedReservations();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loading />
            </div>
        );
    }

    if (error && completedResorts.length === 0) {
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

    if (completedResorts.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-64 gap-2">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                
                <p className="text-sm text-gray-400">Your completed stays will appear here</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Completed Reservations</h2>
                {error && (
                    <p className="text-sm text-yellow-600 "></p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedResorts.map((resort) => {
                    const isActuallyCompleted = 
                        ['completed', 'complete', 'finished'].includes(resort.status?.toLowerCase()) ||
                        ['completed', 'complete', 'finished'].includes(resort.bookingStatus?.toLowerCase());
                    
                    return (
                        <InfoCard
                            key={resort.id}
                            data={resort}
                            showStatus={true}
                            statusVariant={isActuallyCompleted ? 'success' : 'default'}
                        />
                    );
                })}
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
                <p>Showing {completedResorts.length} completed reservations</p>
            </div>
        </div>
    );
};

export default Complete;