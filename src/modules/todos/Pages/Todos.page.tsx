import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Table, Button } from 'reactstrap';
import './Todos.page.css'

function Todos() {
  const [todos, setTodos] = useState([
    { id: 0, title: '', description: '', status: '' },
  ]);
  useEffect(() => {
    Axios({
      url: 'http://localhost:3001/todos',
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('Token'),
      },
    }).then((result) => {
      console.log(result.data);
      setTodos(result.data.data);
      // console.log(todos)
    });
  }, []);
  return (
    <>
      <div>
        <div className="TodosBoard" >
          <h1>Todos</h1>
          <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => {
                return <tr key={todo.id} >
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>{todo.status}</td>
                  <td>
                    <Button>Update</Button>
                  </td>
                  <td>
                    <Button>Delete</Button>
                  </td>
                </tr>;
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Todos;
