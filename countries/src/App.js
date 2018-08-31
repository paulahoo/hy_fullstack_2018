import React from 'react'
import axios from 'axios'
import Countries from './components/Countries'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
      filteredItems: []
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
    let filteredList = this.state.countries
    filteredList = filteredList.filter(function(item){
      return item.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    })

    if (filteredList.length <= 10) {
      this.setState({filteredItems: filteredList})
    } else {
      this.setState({filteredItems: []})
    }
  }

  render() {
    return (
      <div>
        find countries:
        <input
          value={this.state.filter}
          onChange={this.handleFilterChange}
        />
        <ul>
          <Countries countries={this.state.filteredItems}/>
        </ul>
      </div>
    )
  }
}

export default App
