import React from 'react';
import ReactDOM from 'react-dom';

const Average = (props) => {
  const pcs = props.statisticvalues.hyva + props.statisticvalues.neutraali +props.statisticvalues.huono
  const goods = props.statisticvalues.hyva * 1
  const neutrals = props.statisticvalues.neutraali * 0
  const bads = props.statisticvalues.huono * -1
  const average = ((goods + neutrals + bads) / pcs)

  return (
    <div>
      <div>keskiarvo {average}</div>
    </div>
  )
}

const PositivePercent = (props) => {
  const pcs = props.statisticvalues.hyva + props.statisticvalues.neutraali +props.statisticvalues.huono
  const percent = props.statisticvalues.hyva / pcs * 100

  return (
    <div>
      <div>positiivisia {percent} % </div>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick= {props.button.handler}>
      {props.button.name}
    </button>
  )
}

const Statistic = (props) => {
  return (
    <div>
      <div>{props.statisticvalues.name} {props.statisticvalues.value} </div>
    </div>
  )
}

const Statistics = (props) => {
  const statisticvalues = {
    name: 'Statistiikka',
    parts: [
      {
        name: 'Hyvä',
        value: props.values.hyva
      },
      {
        name: 'Neutraali',
        value: props.values.neutraali
      },
      {
        name: 'Huono',
        value: props.values.huono
      }
    ]
  }

  return (
    <div>
      <h1>{statisticvalues.name}</h1>
      <Statistic statisticvalues={statisticvalues.parts[0]} />
      <Statistic statisticvalues={statisticvalues.parts[1]} />
      <Statistic statisticvalues={statisticvalues.parts[2]} />
      <Average statisticvalues={props.values} />
      <PositivePercent statisticvalues={props.values} />
    </div>
  )
}

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
    const goodbuttonhandler = () => {
      this.setState({
        hyva: this.state.hyva + 1
      })
    }
    const neutralbuttonhandler = () => {
      this.setState({
        neutraali: this.state.neutraali + 1
      })
    }

    const badbuttonhandler = () => {
      this.setState({
        huono: this.state.huono + 1
      })
    }

    const buttons = {
      parts: [
        {
          name: 'Hyvä',
          handler: goodbuttonhandler
        },
        {
          name: 'Neutraali',
          handler: neutralbuttonhandler
        },
        {
          name: 'Huono',
          handler: badbuttonhandler
        }
      ]
    }

    return (
      <div>
        <h1>Anna palautetta</h1>
        <div>
          <Button button={buttons.parts[0]} />
          <Button button={buttons.parts[1]} />
          <Button button={buttons.parts[2]} />
        </div>
        <Statistics values={this.state} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
