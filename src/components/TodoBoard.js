import React from 'react';
import TodoItem from './TodoItem';
const TodoBoard = ({ todoList, deleteItem, toggleComplete  }) => {
  return (
    <div>
      <h2>Todo List</h2>

      {todoList.length > 0 ? (
        todoList.map((item) => (
          <TodoItem
            item={item}
            deleteItem={deleteItem}
            toggleComplete={toggleComplete}
          />
        ))
      ) : (
        <h2>There is no Item to show</h2>
      )}
      {/* <TodoItem/> will be here once we get the todoList */}
      
    </div> //todolist안에 데이터가 있다면 todoItem을 보여줘라
  ); // 그리고 안에 db안 데이터를 todoitem에 넘겨줌
};

export default TodoBoard;
