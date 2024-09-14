import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Container, Card, Row, Col} from 'react-bootstrap';
import './ShowDetails.css';
import Comment from "./Comment";
import CommentForm from "./CommentForm";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const ShowDetails = () => {
    const {id} = useParams(); // Get the ID from the URL
    const [show, setShow] = useState(null);
    const [comments, setComments] = useState([]);
    const [episodeId, setEpisodeId] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/shows/${id}/`)
            .then(response => {
                    setShow(response.data)
                    if (response.data.episodes.length > 0) {
                        setComments(response.data.episodes[0].comments);
                        setEpisodeId(response.data.episodes[0].id);
                    }
                }
            )
            .catch(error => console.log(error));
    }, [id]);  // Fetch show details when the ID changes

    if (!show) return <div>Loading...</div>;  // Display loading state

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };
    const csrftoken = getCookie('csrftoken');

    const handleCommentPosted = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/episodes/${episodeId}/`
                , {
                    headers: {
                        'X-CSRFToken': csrftoken,
                    },
                }
            );
            setComments(response.data.comments);  // Update the comments based on the episode response
        } catch (error) {
            console.error("Failed to load updated comments", error);
        }
    };

    return (
        <Container className="mt-4">
            {/* Show Poster and Description */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-5">
                <img src={show.poster} alt={show.title}
                     style={{height: '400px', objectFit: 'cover', width: '100%', maxWidth: '300px'}}/>
                <div>
                    <h1>{show.title}</h1>
                    <p>{show.description}</p>
                    <h4 className={"py-2"}>Cast</h4>
                    <div className="d-flex flex-wrap align-items-start gap-3">
                        {show.cast.map(actor => (
                            <div key={actor.id} className="text-center">
                                {actor.image && (
                                    <img
                                        src={actor.image}
                                        alt={actor.name}
                                        className="mb-2"
                                        style={{
                                            height: '100px',
                                            width: '100px',   // Ensures the image is square
                                            objectFit: 'cover',
                                            borderRadius: '50%' // Makes the image circular
                                        }}
                                    />
                                )}
                                <div>
                                    <h6 className={"small"}>{actor.name}</h6>
                                    <p className={"small"}>Role: {actor.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scrollable Episode List */}
            <h4 className="mt-4">Episodes</h4>
            <div className="scroll-container">
                <Row className="scrollable-row gap-4">
                    {show.episodes.map(episode => (
                        <Col key={episode.id} xs={12} sm={6} md={4} lg={3} className="scroll-item">
                            <Card
                                className="h-100 text-white hovveerr"
                                onClick={() => {
                                    setComments(episode.comments);
                                    setEpisodeId(episode.id);
                                }}
                                style={{cursor: 'pointer', backgroundColor: '#0A1627'}}
                            >
                                <img
                                    src={episode.image}
                                    alt={episode.title}
                                    style={{height: '150px', objectFit: "cover"}}
                                />
                                <Card.Body>
                                    <Card.Title
                                        style={{
                                            whiteSpace: 'normal',  // Allow text to wrap onto multiple lines
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        {episode.title}
                                    </Card.Title>
                                    <Card.Text
                                        className={"small"}
                                        style={{
                                            whiteSpace: 'normal',  // Allow text to wrap onto multiple lines
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        {episode.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>


            <h4 className="mt-4">Comments</h4>
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment}/>
            ))}
            <CommentForm episodeId={episodeId} onCommentPosted={handleCommentPosted}/>
        </Container>
    );
};

export default ShowDetails;
