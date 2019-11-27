import React, {Component} from 'react';
import Question from './Question.jsx';
const api = 'http://3.134.102.30/'

class QA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newQuestion: '',
            productID: 5, //placeholder for now, need to inherit this from props
            questions: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.searchQuestions = this.searchQuestions.bind(this);
    }

    componentDidMount() {
        fetch(`${api}qa/${this.state.productID}`)
            .then((res) => {
                res.json().then((data) => {
                    console.log(data);
                    this.setState({questions: data.results});
                })
            });
    }

    handleChange(e) {
        this.setState({newQuestion: e.target.value});
    }

    searchQuestions(e) {
        e.preventDefault();
        console.log(`Searching for ${this.state.newQuestion}`);
    }

    render() {
        return(
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
                {this.state.questions.map((question) => <Question question={question} key={question.question_id}/>)}
                <button>MORE ANSWERERD QUESTIONS</button>
                <button>ASK A QUESTION +</button>
            </div>
        )
    }
}

export default QA;