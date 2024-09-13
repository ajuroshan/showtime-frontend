import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import './SearchComponent.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        axios.get(`http://localhost:8000/api/shows/search/`, {
            params: { search: searchTerm }
        })
            .then(response => {
                setResults(response.data.results); // Adjust if your API structure is different
                setLoading(false);
            })
            .catch(error => {
                setError('An error occurred while fetching data.');
                setLoading(false);
            });
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Form onSubmit={handleSearch}>
                        <Form.Group className="d-flex">
                            <Form.Control
                                type="text"
                                placeholder="Search TV shows..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2 custom-placeholder"
                                style={{
                                    backgroundColor: '#0A1627',
                                    color: 'white',
                                    border: '1px solid #ffffff',
                                    borderRadius: '25rem',
                                    flex: 1, // Allow input to take up available space
                                    marginRight: '0.5rem' // Space between input and button
                                }}
                            />
                            <Button
                                variant="outline-light"
                                type="submit"
                                style={{
                                    borderRadius: '25rem',
                                    padding: '0.75rem',
                                    fontSize: '1rem',
                                    flexShrink: 0 // Prevent button from shrinking
                                }}
                            >
                                Search
                            </Button>
                        </Form.Group>
                    </Form>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-danger">{error}</p>}
                    <ListGroup className="mt-4">
                        {results.map((show) => (
                            <ListGroup.Item key={show.id}>
                                <strong>{show.title}</strong>
                                <p>{show.description}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default SearchComponent;
