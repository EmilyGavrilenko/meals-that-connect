import React, { Component } from 'react';
import Popup from "reactjs-popup";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/manager.css'
import PopupOrderSuccess from './PopupOrderSuccess';

class PopupMealTotals extends Component {
    constructor(props) {
        super(props);
        this.state = {showSuccess:false };
    }

    submitActions()
    {
        let day = getFoodDay(this.props.day);
        this.fetchTotalMeals(day);
    }

    async fetchTotalMeals (day) {
        let site = localStorage.getItem("site")
        let info = {
            site: site,
            foodDay: day
        }
        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'orders/mealTotal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        this.setState({brownBag: data.meals, frozen: data.frozen, showSuccess: false})
        this.addOrder()
    }

    async addOrder(){
        let site = localStorage.getItem("site")
        let date = getDateObj(this.props.day)
        let info = {
            site: site,
            date: date,
            frozen: this.state.frozen,
            whiteBag: 0,
            brownBag: this.state.brownBag
        }
        let response = await fetch(process.env.REACT_APP_SERVER_URL + 'orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const data = await response.json();
        this.setState({brownBag: data.brownBag, frozen: data.frozen, showSuccess: true})
        //this.props.history.push("/orderSuccess")
    }


    render()
    {
        return(
        <div>
        <PopupOrderSuccess show={this.state.showSuccess}/>
        <Popup trigger = {
            <button type="button" className="route" style={{width: 150, height: 50}}>{getWeekday(this.props.day)}</button>
            } modal>
            {close => (
                <div>
                    <p id="popup">Are you sure you'd like to submit your meal orders for <b>{getDate(this.props.day)}</b>? 
                        They will be shared with the kitchen staff once you submit. 
                        You'll still be able to go back and resubmit the order until <b>{getDeadline(this.props.day)}</b>.</p>
                    <div id = "popup-div">
                        <button type="button" className="popup-button-cancel"  onClick={() => {close();}}>Cancel</button>
                        <button type="button" className="popup-button-submit" onClick= {() => {this.submitActions();}}>Submit</button>
                    </div>
                </div>
            )}
        </Popup>
        </div>
        )
    }
}


function getFoodDay(day){
    var weekday = [];
    weekday[0] = "M";
    weekday[1] = "T";
    weekday[2] = "W";
    weekday[3] = "Th";
    weekday[4] = "F";
    var d = weekday[day];
    return d;
}

function getWeekday(day){
    var weekday = [];
    weekday[0] = "Monday";
    weekday[1] = "Tuesday";
    weekday[2] = "Wednesday";
    weekday[3] = "Thursday";
    weekday[4] = "Friday";
    var d = weekday[day];
    return d;
}

function getDateObj(tableDay){
    let curr = new Date();
    let week = [];
  
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first));
      week.push(day);
    }
  
    return week[tableDay];
}

function getDate(tableDay) {
    let curr = new Date();
    let week = [];
  
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first));
      let month = day.getMonth() + 1;
      let date = day.getDate();
      let year = day.getFullYear();
      let mdy = month + "/" + date + "/" + year;
      week.push(mdy);
    }
  
    return week[tableDay];
}

function getDeadline(tableDay) {
    let curr = new Date();
    let week = [];
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first));
      if (tableDay < 3)
        day.setDate(day.getDate()-7);
      let month = day.getMonth() + 1;
      let date = day.getDate();
      let year = day.getFullYear();
      let mdy = month + "/" + date + "/" + year;
      week.push(mdy);
    }
    if (tableDay < 3)
        return week[tableDay+2];
    return week[tableDay-3];
}


export default PopupMealTotals;