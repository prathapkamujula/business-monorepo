import { useState, useEffect } from 'react';
import { appApi } from '../api/appApi';

export const useSystemParameters = () => {
    const [parameters, setParameters] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParameters = async () => {
            try {
                const data = await appApi.getSystemParameters();
                setParameters(data);
            } catch (error) {
                console.error('Error fetching system parameters:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchParameters();
    }, []);

    const isFeatureEnabled = (key: string) => {
        return !!parameters[key];
    };

    return { parameters, loading, isFeatureEnabled };
};
