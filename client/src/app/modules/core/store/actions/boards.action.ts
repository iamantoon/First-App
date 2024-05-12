import { createAction, props } from "@ngrx/store";
import { BoardName, Board } from "src/app/modules/boards/models/board";


export const getBoards = createAction("[Boards] get boards");

export const getBoardsSuccess = createAction(
    "[Boards] get boards success", 
    props<{allBoards: BoardName[]}>()
);

export const getBoard = createAction(
    "[Boards] get board",
    props<{id: number}>()
);

export const getBoardSuccess = createAction(
    "[Boards] get board success", 
    props<{board: Board}>()
);

export const createBoard = createAction(
    "[Boards] create board", 
    props<{board: Partial<BoardName>}>()
);

export const createBoardSuccess = createAction(
    "[Board] create board success",
    props<{board: BoardName}>()
);

export const editBoard = createAction(
    "[Boards] edit board", 
    props<{payload: BoardName}>()
);

export const editBoardSuccess = createAction(
    "[Board] edit board success",
    props<{board: BoardName}>()
);

export const deleteBoard = createAction(
    "[Boards] delete board", 
    props<{id: number}>()
);

export const deleteBoardSuccess = createAction(
    "[Board] delete board success",
    props<{id: number}>()
);