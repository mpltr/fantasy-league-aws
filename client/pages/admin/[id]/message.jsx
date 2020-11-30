import React from 'react';
import ReactDOM from 'react-dom';

const Messages = (props) => {

    const message = () => {
        return (
            <div>
                <input type="text" placeholder="Title"/>
                <input type="date" />
                <input type="date" />
                <textarea cols="30" rows="10"></textarea>
                <button>Submit</button>
            </div>
        )
    }

    return (
        <>
            {message()}
        </>
    )
}

Messages.getInitialProps = async (context) => {
    const uid = context.query.id

    return {
        messages: [],
        uid
    }
}

export default Messages;