import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './../../src/components/overview/Overview.jsx';
import renderer from 'react-test-renderer';
test('silly test', () => {
    expect(true).toBeTruthy();
});

it ('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Overview />, div);
  ReactDOM.unmountComponentAtNode(div);
}) 