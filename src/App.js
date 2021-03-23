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

    return (
      <p>
        <h2 onClick={this.handleClick("async-nomics-get")}
         className="App-logo-text">{loading ? "Loading, Plz Stand By..." : "Click Here for Fresh Crypto Prices"}</h2>
        <br />
          <p>Sortable features coming this week!
          </p>
          <ul className="big-list">
            {this.state.coints.map(
              coint => <li key={coint.currency} className="crypto">
                <h6>{coint.currency}</h6>
                <h6>${coint.price}</h6>
              </li>
            )}
          </ul>
      </p>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
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
