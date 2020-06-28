import { createStore } from "redux";
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const countModifier = (count = 0) => {
  return count;
};

// createStore라는 함수가 우리에게 reducer를 주기를 요구함
// reducer는 function(함수)여야 함
const countStore = createStore(countModifier);

// console.log(countStore); -> dispatch, getState, replaceReduer, subscribe 총 4가지 함수들이 존재

/*
store란 무엇인가?
- store는 나의 data를 넣는 곳이다.
- state는 나의 애플리케이션에서 바뀌는 data를 의미한다.
- 현재 코드에서는 count가 state

reducer이란?
- data를 바꾸고 수정하는 걸 책임지는 함수
- reducer가 return 하는 것들은 모두 나의 애플리케이션의 data가 될 것이다.
- reducer나 modifier는 처음으로 나의 data를 바꿔주고
- 뭐든지 return 하는 것은 나의 애플리케이션에 있는 data!
- countModifier에서 "hello"라고 return을 하면, 이 "hello"는 나의 애플리케이션의 데이터가 된다는 뜻이다.
*/
