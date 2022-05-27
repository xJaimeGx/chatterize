import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_TOPIC } from '../../utils/mutations';
import { QUERY_TOPICS, QUERY_ME } from '../../utils/queries';

const TopicForm = () => {
const [topicText, setText] = useState('');
const [characterCount, setCharacterCount] = useState(0);

const [addTopic, { error }] = useMutation(ADD_TOPIC, {
    update(cache, { data: { addTopic } }) {
        
        try {
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, topics: [...me.topics, addTopic] } },
            });
        } catch (e) {
            console.warn("First Topic posted by user!")
        }
        //read whats currently in the cache
        const { topics } = cache.readQuery({ query: QUERY_TOPICS });

        //prepend the newest topic 
        cache.writeQuery({
            query: QUERY_TOPICS,
            data: { topics: [addTopic, ...topics] }
        });
    }
});

const handleChange = event => {
    if (event.target.value.length <= 280) {
        setText(event.target.value);
        setCharacterCount(event.target.value.length);
    }
};

const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
        // add topic to the database
        await addTopic({
            variables: { topicText }
        });

        // clear form value
        setText('');
    setCharacterCount(0);
    } catch (e) {
        console.error(e);
    }
};

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}
            >
                Character Count: 0/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
                >
                <textarea
                placeholder="Here's a new topic..."
                value={topicText}
                className="form-input col-12 col-md-9"
                onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default TopicForm;