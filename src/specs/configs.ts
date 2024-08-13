export interface ConfigsDocument {
    _id: string;
    type: string;
    defaultMemberConfigs: {
        imageCooldownEnabled: boolean;
        imageCooldownTime: number;
        systemPrompt: string;
        botPrefix: string;
        botNumber: string;
    }
}
