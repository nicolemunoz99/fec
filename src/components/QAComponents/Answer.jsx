import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
const api = 'http://3.134.102.30/qa';

//TODO this is rendering dates a day early for some reason 
const Answer = ({ answer, refreshAnswers }) => {
    const [isReported, setIsReported] = useState(false);

    const isHelpful = (cb) => {
        const id = answer.id || answer.answer_id; //this property name depends on whether fetching from answers endpoint directly vs pulling from the question obj. 
        axios.put(`${api}/answer/${id}/helpful`)
            .then(() => cb());
    }

    const reportAnswer = () => {
        const { id } = answer;
        axios.put(`${api}/answer/${id}/report`)
            .then(()=> setIsReported(true));
    }

    return (
        <div className="answer">
            <p><span className="answer-head">A:</span> {answer.body}</p>
            <div className="q-subtext">
                <span>by {answer.answerer_name} on {moment(answer.date).utc().format('MMMM Do YYYY')}</span>
                <span className="divider-bar">|</span>
                <span>Helpful? <span className="clickable" onClick={() => isHelpful(refreshAnswers)}>Yes</span> ({answer.helpfulness})</span>
                <span className="divider-bar">|</span>
                {isReported === false ?
                    <span className="clickable" onClick={reportAnswer}>Report</span>
                : <span>Thank you for your concern. Our team will review this question.</span>
            }
            </div>
        </div>
    )
}

export default Answer;