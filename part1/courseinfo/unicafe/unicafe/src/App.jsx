import { useState } from "react";
import "./app.css";

const StatisticLine = ({ text, value }) => {
  return (
    <>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
      
      
      
    </>
  );
};

const Button = ({ text, setValue }) => {
  return (
    <button
      onClick={() => {
        setValue((prev) => prev + 1);
      }}
    >
      {text}
    </button>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;
  let average = total > 0 ? (good * 1 + neutral * 0 + bad * -1) / total : 0;

  let positivePercentage = total > 0 ? (good / total) * 100 : 0;

  return (
    <>
      <h1>Stastistics</h1>

      {good || neutral || bad ? (
        <table>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positivePercentage} />
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Give feedback</h1>
      <div>
        <Button text={"good"} setValue={setGood} />
        <Button text={"neutral"} setValue={setNeutral} />
        <Button text={"bad"} setValue={setBad} />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

export default App;
