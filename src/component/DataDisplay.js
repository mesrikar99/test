import React, { useState, useEffect } from 'react';

function DataDisplay() {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/departments')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
     
        return response.json();
       
      })
      .then(data => setDepartments(data))
      .catch(err => console.log(err));
  }, []);


  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const getFilteredDepartments = () => {
    return departments
      .map(department => {
        return {
          ...department,
          employees: department.employees.filter(employee =>
            employee.name.toLowerCase().includes(search.toLowerCase())
          ),
        };
      })
      .filter(department => department.employees.length > 0);
  };

  return (
    <div className="App">
      <h1>Company Hierarchy</h1>
      <input
        type="text"
        placeholder="Search by employee name..."
        value={search}
        onChange={handleSearchChange}
      />
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