import React, { Component } from "react"
import "./App.css"

class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, coints: [] }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, coints: json.data }))
  }

  render() {
    const { loading } = this.state
    console.log(this.state.coints)
    return (
      <div className="App-feature" >
        <h2 onClick={this.handleClick("async-nomics-get")}
         className="App-logo-text">{loading ? "Loading, Plz Stand By..." : "Click Here for Fresh Crypto Prices"}</h2>
        <h3>Displaying prices on {this.state.coints.length} digital securities</h3>
        <h2>Sorting features coming soon!</h2>
        <ul className="big-list">
          {this.state.coints.map(
            coint => <li key={coint.id} className="crypto">
              {/*
              plz build an img component for this prop,
              sized about 28px x 28px max;
              just big enough to see the logo colors

               <h6>{coint.logo_url}</h6>
              
              */}
              <h4>{coint.symbol}</h4>
              <h5>${coint.price}</h5>
              <h6>{coint.name}</h6>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1 className="logo-text-splendor">Top100Crypto.info</h1>
          <h3>
            <a
              className="App-link"
              href="https://j4cks.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Built By Jacks Consulting
            </a>
          </h3>
          <LambdaDemo />
        </header>
      </div>
    )
  }
}

export default App
