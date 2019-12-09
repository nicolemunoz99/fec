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
        } 
    }

    //Future Enhancement: dynamically render warning messages on the form instead of using alerts
    formIsValid() { 
        const { question, nickname, email } = this.state;
        if (question === '') {
            alert('Please enter a question');
            return false;
        } else if (nickname === '') {
            alert('Please enter a nickname');
            return false;
        } else if (/\S+@\S+\.\S+/.test(email) === false) {
            alert('Please enter a valid email address');
            return false;
        } else return true;
    }

    render() {
        return(
            <div className="popup">
                <div className="popup-body">
                    <span onClick={this.props.togglePopup}>close (esc)</span>
                    <p className="text-main bold">Ask A Question:</p>
                    <form onSubmit={this.handleSubmit}>
                        <p className="text-reg">Your Question (required)</p>
                        <textarea 
                            name="question" 
                            value={this.state.question}
                            maxLength="1000" 
                            placeholder="What's on your mind?"
                            onChange={this.handleChange}>
                        </textarea>
                        <p className="text-reg">Your Nickname (required)</p>
                        <input 
                            type="text" 
                            value={this.state.nickname}
                            name="nickname" 
                            maxLength="60" 
                            placeholder="Example: Bob"
                            onChange={this.handleChange}
                        />
                        <p className="text-reg">Your Email (required)</p>
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