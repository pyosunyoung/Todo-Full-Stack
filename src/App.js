import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TodoBoard from './components/TodoBoard';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import api from './utils/api';
function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState('');
  const getTasks = async () => {
    // 할일 목록 출력 코드
    const response = await api.get('/tasks');
    console.log('rrr', response);
    setTodoList(response.data.data);
  };
  useEffect(() => {
    getTasks(); // 앱이 처음 실행될 때 getTask가 동작되게 useEffect사용
  }, []); 
  const addTask = async () => {
    try {
      const response = await api.post('/tasks', {
        task: todoValue,
        isComplete: false,
      });
      if(response.status === 200){
        console.log('성공');
        //1. 입력한 값이 안사라짐
        setTodoValue("");
        //2. 추가한 값이 바로 안보임, 새로고침 해야 보임
        getTasks(); // 나는 useEffect에 조건 넣어서 todoList값이 변경되면 다시 새로고침되어지게 설정해봤음 맞는지 모름
      }else{
        throw new Error('task can not be added');
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  //onClick={() => deleteItem(item._id)}밑 async(id)는 todoItem에서 전달된 id값으로
  //매개변수로 들어간거임 이해했다.
  const deleteItem = async (id) => { 
    try {
      console.log(id);
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      console.log(id); // todoList는 값이 들어간 전체 데이터에서 찾는 거임
      const task = todoList.find((item) => item._id === id);
      const response = await api.put(`/tasks/${id}`, {
        isComplete: !task.isComplete,
      });
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)} // 실시간으로 todovalue에 값을 넣어주는 것
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard 
      todoList={todoList} 
      deleteItem={deleteItem}
      toggleComplete={toggleComplete}
      />
    </Container>
  );
}

export default App;


// toggleComplete 작동 과정
// 1. 유저가 버튼을 클릭하면 해당 메모의 _id 값이 toggleComplete 함수로 전달됩니다.
// 2. toggleComplete 함수는 해당 메모를 찾아 완료 상태(isComplete)를 반대로 토글합니다.
// 3. 그 상태를 서버에 저장하고, 다시 최신 메모 목록을 가져옵니다.
// 4. board item에서 isComplete 값에 따라 CSS 클래스를 적용해 메모의 스타일(회색 처리)을 변경합니다.