
import { useMutation } from "react-query";
import axios from "axios";
import { queryClient } from "@/lib/query";

export type Member = {
    id: string;
    name: string;
    about: string;
}

const addMember = async (values: Member) => {
    const response = await axios.post("/api/members", values);

    return response.data;
};

export const useNewMember = () => {
    return useMutation({
        mutationFn: addMember,
        onSuccess: () => {
            queryClient.invalidateQueries("members")
        }
    });
};
