import { createStore } from "redux";
import {
  createAction,
  createReducer,
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";

// 액션은 함수인 createAction으로 만들어지기 때문에,
// console.log(action)로 보면 type과 paload를 확인 할 수 있다.
// const addToDo = createAction("ADD");
// const deleteToDo = createAction("DELETE");

// const reducer = (state = [], action) => {
//   switch (action.type) {
//     case addToDo.type:
//       return [{ text: action.payload, id: Date.now() }, ...state];
//     case deleteToDo.type:
//       return state.filter((toDo) => toDo.id !== action.payload);
//     default:
//       return state;
//   }
// };

// createReducer의 첫번째 인자는 초기 상태값(initalState)
// createReducer는 state를 새로운 state를 만들어 반환하지 않고, 변경이 가능하다
// createReducer가 해주는 일은 switch, case를 사용할 필요를 없게 해주고,
// 현재 state는 빈 배열이고, 그 배열에 새로운 toDo를 push() 해준 것
// 단 push는 아무런 것도 return하지 않고, state를 mutate한 것
// 반면 filter는 state를 mutate를 하지 않는다.
// filter는 새로운 배열을 return함
// 우리는 state object mutate 해야 하거나, 또는 새로운 state object를 리턴 해야 한다.

// const reducer = createReducer([], {
//   [addToDo]: (state, action) => {
//     state.push({ text: action.payload, id: Date.now() });
//   },
//   [deleteToDo]: (state, action) =>
//     state.filter((toDo) => toDo.id !== action.payload),
// });

// toDos의 createSlice가 알아서 Reducer를 우리하게 준다.
const toDos = createSlice({
  name: "toDOsReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) =>
      state.filter((toDo) => toDo.id !== action.payload),
  },
});

const store = configureStore({ reducer: toDos.reducer });

// store.subscribe();

export const { add, remove } = toDos.actions;

// export const actionCreators = {
//   addToDo,
//   deleteToDo,
// };

export default store;
