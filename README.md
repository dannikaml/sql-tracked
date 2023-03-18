# SQL Challenge: Employee Tracker


## Description
***
A command-line application to manage a company's employee database. This application allows the user to view the Departments, Roles, and Employees - which department the employees are assigned to, what their role/job is, their manager (if applicable), and what the salary for each employee. The user can also ADD a department, role, or employee and DELETE an employee.  The application allows the user to catalog Employee info by utilizing using Node.js, Inquirer 8.2.4, and MySQL.


# Usage
***
By utilizing Node.js, Inquirer 8.2.4 and MySQL 2 we can create a command-line application that dynamically generates an employee database. 

To install inquirer, please use:

```
npm i inquirer@8.2.4
```
To install MySQL 2:
```
npm i mysql2
```

To view tables in the command line:
```
npm i console.table
```

The application will be invoked by using the following command:
```
node index.js
```


### User Story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

### Acceptance Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Link to walk-through video


### Node & MySQL from the Terminal... 
![screenshot]( )

### Sources

sqlshack:
- https://www.sqlshack.com/understanding-sql-decimal-data-type/

w3schools:
- https://www.w3schools.com/js/js_switch.asp
- https://www.w3schools.com/jsref/jsref_map.asp

stackoverflow:
- https://stackoverflow.com/questions/22009582/error-1064-42000-you-have-an-error-in-your-sql-syntax-check-the-manual-that

resources:
Instructor: Bassie, TA: Ethan, reference to 'main'; ChatGPT 