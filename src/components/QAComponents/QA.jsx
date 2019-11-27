import React, { Component } from 'react';
import Question from './Question.jsx';
const api = 'http://3.134.102.30/qa'

class QA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newQuestion: '',
            productID: 3, //placeholder for now, need to inherit this from props
            questions: [],
            currentPage: 0,
            moreToLoad: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.searchQuestions = this.searchQuestions.bind(this);
    }

    fetchQuestions() {
        const nextPage = this.state.currentPage + 1;
        fetch(`${api}/${this.state.productID}?count=4&page=${nextPage}`)
            .then((res) => {
                res.json().then((data) => {
                    this.setState({
                        questions: this.state.questions.concat(data.results),
                        currentPage: nextPage,
                        moreToLoad: data.results.length > 0
                    });
                })
            });
    }

    componentDidMount() {
        this.fetchQuestions();
    }

    handleChange(e) {
        this.setState({ newQuestion: e.target.value });
    }

    searchQuestions(e) {
        e.preventDefault();
        console.log(`Searching for ${this.state.newQuestion}`);
    }

    render() {
        return (
            <div>
                <h2>Questions and Answers</h2>
                <form className="searchQuestions" onSubmit={this.searchQuestions}>
                    <input type="text"
                        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS."
                        value={this.state.newQuestion}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Go!</button>
                </form>
                {this.state.questions.map((question) => <Question question={question} key={question.question_id} />)}
                {this.state.moreToLoad && <button onClick={this.fetchQuestions.bind(this)}>MORE ANSWERERD QUESTIONS</button>}
                <button>ASK A QUESTION +</button>
            </div>
        )
    }
}

export default QA;