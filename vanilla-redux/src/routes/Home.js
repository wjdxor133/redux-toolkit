import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import ToDo from "../components/ToDo";

const Home = ({ toDos, addToDo }) => {
  const [text, setText] = useState();

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setText("");
    addToDo(text);
  };

  return (
    <div>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </div>
  );
};

// mapStateToProps(state, ownProps) 함수에서 첫 번째 인자 state는 Redux store로부터 오고, 두번째 인자는 해당 컴포넌트의 props이다.
// Home에 store로부터 state를 가져다 주는 함수
// 원래는 store에 있는 state를 getState()를 통해 가져다가 우리의 component에 전해졌다.
// 이걸 위해 우리가 사용한 방법은 mapStateToProps()를 사용한 것 이다.
const mapStateToProps = (state, ownProps) => {
  // console.log("store", state, "ownProps", ownProps);
  return { toDos: state };
};

// mapDispatchToProps() 함수는 첫번째 인자로 dispatch를 가지고, 두번째 인자로는 ownProps를 가진다.
// 해당 컴포넌트의 props를 바꿀 수 있게 해준다.
const mapDispatchToProps = (dispatch) => {
  console.log("dispatch", dispatch);
  return {
    addToDo: (text) => dispatch(actionCreators.addToDo(text)),
  };
};

// connect()는 Home으로 보내는 props에 추가될 수 있도록 허용해줌
// mapStateToProps() 함수에서 return 된 값이 해당 component의 prop에 추가가 될 것이다.
// Redux state로부터 home(component)에 prop으로써 전달한다는 의미
// 그리고 이제부터는 어떻게 하면 component가 dispatch 동작도 할 수 있을지에 대해 알아보자
// connect 함수는 두 가지 argument들이 있다.
// 첫번째 인자는 mapStateToProps()이고, 두번째 인자는 mapDispatchToProps()이다.
// 이 mapDispatchToProps()를 통해 dispatch를 할 수 있다.
export default connect(mapStateToProps, mapDispatchToProps)(Home);

//만약에 mapState는 필요하지 않고, dispatch만 필요한 경우, null로 대체한다.
// export default connect(null, mapDispatchToProps)(Home);

/*
connect()란?
connect()는 우리의 components들을 store에 연결해준다.
두 가지 argument가 존재하는데, 우리는 state나 dispatch 할 수 있다.
*/
