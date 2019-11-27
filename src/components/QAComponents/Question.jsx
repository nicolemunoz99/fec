import React, { Component } from 'react';

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
            return (
                this.state.answers.slice(0,2).map(answer => <h2 key={answer.id}>A: {answer.body}</h2>)
            )
        } else {
            return (
                this.state.answers.map((answer) => <h2 key={answer.id}>A: {answer.body}</h2>)
            )
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