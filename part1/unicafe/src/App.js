import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <>
      <h2>statistic</h2>
      {(all <= 0) ? "No feedback given" :
        <table>
          <StatisticLine name={"good"} count={good} />
          <StatisticLine name={"neutral"} count={neutral} />
          <StatisticLine name={"bad"} count={bad} />
          <StatisticLine name={"all"} count={all} />
          <StatisticLine name={"average"} count={average} />
          <StatisticLine name={"positive"} count={positive} />
        </table>
      }
    </>
  )
}

const StatisticLine = ({ name, count }) => {
  return (
    <tbody>
      <tr>
        <td>{name} </td>
        <td>{count}</td>
        {name === "positive" && (<td>%</td>)}
      </tr>
    </tbody>
  )
}

const Button = ({ handleButton, name }) => {
  return (
    <>
      <button onClick={handleButton}>{name}</button>
    </>
  )
}

const Feedback = ({ handleGood, handleNeutral, handleBad }) => {
  return (
    <>
      <h2>give feedback</h2>
      <Button handleButton={handleGood} name={"good"} />
      <Button handleButton={handleNeutral} name={"neutral"} />
      <Button handleButton={handleBad} name={"bad"} />
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <Feedback handleGood={handleGood} handleNeutral={handleNeutral} handleBad={handleBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
