import React, {Component} from 'react';

class QA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.searchQuestions = this.searchQuestions.bind(this);
    }

    handleChange(e) {
        this.setState({question: e.target.value});
    }

    searchQuestions(e) {
        e.preventDefault();
        console.log(`Searching for ${this.state.question}`);
    }

    render() {
        return(
            <div>
                <h2>Questions and Answers</h2>
                <form className="searchQuestions" onSubmit={this.searchQuestions}>
                    <input type="text"
                     placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS."
                     value={this.state.question}
                     onChange={this.handleChange}
                     />
                    <button type="submit">Go!</button>
                </form>
                {/* Question List */}
                <button>MORE ANSWERERD QUESTIONS</button>
                <button>ASK A QUESTION +</button>
            </div>
        )
    }
}

export default QA;