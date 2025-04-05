const Total = ({ parts }) => {
  var total = parts.reduce((sum, item) => {
    return sum + item.exercises;
  }, 0);

  return <p>Number of exercises {total}</p>;
};

export default Total;
