
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import Header from './Header';
import styled from 'styled-components';

function ListEdit(props) {
    console.log(props)
    const listId = props.match.params.listId;
    const [list, setList] = useState();
    const [tasks, setTasks] = useState([]);

    const DisplayContainer = styled.div`
        width: 50%;
    `;

    const FormContainer = styled.div`
        width: 50%;
    `;

    const fetchList = async () => {
        const { data: list } = await axios.get(`/api/todolist/${listId}`);
        setList(list);
        console.log(list);
    }

    const handleAddTasks = async (e) => {
        e.preventDefault();
        console.log(e);
        const newTask = e.target.task.value;
        setTasks(...tasks, newTask);
        console.log(tasks);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(e.target);
        const updatedList = { title: e.target.title.value, author: e.target.author.value, date: e.target.date.value, tasks: [e.target.task.value], count: tasks.length };
        console.log(updatedList);
        await axios.patch(`/api/todolist/${listId}`, updatedList);
    }

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <Container fluid>
            <Header />
            {
                list && list.author && list.title && list.date && list.tasks &&
                <>
                    <div className="d-flex justify-content-center text-center mt-3 mb-5">
                        <DisplayContainer>
                            <h2>Old version: </h2>
                            <div>
                                <i>{list.author}'s {list.title}</i>
                            </div>

                            {list.date}
                            {list.tasks.map((task, index) =>
                                <div key={index} className="m-1">
                                    {task}
                                </div>
                            )}
                        </DisplayContainer>
                    </div>

                    <div className="d-flex justify-content-center text-center">
                        <FormContainer>
                            <h2>Update</h2>
                            <Form onSubmit={handleUpdate} >
                                <Form.Group controlId="title">
                                    <Form.Label>List title:</Form.Label>
                                    <Form.Control type="text" placeholder={list.title} name="title" />
                                </Form.Group>

                                <Form.Group controlId="name">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control type="text" placeholder={list.author} name="author" />
                                </Form.Group>

                                <Form.Group controlId="date">
                                    <Form.Label>Date:</Form.Label>
                                    <Form.Control type="text" placeholder={list.date} name="date" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Task:</Form.Label>
                                    <Form.Control type="text" placeholder={list.tasks} name="task" />
                                    {/* <Button className="mt-3" variant="secondary" type="submit">+</Button> */}
                                </Form.Group>

                                <Button className="mt-3" variant="warning" type="submit">
                                    Update
                                </Button>
                            </Form>
                        </FormContainer>
                    </div>
                </>
            }
        </Container >
    )

}

export default ListEdit;


// return (
//     <div className="pt-2 align-text-center">
//         {/* <form>
//                 {tasks.map((task, index) =>
//                     <div>
//                         <input type="checkbox" id="task" name="task" value="task" className="task" key={index}></input>
//                         <label for="task" className="m-1 task" key={index}>{task.time} —— {task.task}</label>
//                     </div>
//                 )}
//                 <Button variant="warning" type="submit" className="m-2" onDelete={deleteTasks}>Completed!</Button>
//             </form> */}
//         {list.list.author}'s {list.list.title} - {list.list.date}
//         {list.list.tasks.map((task, index) =>
//             <TaskBox key={index} className="m-1" onClick={() => handleDelete(task._id)}
//                 onMouseEnter={() => setIsShown(true)}
//                 onMouseLeave={() => setIsShown(false)}>
//                 {isShown && (
//                     <TaskOverlay />
//                 )}
//                 {task}
//             </TaskBox>
//         )}
//         <Button className="mb-3" variant="danger">Delete</Button>
//     </div>

// )