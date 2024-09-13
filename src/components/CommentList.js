import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentList = ({ episode }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/comments/?episode=${episode.id}`)
            .then(response => setComments(response.data))
            .catch(error => console.log(error));
    }, [episode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/comments/', { text: newComment, episode: episode.id })
            .then(response => {
                setComments([...comments, response.data]);
                setNewComment('');
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h3>Comments for Episode {episode.episode_number}</h3>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>{comment.text}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CommentList;
