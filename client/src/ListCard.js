import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import ListForm from './ListForm';

function ListCard({ list, updateLists }) {
    const [isShown, setIsShown] = useState(false);
    const [tasks, setTasks] = useState([]);

    const ListOverlay = styled.div`
        background-color: #bbff00;
        opacity: 100;
        transition: opacity 0.3s ease;
        overflow: hidden;
        width: 100%;
        height: 100%;
    `;

    const ListBox = styled.div`
        &:hover ${ListOverlay} {
            opacity: 0.9;
        };
        cursor: pointer;
    `;

    const fetchTasks = async () => {
        const { data: lists } = await axios.get('/api/todolist/');
        setTasks(lists.tasks);
    };

    useEffect(() => {
        console.log(list);
        // list.updateLists.fetchTasks();
    }, [list]);

    return (
        <div className="pt-2 align-text-center">
            <ListBox
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
            >


                <Card style={{ width: '18rem' }}>
                    <Link
                        key={list._id}
                        to={{
                            pathname: `/list/${list._id}`
                        }}
                    >
                        {/* {isShown && (
                            <ListOverlay />
                        )} */}

                        <Card.Body >
                            <Card.Title><b>{list.author}'s {list.title}</b></Card.Title>
                            <Card.Text>
                                <i>{list.date}</i>
                                {list.tasks.map((task, index) =>
                                    <div key={index} className="m-1">
                                        {task}
                                    </div>
                                )}
                            </Card.Text>
                        </Card.Body>


                    </Link>
                </Card>

            </ListBox>
        </div>

        // 
        //     {list.list.author}'s {list.list.title} - 
        //     {list.list.tasks.map((task, index) =>
        //         <TaskBox key={index} className="m-1">
        //             {isShown && (
        //                 <TaskOverlay />
        //             )}
        //             {task}
        //         </TaskBox>
        //     )
        //     }
        //     <Button className="mb-3" variant="danger" onClick={() => handleDelete(list.list._id)}> Delete</ Button>
        // </div>

    )
}

export default ListCard;