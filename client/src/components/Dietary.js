import React from 'react';
import { useState } from 'react';
import Sidebar from './Sidebar.js';
import Header from './Header.js';
import DietaryDetails from './DietaryDetails.js';
import IngredientTable from './IngredientTable.js';
// import Advice from './Advice.js';

export default function Calorie() {
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(false);
    const [status, setStatus] = useState('typing');
    const [diataryResult, setDiataryResult] = useState(null);
    const [advice, setAdvice] = useState(null);
    const api = 'http://localhost:5000/api/dietary';

    async function handleSubmit(e) {
        e.preventDefault();
        let parsedAnswer = answer.split(/[,.\n]/).filter(item => item.trim() !== "");
        console.log(answer.split(/[,.\n]/).filter(item => item.trim() !== ""));
        setStatus('submitting');
        try {
            const response = await submitForm(parsedAnswer);
            setDiataryResult(response);
            const adviceResult = await fetchAdvice(response.dietLabels);
            setAdvice(adviceResult.map(item => item.value));
            setStatus('success');
            setError(false);
        } catch (err) {
            setStatus('typing');
            console.log(err.message);
            setError(true);
        }
    }

    function handleTextareaChange(e) {
        setAnswer(e.target.value);
    }

    async function submitForm(answer) {
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ title: 'default', ingr: answer })
        };
        try {
            const response = await fetch(api, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;

        } catch (error) {
            throw new Error('Network response was not ok');
        }
    };

    async function fetchAdvice(data) {
        const url = `http://localhost:5000/api/advice?labels=${data.join(',')}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Network response was not ok');
        }
    }


    return (
        <>
            <Header />
            <div className="grid lg:grid-cols-sidebar-content">
                <Sidebar />
                <main className="min-w-0 isolate">
                    <div className="pl-5 flex">
                        <div className="px-5 flex-1">
                            <h1 className="mdx-heading mt-0 text-primary -mx-.5 break-words text-5xl font-bold">
                                Nutrition Analysis
                            </h1>
                            <p className="mt-4 text-gray-3 text-xl">Enter an ingredient list</p>
                            <p className="mt-1 text-m">Example: 1 cup rice, 2 eggs</p><br />
                            <form className="DocSearch-Form" onSubmit={handleSubmit}>
                                <textarea style={{ width: '60%', height: '10rem' }} className="rounded-md border border-slate-300 py-2 pl-2 pr-2 shadow-sm focus:ring-sky-500 focus:ring-1" value={answer} onChange={handleTextareaChange} disabled={status === 'submitting'} />
                                <br /><br />
                                <button className="mt-1 active:scale-[.98] transition-transform inline-flex font-bold items-center outline-none focus:outline-none focus-visible:outline focus-visible:outline-link focus:outline-offset-2 bg-link text-white hover:bg-opacity-80 text-base rounded-full px-4 py-2" disabled={answer.length === 0 || status === 'submitting'}>Submit</button>
                                {error && <p className="text-red-50 pt-5">We cannot calculate the nutrition for some ingredients.
                                    Please check the ingredient spelling or if you have entered a quantities for the ingredients.</p>}
                            </form>
                            <IngredientTable data={diataryResult} />
                            <div className="my-8 text-base">
                                {advice && <p>Analysis of your dietary:</p>}
                                <ul className="list-disc pt-4">
                                    {advice && advice.map((item, index) => <li className='py-4' key={index}>{item}</li>)}

                                </ul>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="isolate">
                                <DietaryDetails data={diataryResult} />
                            </div>

                        </div>

                    </div>
                </main>
            </div>
        </>
    );
}