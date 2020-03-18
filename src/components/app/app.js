import React, { Component } from 'react';
import Header from "../header";
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page/people-page';

import './app.css';


export default class App extends Component {

    state = {
        selectedPerson: 5,
        hasError: false
    };

    componentDidCatch() {
        this.setState({ hasError: true })
    }

    render() {


        if(this.state.hasError){
            return <ErrorIndicator />
        }
        return (
            <div>
                <Header />
                <RandomPlanet />

                <PeoplePage />
            </div>
        );
    };
}
