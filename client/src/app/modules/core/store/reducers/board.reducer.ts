import { createReducer, on } from "@ngrx/store";
import { initialBoardState } from "../state/board.state";
import { getBoardSuccess } from "../actions/boards.action";
import { createListSuccess, deleteListSuccess, editListSuccess } from "../actions/board.action";
import { List } from "src/app/modules/lists/models/list";
import { createCardSuccess, deleteCardSuccess, editCardSuccess } from "../actions/board.action";
import { Card } from "src/app/modules/cards/models/card";

const _boardReducer = createReducer(
    initialBoardState, 
    on(getBoardSuccess, (_, { board }) => board),
    on(createListSuccess, (state, { list }) => ({ 
        ...state,
        lists: [...state.lists, { ...list, cards: [] }],
        listNames: [...state.listNames, {...list}]
    })),
    on(deleteListSuccess, (state, { id }) => ({ 
        ...state,
        lists: state.lists.filter(list => list.id !== id) 
    })),
    on(editListSuccess, (state, { list }) => ({ 
        ...state,
        lists: state.lists.map(existingList => 
          existingList.id === list.listId ? { ...existingList, name: list.name } : existingList
        ),
        listNames: state.lists.map(existingList => 
          existingList.id === list.listId ? { ...existingList, name: list.name } : existingList
        )
    })),
    on(createCardSuccess, (state, { card }) => {
        const listToUpdate = state.lists.find(list => list.id === card.listId);
        if (!listToUpdate) {
          return state; 
        }
    
        const updatedList: any = {
          ...listToUpdate,
          cards: [...listToUpdate.cards, card]
        };
    
        const updatedLists = state.lists.map(list =>
          list.id === updatedList.id ? updatedList : list
        );

        return {
          ...state,
          lists: updatedLists
        };
    }),
    on(deleteCardSuccess, (state, { id }) => { 
        const listToUpdate = state.lists.find(list => list.cards.some(card => card.id === id));
        if (!listToUpdate) {
          return state; 
        }
    
        const updatedCards = listToUpdate.cards.filter(card => card.id !== id);
    
        const updatedList: List = {
          ...listToUpdate,
          cards: updatedCards
        };
    
        const updatedLists = state.lists.map(list =>
          list.id === updatedList.id ? updatedList : list
        );

        return {
          ...state,
          lists: updatedLists
        };
    }),
    on(editCardSuccess, (state, { card }) => {
      let initialList: List | undefined;
      let newList: List | undefined;
      let updatedList: List | undefined;
      let editedCard: Card | undefined;
      let newCard: Partial<Card> | undefined;

      state.lists.forEach(list => {
          const cardIndex = list.cards.findIndex(c => c.id === card.id);
          if (cardIndex !== -1) {
            initialList = list; 
            editedCard = list.cards[cardIndex];
          }
      });

      if (initialList && editedCard){
        if (initialList.id === card.listId) {
          newCard = {
            id: card.id,
            name: card.name === undefined ? editedCard.name : card.name,
            description: card.description === undefined ? editedCard.description : card.description,
            dueDate: card.dueDate === undefined ? editedCard.dueDate : card.dueDate,
            priority: card.priority === undefined ? editedCard.priority : card.priority,
            listId: card.listId === undefined ? editedCard.listId : card.listId,
            boardId: card.boardId === undefined ? editedCard.boardId : card.boardId
          };
          initialList = {
            ...initialList,
            cards: initialList.cards.filter(card => card.id !== editedCard?.id)
          }
          const updatedCards = [...initialList.cards, newCard];
          initialList = {
            ...initialList,
            cards: updatedCards
          } as List;
        } else { 
          initialList = {
            ...initialList,
            cards: initialList.cards.filter(card => card.id !== editedCard?.id)
          }
          newList = state.lists.find(l => l.id === card.listId);
          const updatedCards = [...newList!.cards, card];
          updatedList = {
            ...newList,
            cards: updatedCards as Card[]
          } as List;
        }
      }
  
      let updatedLists: any[];

      if (updatedList){
        updatedLists = state.lists.filter(l => l.id !== updatedList!.id && l.id !== initialList!.id);
        updatedLists = [...updatedLists, initialList, updatedList];
      } else {
        updatedLists = state.lists.filter(l => l.id !== initialList!.id);
        updatedLists = [...updatedLists, initialList];
      }

      return {
        ...state,
        lists: updatedLists,
      };
    })
);

export function boardReducer(state: any, action: any){
    return _boardReducer(state, action);
}