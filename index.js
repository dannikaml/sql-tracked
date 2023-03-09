const mysql2 = require('mysql2'); 
const inquirer = require('inquirer');
const dbFolder = require("./db");

const teamMembers = []; 


const initialPrompt = () => {
    return inquirer.prompt ([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices:
                [  "View All Departments",
                    "View All Roles",
                    "View All Employees",
                    "Add a Department",
                    "Add a Role",
                    "Add an Employee",
                    "Update Employee Role",
                    "Quit", ]
        },

    ]).then(res => {
        let choice = res.choice;
        switch (choice) {
        case "View All Departments":
            viewDepartments();
            break;
        case "View All Roles":
            viewRoles();
            break;
        case "View All Employees":
            viewEmployees();
            break;
        case "Add a Department":
            addDepartment();
            break;
        case "Add a Role":
            addRole();
            break;
        case "Add an Employee":
            addEmployee();
            break;
        case "Update Employee Role":
            updateEmployeeRole();
            break;
        default:
            quit();
        }
    })
    }
        
    function viewDepartments() {
        dbFolder.showDepartments()
        .then(([rows]) => {
            let department = rows;
            console.table(department);
        })
        .then(() => initialPrompt());
    }    
        
    function viewRoles() {
        dbFolder.showRoles()
        .then(([rows]) => {
            let roles = rows;
            console.table(roles);
        })
        .then(() => initialPrompt());
    }  
        
    function viewEmployees() {
        dbFolder.showEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.table(employees);
        })
        .then(() => initialPrompt());
    } 


    function addDepartment() {
        prompt([
        {
            name: "name",
            message: "Please enter the name of the new Department..."
        }
        ])
        .then(res => {
            let name = res;
            db.createDepartment(name)
            .then(() => console.log(`${name.name} has been added to the database!`))
            .then(() => initialPrompt())
        })
    }

    function addRole() {
        dbFolder.showDepartments()
        .then(([rows]) => {
            let departments = rows;
            const selectDepartment = departments.map(({ id, name }) => ({
            name: name,
            value: id
            }));
    
            prompt([
            {
                name: "title",
                message: "What is the employees role?"
            },
            {
                name: "salary",
                message: "What salary will be obtained in the employees role?"
            },
            {
                type: "list",
                name: "department_id",
                message: "Which department should this new role be added to?",
                choices: selectDepartment
            }
            ])
            .then(role => {
                db.createRole(role)
                .then(() => console.log(`${role.title} has been added to the database!`))
                .then(() => initialPrompt())
            })
        })
    }

    function addEmployee() {
    // console.log(`Please answer the following questions to add a new employee to the employee_db...`);
    dbFolder.showDepartments()
    .then(([rows]) => { 
    });
    
    inquirer.prompt ([
        {
            type: 'list',
            name: 'role_id',
            message: "Please select the employees role title: ",
            choices: selectDepartment
        },
        {
            type: 'input',
            name: 'name',
            message: "Employees full name?", 
            validate: answer => {
                if (answer) {
                    return true;
                } else {
                    console.log ("Enter Employees name...");
                    return false; 
                }
            }
        },
        
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Would you like to add another employee?',
            default: false
        }
    ])
    }
//     .then(employeeData => {

//         // employee input data 
//         let { name, role, confirmAddEmployee } = employeeData; 
//         }

//         teamMembers.push(employee); 

//         if (confirmAddEmployee) {
//             return addEmployee(teamMembers); 
//         } else {
//             return teamMembers;
//         }
//     })

// };





initialPrompt()

.catch(err => {
console.log(err);
})

function quit() {
    console.log("Later Gator!");
    process.exit();
}
