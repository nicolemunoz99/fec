import React, {Component} from 'react';

export default class NewAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: '',
            nickname: '',
            email: '',
            photos: '',
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
                body: this.state.answer,
                name: this.state.nickname,
                email: this.state.email,
                photos: this.state.photos.split(',').map(str => str.trim())
            }
            this.props.togglePopup(e, data);
        } 
    }

    //TODO: Add additional validation for photos
    formIsValid() { 
        const { question, nickname, email, photos } = this.state;
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
                <div className="popup-body" data-selector="new-answer-modal">
                    <span onClick={this.props.togglePopup}>close (esc)</span>
                    <p className="text-main bold">Answer This Question</p>
                    <form onSubmit={this.handleSubmit}>
                        <p className="text-reg">Your Answer (required)</p>
                        <textarea 
                            name="answer" 
                            value={this.state.answer}
                            maxLength="1000" 
                            placeholder="Enter your Answer Here"
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
                        <p className="text-reg">Photos (Optional)</p>
                        <textarea 
                            value={this.state.photos}
                            name="photos"
                            maxLength="1000"
                            placeholder="Enter image URL's seperated by commas"
                            onChange={this.handleChange}>
                        </textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
