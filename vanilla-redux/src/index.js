import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// 리듀서의 두번째 인자인 action에 보내지는 행동들을 객체 형태로 전송
// 오로지 객체 형태만을 return함
const addToDo = (text) => {
  return { type: ADD_TODO, text };
};

const deleteToDo = (id) => {
  return { type: DELETE_TODO, id };
};

// 절대 state 자체의 값을 변경하면 안되고, 새로운 state를 반환해야 한다.
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      return [...state, newToDoObj];
    // 새로운 배열을 만들어서 이전에 있던 배열의 내용에 새로운 todo 객체를 추가한다.
    case DELETE_TODO:
      const cleaned = state.filter((toDo) => toDo.id !== action.id);
      return cleaned;
    // 우리는 기존 배열의 항목을 삭제하지 않아야 한다.
    // 삭제할 항목을 제외시키고 새로운 배열을 만들어야 한다.
    // filter()를 통해서 삭제할 toDo의 id를 제외하고 나머지 항목을 새 배열로 반환
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteTodo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

// action을 dispatch하기 위해 만든 함수
const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

// action을 dispatch하기 위해 만든 함수
const dispatchDeleteTodo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

// 이 함수 대신에 dispatch를 사용함
// const createToDo = (toDo) => {
//   const li = document.createElement("li");
//   li.innerText = toDo;
//   ul.appendChild(li);
// };

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);

/* 
절대로 reducer의 초기 state상태가 배열이나 객체일 경우 절대로 그 state 자체를 수정해서 리턴하면 안된다.
상태를 수정하지 않고, 새로운 것을 return 해야한다.
예를 들어, state.push(action.text)와 같은 행위를 하면 안된다.
*/

/* 리덕스 챕터 1
import { createStore } from "redux";
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// 리덕스 적용 전
// let count = 0;
// number.innerText = count;

// const updataText = () => {
//   number.innerText = count;
// };

// const handleAdd = () => {
//   count += 1;
//   updataText();
// }

// const handleMinus = () => {
//   count -= 1;
//   updataText();
// }

// add.addEventListener("click", handleAdd);
// minus.addEventListener("click", handleMinus);

// redux로 변환
number.innerText = 0;

// 변수로 선언한 이유는, type의 이름이 같지 않을 때 오류 메시지가 나오지 않아 오류 찾기가 어렵기 때문에, 일부러 변수로 선언하면
// 오류 메시지를 띄어주기 때문에 나중에 오류 찾기 편하다.
const ADD = "ADD";
const MINUS = "MINUS";

const countModifier = (count = 0, action) => {
  // console.log(count, action);
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }

  // 바꾸기 전
  // if (action.type === "ADD") {
  //   return count + 1;
  // } else if (action.type === "MINUS") {
  //   return count - 1;
  // } else {
  //   return count;
  // }
};

// createStore라는 함수를 만들면 우리에게 reducer를 주기를 요구함
// reducer는 우리의 data를 수정하는 function(함수)여야 함
const countStore = createStore(countModifier);
// console.log(countStore); -> dispatch, getState, replaceReduer, subscribe 총 4가지 함수들이 존재

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

const handleAdd = () => {
  countStore.dispatch({ type: ADD });
};

const handleMinus = () => {
  countStore.dispatch({ type: MINUS });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);

/*
리덕스
- 나의 data를 관리하는데 도와주는 역할을 하기 위해 만들어짐
- 리덕스가 -1이나 +1을 count하는 걸 도와주기 위해 만들어진 것.

store란 무엇인가?
- createStore는 Store를 생성하고, store는 나의 data를 넣는 곳이다.
- state는 나의 애플리케이션에서 바뀌는 data를 의미한다.
- 현재 코드에서는 count가 state

reducer이란?
- data를 바꾸고 수정하는 걸 책임지는 함수
- reducer가 return 하는 것들은 모두 나의 애플리케이션의 data가 될 것이다.
- reducer나 modifier는 처음으로 나의 data를 바꿔주고
- 뭐든지 return 하는 것은 나의 애플리케이션에 있는 data가 된다.
- countModifier에서 "hello"라고 return을 하면, 이 "hello"는 나의 애플리케이션의 데이터가 된다는 뜻이다.

action이란?
- action은 redux에서 function을 부를 때 쓰는 두번째 parameter 혹은 argument이다.
- count + 1 혹은 count - 1을 수행할 수 있는 행동
- 어떻게 countModifier(리듀서)에게 action을 보내서 count의 값을 바꿀 수 있을까?
- store을 사용하면 된다 즉, countStore.dispatch({type : "ADD"}); dispatch()로 action(행동)을 보낼 수 있다.
- 순서 : 
1. redux가 countModifier(리듀서)를 부르고
2. countModifier(currentState = 0, { type: "ADD"}) -> 내가 countModifier(리듀서)에게 메세지를 보내는 방법

정리 : data의 store(저장소)를 만들고, data의 modifier(변경)은 countModifier가 하고, 그리고 message(action)를 그 countModifier에 보내면 된다.
message를 send하는 방법은 dispatch를 사용하면 된다.
dispatch를 통해 내가 전송한 message는 action에 넣으면 되고, 그 다음 할일은 action을 체크하면 된다.
그러고 return된 count값은 현재의 state를 의미한다.

subscribe이란?
- 우리에게 store 안에 있는 변화들을 알 수 있게 해준다.
- 만약 변화를 나의 store에서 감지하고 싶다면, 그 change함수를 구독하면 된다.
ex)
const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

<총 정리>
countModifier(리듀서)가 return하는 것은, application의 state가 된다.
reducer가 return하는 것은 무엇이든지 application의 state가 된다는 말
만약에 사용자가 "hello"를 리턴하면, 그게 내 어플리케이션의 상태가 되는 것이다.
reducer는 현재 state와 acrion을 함께 부른다.
어떻게 reducer에게 action을 보내냐면, dispatch를 이용해서 보낸다.
dispatch가 reducer를 불러서 현재 state와 그리고 내가 보낸 action을 더해
dispatch()안에 action은 object여야 한다. string은 될 수 없다.
dispatch(type: ADD)처럼 type은 고정적이고, 이름을 바꾸면 에러가 난다.(dispatch(name: ADD) -> 에러)
action은 리듀서와 커뮤니케이션하는 방법이다.
만약에 변화를 나의 store가 감지하고 싶다면,
그 변화를 구독하면 된다.
그래서 언제든지 store가 바뀔 때, 변화에 해당하는 함수를 실행하면 된다.
즉, 그 함수는 우리의 html을 업데이트 할 수 있게 해주는 함수를 말한다.
*/
