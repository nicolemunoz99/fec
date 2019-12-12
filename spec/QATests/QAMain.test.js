import React from 'react';
import QA from '../../src/components/QAComponents/QA';
import data from './SampleData';
import renderer from 'react-test-renderer';
import { render, fireEvent, wait } from '@testing-library/react';

const mockData = Promise.resolve(data.questions);
window.fetch = jest.fn(() => Promise.resolve({
    json: () => mockData
}));

describe('QA Component', () => {
    it('Renders the Q&A component correctly', () => {
        const QATest = renderer.create(<QA productId={5}></QA>);
        expect(QATest.toJSON()).toMatchSnapshot();
    });

    it('Fetches questions and renders them on the page', async () => {
        const QATest = render(<QA productId={5}/>);
        const { getAllByTestId, findByTestId } = QATest;
        await wait(() => {
            findByTestId('question');
        })
        const questions = getAllByTestId('question');
        expect(questions.length).toBe(4);
    });
});


