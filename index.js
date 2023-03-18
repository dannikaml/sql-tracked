const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const dbFolder = require("./db");


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
            "Delete a Department",
            "Delete an Employee",
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
            return showEmployees();
        case "Add a Department":
            return addDepartment();
        case "Add a Role":
            return addRole();
        case "Add an Employee":
            return addEmployee();
        case "Update Employee Role":
            return updateEmployeeRole();
        case "Delete a Department":
            return deleteDepartment();
        case "Delete an Employee":
            return deleteEmployee();
        default:
            return quit();
        }
    })
    .catch(error => {
        console.log(error);
        return initialPrompt();
    });
};
        
function displayTableData(tableData, initialPrompt) {
    console.table(tableData);
    return initialPrompt();
} 

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
}


function showEmployees() {
    dbFolder.showEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.table(employees);
    })
    .then(() => initialPrompt());
} 


function addDepartment() {
    inquirer.prompt([
        {
            name: "name",
            message: "What is the name of the department?",
        },
    ])
    .then(res => {
        let name = res.name;
        dbFolder.addDepartment({ name: name })
            .then(() => {
                console.log(`${name} department has been added to the database!`);
                initialPrompt();
            })
            .catch(error => {
                console.log(error);
                initialPrompt();
            });
    });
}


function addRole() {
        dbFolder.showDepartments()
        .then(([rows]) => {
            let departments = rows;
            const selectDepartment = departments.map(({ id, name }) => ({
            name: name,
            value: id
            }));
    
            inquirer.prompt([
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
                dbFolder.addRole(role.title, role.salary, role.department_id)
                .then(() => console.log(`${role.title} has been added to the database!`))
                .then(() => initialPrompt())
            })
        })
    }

function addEmployee() {
    console.log(`Please answer the following questions to add a new employee to the employee_db...`);
    inquirer.prompt([
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
    
        dbFolder.showRoles()
            .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }));
    
            inquirer.prompt({
                type: "list",
                name: "roleId",
                message: "What is the employee's role?",
                choices: roleChoices
            })
                .then(res => {
                let roleId = res.roleId;
    
                dbFolder.showEmployees()
                    .then(([rows]) => {
                    let employees = rows;
                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }));
    
                    managerChoices.unshift({ name: "None", value: null });
    
                    inquirer.prompt({
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
    
                        dbFolder.addEmployee(employee);
                        })
                        .then(() => console.log(
                        `${firstName} ${lastName} has been added to the database`
                        ))
                        .then(() => initialPrompt())
                    })
                })
            })
        })
    }

function updateEmployeeRole() {
        console.log("Current employees...")
        dbFolder.showEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
            }));
    
            inquirer.prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Please choose an Employee to update...",
                choices: employeeChoices
            }
            ])
            .then(res => {
                let employeeId = res.employeeId;
                dbFolder.showRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const roleChoices = roles.map(({ id, title }) => ({
                    name: title,
                    value: id
                    }));
    
                    inquirer.prompt([
                    {
                        type: "list",
                        name: "roleId",
                        message: "Please choose a new role for the selected Employee...",
                        choices: roleChoices
                    }
                    ])
                    .then(res => dbFolder.updateEmployeeRole(employeeId, res.roleId))
                    .then(() => console.log("Updated employee's role"))
                    .then(() => initialPrompt())
                });
            });
        })
    }
    function deleteDepartment() {
        dbFolder.showDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
            }));
    
            inquirer.prompt({
            type: "list",
            name: "departmentId",
            message:
                "Please select the department you would like to delete... WARNING! This will DELETE all associated roles and employees)",
            choices: departmentChoices
            })
            .then(res => dbFolder.deleteDepartment(res.departmentId))
            .then(() => console.log(`Removed department from the database`))
            .then(() => initialPrompt())
        })
    }

function deleteEmployee() {
        console.log("Here are a list of employees...")
        dbFolder.showEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
            }));
    
            inquirer.prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Please choose an employee to delete from the database!",
                choices: employeeChoices
            }
            ])
            .then(res => dbFolder.deleteEmployee(res.employeeId))
            .then(() => console.log("The Employee has been deleted from the database..."))
            .then(() => initialPrompt())
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
