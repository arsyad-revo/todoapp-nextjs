import { React, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import TodoItem from "./TodoItem";
import newData from "../pages/api/newData";

function Todo() {
  const [newtodo, setnewtodo] = useState("");

  const [inputData, setInputData] = useState({});
  const requestParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: inputData }),
  };

  const handleinput = (e) => {
    setnewtodo(e.target.value);
    console.log(e.target.value);
    setInputData({
      ...inputData,
      newtodo: e.target.value,
    });
  };
  const HandleSubmit = (e) => {
    console.log(newtodo);
    addTodoItem();
    setnewtodo("");
  };

  const [data, setData] = useState([]);

  async function fetchData() {
    const res = await fetch("../api/getData");
    const newData = await res.json();
    setData(newData);
  }
  useEffect(() => {
    fetchData();
  }, [newtodo]);

  async function addTodoItem() {
    console.log(requestParams);
    await fetch("../api/newData", requestParams)
      .then(() => newData())
      .catch((e) => console.log(e));
  }

  return (
    <div className={styles.maincont}>
      <h1>Todo App</h1>
      <div className={styles.newtodo}>
        <h3>Add new todo</h3>
        <div className={styles.semi}>
          <input
            type="text"
            value={newtodo}
            onChange={(e) => handleinput(e)}
          ></input>
          <button onClick={() => HandleSubmit()}>Add Todo</button>
        </div>
      </div>
      <div>
        {data &&
          data.map((todo) => (
            <TodoItem key={todo.ref["@ref"].id} todo={todo}></TodoItem>
          ))}
      </div>
    </div>
  );
}

export default Todo;
