import React from 'react';
import { useState } from 'react';
import Sidebar from './Sidebar.js';
import Header from './Header.js';
import ReceiptResult from './ReceiptResult.js';

export default function Calorie() {
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('typing');
    const [nutritionResult, setNutritionResult] = useState(null);
    const api = 'https://api.edamam.com/api/nutrition-data?app_id=95bf28c8&app_key=482c50d1f122c28f4104f427ce5bfba7&nutrition-type=cooking&ingr=';

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('submitting');
        try {
            await submitForm(answer);
            setStatus('success');
        } catch (err) {
            setStatus('typing');
            setError(err);
        }
    }

    function handleTextareaChange(e) {
        setAnswer(e.target.value);
    }

    function submitForm(answer) {
        new Promise((resolve, reject) => {
            fetch(api + answer)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setNutritionResult(data);
                    resolve(data);
                })
                .catch(error => {
                    alert('There has been a problem with your operation: ' + error.message);
                    reject(error);
                });
        });
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
                                {error !== null && <p className="Error">{error.message}</p>}
                            </form>
                        </div>
                        <div className="flex-1"> 
                            <div className="isolate"> 
                                <ReceiptResult data={nutritionResult} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}