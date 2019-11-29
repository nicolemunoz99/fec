import React, { Component } from 'react';
import Question from './Question.jsx';
const api = 'http://3.134.102.30/qa'

class QA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            questions: [],
            activeQuestions: [],
            currentPage: 0,
            moreToLoad: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.fetchQuestions = this.fetchQuestions.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
    }

    fetchQuestions(cb = ()=>{}) { //TODO: should pass in page as parameter so it can be reset to 0 when props.productId chagnes
        const nextPage = this.state.currentPage + 1;
        fetch(`${api}/${this.props.productId}?count=4&page=${nextPage}`)
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

    //TODO: need to re-fetch questions when props.productId changes
    // componentDidUpdate(newProps) {

    // }

    handleChange(e) {
        this.setState({ searchTerm: e.target.value }, () => {
            if (this.state.searchTerm.length > 2) {
                this.applyFilter()
            } else if (this.state.searchTerm.length === 0) {
                this.setState({activeQuestions: this.state.questions});
            }
        });
    }

    applyFilter() {
        const searchTerm = this.state.searchTerm.length > 2 ? this.state.searchTerm : '';
        const filteredQs = [...this.state.questions].filter(question => {
            if (question.question_body.includes(searchTerm)) {
                return true;
            } else {
                return Object.values(question.answers).some(answer => answer.body.includes(searchTerm));
            }
        });
        this.setState({activeQuestions: filteredQs});
    }

    render() {
        return (
            <div>
                <h3>Questions and Answers</h3>
                <form className="searchQuestions">
                    <input type="text"
                        className="q-search"
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