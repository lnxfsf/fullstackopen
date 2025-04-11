import personService from "../services/persons";

const Persons = ({ persons, filterValue, setPersons }) => {
  return (
    <>
      <h2>Numbers</h2>
      <div>
        {persons
          ?.filter((item) =>
            item.name.toLowerCase().includes(filterValue.toLowerCase())
          )
          .map((item, index) => {
            return (
              <div
                key={item.name}
                style={{ display: "flex", gap: "15px", paddingTop: "5px" }}
              >
                <p style={{ margin: 0 }}>
                  {item.name} {item.number}
                </p>{" "}
                <button
                  onClick={() => {
                    personService.deleteUser(item.id).then((res) => {
                      setPersons(persons?.filter((i) => i.id !== item.id));
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Persons;
