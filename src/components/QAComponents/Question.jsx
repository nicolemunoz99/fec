import React, { Component } from 'react';
import Answer from './Answer.jsx';
import axios from 'axios';
import NewAnswer from './NewAnswer.jsx';
const api = 'http://3.134.102.30/qa';

class Question extends Component {
    constructor(props) {
        super(props);
        const answers = Object.values(this.props.question.answers);
        this.state = {
            question: this.props.question,
            answers: answers,
            showAllAnswers: false,
            showPopup: false
        }
        this.showMoreOrLess = this.showMoreOrLess.bind(this);
        this.isHelpful = this.isHelpful.bind(this);
        this.refreshAnswers = this.refreshAnswers.bind(this);
    }


    renderAnswers() {
        let activeAnswers;
        if (this.state.showAllAnswers === false) {
            activeAnswers = this.sortAnswers(this.state.answers).slice(0, 2);
        } else {
            activeAnswers = this.sortAnswers(this.state.answers);
        }
        return activeAnswers.map(answer => {
            return (
                <Answer
                    key={answer.id || answer.answer_id} //jank af but it works lmao
                    answer={answer}
                    refreshAnswers={this.refreshAnswers} />
            )
        });
    }

    showMoreOrLess() {
        this.setState({ showAllAnswers: !this.state.showAllAnswers });
    }

    isHelpful() {  //Mostly working but there is a weird bug like 10% of the time where the put req doesn't send 
        const { question_id } = this.state.question;
        axios.put(`${api}/question/${question_id}/helpful`)
            .then(() => {
                this.props.updateParent(); //tell parent to re-fetch questions
            });
    }

    sortAnswers(answers) { //There is probably a better way to do this...
        const sellerQs = answers.filter(answer => answer.answerer_name === 'Seller')
            .sort((a, b) => b.helpfulness - a.helpfulness);
        const nonSellerQs = answers.filter(answer => answer.answerer_name !== 'Seller')
            .sort((a, b) => b.helpfulness - a.helpfulness);
        return sellerQs.concat(nonSellerQs);
    }

    togglePopup(e, data) {
        this.setState({ showPopup: !this.state.showPopup });
        if (data) {
            const { question_id } = this.state.question;
            axios.post(`${api}/${question_id}/answers`, data)
                .then((res) => {
                    this.refreshAnswers(this.state.answers.length + 1);
                    alert('Thanks for your answer!');
                })
        }
    }

    refreshAnswers(answerCount = this.state.answers.length) {
        const { question_id } = this.state.question;
        const pages = Math.ceil(answerCount / 5);
        let currentPage = 0;
        let promises = [];
        while (currentPage < pages) {
            currentPage++;
            promises.push(fetch(`${api}/${question_id}/answers?page=${currentPage}`)
                .then(res => res.json())
            );
        }
        Promise.all(promises)
            .then((newAnswers) => {
                this.setState({ answers: newAnswers.reduce((acc, val) => acc.concat(val.results), []) });
            });
    }

    render() {
        const question = this.state.question;
        return (
            <div className="question">
                <div className="q-main">
                    <h4>Q: {question.question_body}</h4>
                    <div className="q-subtext">
                        <span>Helpful? <span className="clickable" onClick={this.isHelpful}>Yes</span> ({question.question_helpfulness})</span>
                        <span className="divider-bar">|</span>
                        <span className="clickable" onClick={this.togglePopup.bind(this)}>Add Answer</span>
                    </div>
                </div>
                {this.state.showPopup && <NewAnswer togglePopup={this.togglePopup.bind(this)} />}
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