import React from 'react';
import '../stylesheets/nutrition.css';

export default function ReceiptResult({ data }) {


    if (!data) {
        return null;
    }

    return (
        <div className="col-sm-5 col-demo-facts-auto min-w-0 isolate">
            <div className="col-12">
                <section className="performance-facts" >
                    <div className="performance-facts__header">
                        <h1 className="performance-facts__title">Nutrition Facts</h1>
                        <p>
                            <span id="lnumser">0</span> servings per container
                        </p>
                    </div>
                    <table className="performance-facts__table">
                        <thead>
                            <tr>
                                <th colSpan="3" className="amps">
                                    Amount Per Serving
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th colSpan="2" id="lkcal-val-cal">
                                    <b>Calories</b>
                                </th>
                                <td className="nob">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.totalNutrientsKCal.ENERC_KCAL.quantity}</td>
                            </tr>
                            <tr className="thick-row">
                                <td colSpan="3" className="small-info">
                                    <b>% Daily Value*</b>
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="2">
                                    <b>Total Fat</b> {data.totalNutrientsKCal.FAT_KCAL.quantity} kcal
                                </th>
                                <td>
                                    <b>{data.totalDaily.FAT.quantity.toFixed(2)} %</b>
                                </td>
                            </tr>
                            <tr>
                                <td className="blank-cell"></td>
                                <th>Saturated Fat {data.totalNutrients.FASAT.quantity.toFixed(2)} g</th>
                                <td>
                                    <b>{data.totalDaily.FASAT.quantity.toFixed(2)} %</b>
                                </td>
                            </tr>
                            <tr>
                                <td className="blank-cell"></td>
                                <th>Trans Fat 0 g</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th colSpan="2">
                                    <b>Energy</b> {data.totalNutrients.ENERC_KCAL.quantity} kcal
                                </th>
                                <td>
                                    <b>{data.totalDaily.ENERC_KCAL.quantity.toFixed(2)} %</b>
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="2">
                                    <b>Carbohydrate</b> {data.totalNutrientsKCal.CHOCDF_KCAL.quantity} kcal
                                </th>
                                <td>
                                    <b>{data.totalDaily.CHOCDF.quantity.toFixed(2)} %</b>
                                </td>
                            </tr>
                            <tr className="thick-end">
                                <th colSpan="2">
                                    <b>Protein</b> {data.totalNutrientsKCal.PROCNT_KCAL.quantity} kcal
                                </th>
                                <td>
                                    <b>{data.totalDaily.PROCNT.quantity.toFixed(2)} %</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="small-info" id="small-nutrition-info">
                        *Percent Daily Values are based on a 2000 calorie diet
                    </p>
                </section>
            </div>
        </div>
    );

}

