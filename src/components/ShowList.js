import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import ShowCard from './ShowCard';
import { useNavigate } from 'react-router-dom';
import SearchComponent from "./SearchComponent";

const ShowList = () => {
    const [shows, setShows] = useState([]);
    const navigate = useNavigate();  // Hook for programmatic navigation

    useEffect(() => {
        axios.get('http://localhost:8000/api/shows/')
            .then(response => setShows(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleShowClick = (showId) => {
        // Navigate to the show details page with the selected show's ID
        navigate(`/shows/${showId}`);
    };
    return (
        <Container>
            <SearchComponent/>
            <Row>
                {shows.map(show => (
                    <Col key={show.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <ShowCard
                            title={show.title}
                            description={show.description}
                            image={show.poster}
                            onClick={() => handleShowClick(show.id)}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ShowList;
