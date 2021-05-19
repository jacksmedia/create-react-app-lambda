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

export default LambdaDemo
