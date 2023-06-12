import React from 'react';
export default function IngredientTable({ data }) {
    if (!data) {
        return null;
    }
    return (
        <table className="w-full text-base text-left text-gray-500 dark:text-gray-400 pt-8">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Unit
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Food
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Calories
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Weight
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {data.ingredients.map((ingredient, index) => (
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={index}>
                        <td className="px-6 py-4">
                            {ingredient.parsed[0].quantity}
                        </td>
                        <td className="px-6 py-4">
                            {ingredient.parsed[0].measure}
                        </td>
                        <td className="px-6 py-4">
                            {ingredient.parsed[0].food}
                        </td>
                        <td className="px-6 py-4">
                            {ingredient.parsed[0].nutrients.ENERC_KCAL.quantity} kcal
                        </td>
                        <td className="px-6 py-4">
                            {ingredient.parsed[0].retainedWeight} g
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>




    );
}