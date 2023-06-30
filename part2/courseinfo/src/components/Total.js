const Total = ({ parts }) => {
  let total = parts.reduce(
    (initial, currentValue) => initial + currentValue.exercises,
    0
  );

  return <h4>Number of exercises {total}</h4>;
};
export default Total;
