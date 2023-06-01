 //IMPORTING THE NECESSARY DEPENDENCIES. HERE I USED THE USE STATE FOR CREATING VARIABLES 
// AND Use effect TO PERFORM THE THE FETCHING THE DATA FROM API 
import React, { useState, useEffect } from 'react';

function DataDisplay() {
  //CREATED TWO CONSTANTS departments FOR STORING DEPARTMENT VALUES AND search TO STORE THE SEARCH KEY VALUE
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState('');

  //USED FETCH TO GET API DATA THE END POINT FOR ACCESSING THE DATA HER IS DEPARTMENTS


  useEffect(() => {
    fetch('http://localhost:3001/departments')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
     
        return response.json(); //HERE AFTER SUCCESSFUL EXECTION WE GET THE JSON DATA 
       
      })
      .then(data => setDepartments(data)) 
      .catch(err => console.log(err));
  }, []);

//WHEN EVER USER ENTER VALUE IN THE SEARCH FIELD THE STATE OF SEARCH CHANGES
  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  // WHEN EVER THE USER ENTER A VALUE IN THE SEARCH BOX IT RETIRN A NEW ARRAY DEPARTMENTS WITH THE MATCHED KEYWORD
  const getFilteredDepartments = () => {
    return departments
      .map(department => {
        return {
          ...department,
          employees: department.employees.filter(employee =>
            employee.name.toLowerCase().includes(search.toLowerCase())
          ),
        };
      }) //FILTERS OUT WHERE EMPLOYEES ARRAY LENGTH IS MORE THAN ZERO
      .filter(department => department.employees.length > 0);
  };

  return (
    <div className="App">
      <h1>Company Hierarchy</h1>
      <input
        type="text"
        placeholder="Search by employee name..."
        value={search}
        onChange={handleSearchChange} //the function is called when ever a keyword is inserted

      />

      {/* //CALLS THE getFilteredDepartments() FUNCTION AND AND IT ITERATED OVER EACH DEPARTMENT   */}
      {getFilteredDepartments().map(department => (
        <div key={department.id}>
          <h2>{department.name}</h2>
          {department.employees.map(employee => (
            <p key={employee.id}>{employee.name}</p>   
          ))}
      
        </div>
      ))}
    </div>
  );
}

export default DataDisplay;