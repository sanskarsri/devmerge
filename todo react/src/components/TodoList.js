import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

const TodoList = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [done, setDone] = useState([]);
  const [undone, setUndone] = useState([]);

  useEffect(() => {
    // let data = JSON.parse(localStorage.getItem('todos'));
    // setTodos(data);
    if (todos) {
      let done = todos.filter((item) => item.isComplete == true);
      done.sort((a, b) => new Date(b.updatedOn) - new Date(a.updatedOn));
      setDone(done);
      let undone = todos.filter((item) => item.isComplete == false);
      undone.sort((a, b) => new Date(b.updatedOn) - new Date(a.updatedOn));
      setUndone(undone);
    }
  }, [todos]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(removedArr));
    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
        todo.updatedOn = Date.now();
      }
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const resetData = () => {
    setTodos([]);
    localStorage.removeItem("todos");
  };

  return (
    <>
      <div className="header">
        <h1>What's the Plan for Today?</h1>
        <button className="rst_btn" onClick={resetData}>
          RESET
        </button>
      </div>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={undone}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      <Todo
        todos={done}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
};

export default TodoList;
