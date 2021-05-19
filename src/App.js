import React, { Component } from "react"
import {
  BrowserRouter as Router,
  Switch, 
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom"
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
      <div>
        <ul className="App-feature">
          {/* button that makes API call for 100 values */}
          <li onClick={this.handleClick("async-nomics-get-100")}
           className="App-logo-text">{loading ? "Loading, Plz Stand By..." : "Click for Top 100"}
          </li>
          {/* button that makes API call for 1k values -- in dev, rn does 33 not 1000 */}
          <li onClick={this.handleClick("async-nomics-get-1k")}
           className="App-logo-text">{loading ? "Loading, This Might Take A Few..." : "Click for Top 33"}
          </li>
        </ul>

        <h3>Displaying prices on {this.state.coints.length} digital securities</h3>
        <h2>Sorting features coming soon!</h2>
        <ul className="big-list">
          {this.state.coints.map(
            coint => <li key={coint.id} className="crypto">

              <img src={coint.logo_url} className="lil-image" alt='cryptocurrency logo'/>
              {/*
                these props' layout v hacky; oughta get separation into own components
              */}
              <h4>{coint.symbol}
                <h6>(#{coint.rank})</h6>
              </h4>
              <h5>${coint.price}</h5>
              <h6>{coint.name}</h6>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

function About() {
  return <p>Dummy ABOUT page</p>;
}
function Guide() {
  return <p>Dummy Guide page</p>;
}

function Coints() {
  let match = useRouteMatch();

  return(
    <div>
      <h2>Top 100 Coin Symbols Today</h2>
      <Switch>
        <Route path={`${match.path}/:cointId`}>
          <Coint />
        </Route>
      </Switch>
    </div>
  );
}
function Coint() {
  let { cointId } = useParams();
  return <h3>Coin symbol: {cointId}</h3>
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            {/* just testing the Router */}
            <nav>
              <ul>
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
              <h3 className="logo-text-splendor">Live Cryptocurrency Prices</h3>
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
              <LambdaDemo />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
