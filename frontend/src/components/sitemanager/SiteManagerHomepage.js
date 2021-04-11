import React, { Component } from 'react';
import MealTotals from './mealTotals';
import RoutesNavbar from './RoutesNavbar';
import PopupMealTotals from './PopupMealTotals';
import env from "react-dotenv";
import { HashLink as Link } from "react-router-hash-link";
import 'reactjs-popup/dist/index.css';

import Spinner from "react-bootstrap/Spinner"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/manager.css'

class SiteManagerHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totals: [],
            routes: []
         };
    }

    async componentDidMount(){
        this.fetchMealTotals()
    }

    async fetchMealTotals () {
        let info = {
            site: "SLO",
        }
        let response = await fetch(env.backendURL + 'clients/siteTotals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        this.setState({totals: data.meals, routes: data.routes})
    }

    render() {
        let {totals, routes} = this.state
        console.log(this.state.totals)
        return (
            <div className="site-manager-page">
                <h1 className="site-manager-page-header">Site Manager Overview</h1>
                <div>
                    <RoutesNavbar routes={this.state.routes}/>
                    <div className="site-manager-container">
                        {this.state.totals.length >= 10 ? <MealTotals data={totals} routes={routes}/> : 
                        <div>
                            <Spinner animation="border" role="status" />
                        </div>}
                        <PopupMealTotals />
                    </div>
                </div>
            </div>
        );
    }
}

export default SiteManagerHomepage;