import React, { Component } from "react"
import {
  BrowserRouter as Router,
  Switch, 
  Route,
  Link,
  useParams
} from "react-router-dom"
import "./App.css"

function About() {
  return(
    <div className="content-page-layout">
      <h2>What's This About</h2>
      <p>This Top100CryptoInfo app is built in pure ReactJS by <Link to="https://j4cks.com">Jacks Consulting LLC</Link>, a digital agency headquartered in Portland, Oregon.</p>
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
function Coint() {
  let { id } = useParams()
  return <p>CointID={ id }</p>;
}

// main API logic begins
class NomicsGrab extends Component {
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
      <div>
        <Router>
          <ul className="App-feature">
            {/* button that makes API call for 100 values */}
            <li onClick={this.handleClick("async-nomics-get-100")}
             className="App-logo-text">{loading ? "Loading, Plz Stand By..." : "Click for Top 100"}
            </li>
            {/* button that makes API call for 1k values -- in dev, rn does 33 not 1000 
            <li onClick={this.handleClick("async-nomics-get-1k")}
             className="App-logo-text">{loading ? "Loading, This Might Take A Few..." : "Click for Top 33"}
            </li>
            */}
          </ul>

          <h3>Displaying prices on {this.state.coints.length} digital securities</h3>
          <ul className="big-list">
            {this.state.coints.map(
              coint => <li key={coint.id} className="crypto">
                <img src={coint.logo_url} className="lil-image" alt='cryptocurrency logo'/>
                {/*
                  need separation into own component in order to make subpages
                  see:
                  https://dev.to/dsckiitdev/dynamic-pages-using-react-router-2pm
                */}
                <h4>{coint.symbol}
                  <h6>(#{coint.rank})</h6>
                </h4>
                <h5>${coint.price}</h5>
                <h6>{coint.name}</h6>
                <Link to={`/${coint.symbol}`}>
                  <h3>Readmore {coint.symbol}</h3>
                </Link>
              </li>
            )}
          </ul>
          {/* dynamic routing logic, for the subpages' Links
          Child fn assigns ID w React hook */}
          <Switch>
            <Route path="/:id" children={<Coint />}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

// main App shell begins
export default function App(){
  return (
    <Router>
      <div className="App">
        <header>
          {/* just testing the Router */}
          <nav>
            <ul className="navbar">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/guide">Guide</Link>
              </li>
            </ul>
          </nav>
        </header>
          {/* Switch element loads 1st match to current URL;
          (Router only declares URLs, afaict)  */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/guide">
            <Guide />
          </Route>
          <Route path="/">
            <h1 className="logo-text-splendor">Top100Crypto.info</h1>
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
            <NomicsGrab />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
