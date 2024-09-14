import React, {useContext, useState} from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';
import {UserContext} from "./UserContext";

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
                <Card.Title className="mb-1">Post a Comment</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write your comment here..."
                            required
                        />
                    </Form.Group>
                    <Button
                        type="submit"
                        className="w-100"
                        variant="primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Post Comment'}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CommentForm;
