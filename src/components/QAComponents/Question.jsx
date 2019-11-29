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
            return this.state.answers.slice(0,2).map(answer => <Answer answer={answer}/>);
        } else {
            return this.state.answers.map((answer) => <Answer answer={answer}/>);
        }
    }

    showMoreOrLess() {
        this.setState({ showAllAnswers: !this.state.showAllAnswers });
    }

    render() {
        const question = this.state.question;
        return (
            <div>
                <h2>Q: {question.question_body}</h2>
                <span>Helpful? <a>Yes</a> ({question.question_helpfulness}) | </span>
                <span><a>Add Answer</a></span>
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