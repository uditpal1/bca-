# UNIT – IV: SQL — Commands, Data Types, Joins and Functions

---

## 1. Introduction to SQL

**SQL (Structured Query Language)** is the standard language used to communicate with a relational database — to create its structure, insert/change/remove data, retrieve data, and control access to it. SQL commands are broadly divided into five categories, based on what they do:

| Category | Full Form | Purpose | Example Commands |
|---|---|---|---|
| DDL | Data Definition Language | Defines/changes database structure | CREATE, ALTER, DROP, TRUNCATE |
| DML | Data Manipulation Language | Changes actual data | INSERT, UPDATE, DELETE |
| DQL | Data Query Language | Retrieves data | SELECT |
| TCL | Transaction Control Language | Manages transactions | COMMIT, ROLLBACK, SAVEPOINT |
| DCL | Data Control Language | Manages permissions/security | GRANT, REVOKE |

We already covered DDL and DML in detail in Unit I. In this unit, we will cover **data types**, revisit these categories briefly with a complete practical setup, and then go deep into **Joins** and **Functions**.

---

## 2. SQL Data Types

A data type defines what **kind of value** a column can hold. Choosing the correct data type is important for both storage efficiency and data correctness.

### 2.1 Numeric Data Types

| Data Type | Description |
|---|---|
| `INT` / `INTEGER` | Whole numbers (no decimals), e.g., 25, -100 |
| `SMALLINT` | Smaller range whole numbers, uses less storage |
| `BIGINT` | Very large whole numbers |
| `DECIMAL(p,s)` / `NUMERIC(p,s)` | Exact fixed-point numbers. `p` = total digits, `s` = digits after decimal point. Best for money values, since it avoids rounding errors. |
| `FLOAT`, `DOUBLE` | Approximate floating-point numbers, used for scientific calculations where tiny rounding errors are acceptable |

### 2.2 String / Character Data Types

| Data Type | Description |
|---|---|
| `CHAR(n)` | Fixed-length string of exactly `n` characters. If the value is shorter, it is padded with spaces. Good for fixed-size codes (e.g., a 2-letter state code). |
| `VARCHAR(n)` | Variable-length string, up to a maximum of `n` characters. Only uses as much storage as the actual data needs. Most commonly used for names, addresses, etc. |
| `TEXT` | Used for very large blocks of text (like an article or a comment), beyond what VARCHAR is meant for. |

### 2.3 Date and Time Data Types

| Data Type | Description |
|---|---|
| `DATE` | Stores only a calendar date, e.g., `2026-09-24` |
| `TIME` | Stores only a time of day, e.g., `14:30:00` |
| `DATETIME` | Stores both date and time together |
| `TIMESTAMP` | Similar to DATETIME, but usually auto-updates and is timezone-aware in many systems |
| `YEAR` | Stores just a year value |

### 2.4 Other Common Data Types

| Data Type | Description |
|---|---|
| `BOOLEAN` | Stores TRUE/FALSE (in MySQL this is internally stored as `TINYINT(1)`) |
| `BLOB` | Binary Large Object — used to store binary data like images or files |
| `ENUM('a','b','c')` | Restricts a column's value to one from a predefined fixed list of options |

### 2.5 Practical: Using Various Data Types in MySQL

```sql
CREATE DATABASE SQLUnit4;
USE SQLUnit4;

CREATE TABLE Employee (
    emp_id INT PRIMARY KEY,
    emp_code CHAR(5),                     -- fixed length, e.g. 'E0012'
    name VARCHAR(50),
    salary DECIMAL(10,2),
    joining_date DATE,
    last_login DATETIME,
    is_active BOOLEAN,
    department ENUM('IT','HR','Sales','Finance'),
    profile_pic BLOB
);

INSERT INTO Employee (emp_id, emp_code, name, salary, joining_date, last_login, is_active, department)
VALUES (1, 'E0012', 'Rahul Verma', 55000.75, '2023-06-15', '2026-09-24 10:15:00', TRUE, 'IT');

SELECT * FROM Employee;
```

---

## 3. Data Definition Language (DDL) Commands — Quick Recap

Already covered in detail in Unit I. Quick summary table for reference:

```sql
CREATE TABLE Sample (id INT PRIMARY KEY, name VARCHAR(30));   -- create structure
ALTER TABLE Sample ADD COLUMN age INT;                        -- modify structure
TRUNCATE TABLE Sample;                                        -- remove all rows, keep structure
DROP TABLE Sample;                                            -- remove structure entirely
```

---

## 4. Data Manipulation Language (DML) Commands — Quick Recap

Already covered in detail in Unit I. Quick summary:

```sql
INSERT INTO Employee VALUES (...);      -- add data
UPDATE Employee SET salary = 60000 WHERE emp_id = 1;   -- modify data
DELETE FROM Employee WHERE emp_id = 1;  -- remove data
```

---

## 5. Data Query Language (DQL) — SELECT in Detail

The `SELECT` command is the most-used SQL command — it retrieves data. Let's set up a proper sample database first, which we'll use for the rest of this unit (joins, functions, group by).

### 5.1 Setting Up Sample Tables for This Unit

```sql
USE SQLUnit4;

CREATE TABLE Departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(30)
);

CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(50),
    salary DECIMAL(10,2),
    dept_id INT,
    manager_id INT,
    FOREIGN KEY (dept_id) REFERENCES Departments(dept_id)
);

INSERT INTO Departments VALUES
(1, 'IT'), (2, 'HR'), (3, 'Sales');

INSERT INTO Employees VALUES
(101, 'Rahul',  55000, 1, NULL),
(102, 'Sneha',  48000, 1, 101),
(103, 'Anita',  40000, 2, NULL),
(104, 'Vikas',  35000, 2, 103),
(105, 'Manoj',  60000, 3, NULL),
(106, 'Priya',  30000, NULL, NULL);   -- no department assigned yet
```

### 5.2 Basic SELECT Clauses

```sql
-- Select specific columns
SELECT emp_name, salary FROM Employees;

-- Filter rows using WHERE
SELECT * FROM Employees WHERE salary > 40000;

-- Sort results
SELECT * FROM Employees ORDER BY salary DESC;

-- Limit number of rows returned
SELECT * FROM Employees ORDER BY salary DESC LIMIT 3;

-- DISTINCT removes duplicate values
SELECT DISTINCT dept_id FROM Employees;

-- Pattern matching using LIKE
SELECT * FROM Employees WHERE emp_name LIKE 'R%';   -- names starting with R

-- Checking a range using BETWEEN
SELECT * FROM Employees WHERE salary BETWEEN 35000 AND 55000;

-- Checking against a list using IN
SELECT * FROM Employees WHERE dept_id IN (1, 3);

-- Checking for missing values
SELECT * FROM Employees WHERE dept_id IS NULL;
```

---

## 6. Transaction Control Language (TCL) Commands

TCL commands manage **transactions** — a transaction is a group of one or more SQL operations that must all succeed together, or all fail together (this "all-or-nothing" property is called **atomicity**).

| Command | Purpose |
|---|---|
| `COMMIT` | Permanently saves all changes made in the current transaction |
| `ROLLBACK` | Undoes all changes made in the current transaction (since the last commit) |
| `SAVEPOINT` | Creates a named point within a transaction, so you can roll back to only that point, instead of undoing everything |

### 6.1 Practical: TCL Commands in MySQL

```sql
USE SQLUnit4;

START TRANSACTION;

UPDATE Employees SET salary = salary + 5000 WHERE emp_id = 106;

SAVEPOINT after_raise;

DELETE FROM Employees WHERE emp_id = 105;   -- accidentally deleting Manoj!

-- Realize the mistake, undo ONLY back to the savepoint (Manoj comes back)
ROLLBACK TO after_raise;

-- Now permanently save the salary raise for emp_id 106
COMMIT;

SELECT * FROM Employees;
```

After this, Priya's (emp_id 106) salary raise is permanently saved, but Manoj (emp_id 105) is safely still present, because the `ROLLBACK TO after_raise` undid only the accidental delete, not the earlier valid update.

---

## 7. Data Control Language (DCL) Commands

DCL commands control **who can access what** in the database — this is how a Database Administrator manages security.

| Command | Purpose |
|---|---|
| `GRANT` | Gives specific privileges to a user |
| `REVOKE` | Takes away privileges that were previously given |

### 7.1 Practical: DCL Commands in MySQL

```sql
-- Create a new user
CREATE USER 'analyst'@'localhost' IDENTIFIED BY 'Pass@123';

-- Grant only read access on the Employees table
GRANT SELECT ON SQLUnit4.Employees TO 'analyst'@'localhost';

-- Grant multiple privileges at once
GRANT SELECT, UPDATE ON SQLUnit4.Departments TO 'analyst'@'localhost';

FLUSH PRIVILEGES;

-- Later, take away the UPDATE privilege
REVOKE UPDATE ON SQLUnit4.Departments FROM 'analyst'@'localhost';
```

---

## 8. Joins

A **JOIN** is used to combine rows from two or more tables, based on a related column between them. Joins are essential because, as we learned in normalization, well-designed databases split data into multiple related tables — joins are how we bring that related data back together for meaningful queries.

### 8.1 INNER JOIN (also called Equi-Join, when using `=`)

Returns only the rows where there is a **match** in both tables, based on the join condition.

```sql
SELECT e.emp_name, d.dept_name
FROM Employees e
INNER JOIN Departments d ON e.dept_id = d.dept_id;
```

Output:
```
+-----------+------------+
| emp_name  | dept_name  |
+-----------+------------+
| Rahul     | IT         |
| Sneha     | IT         |
| Anita     | HR         |
| Vikas     | HR         |
| Manoj     | Sales      |
+-----------+------------+
```
Notice **Priya is missing** from this result — because her `dept_id` is `NULL` and there's no matching row in `Departments`. This is the key characteristic of an INNER JOIN — it only returns matched rows.

### 8.2 Equi-Join vs Non-Equi-Join

- **Equi-Join**: the join condition uses the **equals (`=`)** operator, like the example above. This is by far the most common type of join.
- **Non-Equi-Join**: the join condition uses any operator **other than equals** — such as `<`, `>`, `<=`, `>=`, `BETWEEN`.

**Example of Non-Equi Join:** Suppose we have a `SalaryGrades` table defining salary ranges for grades, and we want to find which grade each employee falls into.

```sql
CREATE TABLE SalaryGrades (
    grade VARCHAR(5),
    min_salary DECIMAL(10,2),
    max_salary DECIMAL(10,2)
);

INSERT INTO SalaryGrades VALUES
('A', 50000, 100000),
('B', 35000, 49999),
('C', 0, 34999);

-- Non-Equi Join: matching based on a RANGE, not an exact equality
SELECT e.emp_name, e.salary, s.grade
FROM Employees e
JOIN SalaryGrades s ON e.salary BETWEEN s.min_salary AND s.max_salary;
```

Output:
```
+-----------+---------+-------+
| emp_name  | salary  | grade |
+-----------+---------+-------+
| Rahul     | 55000   |   A   |
| Sneha     | 48000   |   B   |
| Anita     | 40000   |   B   |
| Vikas     | 35000   |   B   |
| Manoj     | 60000   |   A   |
| Priya     | 35000   |   B   |
+-----------+---------+-------+
```

### 8.3 LEFT (OUTER) JOIN

Returns **all rows from the left table**, and matching rows from the right table. If there's no match, columns from the right table show `NULL`.

```sql
SELECT e.emp_name, d.dept_name
FROM Employees e
LEFT JOIN Departments d ON e.dept_id = d.dept_id;
```

Output:
```
+-----------+------------+
| emp_name  | dept_name  |
+-----------+------------+
| Rahul     | IT         |
| Sneha     | IT         |
| Anita     | HR         |
| Vikas     | HR         |
| Manoj     | Sales      |
| Priya     | NULL       |    <- kept, even without a matching department
+-----------+------------+
```

### 8.4 RIGHT (OUTER) JOIN

Returns **all rows from the right table**, and matching rows from the left table. This is the mirror image of a LEFT JOIN.

```sql
SELECT e.emp_name, d.dept_name
FROM Employees e
RIGHT JOIN Departments d ON e.dept_id = d.dept_id;
```

This would show all departments, and if any department had zero employees, it would still appear (with `emp_name` as `NULL`) — in our current sample data, every department has employees, so the output looks the same as the INNER JOIN, minus Priya.

### 8.5 FULL OUTER JOIN

Returns **all rows from both tables** — matched rows combined together, plus unmatched rows from either side (with `NULL` filled in for the missing side). 

> **Important MySQL note:** MySQL does **not** directly support the `FULL OUTER JOIN` keyword (unlike Oracle or PostgreSQL). We simulate it in MySQL by combining a `LEFT JOIN` and a `RIGHT JOIN` using `UNION`.

```sql
SELECT e.emp_name, d.dept_name
FROM Employees e
LEFT JOIN Departments d ON e.dept_id = d.dept_id
UNION
SELECT e.emp_name, d.dept_name
FROM Employees e
RIGHT JOIN Departments d ON e.dept_id = d.dept_id;
```

### 8.6 SELF JOIN

A **self join** is when a table is joined **with itself**. This is useful when a table has a relationship pointing back to itself — like our `Employees` table, where `manager_id` refers to another `emp_id` in the same table.

```sql
-- Find each employee along with the name of their manager
SELECT e.emp_name AS employee, m.emp_name AS manager
FROM Employees e
LEFT JOIN Employees m ON e.manager_id = m.emp_id;
```

Output:
```
+-----------+-----------+
| employee  | manager   |
+-----------+-----------+
| Rahul     | NULL      |
| Sneha     | Rahul     |
| Anita     | NULL      |
| Vikas     | Anita     |
| Manoj     | NULL      |
| Priya     | NULL      |
+-----------+-----------+
```
Here, the same `Employees` table is used twice in the query (given two different aliases, `e` and `m`), which is exactly what makes this a self join.

### 8.7 CROSS JOIN

A **CROSS JOIN** combines **every row** of the first table with **every row** of the second table (this is called a Cartesian Product). It doesn't need any join condition (`ON`) at all. It's rarely used in real applications on its own, but is useful for generating combinations.

```sql
SELECT e.emp_name, d.dept_name
FROM Employees e
CROSS JOIN Departments d;
```
With 6 employees and 3 departments, this would produce **6 × 3 = 18 rows** — every possible employee-department pairing, regardless of whether that pairing is real.

---

## 9. Aggregate Functions

**Aggregate functions** perform a calculation on a **set/group of rows** and return a **single summarized value**.

| Function | Purpose |
|---|---|
| `COUNT()` | Counts the number of rows |
| `SUM()` | Adds up numeric values |
| `AVG()` | Calculates the average |
| `MIN()` | Finds the smallest value |
| `MAX()` | Finds the largest value |

### 9.1 Practical: Aggregate Functions in MySQL

```sql
-- Total number of employees
SELECT COUNT(*) AS total_employees FROM Employees;

-- Total salary paid across the whole company
SELECT SUM(salary) AS total_salary FROM Employees;

-- Average salary
SELECT AVG(salary) AS average_salary FROM Employees;

-- Highest and lowest salary
SELECT MAX(salary) AS highest, MIN(salary) AS lowest FROM Employees;

-- Counting only non-null department assignments
SELECT COUNT(dept_id) AS employees_with_dept FROM Employees;
```

Sample output for the average query:
```
+----------------+
| average_salary |
+----------------+
|   44666.67     |
+----------------+
```

---

## 10. GROUP BY Clause

The `GROUP BY` clause groups rows that share the same value in a specified column, so that aggregate functions can be applied **separately to each group**, instead of the whole table at once.

```sql
-- Total salary paid, per department
SELECT dept_id, SUM(salary) AS dept_total_salary
FROM Employees
GROUP BY dept_id;
```

Output:
```
+---------+--------------------+
| dept_id | dept_total_salary  |
+---------+--------------------+
|    1    |      103000        |
|    2    |       75000        |
|    3    |       60000        |
|  NULL   |       30000        |    <- Priya's ungrouped salary
+---------+--------------------+
```

### 10.1 The HAVING Clause

`WHERE` cannot be used to filter based on an aggregate result (like "total salary > 70000"), because `WHERE` filters rows **before** grouping happens. For filtering **after** grouping, we use `HAVING`.

```sql
-- Show only departments where the total salary paid exceeds 70000
SELECT dept_id, SUM(salary) AS dept_total_salary
FROM Employees
GROUP BY dept_id
HAVING SUM(salary) > 70000;
```

Output:
```
+---------+--------------------+
| dept_id | dept_total_salary  |
+---------+--------------------+
|    1    |      103000        |
|    2    |       75000        |
+---------+--------------------+
```

---

## 11. Mathematical Functions

MySQL provides many built-in math functions for numeric calculations.

```sql
SELECT ROUND(45.678, 2);     -- Rounds to 2 decimal places -> 45.68
SELECT CEIL(45.1);           -- Rounds UP to nearest integer -> 46
SELECT FLOOR(45.9);          -- Rounds DOWN to nearest integer -> 45
SELECT ABS(-25);             -- Absolute (positive) value -> 25
SELECT POWER(2, 3);          -- 2 raised to the power 3 -> 8
SELECT SQRT(81);             -- Square root -> 9
SELECT MOD(10, 3);           -- Remainder of division -> 1
```

Practical use with a real table:
```sql
-- Give every employee a 10% bonus, rounded to 2 decimal places
SELECT emp_name, salary, ROUND(salary * 0.10, 2) AS bonus
FROM Employees;
```

---

## 12. String Functions

String functions let us manipulate and format text data.

```sql
SELECT UPPER('rahul verma');           -- Converts to uppercase -> 'RAHUL VERMA'
SELECT LOWER('RAHUL VERMA');           -- Converts to lowercase -> 'rahul verma'
SELECT LENGTH('Rahul');                -- Number of characters -> 5
SELECT CONCAT('Rahul', ' ', 'Verma');  -- Joins strings together -> 'Rahul Verma'
SELECT SUBSTRING('Database', 1, 4);    -- Extracts part of a string -> 'Data'
SELECT TRIM('   Rahul   ');            -- Removes leading/trailing spaces -> 'Rahul'
SELECT REPLACE('I like Java', 'Java', 'SQL');  -- Replaces text -> 'I like SQL'
SELECT LEFT('Database', 4);            -- First 4 characters -> 'Data'
SELECT RIGHT('Database', 4);           -- Last 4 characters -> 'base'
```

Practical use with a real table:
```sql
-- Display employee names in uppercase, along with the first 3 letters of their department
SELECT UPPER(e.emp_name) AS emp_name_caps, LEFT(d.dept_name, 3) AS dept_short
FROM Employees e
JOIN Departments d ON e.dept_id = d.dept_id;
```

Output:
```
+---------------+-------------+
| emp_name_caps | dept_short  |
+---------------+-------------+
| RAHUL         |    IT       |
| SNEHA         |    IT       |
| ANITA         |    HR       |
| VIKAS         |    HR       |
| MANOJ         |    SAL      |
+---------------+-------------+
```

---

## Summary of Unit IV

- SQL commands are grouped into **DDL, DML, DQL, TCL, and DCL**.
- **Data types** define what kind of value each column can store — numeric, string, date/time, and others like BOOLEAN, BLOB, ENUM.
- **TCL** (`COMMIT`, `ROLLBACK`, `SAVEPOINT`) manages transactions so operations succeed or fail as a whole.
- **DCL** (`GRANT`, `REVOKE`) manages user privileges and security.
- **Joins** combine data from multiple tables: **INNER JOIN** (matches only), **Equi/Non-Equi Join** (based on the comparison operator used), **LEFT/RIGHT/FULL OUTER JOIN** (keep unmatched rows too), **SELF JOIN** (table joined with itself), **CROSS JOIN** (all possible combinations).
- **Aggregate functions** (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) summarize data, and **GROUP BY**/`HAVING` let us summarize data **per group** and filter those group results.
- **Math functions** (`ROUND`, `CEIL`, `FLOOR`, `ABS`, `POWER`, `SQRT`, `MOD`) and **string functions** (`UPPER`, `LOWER`, `CONCAT`, `SUBSTRING`, `TRIM`, `REPLACE`, `LEFT`, `RIGHT`) help process and format data directly within SQL queries.
