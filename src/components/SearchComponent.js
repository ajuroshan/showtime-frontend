import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search term:', searchTerm);
        // Handle your search logic here (e.g., API request)
    };

    return (
        <Container className={'mt-5'}>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form onSubmit={handleSearch}>
                        <Form.Group className="mb-3" controlId="searchInput">
                            <Form.Control
                                type="text"
                                placeholder="Search TV shows..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2"
                                style={{
                                    backgroundColor: '#0A1627',
                                    color: 'white',
                                    border: '1px solid white',
                                }}
                            />
                        </Form.Group>
                        <Button variant="outline-light" type="submit">
                            Search
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SearchComponent;
