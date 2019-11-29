import React from 'react';
import moment from 'moment';

const Answer = ({ answer }) => {
    return (
        <div className="answer">
            <p><span className="answer-head">A:</span> {answer.body}</p>
            <div className="q-subtext">
                <span>by {answer.answerer_name} on {moment(answer.date).format('MMMM Do YYYY')}</span>
                <span className="divider-bar">|</span>
                <span>Helpful? <span className="clickable">Yes</span> ({answer.helpfulness})</span>
                <span className="divider-bar">|</span>
                <span className="clickable">Report</span>
            </div>
        </div>
    )
}

export default Answer;