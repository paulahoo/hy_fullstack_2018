import React from 'react';
import Person from './components/Person'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: '',
      filteredItems: []
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

  if(!this.state.persons.some(person => (person.name === this.state.newName))) {
    const persons = this.state.persons.concat(personObject)

      this.setState({
        persons,
        newName: '',
        newNumber: ''
      })
    } else {
      this.setState({
        newName: '',
        newNumber: ''
      })
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {

    this.setState({ filter: event.target.value })
    let filteredList = this.state.persons
    filteredList = filteredList.filter(function(item){
      return item.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    })
    this.setState({filteredItems: filteredList});
  }

  render() {
    let visibleList
    if(this.state.filter === '') {
      visibleList = this.state.persons.map(person => <Person key={person.name} person={person} />)
    } else {
      visibleList = this.state.filteredItems.map(person => <Person key={person.name} person={person} />)
    }

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        rajaa näytettäviä:
        <input
          value={this.state.filter}
          onChange={this.handleFilterChange}
        />
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          nimi:
          <input
            value={this.state.newName}
            onChange={this.handleNameChange}
          />
          <p></p>
          numero:
          <input
            value={this.state.newNumber}
            onChange={this.handleNumberChange}
          />
          <p></p>
          <button type="submit">lisää</button>
        </form>
        <h2>Numerot</h2>
        <ul>
          {visibleList}
        </ul>
      </div>
    )
  }
}

export default App
