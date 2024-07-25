import axios from "axios";
import { useQuery } from "react-query";

export type Member = {
    _id: string;
    desc: string;
    permissions: string[];
}

export const fetchMembers = async (): Promise<Member[]> => {
    const response = await axios.get('/api/members');
    return response?.data;
}

export const fetchMemberById = async (id: string): Promise<Member> => {
    const response = await axios.get(`/api/members/${id}`);
    return response?.data;
}

export const useMembers = () => {
    return useQuery('members', fetchMembers);
};

export const useMember = (id: string) => {
    return useQuery(['members', id], () => fetchMemberById(id));
};
