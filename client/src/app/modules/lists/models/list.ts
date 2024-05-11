import { Card } from "../../cards/models/card";

export interface Lists {
    lists: List[];
    listNames: ListsWithIds[];
}

export interface List {
    id: number;
    name: string;
    cards: Card[];
}

export interface ListsWithIds {
    id: number;
    name: string;
}

export interface CreateList {
    name: string;
    boardId: number;
}

export interface CreatedList extends CreateList {
    id: number;
}

export interface EditList {
    listId: number;
    name: string;
}