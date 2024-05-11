import { createReducer, on } from "@ngrx/store";
import { initialBoardsState } from "../state/boards.state";
import { createBoardSuccess, deleteBoardSuccess, editBoardSuccess, getBoardsSuccess } from "../actions/boards.action";

const _boardsReducer = createReducer(
    initialBoardsState, 
    on(getBoardsSuccess, (_, { allBoards }) => allBoards),
    on(createBoardSuccess, (state, { board }) => [board, ...state]),
    on(deleteBoardSuccess, (state, { id }) => state.filter(board => board.id !== id)),
    on(editBoardSuccess, (state, { board }) => {
      const updatedBoards = state.map(b => {
        if (board.id === b.id) {
          return { ...board, name: board.name };
        }
        return b;
      });
      return updatedBoards;
    })
);

export function boardsReducer(state: any, action: any){
    return _boardsReducer(state, action);
}