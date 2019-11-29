import React from 'react';

const Answer = ({ answer }) => {
    return (
        <div>
            <h2 key={answer.id}>A: {answer.body}</h2>
            <span>by {answer.answerer_name} {answer.date} | </span>
            <span>Helpful? <a>Yes</a> ({answer.helpfulness}) | </span>
            <span><a>Report</a></span>
        </div>
    )
}

export default Answer;