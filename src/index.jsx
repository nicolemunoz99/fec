import React from 'react'
import ReactDOM from 'react-dom';

import Reviews from './ReviewsComponents/Reviews';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {/* <Overview /> */}
        <Reviews />
        {/* <QandA /> */}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('App'));