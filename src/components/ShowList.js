import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import ShowCard from './ShowCard';
import {useNavigate} from 'react-router-dom';
import SearchComponent from "./SearchComponent";
import axios from "axios";

const ShowList = () => {
    const [searchResults, setSearchResults] = useState([]);  // To hold search results
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/shows/')
            .then(response => {
                setSearchResults(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const handleShowClick = (showId) => {
        navigate(`/shows/${showId}`);
    };

    const handleSearchResults = (results) => {
        setSearchResults(results);  // Update search results
    };

    return (
        <Container>
            <SearchComponent onSearchResults={handleSearchResults}/> {/* Pass handler */}
            <Row>
                {searchResults.length === 0 ? (
                    <Col>
                        <p className="text-center text-white">No shows found. Try searching for something else.</p>
                    </Col>
                ) : (
                    searchResults.map(show => (
                        <Col key={show.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <ShowCard
                                title={show.title}
                                description={show.description}
                                image={show.poster}
                                onClick={() => handleShowClick(show.id)}
                            />
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );

};

export default ShowList;
