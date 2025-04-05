const Total = ({ parts }) => {
  var total = parts.reduce((sum, item) => {
    return sum + item.exercises;
  }, 0);

  return <p><b>total of {total} exercises</b></p>;
};

export default Total;
