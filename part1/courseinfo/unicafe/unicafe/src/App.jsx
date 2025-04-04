import { useState } from 'react'
import "./app.css"


const Statistics  = () => {

  return (<>
  
  </>)


}





function App() {
 
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  let total = good+neutral+bad;
  let average = total > 0 ? ((good * 1) + (neutral * 0) + (bad * -1))/total : 0;

  let positivePercentage = total > 0 ? (good / total) * 100 : 0;


  return (
    <>
      <h1>Give feedback</h1>

      <div >
        <button onClick={() => {setGood((prev) => prev + 1)}}>good</button>

        <button onClick={() => {setNeutral((prev) => prev + 1)}}>neutral </button>
        <button onClick={() => {setBad((prev) => prev + 1)}}>bad</button>
      </div>



      <h1>Stastistics</h1>
      <div >
        good {good}<br/>
        neutral {neutral}<br/>
        bad {bad}<br/>

        all {total}<br/>
        average {average}<br/>
        positive {positivePercentage}<br/>
      </div>

    </>
  )
}

export default App
