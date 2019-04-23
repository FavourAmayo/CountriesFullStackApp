import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    title: "Simple Country Application",
    countries: []
  };

  //MAKE AJAX CALLS HERE
  componentDidMount=()=> {
    console.log("COMPONENT HAS MOUNTED");

    /* fetch("http://localhost:3000/api/countries")
      .then(function(response) {
        console.log(typeof response);
        response.json().then(function(data) {
          console.log(data);
          //let countries = this.state.countries;
          //countries.push(data);
          this.setState({ countries: data });
          console.log("COUNTRIES", this.state.countries);
        });
      }); 
      .catch(function(err) {
        console.log(err);
      });  */

    fetch('http://localhost:3000/api/countries')
      .then(response => response.text())
      .then(data => this.setState({ countries: data })); 

    /* fetch("http://localhost:3000/api/countries")
      .then(function(response) {
        //console.log(response.text());
        //return response.json();
        return response.text();
        //return JSON.stringify(response);
      })
      .then(function(data) {
        this.setState({ countries: data }, () => console.log("COUNTRIES: ",  this.state.countries));
      }); */
  }

  addCountry = e => {
    e.preventDefault();
    const data = {
      country_name: this.refs.country_name.value,
      continent_name: this.refs.continent_name.value
      /* id: Math.random().toFixed(3) */
    };

    const request = new Request("http://localhost:3000/api/new-country", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(data)
    });

    const countries = this.state.countries;
    countries.push(data);
    this.setState({ countries: countries });
    console.log("DATA: ", data);
    console.log("COUNTRY", this.state.countries);

    //xmlhttprequest()

    fetch(request)
      .then(function(response) {
        response.json().then(function(data) {
          /* console.log("DATA: ", data);
          console.log("COUNTRY", this.state.countries);
          const countries = this.state.countries;
          countries.push(data);
          this.setState({ countries: countries });  */
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.title}</h1>
        <form ref="countryForm">
          <input type="text" ref="country_name" placeholder="country_name" />
          <input
            type="text"
            ref="continent_name"
            placeholder="continent_name"
          />
          <button onClick={this.addCountry}>Add Country</button>
          <pre>{JSON.stringify(this.state.countries)}</pre>
        </form>
        {/* <ul>
           {this.state.countries.map(country => (
            <li key={country.id}>
              {country.country_name} {country.continent_name}
            </li>
          ))} 
        </ul> */}
      </div>
    );
  }
}

export default App;
