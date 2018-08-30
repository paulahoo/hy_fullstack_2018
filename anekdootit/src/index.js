import React from 'react';
import ReactDOM from 'react-dom';

const MostVotes = (props) => {
  const votes = props.values.votes
  let biggestVoteValue = 0
  let mostVoted = 0
  let responsetext

  votes.forEach(function(number, index) {
    if (number > biggestVoteValue) {
      biggestVoteValue = number
      mostVoted = index
    }
  })

  if (biggestVoteValue > 0){
    responsetext = (
      <div>
        <h1> anecdote with most votes: </h1>
        <div>{props.anecdotes[mostVoted]}</div>
        <div>has  {biggestVoteValue} votes </div>
      </div>
    )
  } else {
    responsetext = (
      <div> </div>
    )

  }

  return (responsetext)
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0, 0, 0, 0, 0, 0]
    }
  }

  handleNextAnecdoteClick = () => {
    const min = Math.ceil(0)
    const max = Math.ceil(6)
    const rand = Math.floor(Math.random() * (max - min)) + min
    this.setState({ selected: rand  })
  }

  handleVoteClick = () => {
    const kopio = [...this.state.votes]
    kopio[this.state.selected] += 1
    this.setState({
      votes: kopio
    })
  }

  render() {

    return (
      <div>
        <p>{this.props.anecdotes[this.state.selected]}</p>
        <div>has {this.state.votes[this.state.selected]} votes</div>
        <button onClick={this.handleVoteClick}>
          vote
        </button>
        <button onClick={this.handleNextAnecdoteClick}>
          next anecdote
        </button>
        <MostVotes values={this.state} anecdotes={anecdotes} />
      </div>
    )
  }
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
