import React from 'react';
export default function Suggestion({ data }) {
    const dietLabels = {
        'BALANCED': 'Protein/Fat/Carb values in 15/35/50 ratio',
        'HIGH_FIBER': 'More than 5g fiber per serving',
        'HIGH_PROTEIN': 'More than 50% of total calories from proteins',
        'LOW_CARB': 'Less than 20% of total calories from carbs',
        'LOW_FAT': 'Less than 15% of total calories from fat',
        'LOW_SODIUM': 'Less than 140mg Na per serving'
    };
    if (!data) {
        return null;
    }
    return (
        <div className="my-8 text-base">
            {data.dietLabels.length !==0 && <p>Analysis of your dietary:</p>}
            <ul className="list-disc pt-4">
                {data.dietLabels.map((label, index) => (
                    <li key={index}>{dietLabels[label]}</li>
                    
                ))}
            </ul>
        </div>
    );
}