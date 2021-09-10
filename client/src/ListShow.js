import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Redirect } from 'react-router';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import TodolistPage from './TodolistPage';
import Header from './Header';

function ListShow(props) {
    const listId = props.match.params.listId;
    const [list, setList] = useState();
    const [isShown, setIsShown] = useState(false);

    const DisplayContainer = styled.div`
        font-size: 2rem;
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

    const fetchList = async () => {
        const { data: list } = await axios.get(`/api/todolist/${listId}`);
        setList(list);
        console.log(list);
    }

    const handleDelete = async (listId) => {
        await axios.delete(`/api/todolist/${listId}`);
        <Redirect to={{ pathname: "/" }} />
    }

    useEffect(() => {
        fetchList();
        console.log(list);
    }, [])

    return (

        <Container fluid>
            <Header />
            {
                list && list.author && list.title && list.date && list.tasks &&
                <>
                    <DisplayContainer className="text-center mt-5">
                        <div>
                            <b>{list.author}'s {list.title}</b>
                        </div>

                        {list.date}
                        {list.tasks.map((task, index) =>
                            <TaskBox key={index} className="m-1">
                                {isShown && (
                                    <TaskOverlay />
                                )}
                                {task}
                            </TaskBox>
                        )}
                        <Button className="m-3" variant="danger" onClick={() => handleDelete(listId)}> Delete </ Button>

                        <Link key={listId}
                            to={{
                                pathname: `/edit/${listId}`
                            }}
                        >
                            <Button className="m-3" variant="secondary" > Edit </ Button>
                        </Link>
                    </DisplayContainer>
                </>
            }
        </Container>

        // <div></div>
    )
}

export default ListShow;