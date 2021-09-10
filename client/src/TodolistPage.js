import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import ListForm from './ListForm';
import ListCard from './ListCard';
import Header from './Header';

const FormContainer = styled.div`
    text-align: center;
`;

const ListsContainer = styled.div`
    text-align: center;
`;

const TaskOverlay = styled.div`
    background-color: #bbff00;
    opacity: 0;
    transition: opacity 0.3s ease;
    overflow: hidden;
    width: 100%;
    height: 100%;
`;

const TaskBox = styled.div`
    &:hover ${TaskOverlay} {
        opacity: 0.9;
    };
    cursor: pointer;
`;

function TodolistPage() {
    const [lists, setLists] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [isShown, setIsShown] = useState(false);
    const [value, setValue] = useState(false);

    const fetchLists = async () => {
        const { data: lists } = await axios.get('/api/todolist/');
        console.log(lists);
        setLists(lists);
    }

    const fetchTasks = async () => {
        const { data: tasks } = await axios.get('/api/todolist/');
        setTasks(tasks);
    };

    useEffect(() => {
        // fetchTasks();
        fetchLists();
    }, []);

    return (

        <Container fluid>
            <Header />
            <div className="d-flex mt-3 justify-content-center">
                <FormContainer>
                    <h1 className="m-3 pt-3">Welcome to TodoList</h1>
                    <div className="mb-2">
                        <ListForm updateLists={fetchLists} />
                    </div>
                </FormContainer>
            </div>
            <ListsContainer>
                <Row className="pt-2 row">
                    {lists.map((list) =>
                        <Col className="justify-content-center p-3">
                            <ListCard key={list._id} className="m-1" list={list} updateLists={fetchLists} />
                        </Col>
                    )}
                </Row>
            </ListsContainer>
        </Container>
    )
}

export default TodolistPage;