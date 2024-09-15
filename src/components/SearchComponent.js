import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './SearchComponent.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const SearchComponent = ({ onSearchResults }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        axios.get(`https://showtimeapi.ajuroshan.me/api/shows/search/`, {
            params: { search: searchTerm }
        })
            .then(response => {
                onSearchResults(response.data);  // Send results back to parent
                setLoading(false);
            })
            .catch(() => {
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
                                    flex: 1,
                                    marginRight: '0.5rem'
                                }}
                            />
                            <Button
                                variant="outline-light"
                                type="submit"
                                style={{
                                    borderRadius: '25rem',
                                    padding: '0.75rem',
                                    fontSize: '1rem',
                                    flexShrink: 0
                                }}
                            >
                                Search
                            </Button>
                        </Form.Group>
                    </Form>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-danger p-2">{error}</p>}
                </Col>
            </Row>
        </Container>
    );
};

export default SearchComponent;
