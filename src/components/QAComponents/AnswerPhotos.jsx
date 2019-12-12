import React, { useState } from 'react';
import $ from 'jquery';

const AnswerPhotos = ({ answer }) => {

    const [ expandedUrl, setExpandedUrl ] = useState('');
    const [ showExpanded, setShowExpanded ] = useState(false);

    const togglePic = (e) => {
        setExpandedUrl(e.target.src);
        setShowExpanded(true);
        keyPress();
    }
    
    const keyPress = () => {
       $(document).on('keydown', (e) => {
           if (e.key === 'Escape') {
               setShowExpanded(false);
               $(document).off('keydown');
           }
       })
    }

    return (
        <div className="answer-photos">
            {answer.photos.map((photo, i) => {
                return(<div className="answer-photo-div" key={i}>
                    <img 
                        src={photo.url || photo} 
                        className="answer-photo"
                        onClick={togglePic}
                        data-selector={`answer-${answer.answer_id}-photos`}>
                    </img>
                </div>)
            })}
            {showExpanded && 
                <div className="popup" data-selector={`answer-${answer.answer_id}-photo-popup`} onClick={(e) => {
                    if (e.target.className === 'popup') {
                        setShowExpanded(false);
                    }}}>
                    <div className="answer-photo-container">
                        <span className="close" onClick={()=>setShowExpanded(false)}>&times;</span>
                        <img src={expandedUrl}></img>
                    </div>
                </div>
            }
        </div>
    )
}

export default AnswerPhotos;

