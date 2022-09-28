USE workday_db;
INSERT INTO department (id, name)
VALUES (1, "HR"),
        (2, "IT"),
        (3, "Talent"),
        (4, "Stores"),
        (5, "Payments");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "CEO", 150000, 1),
        (2, "Engineer", 80000, 2),
        (3, "Recruiter", 55000, 3),
        (4, "Sales Manager", 55000, 4),
        (5, "Credit Specialist", 65000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Jeff", "bossington",1, 1),
        (2, "Adam", "jeep", 2, 1),
        (3, "Mark","chevy", 3, 1),
        (4, "James","Zee", 4, 1),
        (5, "Mick", "Mouse", 5, 1);