import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Container, Card, ListGroup, Row, Col} from 'react-bootstrap';
import './ShowDetails.css'; // For custom styles

const ShowDetails = () => {
    const {id} = useParams();  // Get the show ID from the URL
    const [show, setShow] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/shows/${id}/`)
            .then(response => setShow(response.data))
            .catch(error => console.log(error));
    }, [id]);  // Fetch show details when the ID changes

    if (!show) return <div>Loading...</div>;  // Display loading state

    return (
        <Container className="mt-4">
            {/* Show Poster and Description */}
            <div className="d-flex justify-content-between align-items-start gap-5">
                <img src={show.poster} alt={show.title} style={{height: '400px'}}/>
                <div>
                    <h1>{show.title}</h1>
                    <p>{show.description}</p>
                    <h4>Cast</h4>
                    <div>
                        {show.cast.map(actor => (
                            <div key={actor.id} className="mb-3">
                                <h5>{actor.name}</h5>
                                <p>Role: {actor.role}</p>
                                {actor.image && <img src={actor.image} alt={actor.name}
                                                     style={{height: '100px', objectFit: 'cover'}}/>}
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Scrollable Episode List */}
            <h4>Episodes</h4>
            <div className="scroll-container">
                <Row className=" scrollable-row">
                    {show.episodes.map(episode => (
                        <Col key={episode.id} xs={12} md={4} lg={3} className="scroll-item">
                            <Card className="h-100">
                                <img src={episode.image} alt={episode.title}
                                     style={{height: '200px', objectFit: "cover"}}/>
                                <Card.Body>
                                    <Card.Title>{episode.title}</Card.Title>
                                    <Card.Text>{episode.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
};

export default ShowDetails;
