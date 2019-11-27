import React, { Component } from 'react';
import Question from './Question.jsx';
const api = 'http://3.134.102.30/qa'

class QA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            productId: this.props.productId,
            questions: [],
            activeQuestions: [],
            currentPage: 0,
            moreToLoad: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.fetchQuestions = this.fetchQuestions.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
    }

    fetchQuestions(cb = ()=>{}) {
        const nextPage = this.state.currentPage + 1;
        fetch(`${api}/${this.state.productId}?count=4&page=${nextPage}`)
            .then((res) => {
                res.json().then((data) => {
                    this.setState({
                        questions: this.state.questions.concat(data.results),
                        currentPage: nextPage,
                        moreToLoad: data.results.length > 0
                    }, () => {
                        cb()
                    });
                })
            });
    }

    componentDidMount() {
        this.fetchQuestions(() => {
            this.setState({activeQuestions: this.state.questions}); //initialize active questions to all questions
        });
    }

    handleChange(e) {
        this.setState({ searchTerm: e.target.value }, () => {
            if (this.state.searchTerm.length > 3) {
                this.applyFilter()
            } else if (this.state.searchTerm.length === 0) {
                this.setState({activeQuestions: this.state.questions});
            }
        });
    }

    applyFilter() {
        const searchTerm = this.state.searchTerm.length > 3 ? this.state.searchTerm : '';
        const filteredQs = [...this.state.questions].filter(question => question.question_body.includes(searchTerm));
        this.setState({activeQuestions: filteredQs});
    }

    render() {
        return (
            <div>
                <h2>Questions and Answers</h2>
                <form className="searchQuestions">
                    <input type="text"
                        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS."
                        value={this.state.searchTerm}
                        onChange={this.handleChange}
                    />
                </form>
                {this.state.activeQuestions.map((question) => <Question question={question} key={question.question_id} />)}
                {this.state.moreToLoad && <button onClick={() => this.fetchQuestions(this.applyFilter)}>MORE ANSWERERD QUESTIONS</button>}
                <button>ASK A QUESTION +</button>
            </div>
        )
    }
}

export default QA;