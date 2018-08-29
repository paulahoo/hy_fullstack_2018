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

const Button = ({name, handleClick}) => {
  return(
    <button onClick= {handleClick}>
      {name}
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
  const isStatistics = props.values.hyva + props.values.neutraali + props.values.huono
  const greeting = "ei yhtään palautetta annettu"
  let statisticsData

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

  if (isStatistics)
  {
    statisticsData =
     <div>
        <Statistic statisticvalues={statisticvalues.parts[0]} />
        <Statistic statisticvalues={statisticvalues.parts[1]} />
        <Statistic statisticvalues={statisticvalues.parts[2]} />
        <Average statisticvalues={props.values} />
        <PositivePercent statisticvalues={props.values} />
      </div>
  } else {
    statisticsData = greeting
  }

  return (
    <div>
      <h1>{statisticvalues.name}</h1>
      {statisticsData}
    </div>
  )
}

const stateNames = {
    names: [
      {
        name: 'hyva'
      },
      {
        name: 'neutraali'
      },
      {
        name: 'huono'
      }
    ]
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

  setStateValue = (stateName, stateValue) => {
    if (stateName === stateNames.names[0].name){
      return () => {
        this.setState({ hyva: stateValue })
      }
    } else if (stateName === stateNames.names[1].name) {
      return () => {
        this.setState({ neutraali: stateValue })
      }
    }  else {
      return () => {
        this.setState({ huono: stateValue })
      }
    }
  }

  render() {

    return (
      <div>
        <h1>Anna palautetta</h1>
        <div>
          <Button name={stateNames.names[0].name}
            handleClick={this.setStateValue(stateNames.names[0].name, this.state.hyva+1)}
          />
          <Button name={stateNames.names[1].name}
            handleClick= {this.setStateValue(stateNames.names[1].name, this.state.neutraali+1)}
          />
          <Button name={stateNames.names[2].name}
            handleClick= {this.setStateValue(stateNames.names[2].name, this.state.huono+1)}
          />
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
