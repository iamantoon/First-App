export interface Card {
    date: string;
    priority: string;
    name: string;
    description: string;
    list: string;
}

export type Priority = 'Low' | 'Medium' | 'High';