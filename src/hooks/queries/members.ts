import axios from "axios";
import { useQuery } from "react-query";

export type Member = {
    id: string;
    name: string;
    about: string;
}

export const fetchMembers = async (): Promise<Member[]> => {
    const response = await axios.get('/api/members');
    return response?.data;
}

export const useMembers = () => {
    return useQuery('members', fetchMembers);
};
