import React, { Component } from 'react';

class Question extends Component {
    constructor(props) {
        super(props);
        const answers = Object.values(this.props.question.answers);
        this.state = {
            question: this.props.question,
            answers: answers,
            displayOne: true,
            multipleAnswers: answers.length > 1
        }
        this.showMoreOrLess = this.showMoreOrLess.bind(this);
    }

    renderAnswers() {
        if (this.state.displayOne === true) {
            return <h2>A: {this.state.answers[0].body}</h2>
        } else {
            return (
                this.state.answers.map((answer) => <h2 key={answer.id}>A: {answer.body}</h2>)
            )
        }
    }

    showMoreOrLess() {
        this.setState({ displayOne: !this.state.displayOne });
    }

    render() {
        const question = this.state.question;
        return (
            <div>
                <h2>Q: {question.question_body}</h2>
                {this.state.answers === null ? null :
                    <div>
                        {this.renderAnswers()}
                        {this.state.multipleAnswers === false ? null :
                            <button onClick={this.showMoreOrLess}>{
                                this.state.displayOne === true ? 'Show More' : 'Show Less'
                            }</button>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default Question;