import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/overview/Overview.jsx';
import QA from './components/QAComponents/QA.jsx';
import Reviews from './components/ReviewsComponents/Reviews.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Overview />
        <QA />
        <Reviews />
      </div>
    )
  }
}

ReactDOM.render( <App />, document.getElementById('App'));