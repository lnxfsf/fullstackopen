import Part from "./Part"

const Content = ({part1, part2, part3, exercises1, exercises2, exercises3}) => {

    return (<>
    <Part text={part1} num={exercises1} />

    <Part text={part2} num={exercises2} />
    <Part text={part3} num={exercises3} />
   
      </>)
}

export default Content