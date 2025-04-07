const Filter = ({ filterValue, setFilterValue }) => {
  return (
    <div>
      filter show with
      <input
        value={filterValue}
        onChange={(event) => {
          setFilterValue(event.target.value);
        }}
      />
    </div>
  );
};

export default Filter;
