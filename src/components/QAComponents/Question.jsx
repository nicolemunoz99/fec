import React, { Component } from 'react';
import Answer from './Answer.jsx';

class Question extends Component {
    constructor(props) {
        super(props);
        const answers = Object.values(this.props.question.answers);
        this.state = {
            question: this.props.question,
            answers: answers,
            showAllAnswers: false,
        }
        this.showMoreOrLess = this.showMoreOrLess.bind(this);
    }


    renderAnswers() {
        if (this.state.showAllAnswers === false) {
            return this.state.answers.slice(0,2).map(answer => <Answer key={answer.id} answer={answer}/>);
        } else {
            return this.state.answers.map((answer) => <Answer key={answer.id} answer={answer}/>);
        }
    }

    showMoreOrLess() {
        this.setState({ showAllAnswers: !this.state.showAllAnswers });
    }

    render() {
        const question = this.state.question;
        return (
            <div className="question">
                <div className="q-main">
                    <h4>Q: {question.question_body}</h4>
                    <div className="q-subtext">
                        <span>Helpful? <span className="clickable">Yes</span> ({question.question_helpfulness})</span>
                        <span className="divider-bar">|</span>
                        <span className="clickable">Add Answer</span>
                    </div>
                </div>
                {this.state.answers.length > 0 &&
                    <div>
                        {this.renderAnswers()}
                        {this.state.answers.length <= 2 ? null :
                            <button onClick={this.showMoreOrLess}>
                                {!this.state.showAllAnswers && 'Show More'}
                                {this.state.showAllAnswers && 'Show Less'}
                            </button>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default Question;