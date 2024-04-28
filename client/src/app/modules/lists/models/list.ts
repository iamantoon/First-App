import { Card } from "../../cards/models/card";

export interface List {
    id: number;
    name: string;
    cards: Card[];
}