const Filter = ({ search, handleSearch }) => {
  return (
    <>
      <p>filter shown with</p> <input value={search} onChange={handleSearch} />
    </>
  );
};

export default Filter;
