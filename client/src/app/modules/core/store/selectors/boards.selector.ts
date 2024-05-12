import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BoardName } from "src/app/modules/boards/models/board";

export const selectBoards = createFeatureSelector<BoardName[]>("boardNames");

export const selectSortedBoards = createSelector(
    selectBoards,
    (boards: BoardName[]) => ({
      boards: boards.slice().sort((a, b) => a.id - b.id)
    })
);