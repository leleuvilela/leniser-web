import { ConfigsDocument } from '@/specs/configs';
import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

const fetchSettings = async (): Promise<ConfigsDocument> => {
    const response = await axios.get('/api/settings');
    return response?.data;
}

export const useSettings = () => {
    return useQuery('settings', fetchSettings);
};
