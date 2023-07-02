const PersonForm = ({
  handleForm,
  valueName,
  handleName,
  valueNumber,
  handlePhone,
}) => {
  return (
    <>
      <form onSubmit={handleForm}>
        <div>
          name: <input value={valueName} onChange={handleName} />
        </div>
        <div>
          number: <input value={valueNumber} onChange={handlePhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
