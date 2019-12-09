import React, { useState } from 'react';
import AnswerPhotos from './AnswerPhotos.jsx';
import moment from 'moment';
import axios from 'axios';
const api = 'http://3.134.102.30/qa';

const Answer = ({ answer }) => {
    
    const [isReported, setIsReported] = useState(false);
    const [ helpfulness, setHelpfulness ] = useState(answer.helpfulness);
    const [ helpfulnessSubmitted, setHelpfulnessSubmitted ] = useState(false);

    let isHelpful = (e) => {
        if(helpfulnessSubmitted === false) {
            const id = answer.answer_id;  
            axios.put(`${api}/answer/${id}/helpful`)
                .then(() => {
                    setHelpfulness(helpfulness + 1);
                    setHelpfulnessSubmitted(true);
                })
                e.target.classList.remove('clickable');
        }
    }

    const reportAnswer = () => {
        const id = answer.answer_id;
        axios.put(`${api}/answer/${id}/report`)
            .then(()=> setIsReported(true));
    }

    return (
        <div className="answer">
            <p><span className="qa-bold">A: </span>
                {answer.body}
                <span className="highlight">{answer.body_match}</span>
                {answer.body_tail}
            </p>
            {answer.photos.length > 0 && <AnswerPhotos answer={answer}/>}
            <div className="q-subtext">
                <span>by {answer.answerer_name} on {moment(answer.date).utc().format('MMMM Do YYYY')}</span>
                <span className="divider-bar">|</span>
                <span>Helpful? <span className="clickable" onClick={isHelpful}>Yes</span> ({helpfulness})</span>
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