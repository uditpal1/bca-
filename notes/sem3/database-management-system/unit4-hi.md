# UNIT – IV: SQL — Commands, Data Types, Joins aur Functions

---

## 1. SQL ka Introduction

**SQL (Structured Query Language)** wo standard language hai jo relational database ke saath communicate karne ke liye use hoti hai — uski structure create karne, data insert/change/remove karne, data retrieve karne, aur usme access control karne ke liye. SQL commands ko broadly five categories me divide kiya jaata hai, unke kaam ke aadhar pe:

| Category | Full Form | Purpose | Example Commands |
|---|---|---|---|
| DDL | Data Definition Language | Database structure define/change karta hai | CREATE, ALTER, DROP, TRUNCATE |
| DML | Data Manipulation Language | Actual data change karta hai | INSERT, UPDATE, DELETE |
| DQL | Data Query Language | Data retrieve karta hai | SELECT |
| TCL | Transaction Control Language | Transactions manage karta hai | COMMIT, ROLLBACK, SAVEPOINT |
| DCL | Data Control Language | Permissions/security manage karta hai | GRANT, REVOKE |

Humne DDL aur DML already Unit I me detail me cover kiye hain. Is unit me, hum **data types** cover karenge, in categories ko briefly ek complete practical setup ke saath revisit karenge, aur phir **Joins** aur **Functions** me deep jaayenge.

---

## 2. SQL Data Types

Data type define karta hai ki ek column me **kis type** ki value hold ho sakti hai. Correct data type choose karna storage efficiency aur data correctness dono ke liye important hai.

### 2.1 Numeric Data Types

| Data Type | Description |
|---|---|
| `INT` / `INTEGER` | Whole numbers (decimals nahi), jaise 25, -100 |
| `SMALLINT` | Chhoti range wale whole numbers, kam storage use karte hain |
| `BIGINT` | Bahut bade whole numbers |
| `DECIMAL(p,s)` / `NUMERIC(p,s)` | Exact fixed-point numbers. `p` = total digits, `s` = decimal point ke baad ke digits. Money values ke liye best hai, kyunki rounding errors avoid karta hai. |
| `FLOAT`, `DOUBLE` | Approximate floating-point numbers, scientific calculations ke liye use hote hain jahan chhoti rounding errors acceptable hain |

### 2.2 String / Character Data Types

| Data Type | Description |
|---|---|
| `CHAR(n)` | Fixed-length string, exactly `n` characters ki. Agar value chhoti hai, spaces se pad ho jaati hai. Fixed-size codes ke liye achhi hai (jaise, ek 2-letter state code). |
| `VARCHAR(n)` | Variable-length string, maximum `n` characters tak. Sirf itna storage use karti hai jitna actual data ko chahiye. Names, addresses waghera ke liye sabse common use hoti hai. |
| `TEXT` | Bahut large blocks of text (jaise ek article ya comment) ke liye use hota hai, jo VARCHAR se zyada hote hain. |

### 2.3 Date aur Time Data Types

| Data Type | Description |
|---|---|
| `DATE` | Sirf ek calendar date store karta hai, jaise `2026-09-24` |
| `TIME` | Sirf din ka ek time store karta hai, jaise `14:30:00` |
| `DATETIME` | Date aur time dono saath store karta hai |
| `TIMESTAMP` | DATETIME jaisa hi hai, lekin usually auto-update hota hai aur kai systems me timezone-aware hota hai |
| `YEAR` | Sirf ek year value store karta hai |

### 2.4 Doosre Common Data Types

| Data Type | Description |
|---|---|
| `BOOLEAN` | TRUE/FALSE store karta hai (MySQL me ye internally `TINYINT(1)` ki tarah store hota hai) |
| `BLOB` | Binary Large Object — images ya files jaisa binary data store karne ke liye use hota hai |
| `ENUM('a','b','c')` | Column ki value ko predefined fixed list of options me se ek tak restrict karta hai |

### 2.5 Practical: MySQL me Alag-Alag Data Types Use Karna

```sql
CREATE DATABASE SQLUnit4;
USE SQLUnit4;

CREATE TABLE Employee (
    emp_id INT PRIMARY KEY,
    emp_code CHAR(5),                     -- fixed length, jaise 'E0012'
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

Ye Unit I me detail me already cover ho chuke hain. Reference ke liye quick summary table:

```sql
CREATE TABLE Sample (id INT PRIMARY KEY, name VARCHAR(30));   -- structure create karo
ALTER TABLE Sample ADD COLUMN age INT;                        -- structure modify karo
TRUNCATE TABLE Sample;                                        -- saari rows remove karo, structure rakho
DROP TABLE Sample;                                            -- structure ko poori tarah remove karo
```

---

## 4. Data Manipulation Language (DML) Commands — Quick Recap

Ye Unit I me detail me already cover ho chuke hain. Quick summary:

```sql
INSERT INTO Employee VALUES (...);      -- data add karo
UPDATE Employee SET salary = 60000 WHERE emp_id = 1;   -- data modify karo
DELETE FROM Employee WHERE emp_id = 1;  -- data remove karo
```

---

## 5. Data Query Language (DQL) — SELECT Detail Me

`SELECT` command sabse zyada use hone wala SQL command hai — ye data retrieve karta hai. Chalo pehle proper sample tables set up karte hain, jinhe hum is unit ke baaki part me use karenge (joins, functions, group by).

### 5.1 Is Unit ke liye Sample Tables Set Up Karna

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
(106, 'Priya',  30000, NULL, NULL);   -- abhi tak koi department assign nahi hua
```

### 5.2 Basic SELECT Clauses

```sql
-- Specific columns select karo
SELECT emp_name, salary FROM Employees;

-- WHERE use karke rows filter karo
SELECT * FROM Employees WHERE salary > 40000;

-- Results ko sort karo
SELECT * FROM Employees ORDER BY salary DESC;

-- Return hone wali rows ki number limit karo
SELECT * FROM Employees ORDER BY salary DESC LIMIT 3;

-- DISTINCT duplicate values remove karta hai
SELECT DISTINCT dept_id FROM Employees;

-- LIKE use karke pattern matching
SELECT * FROM Employees WHERE emp_name LIKE 'R%';   -- R se shuru hone wale names

-- BETWEEN use karke ek range check karna
SELECT * FROM Employees WHERE salary BETWEEN 35000 AND 55000;

-- IN use karke ek list ke against check karna
SELECT * FROM Employees WHERE dept_id IN (1, 3);

-- Missing values check karna
SELECT * FROM Employees WHERE dept_id IS NULL;
```

---

## 6. Transaction Control Language (TCL) Commands

TCL commands **transactions** manage karte hain — ek transaction ek ya zyada SQL operations ka group hota hai jinhe saath me succeed hona chahiye, ya saath me fail hona chahiye (ye "all-or-nothing" property **atomicity** kehlati hai).

| Command | Purpose |
|---|---|
| `COMMIT` | Current transaction me hue saare changes ko permanently save karta hai |
| `ROLLBACK` | Current transaction me hue saare changes ko undo karta hai (last commit ke baad se) |
| `SAVEPOINT` | Ek transaction ke andar ek named point create karta hai, taaki tum sirf us point tak rollback kar sako, saara kuch undo karne ke bajaye |

### 6.1 Practical: MySQL me TCL Commands

```sql
USE SQLUnit4;

START TRANSACTION;

UPDATE Employees SET salary = salary + 5000 WHERE emp_id = 106;

SAVEPOINT after_raise;

DELETE FROM Employees WHERE emp_id = 105;   -- galti se Manoj delete ho gaya!

-- Galti realize karo, sirf savepoint tak wapas undo karo (Manoj wapas aa jaata hai)
ROLLBACK TO after_raise;

-- Ab emp_id 106 ki salary raise permanently save karo
COMMIT;

SELECT * FROM Employees;
```

Iske baad, Priya (emp_id 106) ki salary raise permanently save ho jaati hai, lekin Manoj (emp_id 105) safely abhi bhi present hai, kyunki `ROLLBACK TO after_raise` ne sirf accidental delete undo kiya, pehle wala valid update nahi.

---

## 7. Data Control Language (DCL) Commands

DCL commands control karte hain ki **kaun kya access kar sakta hai** database me — ye hai kaise ek Database Administrator security manage karta hai.

| Command | Purpose |
|---|---|
| `GRANT` | Ek user ko specific privileges deta hai |
| `REVOKE` | Pehle di gayi privileges wapas leta hai |

### 7.1 Practical: MySQL me DCL Commands

```sql
-- Ek naya user banao
CREATE USER 'analyst'@'localhost' IDENTIFIED BY 'Pass@123';

-- Employees table pe sirf read access grant karo
GRANT SELECT ON SQLUnit4.Employees TO 'analyst'@'localhost';

-- Ek saath multiple privileges grant karo
GRANT SELECT, UPDATE ON SQLUnit4.Departments TO 'analyst'@'localhost';

FLUSH PRIVILEGES;

-- Baad me, UPDATE privilege wapas le lo
REVOKE UPDATE ON SQLUnit4.Departments FROM 'analyst'@'localhost';
```

---

## 8. Joins

Ek **JOIN** do ya zyada tables ki rows ko combine karne ke liye use hota hai, unke beech ke ek related column ke aadhar pe. Joins essential hain kyunki, jaisa humne normalization me seekha, well-designed databases data ko multiple related tables me split karte hain — joins hi hain jinse hum us related data ko wapas meaningful queries ke liye jodte hain.

### 8.1 INNER JOIN (Equi-Join bhi kehte hain, jab `=` use ho)

Sirf wo rows return karta hai jahan dono tables me **match** ho, join condition ke aadhar pe.

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
Dekho **Priya is result me missing hai** — kyunki uska `dept_id` `NULL` hai aur `Departments` me koi matching row nahi hai. Ye INNER JOIN ki key characteristic hai — ye sirf matched rows return karta hai.

### 8.2 Equi-Join vs Non-Equi-Join

- **Equi-Join**: join condition me **equals (`=`)** operator use hota hai, jaisa upar wala example. Ye by far sabse common type ka join hai.
- **Non-Equi-Join**: join condition me equals ke **alawa koi bhi** operator use hota hai — jaise `<`, `>`, `<=`, `>=`, `BETWEEN`.

**Non-Equi Join ka Example:** Maan lo humare paas ek `SalaryGrades` table hai jo grades ke liye salary ranges define karti hai, aur hum jaanna chahte hain har employee kaunse grade me aata hai.

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

-- Non-Equi Join: ek RANGE ke aadhar pe match, exact equality pe nahi
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

**Left table ki saari rows** return karta hai, aur right table se matching rows. Agar koi match na ho, right table ke columns `NULL` dikhate hain.

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
| Priya     | NULL       |    <- rakhi gayi, matching department na hone ke baad bhi
+-----------+------------+
```

### 8.4 RIGHT (OUTER) JOIN

**Right table ki saari rows** return karta hai, aur left table se matching rows. Ye LEFT JOIN ka mirror image hai.

```sql
SELECT e.emp_name, d.dept_name
FROM Employees e
RIGHT JOIN Departments d ON e.dept_id = d.dept_id;
```

Ye saare departments dikhaayega, aur agar kisi department me zero employees hote, wo bhi appear karta (`emp_name` `NULL` ke saath) — humare current sample data me, har department me employees hain, isliye output INNER JOIN jaisa hi lagta hai, Priya ke bina.

### 8.5 FULL OUTER JOIN

Dono tables ki **saari rows** return karta hai — matched rows saath combine, plus unmatched rows kisi bhi side se (missing side me `NULL` fill karke).

> **Important MySQL note:** MySQL **`FULL OUTER JOIN`** keyword ko directly support **nahi** karta (Oracle ya PostgreSQL ke ulat). Hum ise MySQL me `LEFT JOIN` aur `RIGHT JOIN` ko `UNION` ke saath combine karke simulate karte hain.

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

Ek **self join** tab hota hai jab ek table **khud ke saath** join ki jaati hai. Ye tab useful hai jab ek table me apne aap ki taraf point karne wala relationship ho — jaise humari `Employees` table, jahan `manager_id` same table ke ek doosre `emp_id` ko refer karta hai.

```sql
-- Har employee ko uske manager ke naam ke saath dhundo
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
Yahan, same `Employees` table query me do baar use hui hai (do alag aliases, `e` aur `m` ke saath), yahi exactly hai jo ise ek self join banata hai.

### 8.7 CROSS JOIN

Ek **CROSS JOIN** pehli table ki **har** row ko doosri table ki **har** row ke saath combine karta hai (isse Cartesian Product kehte hain). Isme koi join condition (`ON`) ki zaroorat nahi hoti. Real applications me akela shayad hi kabhi use hota hai, lekin combinations generate karne ke liye useful hai.

```sql
SELECT e.emp_name, d.dept_name
FROM Employees e
CROSS JOIN Departments d;
```
6 employees aur 3 departments ke saath, ye **6 × 3 = 18 rows** produce karega — har possible employee-department pairing, chahe wo pairing real ho ya nahi.

---

## 9. Aggregate Functions

**Aggregate functions** ek **rows ke set/group** pe ek calculation perform karti hain aur ek **single summarized value** return karti hain.

| Function | Purpose |
|---|---|
| `COUNT()` | Rows ki number count karta hai |
| `SUM()` | Numeric values add karta hai |
| `AVG()` | Average calculate karta hai |
| `MIN()` | Sabse chhoti value dhundta hai |
| `MAX()` | Sabse badi value dhundta hai |

### 9.1 Practical: MySQL me Aggregate Functions

```sql
-- Employees ki total number
SELECT COUNT(*) AS total_employees FROM Employees;

-- Poori company me diya gaya total salary
SELECT SUM(salary) AS total_salary FROM Employees;

-- Average salary
SELECT AVG(salary) AS average_salary FROM Employees;

-- Highest aur lowest salary
SELECT MAX(salary) AS highest, MIN(salary) AS lowest FROM Employees;

-- Sirf non-null department assignments count karna
SELECT COUNT(dept_id) AS employees_with_dept FROM Employees;
```

Average query ka sample output:
```
+----------------+
| average_salary |
+----------------+
|   44666.67     |
+----------------+
```

---

## 10. GROUP BY Clause

`GROUP BY` clause un rows ko group karta hai jo ek specified column me same value share karte hain, taaki aggregate functions **har group pe alag-alag** apply ho sakein, poori table pe ek saath apply karne ke bajaye.

```sql
-- Har department ke liye diya gaya total salary
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
|  NULL   |       30000        |    <- Priya ki ungrouped salary
+---------+--------------------+
```

### 10.1 HAVING Clause

`WHERE` ko aggregate result ke aadhar pe filter karne ke liye use nahi kiya ja sakta (jaise "total salary > 70000"), kyunki `WHERE` grouping hone **se pehle** rows filter karta hai. Grouping ke **baad** filter karne ke liye, hum `HAVING` use karte hain.

```sql
-- Sirf wo departments dikhao jahan total salary 70000 se zyada hai
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

MySQL numeric calculations ke liye kai built-in math functions provide karta hai.

```sql
SELECT ROUND(45.678, 2);     -- 2 decimal places tak round karta hai -> 45.68
SELECT CEIL(45.1);           -- Nearest integer tak UPAR round karta hai -> 46
SELECT FLOOR(45.9);          -- Nearest integer tak NEECHE round karta hai -> 45
SELECT ABS(-25);             -- Absolute (positive) value -> 25
SELECT POWER(2, 3);          -- 2 ki power 3 -> 8
SELECT SQRT(81);             -- Square root -> 9
SELECT MOD(10, 3);           -- Division ka remainder -> 1
```

Ek real table ke saath practical use:
```sql
-- Har employee ko 10% bonus do, 2 decimal places tak round karke
SELECT emp_name, salary, ROUND(salary * 0.10, 2) AS bonus
FROM Employees;
```

---

## 12. String Functions

String functions humein text data manipulate aur format karne dete hain.

```sql
SELECT UPPER('rahul verma');           -- Uppercase me convert karta hai -> 'RAHUL VERMA'
SELECT LOWER('RAHUL VERMA');           -- Lowercase me convert karta hai -> 'rahul verma'
SELECT LENGTH('Rahul');                -- Characters ki number -> 5
SELECT CONCAT('Rahul', ' ', 'Verma');  -- Strings ko jodta hai -> 'Rahul Verma'
SELECT SUBSTRING('Database', 1, 4);    -- String ka part extract karta hai -> 'Data'
SELECT TRIM('   Rahul   ');            -- Leading/trailing spaces remove karta hai -> 'Rahul'
SELECT REPLACE('I like Java', 'Java', 'SQL');  -- Text replace karta hai -> 'I like SQL'
SELECT LEFT('Database', 4);            -- Pehle 4 characters -> 'Data'
SELECT RIGHT('Database', 4);           -- Aakhri 4 characters -> 'base'
```

Ek real table ke saath practical use:
```sql
-- Employee names uppercase me dikhao, department ke pehle 3 letters ke saath
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

## Unit IV ka Summary

- SQL commands ko group kiya jaata hai **DDL, DML, DQL, TCL, aur DCL** me.
- **Data types** define karte hain har column me kis type ki value store ho sakti hai — numeric, string, date/time, aur BOOLEAN, BLOB, ENUM jaise doosre.
- **TCL** (`COMMIT`, `ROLLBACK`, `SAVEPOINT`) transactions manage karta hai taaki operations ek saath succeed ya fail hon.
- **DCL** (`GRANT`, `REVOKE`) user privileges aur security manage karta hai.
- **Joins** multiple tables ka data combine karte hain: **INNER JOIN** (sirf matches), **Equi/Non-Equi Join** (use hone wale comparison operator ke aadhar pe), **LEFT/RIGHT/FULL OUTER JOIN** (unmatched rows bhi rakhte hain), **SELF JOIN** (table khud ke saath joined), **CROSS JOIN** (saare possible combinations).
- **Aggregate functions** (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) data summarize karte hain, aur **GROUP BY**/`HAVING` humein data **per group** summarize karne aur un group results ko filter karne dete hain.
- **Math functions** (`ROUND`, `CEIL`, `FLOOR`, `ABS`, `POWER`, `SQRT`, `MOD`) aur **string functions** (`UPPER`, `LOWER`, `CONCAT`, `SUBSTRING`, `TRIM`, `REPLACE`, `LEFT`, `RIGHT`) SQL queries ke andar hi data process aur format karne me help karte hain.
