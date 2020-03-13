import React, { Component } from 'react';

import SwapiService from '../../service/swapi-servise';

import './random-planet.css';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false
    }

    constructor() {
        super();
        this.updatePlanet();
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false
        });
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    };

    updatePlanet() {
        const id = Math.floor(Math.random() * 15 + 2);
        this.swapiService.getPlanet(15000)
                         .then(this.onPlanetLoaded)
                         .catch(this.onError);
    }

    render() {

        const { planet, loading, error } = this.state;

        const hasData = !(error || loading);

        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <PlanetView planet={planet} /> : null;
        const errorIndicator = error ? <ErrorIndicator /> : null;

        return (
            <div className="random-planet jumbotron rounded">
                {spinner}
                {content}
                {errorIndicator}
            </div>

        );
    }
}


const PlanetView = ({ planet }) => {

    const { id, name, population, rotationPeriod, diameter } = planet;

    return (
        <React.Fragment>
            <img className="planet-image"
                src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
};