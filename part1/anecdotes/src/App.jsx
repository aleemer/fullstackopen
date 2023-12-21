import { useState } from 'react'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { text: 'If it hurts, do it more often.', votes: 0 },
    { text: 'Adding manpower to a late software project makes it later!', votes: 0},
    { text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
    { text: 'Premature optimization is the root of all evil.', votes: 0 },
    { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 },
    { text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0 },
    { text: 'The only way to go fast, is to go well.', votes: 0 },
  ])
  const [selected, setSelected] = useState(0);

  const handleClickVote = () => {
    const newAnecdotes = anecdotes.map((anecdote, i) => i === selected ? {...anecdote, votes: anecdote.votes + 1 } : anecdote)
    setAnecdotes(newAnecdotes);
  }

  const handleClickNext = () => {
    const randomChoice = Math.floor(Math.random() * anecdotes.length);
    console.log('picking ancedote ', randomChoice);
    setSelected(randomChoice);
  }

  const getFavAnecdote = () => {
    const favAnecdote = anecdotes.reduce((maxAnecdote, currentAnecdote) => {
      return currentAnecdote.votes > maxAnecdote.votes ? currentAnecdote : maxAnecdote
    }, anecdotes[0]);
    return favAnecdote;
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected].text}</p>
      <p>has {anecdotes[selected].votes} votes</p>
      <button onClick={handleClickVote}>vote</button>
      <button onClick={handleClickNext}>next ancedote</button>
      <h2>Anecdote with most votes</h2>
      <p>{getFavAnecdote().text}</p>
      <p>has {getFavAnecdote().votes} votes</p>
    </div>
  )
}

export default App