import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function ListForm(props) {
    const [tasks, setTasks] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target);
        const newTask = { title: e.target.title.value, author: e.target.author.value, date: e.target.date.value, tasks: [e.target.task.value], count: tasks.length };
        console.log(newTask);
        await axios.post('/api/todolist/', newTask);
        props.updateLists();
    }

    const handleAddTasks = async (e) => {
        e.preventDefault();
        console.log(e);
        const newTask = e.target.task.value;
        setTasks(...tasks, newTask);
        console.log(tasks);
    }

    return (
        <div>


            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>List title:</Form.Label>
                    <Form.Control type="text" placeholder="Title" name="title" />
                </Form.Group>

                <Form.Group controlId="name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" placeholder="Name" name="author" />
                </Form.Group>

                <Form.Group controlId="date">
                    <Form.Label>Date:</Form.Label>
                    <Form.Control type="text" placeholder="Date" name="date" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Task:</Form.Label>
                    <Form.Control type="text" placeholder="Task" name="task" />
                    {/* <Button className="mt-3" variant="secondary" type="submit">+</Button> */}
                </Form.Group>

                <Button className="mt-3" variant="warning" type="submit">
                    Submit
                </Button>
            </Form>


        </div>
    )

}

export default ListForm;