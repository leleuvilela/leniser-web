export enum MemberPermission {
    MESSAGE_CREATE = 'MESSAGE_CREATE',
    MESSAGE_REVOKE = 'MESSAGE_REVOKE',
    SAVE_MESSAGE = 'SAVE_MESSAGE',
}

export interface MemberDocument {
    id: string;
    desc: string;
    permissions: MemberPermission[];
    configs: MemberConfigs;
}

export interface MemberConfigs {
    imageCooldownEnabled?: boolean;
    imageCooldownTime: number;
    systemPrompt: string;
    botPrefix: string;
}
