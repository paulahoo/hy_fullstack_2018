import React from 'react'

class CountrySelection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedCountry: ''
    }
  }

  handleClick = () => {
    this.setState({ clickedCountry: this.props.country.name })
  }

  render() {
    let countryData
    if (this.state.clickedCountry !== '') {
      countryData =
        <div>
          <h1> {this.props.country.name} {this.props.country.nativeName} </h1>
          <div> capital: {this.props.country.capital} </div>
          <div> population: {this.props.country.population} </div>
          <img src={this.props.country.flag} alt= "country flag" width="200" height="100" />
        </div>
    } else {
      countryData = this.props.country.name
    }
    return (
      <div onClick= {this.handleClick}>
       {countryData}
      </div>
    );
  }
}

export default CountrySelection
