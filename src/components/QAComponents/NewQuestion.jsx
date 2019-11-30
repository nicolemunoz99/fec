import React, {Component} from 'react';

class NewQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            nickname: '',
            email: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formIsValid = this.formIsValid.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.formIsValid()) {
            const data = {
                body: this.state.question,
                name: this.state.nickname,
                email: this.state.email
            }
            this.props.togglePopup(e, data);
        } else {
            alert('Invalid Entry');
        }
    }

    formIsValid() { //need additional form validation for emails
        const {question, nickname, email} = this.state;
        if (question !== '' && nickname !== '' && email !=='' && email.split('@').length === 2) {
            return true;
        } else return false;
    }

    render() {
        return(
            <div className="popup">
                <div className="new-question">
                    <span onClick={this.props.togglePopup}>close</span>
                    <h3>Ask A Question:</h3>
                    <form onSubmit={this.handleSubmit}>
                        <p>Your Question (required)</p>
                        <textarea 
                            name="question" 
                            value={this.state.question}
                            maxLength="1000" 
                            placeholder="What's on your mind?"
                            onChange={this.handleChange}>
                        </textarea>
                        <p>Your Nickname (required)</p>
                        <input 
                            type="text" 
                            value={this.state.nickname}
                            name="nickname" 
                            maxLength="60" 
                            placeholder="Example: Bob"
                            onChange={this.handleChange}
                        />
                        <p>Your Email (required)</p>
                        <input 
                            type="text"
                            value={this.state.email}
                            name="email"
                            maxLength="60"
                            placeholder="Example: Bob@website.com"
                            onChange={this.handleChange}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default NewQuestion;