import React, {Component} from 'react';
import Header from "../../components/header/header";
import Banner from "../../components/banner/banner";
import LeftMenu from "../../components/leftMenu/leftMenu";
import PredictionBox from "../../components/predictionBox/predictionBox";
import './home.scss'
import axios from "../../helpers/axiosInstance";


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInput: '',
            predictions: [],
            selectedFederation: null,
            federations: [],
            filteredPredictions: []
        }
        this.filterPredictions = this.filterPredictions.bind(this)
        this.onFederationSelect = this.onFederationSelect.bind(this)
    }

    async componentDidMount() {
        await this.fetchFederations()
        await this.fetchPredictions()
    }

    async fetchFederations() {
        const response =  await axios.get('list-federations')
        await this.setState({
            federations: response.data.data
        })
    }
    async fetchPredictions() {
        const response = await axios('predictions', {
            params: {
                federation: this.state.selectedFederation
            }
        })
        await this.setState({
            predictions: response.data.data
        })
    }
    async onFederationSelect(federation) {
        await this.setState({
            selectedFederation: federation
        })

        await this.fetchPredictions()

    }
    filterPredictions(e) {
        console.log(e.target.value)
        const value = e.target.value
        this.setState({
            searchInput: value
        })
        if (value === '') return
        this.setState({
            filteredPredictions: this.state.predictions.filter(el =>
                el.home_team.toLowerCase().includes(value.toLowerCase()) ||
                el.away_team.toLowerCase().includes(value.toLowerCase())
            )
        })
    }




    render()
        {
            const predictionItems = this.state.predictions.map(prediction => {
                return <PredictionBox key={prediction.id} prediction={prediction}/>
            })

            const filteredPredictionItems = this.state.filteredPredictions.map(prediction => {
                return <PredictionBox key={prediction.id} prediction={prediction}/>
            })
            return (
                <div className='home'>
                    <Header value={this.state.searchInput} onChange={this.filterPredictions}/>
                    <Banner/>
                    <div className="predictions">
                        <LeftMenu selectedFederation={this.state.selectedFederation}
                                  federations={this.state.federations} onFederationSelect={this.onFederationSelect}/>
                        <div className="predictions__items">
                            {this.state.searchInput.length ? filteredPredictionItems : predictionItems}
                        </div>
                    </div>
                </div>
            );
        }
    }

    export
    default
    Home;
