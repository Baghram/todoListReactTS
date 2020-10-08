import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Axios from 'axios';
import { Table, Button, Modal, Form, ModalHeader, Label, Input, ModalBody, ModalFooter } from 'reactstrap';
import './Todos.page.css';

function Todos() {
  const [todos, setTodos] = useState([
    { id: 0, title: '', description: '', status: '' },
  ]);
  const [update, setUpdate] = useState({ id: 0, title: '', description: '', status: '' })
  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [modal, setModal] = useState(false)
  const [modalAdd, setModalAdd] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)

  const toggleModal = (event: any) => {
    setUpdate(event)
    setTask(event.title)
    setDescription(event.description)
    setStatus(event.status)
    setModal(!modal)
  }
  const closeModal = () => {
    setModal(false)
    setModalAdd(false)
    setModalDelete(false)
  }

  const toggleModalAdd = (event: any) => {
    setModalAdd(!modalAdd)
  }

  const toggleModalDelete = (event: any) => {
    setUpdate(event)
    setModalDelete(!modalDelete)
  }

  const typeTask = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };
  const typeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }
  const typeStatus = (event: any) => {
    console.log(event.target.value)
    setStatus(event.target.value)
  }

  //for Adding Tasks
  const submitAdd = (event: FormEvent<HTMLFormElement>) => {

    Axios({
      url: "http://localhost:3001/todos/add",
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('Token')
      },
      data: {
        title: task,
        description: description,
        status: "OnGoing"
      }
    })
      .then(result => {
        return Axios({
          url: 'http://localhost:3001/todos',
          method: 'GET',
          headers: {
            Authorization: localStorage.getItem('Token')
          }
        })
      })
      .then(result => {
        setTodos(result.data.data);
        setModalAdd(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  //for Updating Tasks
  const submitUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    Axios({
      url: `http://localhost:3001/todos/update/${update.id}`,
      method: 'PATCH',
      headers: {
        Authorization: localStorage.getItem('Token')
      },
      data: {
        title: task,
        description: description,
        status: status
      }
    })
      .then(result => {
        console.log(result.data)
        return Axios({
          url: 'http://localhost:3001/todos',
          method: 'GET',
          headers: {
            Authorization: localStorage.getItem('Token'),
          },
        })
      })
      .then(result => {
        setTodos(result.data.data);
        setModal(false)
      })
      .catch(err => {
        console.log(err)
      })
  }
  //For Deleting Tasks
  const submitDelete = (event: React.MouseEvent<MouseEvent>) => {
    Axios({
      url: `http://localhost:3001/todos/delete/${update.id}`,
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('Token')
      },
    })
      .then(result => {
        console.log(result.data);
        return Axios({
          url: 'http://localhost:3001/todos',
          method: 'GET',
          headers: {
            Authorization: localStorage.getItem('Token'),
          },
        })
      })
      .then(result => {
        setTodos(result.data.data);
        setModalDelete(false)
      })
      .catch(err => {
        console.log(err)
      });
  }

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
  //Conditional Rendering if no task yet
  if (todos === []) {
    return (
      <>
        <div className="background">
          <Modal className="ModalAdd" isOpen={modalAdd} toggle={toggleModalAdd}>
            <ModalHeader>
              <h1>Add Task</h1>
            </ModalHeader>
            <ModalBody>
              <div>
                <Form onSubmit={submitAdd}>
                  <Label for="Task">Task:</Label>
                  <Input type='text' placeholder='Write Task Here' onChange={typeTask}></Input>
                  <Label for="Description">Description:</Label>
                  <Input type='text' placeholder="Write Description here" onChange={typeDescription}></Input>
                  <ModalFooter>
                    <Button color="primary" onClick={submitAdd}>Submit</Button>
                    <Button color="danger" onClick={closeModal}>Cancel</Button>
                  </ModalFooter>
                </Form>
              </div>
            </ModalBody>
          </Modal>
          <div className="TodosBoard">
            <div className="TodosTitle">
              <h1>Todos</h1>
              <Button onClick={toggleModalAdd}>Add Task</Button>
            </div>
            <Table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
            </Table>
            <h1>No Todos Yet...Please Add using the "Add Task Button"</h1>
          </div>
        </div>
      </>
    )
  };
  //Normal rendering if there's a task
  return (
    <>
      <div className="background">

        <Modal className="ModalAdd" isOpen={modalAdd} toggle={toggleModalAdd}>
          <ModalHeader>
            <h1>Add Task</h1>
          </ModalHeader>
          <ModalBody>
            <div>
              <Form onSubmit={submitAdd}>
                <Label for="Task">Task:</Label>
                <Input type='text' placeholder='Write Task Here' onChange={typeTask}></Input>
                <Label for="Description">Description:</Label>
                <Input type='text' placeholder="Write Description here" onChange={typeDescription}></Input>
                <ModalFooter>
                  <Button color="primary" onClick={submitAdd}>Submit</Button>
                  <Button color="danger" onClick={closeModal}>Cancel</Button>
                </ModalFooter>
              </Form>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={modal} toggle={toggleModal} className="ModalUpdate" >
          <ModalHeader>
            <h1>Update</h1>
          </ModalHeader>
          <ModalBody>
            <div className="ModalUpdate">
              <Form onSubmit={submitUpdate}>
                <Label for="Task">Task:</Label>
                <Input type='text' placeholder={update.title} onChange={typeTask}></Input>
                <Label for="Description">Description:</Label>
                <Input type='text' placeholder={update.description} onChange={typeDescription}></Input>
                <Label for="Status">Status:</Label>
                <Input type="select" onChange={typeStatus}>
                  <option selected disabled hidden>Choose</option>
                  <option value="OnGoing" onClick={() => { typeStatus('OnGoing') }}>OnGoing</option>
                  <option value="Done" onClick={() => { typeStatus('Done') }}>Done</option>
                </Input>
                <ModalFooter>
                  <Button color="primary" onClick={submitUpdate}>Submit</Button>
                  <Button color="danger" onClick={closeModal}>Cancel</Button>
                </ModalFooter>
              </Form>
            </div>
          </ModalBody>
        </Modal>

        <Modal className='ModalDelete' isOpen={modalDelete} toggle={toggleModalDelete}>
          <ModalHeader>
            <h1>Delete Confirmation</h1>
          </ModalHeader>
          <ModalBody>
            <h2>Are you Really Sure You want to delete this task??</h2>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={submitDelete}>Yes</Button>
            <Button color="danger" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <div className="TodosBoard">
          <div className="TodosTitle">
            <h1>Todos</h1>
            <Button onClick={toggleModalAdd}>Add Task</Button>
          </div>
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
                return (
                  <tr key={todo.id}>
                    <td>{todo.title}</td>
                    <td>{todo.description}</td>
                    <td>{todo.status}</td>
                    <td>
                      <Button onClick={() => { toggleModal(todo) }} color="primary">Update</Button>
                    </td>
                    <td>
                      <Button onClick={() => { toggleModalDelete(todo) }} color="danger">Delete</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Todos;