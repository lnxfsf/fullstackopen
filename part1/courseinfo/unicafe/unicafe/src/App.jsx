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


  let sum = good+neutral+bad;
  let average = good+neutral+bad
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
        bad {bad}

        all {}
        average {}
      </div>

    </>
  )
}

export default App
