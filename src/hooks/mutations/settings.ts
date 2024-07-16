import { useMutation } from "react-query";
import axios from "axios";
import { queryClient } from "@/lib/query";

type Settings = {
    imageCooldownEnabled: boolean;
    imageCooldownTime: number;
    systemPrompt: string;
    botPrefix: string;
}

const updateSettings = async (values: Settings) => {
    const response = await axios.post("/api/settings", values);
    return response.data;
};

export const useUpdateSettings = () => {
    return useMutation({
        mutationFn: updateSettings,
        onSuccess: () => {
            queryClient.invalidateQueries("settings")
        }
    });
};
