import React from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { Link } from "react-router-dom";

const ToDo = ({ text, onBtnClick, id }) => {
  return (
    <li>
      <Link to={`/${id}`}>
        {text} <button onClick={onBtnClick}>DEL</button>
      </Link>
    </li>
  );
};

// 우리의 경우를 살펴보자면, ToDO는 오로지 dispatch만 신경 쓴다.
// 왜냐하면, 우리는 ToDo에서 reducer에게 메시지를 보내기를 원하기 때문이다.
// ToDo에서는 state에 대해서는 신경쓰지 않는다.

const mapDispatchToProps = (dispatch, ownProps) => {
  // 우리가 어떤 것을 받는지 확인하기 위해서
  console.log("ownProps", ownProps);
  return {
    onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id)),
  };
};

export default connect(null, mapDispatchToProps)(ToDo);
