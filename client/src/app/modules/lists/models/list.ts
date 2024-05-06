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