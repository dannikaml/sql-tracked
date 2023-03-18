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

addDepartment(department) {
    const { name } = department;
    return this.connection.promise().query("INSERT INTO department SET `name` = ?", [name]);
}


addRole(title, salary, departmentId) {
    const sql = "INSERT INTO role (`title`, `salary`, `department_id`) VALUES (?, ?, ?)";
    const values = [title, salary, departmentId];
    return this.connection.promise().query(sql, values);
}

addEmployee(employee) {
    return this.connection.promise().query("INSERT INTO employee SET ?", employee);
}

updateEmployeeRole(employeeId, roleId) {
    return this.connection.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
}

deleteDepartment(departmentId) {
    return this.connection.promise().query("DELETE FROM department WHERE id = ?", departmentId);
}

deleteEmployee(employeeId) {
    return this.connection.promise().query("DELETE FROM employee WHERE id = ?", employeeId);
}
}

module.exports = new DB(connection);