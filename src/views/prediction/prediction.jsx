import React, {Component} from 'react';
import {withRouter} from "react-router";
import Header from "../../components/header/header";
import {getTime} from "../../helpers/helpers";
import './prediction.scss'
import axios from "../../helpers/axiosInstance";

class Prediction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prediction: {},
            homeLastResults: [],
            awayLastResults: [],
        }
    }


    async componentDidMount() {
        const id = this.props.match.params.id
        await this.fetchPrediction(id)
    }

    async fetchHomeLastGames(id) {
        const response = await axios.get(`home-last-10/${id}`)
        const lastGames = response.data.data.encounters.map(el => (
            {
                result: el.result
            }
        ))
        await this.setState({
            homeLastResults: lastGames
        })
    }
    async fetchAwayLastGames(id) {
        const response = await axios.get(`away-last-10/${id}`)
        const lastGames = response.data.data.encounters.map(el => (
            {
                result: el.result
            }
        ))
        await this.setState({
            awayLastResults: lastGames
        })
    }

    async fetchPrediction(id) {
        const response = await axios.get(`predictions/${id}`)
        await this.setState({
            prediction: response.data.data[0]
        })

        await this.fetchHomeLastGames(response.data.data[0].id)
        await this.fetchAwayLastGames(response.data.data[0].id)
    }

    getClassNameForMatch(result) {
        switch (result) {
            case 'W':
                return 'prediction-page__competitors-game--win'
            case 'L':
                return 'prediction-page__competitors-game--lost'
            case 'D':
                return 'prediction-page__competitors-game--draw'
        }
    }

    getStatusClass(status) {
        console.log(status)
        switch (status) {
            case 'lost':
                return 'prediction-page__prediction-status--lost'
            case 'win':
                return 'prediction-page__prediction-status--won'
            default :
                return ''
        }
    }

    render() {
        const renderPage = () => {
            const homeLastGames = this.state.homeLastResults.map(el => {
                return (
                    <span
                        className={`prediction-page__competitors-game ${this.getClassNameForMatch(el.result)}`}> {el.result}</span>
                )
            })
            const awayLastGames = this.state.awayLastResults.map(el => {
                return (
                    <span
                        className={`prediction-page__competitors-game ${this.getClassNameForMatch(el.result)}`}> {el.result}</span>
                )
            })
            const markets = () => {
                if(!this.state.prediction.prediction_per_market) return
                const m = []
                for (let [k, v] of Object.entries(this.state.prediction.prediction_per_market.classic.odds)) {
                    m.push({
                        name: k,
                        value: v,
                        probability: this.state.prediction.prediction_per_market.classic.probabilities[k] ? `${this.state.prediction.prediction_per_market.classic.probabilities[k] * 100}%` : ''
                    })
                }
                return m.map(el => {
                    return (
                        <div className="prediction-page__market">
                            <div className="prediction-page__market__name">{el.name}</div>
                            <div className="prediction-page__market__value">
                                <span>{el.value}</span>
                                <span>{el.probability}</span>
                            </div>
                        </div>
                    )
                })
            }
            return (
                <div className='prediction-page'>
                    <Header withoutSearch={true}/>
                    <div className="prediction-page__league">
                    <span className="prediction-page__league-federation">
                        {this.state.prediction.competition_cluster}
                    </span>
                        <span className="prediction-page__league-name">
                        {this.state.prediction.competition_name}
                    </span>
                    </div>
                    <div className="prediction-page__date">
                        {getTime(this.state.prediction.start_date)}
                    </div>
                    <div className="prediction-page__competitors">
                        <div className="prediction-page__competitors-home">
                            <span className='title'> {this.state.prediction.home_team}</span>
                            <div className="prediction-page__competitors-games">
                                {homeLastGames}
                            </div>
                        </div>
                        <div className="prediction-page__competitors-versus">
                            {this.state.prediction.result ? this.state.prediction.result : 'V'}
                        </div>
                        <div className="prediction-page__competitors-away">
                            <span className='title'> {this.state.prediction.away_team}</span>
                            <div className="prediction-page__competitors-games prediction-page__competitors-games--rigth">
                                {awayLastGames}
                            </div>
                        </div>
                    </div>
                    <div className="prediction-page__strengths">
                    </div>
                    <div className="prediction-page__markets">
                        {markets()}
                    </div>
                    <div className="prediction-page__prediction">
                        <p className='prediction-page__prediction-title'>Prediction</p>
                        <p className="prediction-page__prediction-value">{this.state.prediction.prediction_per_market.classic.prediction}</p>
                        <p
                            className={`prediction-page__prediction-status
                         ${this.getStatusClass(this.state.prediction.prediction_per_market.classic.status)}`}>
                            {this.state.prediction.prediction_per_market.classic.status}
                        </p>
                    </div>
                </div>
            )
        }
        return (
            <div>
                {this.state.prediction.prediction_per_market ? renderPage() : 'NO DATA' }
            </div>
        );
    }
}

export default withRouter(Prediction);
