import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import Sidebar from './Sidebar.js';
import Header from './Header.js';
import RecipeDisplay from './RecipeDisplay.js';
import '../stylesheets/modal.css'

const api = 'http://localhost:5000/api/';

Modal.setAppElement('#root');

export default function Recipe() {

  const [selectedOption, setSelectedOption] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [recipe, setRecipe] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ title: '', description: '', type: '' });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setIsButtonDisabled(event.target.value === '');
  };

  const selectedNew = (event) => {
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      // eslint-disable-next-line
      ['type']: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption !== '') {
      axios.get(api + `recipe?type=${selectedOption}`)
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }
          return response.data;
        })
        .then(data => {
          setRecipe(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleAdd = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => {
    let value = event.target.value.replace(/\n/g, ".");
    value = value.replace(/\.{2,}/g, ".");
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      [event.target.name]: value
    }));
  };

  const submitNewRecipe = (event) => {
    event.preventDefault();
    axios.post(api + 'newRecipe', newRecipe)
      .then(response => {
        setTimeout(() => {
          alert('New recipe added successfully!');
          setNewRecipe({ title: '', description: '', type: '' });
          closeModal();
        }, 100); 
        console.log('New recipe added successfully!');
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal"
      >
        <div style={{ width: '80%', height: '80%', 'marginLeft': '6rem', 'marginTop': '5rem' }}>
          <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>
          <form onSubmit={handleSubmit} className="flex flex-col mt-4 ml-4">
            <div className="flex flex-col mb-4">
              <label className="font-bold">Type of the receipt:</label>
              <select
                className="border border-gray-300 rounded-md py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newRecipe.type}
                onChange={selectedNew}
              >
                <option value="">Select an ingredient</option>
                <option value="chicken">Chicken</option>
                <option value="beef">Beef</option>
                <option value="pork">Pork</option>
                <option value="fish">Fish</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
            <div className="flex flex-col mb-4">
              <label className="font-bold">Title of the receipt:</label>
              <input
                type="text"
                name="title"
                value={newRecipe.title}
                onChange={handleInputChange}
                className="block w-full border border-slate-300 rounded-md py-2 pl-2 pr-2 shadow-sm focus:ring-sky-500 focus:ring-1 sm:text-sm"
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="font-bold">Description of the receipt:</label>
              <textarea
                type="text"
                name="description"
                style={{ height: '10rem' }}
                value={newRecipe.description}
                onChange={handleInputChange}
                className="rounded-md border border-slate-300 py-2 pl-2 pr-2 shadow-sm focus:ring-sky-500 focus:ring-1"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button className="mt-1 active:scale-[.98] transition-transform inline-flex font-bold items-center outline-none focus:outline-none focus-visible:outline focus-visible:outline-link focus:outline-offset-2 bg-link text-white hover:bg-opacity-80 text-base rounded-full px-4 py-2" type="submit" onClick={submitNewRecipe}>Submit</button>
              <button className="mt-1 active:scale-[.98] transition-transform inline-flex font-bold items-center outline-none focus:outline-none focus-visible:outline focus-visible:outline-link focus:outline-offset-2 bg-link text-white hover:bg-opacity-80 text-base rounded-full px-4 py-2" onClick={closeModal}>Cancel</button>
            </div>
          </form>
        </div>
      </Modal>

      <Header />
      <div className="grid lg:grid-cols-sidebar-content">
        <Sidebar />
        <main>
          <div className="ml-4">
            <form className="flex items-center justify-center mt-4 ml-4">
              <p className="text-m">What would you like to eat today?&nbsp;&nbsp;&nbsp;&nbsp;</p>
              <select className="border border-gray-300 rounded-md py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={selectedOption} onChange={handleOptionChange}>
                <option value="">Select an ingredient</option>
                <option value="chicken">Chicken</option>
                <option value="beef">Beef</option>
                <option value="pork">Pork</option>
                <option value="fish">Fish</option>
                <option value="vegan">Vegan</option>
              </select>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
              <button type="button" className="mt-1 active:scale-[.98] transition-transform inline-flex font-bold items-center outline-none focus:outline-none focus-visible:outline focus-visible:outline-link focus:outline-offset-2 bg-link text-white hover:bg-opacity-80 text-base rounded-full px-4 py-2" disabled={isButtonDisabled} onClick={handleSubmit}>
                Search
              </button>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
              <button type="button" className="mt-1 active:scale-[.98] transition-transform inline-flex font-bold items-center outline-none focus:outline-none focus-visible:outline focus-visible:outline-link focus:outline-offset-2 bg-link text-white hover:bg-opacity-80 text-base rounded-full px-4 py-2" onClick={handleAdd}>
                Add New Recipe
              </button>
            </form>
            <div className="mt-4 ml-4">
              <div>
                {recipe && recipe.length > 0 ? (
                  <RecipeDisplay recipes={recipe} />
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );

}