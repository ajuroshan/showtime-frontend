import React from 'react';
import { Card } from 'react-bootstrap';

const Comment = ({ comment }) => {
    return (
        <Card className="text-white border-0" style={{backgroundColor: '#0A1627'}} >
            <Card.Body>
                <Card.Title className="mb-1">
                    <strong>{comment.user}</strong>
                </Card.Title>
                <Card.Text>
                    {comment.text}
                </Card.Text>
            </Card.Body>
        <hr/>
        </Card>
    );
};

export default Comment;
