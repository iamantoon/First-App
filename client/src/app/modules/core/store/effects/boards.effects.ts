import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BoardsService } from "src/app/modules/boards/services/boards.service";
import { createBoard, createBoardSuccess, deleteBoard, deleteBoardSuccess, editBoard, editBoardSuccess, getBoards, getBoardsSuccess } from "../actions/boards.action";
import { catchError, map, of, switchMap } from "rxjs";
import { Board, BoardName } from "src/app/modules/boards/models/board";

@Injectable()
export class BoardsEffects {
    constructor(private actions$: Actions, private boardsService: BoardsService){}

    getBoards$ = createEffect(() => this.actions$.pipe(
        ofType(getBoards),
        switchMap(() => {
            return this.boardsService.getBoards().pipe(map((data) => getBoardsSuccess({ allBoards: data })))
        })
    ));

    createBoard$ = createEffect(() => this.actions$.pipe(
        ofType(createBoard),
        switchMap((action) => {
            return this.boardsService.createBoard(action.board.name!).pipe(
                map((data: any) => {
                    const board: BoardName = {
                        id: data.id,
                        name: data.name
                    };
                    return createBoardSuccess({ board });
                })
            );
        })
    ));

    deleteBoard$ = createEffect(() => this.actions$.pipe(
        ofType(deleteBoard),
        switchMap((action) => {
            return this.boardsService.deleteBoard(action.id).pipe(
                switchMap(() => {
                    return of(deleteBoardSuccess({ id: action.id }));
                })
            );
        })
    ));

    editBoard$ = createEffect(() => this.actions$.pipe(
        ofType(editBoard),
        switchMap((action) => this.boardsService.editBoard(action.payload).pipe(
            map(() => {
                return editBoardSuccess({ board: action.payload });
            })
        ))
    ));
}