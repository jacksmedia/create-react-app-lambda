import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch, 
  Route,
  Link
} from 'react-router-dom'

import './App.css'

function About() {
  return(
    <div className="content-page-layout">
      <h2>What's This About</h2>
      <p>This Top100CryptoInfo app is built in ReactJS by <Link to="https://j4cks.com">Jacks Consulting LLC</Link>, a digital agency headquartered in Portland, Oregon. It can install to your device like an app from a store, but it's actually just a jazzy HTML + JavaScript website.</p>
      <p>It's here as a proof of concept that pure ReactJS running on Netlify can offer dynamic page content without the need for dedicated servers or bloated, glitchy development frameworks.</p>
      <p>We're also working on a new marketing site and media presence, so stay tuned and don't forget to <Link to="https://www.coinbase.com/join/jacks_pv">join Coinbase</Link> for your next-level currency needs.</p>
    </div>
  )
}
function Guide() {
  return(
    <div className="content-page-layout">
      <h2>Need a Guide?</h2>
      <p>We're working on a new guide to the wild world of crypto speculating! <Link to="https://how-to-crypto.herokuapp.com/#/">Here you can find an old guide</Link> from 2018 about trading crypto. It's a little dated but it can still help you learn to buy/sell crypto!</p>
      <p>Here's the link to <Link to="https://www.binance.com/en?ref=12272309">join Binance</Link>!</p>
      <p>If you reside in America, you'll have more luck joining <Link to="https://accounts.binance.us/en/register?ref=52116724">BINANCE.us</Link></p>
    </div>
  )
}

// main API logic begins
class Homepage extends Component {
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
    const { isLoading } = this.state
    console.log(this.state.coints)
    return (
      <div>
        <div onClick={this.handleClick("async-nomics-get-100")} className="btn">{this.state.loading ? "Loading, Plz Stand By..." : "Click for Top 100"}</div>
        <ul className="big-list">
          {!isLoading && this.state.coints.map((coint) => {
            return(
              <li key={coint.id} className="crypto">
                <img src={coint.logo_url} className="lil-image" alt='cryptocurrency logo'/>
                <h5>{coint.name}</h5>
                <h4>{coint.symbol}</h4>
                <h5>${coint.price}</h5>
                <h2>#{coint.rank}</h2>
              </li>
            );
          })}
        </ul>
      </div>
    )
  }
}

// main App shell begins
const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
          {/* just testing the Router */}
          <nav>
            <ul className="navbar">
              <li><Link className="nav-btn" to="/">Home</Link></li>
              <li><Link className="nav-btn" to="/about">About</Link></li>
              <li><Link className="nav-btn" to="/guide">Guide</Link></li>
            </ul>
          </nav>
          <h1 className="emergency-spacer logo-text-splendor">Top100Crypto.info</h1>
          <h3 className="logo-text-splendor">Essential Cryptocurrency Prices</h3>
          <h4>
            <a
              className="App-link"
              href="https://j4cks.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Built By Jacks Consulting
            </a>
          </h4>
        </header>
          {/* Switch element loads 1st match to current URL;
          (Router only declares URLs, afaict)  */}
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/guide" component={Guide} />
          <Route exact path="/" component={Homepage} />
        </Switch>
      </div>
    </Router>
  )
}
export default App