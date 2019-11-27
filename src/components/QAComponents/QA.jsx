import React, { Component } from 'react';
import Question from './Question.jsx';
const api = 'http://3.134.102.30/qa'

class QA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            productId: this.props.productId, //placeholder for now, need to inherit this from props
            questions: [],
            currentPage: 0,
            moreToLoad: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.searchQuestions = this.searchQuestions.bind(this);
    }

    fetchQuestions() {
        const nextPage = this.state.currentPage + 1;
        fetch(`${api}/${this.state.productId}?count=4&page=${nextPage}`)
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
        this.setState({ searchTerm: e.target.value });
    }

    searchQuestions(e) {
        e.preventDefault();
        const {searchTerm} = this.state;
        console.log(`Searching for ${searchTerm}`);
        // this.state.questions.forEach(question => {

        // });
    }

    render() {
        return (
            <div>
                <h2>Questions and Answers</h2>
                <form className="searchQuestions" onSubmit={this.searchQuestions}>
                    <input type="text"
                        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS."
                        value={this.state.searchTerm}
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