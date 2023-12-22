import { useState, useCallback } from 'react';
import { RequestDetails, ApplyData } from '../assets/playersType';

const useFetch = (key: string) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = useCallback(async (requestDetails: RequestDetails, applyData: ApplyData) => {
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(requestDetails.url, {
                method: requestDetails.method ? requestDetails.method : 'GET',
                headers: requestDetails.headers ? requestDetails.headers : {},
                body: requestDetails.body ? JSON.stringify(requestDetails.body) : null
            })

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            applyData(data);

        }
        catch (err: any) {
            const cachedPlayersData = localStorage.getItem(key);
            if (cachedPlayersData) {
                applyData(JSON.parse(cachedPlayersData));
            } else {
                setError(err.message);
            }
        }
        finally {
            setIsLoading(false);
        }
    }, []);

    return {
        error,
        isLoading,
        sendRequest
    };
}

export default useFetch;
