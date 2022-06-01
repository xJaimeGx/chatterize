import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_REPLY } from '../../utils/mutations';

const ReplyForm = ({ topicId }) => {
    const [replyBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addReply, { error }] = useMutation(ADD_REPLY);

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            await addReply({
                variables: { replyBody, topicId },
            });
            
            setBody(' ');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };
    

    return (
        <div>
            <form 
            className="flex-column justify-center justify-space-between-md"
            onSubmit={handleFormSubmit}
            >
                <textarea
                placeholder="Leave your reply to this message..."
                value={replyBody}
                className="form-input"
                onChange={handleChange}
                ></textarea>

                <button className="btn submit" type="submit">
                    Submit
                </button>
            </form>

            <p 
            className={`char-count ${characterCount === 280 || error ? 'text-error' : ''}`}
            >
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            {error && <div> Something went wrong...</div>}
        </div>
    );
};

export default ReplyForm;