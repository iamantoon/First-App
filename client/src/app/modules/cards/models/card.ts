export interface Card {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    priority: string;
    list: string;
    listId: number;
}

export type Priority = 'Low' | 'Medium' | 'High';