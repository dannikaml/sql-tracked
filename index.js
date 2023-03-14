const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const dbFolder = require("./db");

const teamMembers = []; 

const initialPrompt = () => {
return inquirer.prompt([
    {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update Employee Role",
            "Quit",
        ],
    },
    ])
    .then(res => {
        let choice = res.choice;
        switch (choice) {
        case "View All Departments":
            return viewDepartments();
        case "View All Roles":
            return viewRoles();
        case "View All Employees":
            return viewEmployees();
        case "Add a Department":
            return addDepartment();
        case "Add a Role":
            return addRole();
        case "Add an Employee":
            return addEmployee();
        case "Update Employee Role":
            return updateEmployeeRole();
        default:
            return quit();
        }
    })
    .catch(error => {
        console.log(error);
        return initialPrompt();
    });
};
        
// function displayTableData(tableData, initialPrompt) {
//     console.table(tableData);
//     return initialPrompt();
// } 

function viewDepartments() {
    dbFolder.showDepartments()
    .then(([rows]) => {
        let department = rows;
        return displayTableData(department, initialPrompt);
    })
    .catch(error => {
        console.log(error);
        return initialPrompt();
    });
}

function viewRoles() {
    dbFolder.showRoles()
    .then(([rows]) => {
        let roles = rows;
        console.table(roles);
    })
    .then(() => initialPrompt());
    // .catch(error => {
    //     console.log(error);
    //     return initialPrompt();
    // });
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
                db.createRole(role.title, role.salary, role.department_id)
                .then(() => console.log(`${role.title} has been added to the database!`))
                .then(() => initialPrompt())
            })
        })
    }

    function addEmployee() {
    console.log(`Please answer the following questions to add a new employee to the employee_db...`);
    prompt([
        {
        name: "first_name",
        message: "What is the employee's first name?"
        },
        {
        name: "last_name",
        message: "What is the employee's last name?"
        }
    ])
        .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;
    
        db.showRoles()
            .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }));
    
            prompt({
                type: "list",
                name: "roleId",
                message: "What is the employee's role?",
                choices: roleChoices
            })
                .then(res => {
                let roleId = res.roleId;
    
                db.showEmployees()
                    .then(([rows]) => {
                    let employees = rows;
                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }));
    
                    managerChoices.unshift({ name: "None", value: null });
    
                    prompt({
                        type: "list",
                        name: "managerId",
                        message: "Who is the employee's manager?",
                        choices: managerChoices
                    })
                        .then(res => {
                        let employee = {
                            manager_id: res.managerId,
                            role_id: roleId,
                            first_name: firstName,
                            last_name: lastName
                        }
    
                        db.createEmployee(employee);
                        })
                        .then(() => console.log(
                        `${firstName} ${lastName} has been added to the database`
                        ))
                        .then(() => loadMainPrompts())
                    })
                })
            })
        })
    }


initialPrompt()

.catch(err => {
console.log(err);
})

function quit() {
    console.log("Later Gator!");
    process.exit();
}
