INSERT INTO department (name)
VALUES 
('Engineering'),
('Finance'),
('Marketing'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Full Stack Developer', 150000, 1),
('Software Engineer', 250000, 1),
('Accountant', 17000, 2), 
('Accountant Manager', 200000, 2),
('Marketing Lead', 100000, 3)
('Sales representative', 70000, 4), 


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('James', 'Harrington', 4, null),
('John', 'Anderson', 2, null),
('Jane', 'Green', 3, 1),
('Alisha', 'Brown', 1, 2),
('Taylor', 'Swift', 5, null),
('Alice', 'Grey', 6, 5)