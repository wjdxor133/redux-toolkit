import { createStore } from "redux";
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const countModifier = (count = 0, action) => {
  console.log(count, action);
  if (action.type === "ADD") {
    return count + 1;
  } else if (action.type === "MINUS") {
    return count - 1;
  } else {
    return count;
  }
};

// createStore라는 함수가 우리에게 reducer를 주기를 요구함
// reducer는 function(함수)여야 함
const countStore = createStore(countModifier);
// console.log(countStore); -> dispatch, getState, replaceReduer, subscribe 총 4가지 함수들이 존재

countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "MINUS" });

console.log(countStore.getState());

/*
store란 무엇인가?
- createStore는 Store를 생성하고, store는 나의 data를 넣는 곳이다.
- state는 나의 애플리케이션에서 바뀌는 data를 의미한다.
- 현재 코드에서는 count가 state

reducer이란?
- data를 바꾸고 수정하는 걸 책임지는 함수
- reducer가 return 하는 것들은 모두 나의 애플리케이션의 data가 될 것이다.
- reducer나 modifier는 처음으로 나의 data를 바꿔주고
- 뭐든지 return 하는 것은 나의 애플리케이션에 있는 data!
- countModifier에서 "hello"라고 return을 하면, 이 "hello"는 나의 애플리케이션의 데이터가 된다는 뜻이다.

action이란?
- action은 redux에서 function을 부를 때 쓰는 두번째 parameter 혹은 argument이다.
- count + 1 혹은 count - 1을 수행할 수 있는 행동
- 어떻게 countModifier에게 action을 보내서 count의 값을 바꿀 수 있을까?
- store을 사용하면 된다 즉, countStore.dispatch({type : "ADD"}); dispatch()로 action을 보낼 수 있다.
- 순서 : 
1. redux가 countModifier를 부르고
2. countModifier(currentState = 0, { type: "ADD"}) -> 내가 countModifier에게 메세지를 보내는 방법

정리 : data의 store(저장소)를 만들고, data의 modifier(변경)은 countModifier가 하고, 그리고 message(action)를 그 countModifier에 보내면 된다.
message를 send하는 방법은 dispatch를 사용하면 된다.
dispatch를 통해 내가 전송한 message는 action에 넣으면 되고, 그 다음 할일은 action을 체크하면 된다.
그러고 return된 count값은 현재의 state를 의미한다.
*/
