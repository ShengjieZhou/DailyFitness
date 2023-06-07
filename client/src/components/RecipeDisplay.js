import React, { useState } from 'react';

const RecipeDisplay = ({ recipes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, recipes.length - 1));
  };

  const currentRecipe = recipes[parseInt(currentIndex)];

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="p-6 xl:p-8 pb-4 xl:pb-6 bg-card dark:bg-card-dark rounded-2xl shadow-inner-border text-base text-secondary my-8">
          <h2 className="text-2xl font-bold mb-4">{currentRecipe.value.title}</h2>
          <ul>
            {currentRecipe.value.step.split('.').map((sentence, index) => (
              <li key={index}>{sentence.trim()}</li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{width:'50%',padding:'2rem','marginLeft':'25rem' }}>
        <div className="flex justify-between w-100 mt-4">
          <button
            className="active:scale-[.98] transition-transform inline-flex font-bold items-center outline-none focus:outline-none focus-visible:outline focus-visible:outline-link focus:outline-offset-2 bg-link text-white hover:bg-opacity-80 text-base rounded-full px-4 py-2"
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button
            className="active:scale-[.98] transition-transform inline-flex font-bold items-center outline-none focus:outline-none focus-visible:outline focus-visible:outline-link focus:outline-offset-2 bg-link text-white hover:bg-opacity-80 text-base rounded-full px-4 py-2"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default RecipeDisplay;
