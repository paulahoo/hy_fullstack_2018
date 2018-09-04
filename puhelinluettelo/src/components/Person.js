import React from 'react'

class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {person: this.props.person};
  }

  deleteHandler(id, name, e) {
    this.props.onDelete(id, name);
  }

  render() {
    let name = this.state.person.name
    let confirmAlert = `Poistetaanko ${name}`
    return (
      <div>
        {name} {this.state.person.number}
        <button type="button" onClick = {() => {if(window.confirm(confirmAlert)) this.deleteHandler(this.state.person.id, name)}} >poista</button>
      </div>
    )
  }
}

export default Person
