import React from 'react';
import moment from 'moment';
import axios from 'axios';
const api = 'http://3.134.102.30/qa';

const Answer = ({ answer, updateParent }) => {
    const isHelpful = (cb) => {
        const { id } = answer;
        axios.put(`${api}/answer/${id}/helpful`)
            .then(() => cb());
    }

    return (
        <div className="answer">
            <p><span className="answer-head">A:</span> {answer.body}</p>
            <div className="q-subtext">
                <span>by {answer.answerer_name} on {moment(answer.date).format('MMMM Do YYYY')}</span>
                <span className="divider-bar">|</span>
                <span>Helpful? <span className="clickable" onClick={() => isHelpful(updateParent)}>Yes</span> ({answer.helpfulness})</span>
                <span className="divider-bar">|</span>
                <span className="clickable">Report</span>
            </div>
        </div>
    )
}

export default Answer;