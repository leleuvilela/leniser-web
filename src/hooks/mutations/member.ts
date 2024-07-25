
import { useMutation } from "react-query";
import axios from "axios";
import { queryClient } from "@/lib/query";

export type Member = {
    _id: string;
    desc: string;
    permissions: string[];
}

const addMember = async (values: Member) => {
    const response = await axios.post("/api/members", values);

    return response.data;
};

const updateMember = async (values: Member) => {
    const response = await axios.put(`/api/members/${values._id}`, values);

    return response.data;
}

const deleteMember = async (id: string) => {
    const response = await axios.delete(`/api/members/${id}`);

    return response.data;
}

export const useNewMember = () => {
    return useMutation({
        mutationFn: addMember,
        onSuccess: () => {
            queryClient.invalidateQueries("members")
        }
    });
};

export const useUpdateMember = () => {
    return useMutation({
        mutationFn: updateMember,
        onSuccess: () => {
            queryClient.invalidateQueries("members")
        }
    });
};

export const useDeleteMember = () => {
    return useMutation({
        mutationFn: deleteMember,
        onSuccess: () => {
            queryClient.invalidateQueries("members")
        }
    });
}
