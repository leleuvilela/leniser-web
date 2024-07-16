import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

type Settings = {
    imageCooldownEnabled: boolean;
    imageCooldownTime: number;
    systemPrompt: string;
    botPrefix: string;
}

const fetchSettings = async (): Promise<Settings> => {
    const response = await axios.get('/api/settings');
    return response?.data;
}

export const useSettings = () => {
    return useQuery('settings', fetchSettings);
};
