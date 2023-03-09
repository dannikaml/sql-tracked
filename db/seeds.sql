use employees_db;


INSERT INTO department (id, name)
VALUES
    ('Human Resources'),
    ('Management'),
    ('Accounting'),
    ('Legal');
    ('Administration');
    ('Research/Development');


INSERT INTO role  (title, salary, department_id)
VALUES
    ('Human Resources Rep', 100000, 2,)
    ('Sales Rep', 80000, 1),
    ('Lawyer', 215000, 3),
    ('Accountant', 125000, 3),
    ('Receptionist', 45000, 1),
    ('Manager', 135000, 4);
    

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Leslie', 'Knope', 2, NULL),
    ('April', 'Ludgate', 2, NULL),
    ('Ann', 'Perkins', 1, NULL),
    ('Ron', 'Swanson', 2, 3),
    ('Ben', 'Wyatt', 4, 1),
    ('Andy', 'Dwyer', 6, 5),


SELECT * FROM employees_db;