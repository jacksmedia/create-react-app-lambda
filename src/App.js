import React, { Component } from "react"
import logo from "./logo.svg"
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
    const { loading, coints } = this.state

    return (
      <p>
        <h2 onClick={this.handleClick("async-nomics-get")}
         className="App-logo-text">{loading ? "Loading, Plz Stand By..." : "Click Here for Fresh Crypto Prices"}</h2>
        <br />
          <p>Sortable features coming this week!
          </p>
          <ul>
            {this.state.coints.map(
              coint => <li key={coint.name}>
              <p>
                <span>{coint.currency}&nbsp;</span>
                ${coint.price}
              </p>
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
          <h1>Top100Crypto.info</h1>
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
