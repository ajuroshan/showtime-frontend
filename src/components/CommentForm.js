import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { Card, Button, Form } from 'react-bootstrap';

const CommentForm = ({ episodeId, onCommentPosted }) => {
    const [commentText, setCommentText] = useState('');
    const { user } = useContext(UserContext);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) {
            alert('Comment cannot be empty');
            return;
        }
        if (!user) {
            alert('You must be logged in to comment');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:8000/api/comments/', {
                episode: episodeId,
                text: commentText,
                user: user.username // or user.email, depending on your setup
            });
            setCommentText(''); // Clear the form after successful submission
            onCommentPosted(response.data); // Notify parent component or handle the new comment
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
