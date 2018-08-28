import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  render() {
    const painahyvahandler = () => {
      this.setState({
        hyva: this.state.hyva + 1
      })
    }
    const painaneutraalihandler = () => {
      this.setState({
        neutraali: this.state.neutraali + 1
      })
    }

    const painahuonohandler = () => {
      this.setState({
        huono: this.state.huono + 1
      })
    }
    return (
      <div>
        <h1>Anna palautetta</h1>
        <div>
          <button onClick={painahyvahandler}>
            Hyvä
          </button>
          <button onClick={painaneutraalihandler}>
            Neutraali
          </button>
          <button onClick={painahuonohandler}>
            Huono
          </button>
        </div>
        <h1>Statistiikka</h1>
        <div>Hyvä {this.state.hyva}</div>
        <div>Neutraali {this.state.neutraali}</div>
        <div>Huono {this.state.huono}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
