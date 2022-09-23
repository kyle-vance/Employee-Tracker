INSERT INTO department (name)
VALUES ("Sales"), ("Legal"), ("Construction"), ("IT"), ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES 
    ("Senior Salesman", 84000, 1), 
    ("Junior Salesman", 52000, 1), 
    ("Senior Attorney", 190000, 2), 
    ("Junior Attorney", 155000, 2), 
    ("Project Manager", 122000, 3), 
    ("Foreman", 89000, 3),
    ("Skilled Laborer", 72000, 3),
    ("Unskilled Laborer", 48000, 3),
    ("Network Adminstrator", 82000, 4), 
    ("Help Desk", 51000, 4);
    ("Accountant", 94000, 5);
    ("Consultant", 68000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Trevor", "Arave", 1, 1), 
    ("Ben", "Little", 2, null),
    ("Jason", "Douglass", 3, 2), 
    ("Krace", "Maw", 4, null),
    ("Trevor", "Jex", 5, 3), 
    ("Ryan", "Larson", 6, null),
    ("Daniel", "Jenkins", 7, 4), 
    ("Jordan", "Jones", 8, 1);
    ("Brandon", "Jex", 9, 2);
    ("Quinn", "Peterson", 10, 3);
    ("Andy", "Allen", 11, 4);
    ("Dalton", "Musgrave", 12, 1);