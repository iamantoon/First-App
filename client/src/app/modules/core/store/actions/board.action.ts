import { createAction, props } from "@ngrx/store";
import { Board } from "src/app/modules/boards/models/board";
import { CreateList, CreatedList, EditList } from "src/app/modules/lists/models/list";
import { Card } from "src/app/modules/cards/models/card";


export const getBoard = createAction(
    "[Board] get board",
    props<{id: number}>()
);

export const getBoardSuccess = createAction(
    "[Board] get board success", 
    props<{board: Board}>()
);

// Update list within board

export const createList = createAction(
    "[Board] create list",
    props<{list: CreateList}>()
);

export const createListSuccess = createAction(
    "[Board] create list success",
    props<{list: CreatedList}>()
)

export const editList = createAction(
    "[Board] edit list",
    props<{list: EditList}>()
);

export const editListSuccess = createAction(
    "[Board] edit list success",
    props<{list: EditList}>()
);

export const deleteList = createAction(
    "[Board] delete list", 
    props<{id: number}>()
);

export const deleteListSuccess = createAction(
    "[Board] delete list success",
    props<{id: number}>()
);

// Update card within board

export const createCard = createAction(
    "[Board] create card", 
    props<{card: Partial<Card>}>()
);

export const createCardSuccess = createAction(
    "[Board] create card success",
    props<{card: Partial<Card>}>()
);

export const editCard = createAction(
    "[Board] edit card", 
    props<{payload: Partial<Card>}>()
);

export const editCardSuccess = createAction(
    "[Board] edit card success",
    props<{card: Partial<Card>}>()
);

export const deleteCard = createAction(
    "[Board] delete card", 
    props<{id: number}>()
);

export const deleteCardSuccess = createAction(
    "[Board] delete card success",
    props<{id: number}>()
);