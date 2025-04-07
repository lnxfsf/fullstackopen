const Persons = ({persons, filterValue}) => {

    return (<>
    
    <h2>Numbers</h2>
      <div>
        {persons?.filter(item => item.name.toLowerCase().includes(filterValue.toLowerCase())).map((item, index) => {
          return <p key={item.name} style={{margin: 0}}>{item.name} {item.number}</p>;
        })}
      </div>
      </>)
}


export default Persons