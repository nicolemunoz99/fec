import React from 'react';
import QA from '../../src/components/QAComponents/QA';
import data from './SampleData';
import renderer from 'react-test-renderer';
import { render, fireEvent, wait, getByTestId } from '@testing-library/react';

const mockData = Promise.resolve(data.questions);

describe('QA Component', () => {
    beforeEach(() => {
        window.fetch = jest.fn(() => Promise.resolve({
            json: () => mockData
        }));
    })
    
    it('Renders the Q&A component correctly', done => {
        const QATest = renderer.create(<QA productId={5}></QA>);
        expect(QATest.toJSON()).toMatchSnapshot();
        done();
    });
    
    it('Fetches questions and renders them on the page', async done => {
        const QATest = render(<QA productId={5}/>);
        const { getAllByTestId, findByTestId } = QATest;
        await wait(() => {
            findByTestId('question');
        })
            .then(() => {
                const questions = getAllByTestId('question');
                expect(questions.length).toBe(4);
                expect(fetch).toHaveBeenCalledTimes(1);
                done();
            });
    });

    xit(('Fetches additional quetions via infinite scroll'), done => {
        window.loadMore = jest.fn(() => {});
        const QATest = render(<QA productId={5}/>);
        const { getAllByTestId, findByTestId, findAllByTestId } = QATest;
        const container = document.getElementsByClassName('questions-container')[0];
        container.scrollTop = 10000;
        // await wait(() => {
        //     findByTestId('question');
        // })
        //     .then(() => {
        //         expect(loadMore).toHaveBeenCalledTimes(1);
        //     });

        setTimeout(() => {
            expect(loadMore).toHaveBeenCalledTimes(1)
        }, 5000);
    })

    afterEach(() => {
        window.fetch = () => {};
    });

});


