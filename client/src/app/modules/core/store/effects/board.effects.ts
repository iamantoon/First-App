import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getBoard, getBoardSuccess } from "../actions/boards.action";
import { map, of, switchMap } from "rxjs";
import { Board } from "src/app/modules/boards/models/board";
import { BoardsService } from "src/app/modules/boards/services/boards.service";
import { ListsService } from "src/app/modules/lists/services/lists.service";
import { CardsService } from "src/app/modules/cards/services/cards.service";
import { createList, createListSuccess, deleteList, deleteListSuccess, editList, editListSuccess } from "../actions/board.action";
import { CreatedList } from "src/app/modules/lists/models/list";
import { createCard, createCardSuccess, deleteCard, deleteCardSuccess, editCard, editCardSuccess } from "../actions/board.action";
import { Card } from "src/app/modules/cards/models/card";

@Injectable()
export class BoardEffects {
    constructor(private actions$: Actions, private boardsService: BoardsService, private listsService: ListsService, private cardsService: CardsService){}

    getBoard$ = createEffect(() => this.actions$.pipe(
        ofType(getBoard),
        switchMap((action) => {
            return this.boardsService.getBoard(action.id).pipe(
                map((board: Board) => {
                    return getBoardSuccess({ board });
                })
            );
        })
    ));

    createList$ = createEffect(() => this.actions$.pipe(
        ofType(createList),
        switchMap((action) => {
            return this.listsService.createList({boardId: action.list.boardId, name: action.list.name}).pipe(
                map((data: any) => {
                    const list: CreatedList = {
                        id: data.id,
                        boardId: data.boardId,
                        name: data.name
                    };
                    return createListSuccess({ list });
                })
            );
        })
    ));

    deleteList$ = createEffect(() => this.actions$.pipe(
        ofType(deleteList),
        switchMap((action) => {
            return this.listsService.deleteList(action.id).pipe(
                switchMap(() => {
                    return of(deleteListSuccess({ id: action.id }));
                })
            );
        })
    ));

    editList$ = createEffect(() => this.actions$.pipe(
        ofType(editList),
        switchMap((action) => this.listsService.editList(action.list).pipe(map(() => editListSuccess(action))))
    ));

    createCard$ = createEffect(() => this.actions$.pipe(
        ofType(createCard),
        switchMap((action) => {
            const newCard = {
                name: action.card.name,
                description: action.card.description,
                dueDate: action.card.dueDate,
                priority: action.card.priority,
                listId: action.card.listId,
                boardId: action.card.boardId
            };
            return this.cardsService.createCard(newCard).pipe(
                map((data: any) => {
                    const card: Partial<Card> = {
                        id: data.id,
                        name: data.name,
                        description: data.description,
                        dueDate: data.dueDate,
                        priority: data.priority,
                        listId: action.card.listId
                    };
                    return createCardSuccess({card});
                })
            );
        })
    ));

    deleteCard$ = createEffect(() => this.actions$.pipe(
        ofType(deleteCard),
        switchMap((action) => {
            return this.cardsService.deleteCard(action.id).pipe(
                switchMap(() => {
                    return of(deleteCardSuccess({ id: action.id }));
                })
            );
        })
    ));

    editCard$ = createEffect(() => this.actions$.pipe(
        ofType(editCard),
        switchMap((action) => {
            return this.cardsService.editCard(action.payload.id!, action.payload).pipe(
                map(() => editCardSuccess({ card: action.payload }))
            );
        })
    ));
}