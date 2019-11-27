import React, { Component } from 'react';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question,
            answerIds: Object.keys(this.props.question.answers)
        }
    }

    render() {
        const question = this.state.question;
        return (
            <div>
                <h2>Q: {question.question_body}</h2>
                {this.state.answersIds === [] ? null :
                    <h2>A: {question.answers[this.state.answerIds[0]].body}</h2> //just rendering the first answer for now
                }
            </div>
        )
    }
}

export default Question;