import React, { Component } from 'react';
import Question from './Question.jsx';
import NewQuestion from './NewQuestion.jsx';
import axios from 'axios';
const api = 'http://3.134.102.30/qa';

class QA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            questions: [],
            activeQuestions: [],
            currentPage: 0,
            moreToLoad: true,
            showPopup: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.fetchQuestions = this.fetchQuestions.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    fetchQuestions(page, cb = () => { }) { 
        fetch(`${api}/${this.props.productId}?count=4&page=${page + 1}`)
            .then((res) => {
                res.json().then((data) => {
                    this.setState({
                        questions: this.state.questions.concat(data.results),
                        currentPage: page + 1,
                        moreToLoad: data.results.length > 0
                    }, () => {
                        cb()
                    });
                })
            });
    }

    componentDidMount() {
        this.fetchQuestions(this.state.currentPage, () => {
            this.setState({ activeQuestions: this.state.questions }); //initialize active questions to all questions
        });
    }

    
    handleChange(e) {
        this.setState({ searchTerm: e.target.value }, () => {
            if (this.state.searchTerm.length > 2) {
                this.applyFilter()
            } else if (this.state.searchTerm.length === 0) {
                this.setState({ activeQuestions: this.state.questions });
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
        this.setState({ activeQuestions: filteredQs });
    }
    
    refresh() {
        this.setState({
            questions: [],
            activeQuestions: []
        }, () => {
            const { currentPage } = this.state;
            let tempPage = 0;
            while (tempPage < currentPage) {
                this.fetchQuestions(tempPage, this.applyFilter); //using Promise.all here might be more performant...
                tempPage++;
            }
        });
    }
    
    sortByHelpfulness(questionArr) {
        return questionArr.sort((a,b) => b.question_helpfulness - a.question_helpfulness);
    }
    
    //TODO: change this so that new questions get pushed to the top of the active questions 
    togglePopup(e, data) {
        this.setState({showPopup: !this.state.showPopup});
        if(data) {
            axios.post(`${api}/${this.props.productId}`, data)
            .then((res) => {
                this.refresh();
                alert('Thanks for your question!');
            })
        }
    }
    
    // TODO: need to re-fetch questions when props.productId changes
    // getSnapshotBeforeUpdate() {
    //     if(window.scrollY) {
    //         return window.scrollY;
    //     } else {
    //         return null;
    //     }
    // }
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(snapshot !== null) {
    //         console.log(`scrolling to ${snapshot}`);
    //         window.scrollTo(0, snapshot);
    //     }
    // }
    
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
                {this.sortByHelpfulness(this.state.activeQuestions).map((question) => <Question
                    question={question}
                    key={question.question_id}
                    updateParent={this.refresh.bind(this)} />)}
                {this.state.moreToLoad && <button onClick={() => this.fetchQuestions(this.state.currentPage, this.applyFilter)}>MORE ANSWERERD QUESTIONS</button>}
                <button onClick={this.togglePopup}>ASK A QUESTION +</button>
                {this.state.showPopup && <NewQuestion togglePopup={this.togglePopup}/>}
            </div>
        )
    }
}

export default QA;