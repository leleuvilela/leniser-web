export interface ConfigsDocument {
    _id: string;
    imageCooldownEnabled: boolean;
    imageCooldownTime: number;
    systemPrompt: string;
    botPrefix: string;
    botNumber: string;
    type: string;
}
