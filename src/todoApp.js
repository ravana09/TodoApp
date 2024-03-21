import React, { useState } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [filter, setFilter] = useState("all");
  const [editMode, setEditMode] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");
  const [editTaskStatus, setEditTaskStatus] = useState("not completed"); // default should be not completed

  const handleAddTodo = () => {
    if (!taskName.trim()) return;
    const newTodo = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      status: "not completed",
    };
    setTodos([...todos, newTodo]);
    setTaskName("");
    setTaskDescription("");
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id, name, description, status) => {
    setEditMode(id);
    setEditTaskName(name);
    setEditTaskDescription(description);
    setEditTaskStatus(status);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editMode
        ? {
            ...todo,
            name: editTaskName,
            description: editTaskDescription,
            status: editTaskStatus,
          }
        : todo
    );
    setTodos(updatedTodos);
    setEditMode(null);
    setEditTaskName("");
    setEditTaskDescription("");
    setEditTaskStatus(""); // reset status to default value
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.status === "completed";
    if (filter === "notCompleted") return todo.status === "not completed";
    return true;
  });

  return (
    <div>
      <h1>Todo App</h1>
      <div className="todo-form">
        <input
          type="text"
          placeholder="Task Name"
          value={editMode !== null ? editTaskName : taskName}
          onChange={(e) =>
            editMode !== null
              ? setEditTaskName(e.target.value)
              : setTaskName(e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Task Description"
          value={editMode !== null ? editTaskDescription : taskDescription}
          onChange={(e) =>
            editMode !== null
              ? setEditTaskDescription(e.target.value)
              : setTaskDescription(e.target.value)
          }
        />
        {editMode !== null ? (
          <select
            value={editTaskStatus}
            onChange={(e) => setEditTaskStatus(e.target.value)}
          >
            <option value="not completed">Not Completed</option>
            <option value="completed">Completed</option>
          </select>
        ) : null}
        {editMode !== null ? (
          <button
            onClick={handleUpdateTodo}
            style={{ backgroundColor: "aquamarine", color: "white" }}
          >
            Update Todo
          </button>
        ) : (
          <button onClick={handleAddTodo}>Add Todo</button>
        )}
      </div>

      <div className="options-class">
        <p style={{  textShadow :"0px 5px 10px aquamarine"}} >My todos</p>
        <p style={{  textShadow :"0px 5px 10px aquamarine"}}>
          Select Filters :
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="notCompleted">Not Completed</option>
          </select>
        </p>
      </div>

      <div  style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className={`status-selector ${
              todo.status === "completed" ? "completed" : "not-completed"
            }`}
            style={{}}
          >
            <h5>Name: {todo.name}</h5>
            <p className="card-para">
              <h5>Description:</h5> {todo.description}
            </p>
            <p>
              <h5>Status:</h5>
              <select
                className="slect-status"
                value={todo.status}
                onChange={(e) => handleStatusChange(todo.id, e.target.value)}
              >
                <option value="not completed">Not Completed</option>
                <option value="completed">Completed</option>
              </select>
            </p>

            <button
              className="edit-button"
              onClick={() =>
                handleEditTodo(
                  todo.id,
                  todo.name,
                  todo.description,
                  todo.status
                )
              }
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="delete-button "
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
