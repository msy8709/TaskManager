import { createSlice } from "@reduxjs/toolkit";
import {IBoard, IList, ITask} from "../../types/index";
import { PayloadAction } from "@reduxjs/toolkit";
import { StringLiteral } from "typescript";
type TBoardsState = {
    modalActive: boolean;
    boardArray: IBoard[];
}

type TAddBoardAction = {
    board: IBoard
}

type TDeleteListAction = {
    boardId: string;
    listId: string;
}

type TaddListAction = {
    boardId: string;
    list: IList;
}

type TaddTaskAction = {
    boardId: string;
    listId: string;
    task: ITask;
}
const initialState: TBoardsState = {
    modalActive: false,
    boardArray: [
        {
            boardId: 'board-0',
            boardName: "첫 번째 게시물",
            lists: [
                {
                    listId:"list-0",
                    listName:"List 1",
                    tasks:[
                        {
                            taskId:"task-0",
                            taskName: "Task1",
                            taskDescription: "Description",
                            taskOwner:"John"
                        },
                    ]
                },
                {
                    listId:"list-1",
                    listName:"List 2",
                    tasks:[
                        {
                            taskId:"task-3",
                            taskName: "Task3",
                            taskDescription: "Description",
                            taskOwner:"John"
                        },
                    ]
                }
            ]
        },
        
    ]
}
const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        addBoard: (state,{payload}: PayloadAction<TAddBoardAction>) => {
            state.boardArray.push(payload.board)
        },

        addList: (state,{payload}: PayloadAction<TaddListAction>) => {
            state.boardArray.map(board =>
                board.boardId === payload.boardId?
                {...board, lists: board.lists.push(payload.list)}
                : board
            )
        },
        addTask: (state,{payload}: PayloadAction<TaddTaskAction>) => {
            state.boardArray.map(board =>
                board.boardId === payload.boardId ? 
                {
                    ...board,
                    lists: board.lists.map(list =>
                        list.listId === payload.listId
                        ? {
                            ...list,
                            tasks: list.tasks.push(payload.task)
                        }
                        : list
                    )
                }
                : board
            )
        },

        deleteList: (state,{payload}: PayloadAction<TDeleteListAction>) =>{
            state.boardArray = state.boardArray.map(
                board => 
                    board.boardId === payload.boardId
                ?
                {
                    ...board,
                    lists: board.lists.filter(
                        list => list.listId !== payload.listId
                    )
                }
                :
                board
            )
        },

        setModalActive: (state, {payload}: PayloadAction<boolean>) => {
            state.modalActive = payload
        }
    }
})
export const {addBoard, deleteList, setModalActive, addTask, addList} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer; 