import React from 'react';
const Comment = ({ comment }) => {
    return (
        <div className="text-white border-0 p-2" style={{backgroundColor: '#0A1627'}} >
            <div>
                <div className="mb-1">
                    <strong>{comment.user}</strong>
                </div>
                <p>
                    {comment.text}
                </p>
            </div>
            <hr className={"link-secondary"}/>
        </div>
    );
};

export default Comment;
