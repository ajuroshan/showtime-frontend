import React, {useContext, useState} from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';
import {UserContext} from "./UserContext";
import './SearchComponent.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

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

const CommentForm = ({ episodeId, onCommentPosted }) => {
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {user} = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) {
            alert('Comment cannot be empty');
            return;
        }
        if (!user) {
            alert('Please login to post a comment');
            return;
        }

        setIsSubmitting(true);
        const csrftoken = getCookie('csrftoken');

        try {
            await axios.post(
                'http://localhost:8000/api/comments/',
                {
                    episode: episodeId,
                    text: commentText,
                },
                {
                    headers: {
                        'X-CSRFToken': csrftoken,
                    },
                }
            );
            setCommentText('');
            console.log("Comment posted successfully");
            onCommentPosted();
        } catch (error) {
            alert('Failed to post comment');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Card className="text-white border-0" style={{ backgroundColor: '#0A1627' }}>
            <Card.Body>
                <Card.Title className="py-2">Post a Comment</Card.Title>
                <Form onSubmit={handleSubmit} >
                    <Form.Group className="mb-3 ">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write your comment here..."
                            required
                            className="px-4 py-2 custom-placeholder"
                            style={{
                                backgroundColor: '#0A1627',
                                color: 'white',
                                border: '1px solid #ffffff',
                                borderRadius: '0.5rem',
                                flex: 1,
                                marginRight: '0.5rem'
                            }}
                        />
                    </Form.Group>
                    <Button
                        type="submit"
                        variant="outline-light"
                        disabled={isSubmitting}
                        className="px-4 py-2 w-100"
                        style={{
                            borderRadius: '0.5rem',
                            padding: '0.75rem',
                            fontSize: '1rem',
                            flexShrink: 0
                        }}
                    >
                        {isSubmitting ? 'Submitting...' : 'Post Comment'}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CommentForm;
