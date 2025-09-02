export type MenuJobData = {
    headerBanner: string;
    choice: {
        label: string;
        isOptional: boolean;
        choices: {
            id: number;
            label: string;
            img: string;
            price?: string;
            isPlaceholder?: boolean;
        }[];
    };
    participants: JobParticipant[];
    participantsNumber: number;
    callbackName: string;
};

export type JobParticipant = {
    name: string;
    id: number;
    uniqueId: number;
}