import React from 'react';
import ReactDOM from 'react-dom';
import QA from './components/QA.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {/* <Overview /> */}
        {/* <Reviews /> */}
        <QA />
      </div>
    )
  }
}

ReactDOM.render( <App />, document.getElementById('App'));