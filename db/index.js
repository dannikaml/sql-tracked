const connection = require("./connection");

class DB {
    constructor(connection) {
    this.connection = connection;
    }


showDepartments() {
    return this.connection.promise().query(
    "SELECT department.id, department.name FROM department;"
    );
}

showRoles() {
    return this.connection.promise().query(
    "SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id;"
    );
}

showEmployees() {
    return this.connection.promise().query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;"
    );
}
addRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);   
}
addEmployee(employee) {
    return this.connection.promise().query("INSERT INTO employee SET ?", employee);
}
}

module.exports = new DB(connection);