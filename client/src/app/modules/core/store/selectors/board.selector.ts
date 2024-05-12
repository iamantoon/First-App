import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Board } from "src/app/modules/boards/models/board";

export const selectBoard = createFeatureSelector<Board>("board");

export const selectSortedBoard = createSelector(
    selectBoard,
    (board: Board) => ({
      ...board,
      lists: board.lists.slice().sort((a, b) => a.id - b.id)
    })
);