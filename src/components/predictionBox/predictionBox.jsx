import React from 'react';
import './predictionBox.scss'
import { getTime } from "../../helpers/helpers";
import { Link } from "react-router-dom";

function PredictionBox({prediction}) {
    const oddsList = ['1', 'X', '2', '1X', '12', 'X2']
    const odds = oddsList.map(option => {
        return (
            <span className='prediction__odds-odd'>
                <span className="prediction__odds-option">
                    {option === '12' ? '1/2' : option}
                </span>
                <span className="prediction__odds-value">
                    {prediction.odds[option]}
                </span>
            </span>
        )
    })
    return (
        <Link to={`/prediction/${prediction.id}`} >
            <div className='prediction'>
                <div className="prediction__league">
                    <span className='prediction__league-federation'>{prediction.competition_cluster}</span>
                    <span className='prediction__league-name'> {prediction.competition_name}</span>
                </div>
                <div className="prediction__date">
                    {getTime(prediction.start_date)}
                </div>
                <div className="prediction__competitors">
                    <span className="prediction__competitors-home">{prediction.home_team}</span>
                    <span className='prediction__competitors-versus'>V</span>
                    <span className="prediction__competitors-away">{prediction.away_team}</span>
                </div>
                <div className="prediction__odds">
                    {odds}
                </div>
            </div>
        </Link>

    );
}

export default PredictionBox;
