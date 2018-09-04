import React from 'react';
import Person from './components/Person'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      filteredItems: [],
      noticeType: 'NOTICE',
      notice: null
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    if(!this.state.persons.some(person => (person.name === this.state.newName))) {
      personService
        .create(personObject)
        .then(newName => {
          this.setState({
            persons: this.state.persons.concat(newName),
            newName: '',
            newNumber: '',
            notice: `lisättiin ${this.state.newName}`
          })
          setTimeout(() => {
            this.setState({notice: null})
          }, 5000)
        })
        .catch(error => {
          this.setState({
            notice: `virhe ${this.state.newName} lisäyksessä`,
            noticeType: 'ERROR'
          })
          setTimeout(() => {
            this.setState({notice: null, noticeType: 'NOTICE'})
          }, 5000)
        })
    } else {
      if (window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella`))
      {
        let updatedPerson = this.state.persons.find(person => (person.name === this.state.newName))
        personService
          .update(updatedPerson.id, personObject)
          .then(newName => {
            this.setState({
              persons: this.state.persons.map(el =>
                (el.name === this.state.newName ? Object.assign({}, el, el.number=this.state.newNumber) : el)),
              newName: '',
              newNumber: '',
              notice: `päivitettiin ${this.state.newName}`
            })
            setTimeout(() => {
              this.setState({notice: null})
            }, 5000)
          })
          .catch(error => {
            this.setState({
              notice: `virhe ${this.state.newName} päivityksessä`,
              noticeType: 'ERROR'

            })
            setTimeout(() => {
              this.setState({notice: null, noticeType:'NOTICE'})
            }, 5000)
          })
      } else {
        this.setState({
          newName: '',
          newNumber: ''
        })
      }
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

  onDelete = (id, name) => {
    personService
      .remove(id)
      .then(deleted => {
        this.setState({
          persons: this.state.persons.filter(el => el.id !== id),
          notice: `poistettiin ${name}`
        })
        setTimeout(() => {
          this.setState({notice: null})
        }, 5000)
      })
      .catch(error => {
        this.setState({
          notice: `virhe ${name} poistamisessa`,
          noticeType: 'ERROR'
        })
        setTimeout(() => {
          this.setState({notice: null, noticeType: 'NOTICE'})
        }, 5000)
      })
  }

  render() {
    let visibleList
    if(this.state.filter === '') {
      visibleList = this.state.persons.map(
          person => <Person key={person.name}
                    person={person}
                    onDelete={this.onDelete.bind(this)}
                    />
          )
    } else {
      visibleList = this.state.filteredItems.map(person => <Person key={person.name} person={person} />)
    }

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.notice} noticeType={this.state.noticeType}/>
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
