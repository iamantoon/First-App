import { List, ListsWithIds } from "../../lists/models/list";

export interface Board {
    id: number;
    name: string;
    lists: List[];
    listNames: ListsWithIds[];
}

export interface BoardName {
    id: number;
    name: string;
}

export interface BoardsResponse {
    boards: Board[];
    boardNames: BoardName[];
}

export interface EditBoard {
    id: number;
    name: string; 
}