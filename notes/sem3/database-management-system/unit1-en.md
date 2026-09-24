# UNIT I — INTRODUCTION TO DATABASE SYSTEMS

====================================================================
SECTION 1.1 — PURPOSE OF THE DATABASE SYSTEM
====================================================================

WHAT IS DATA?
Data means raw facts and figures. Example: "Ravi", "20", "IT".
Data alone has no meaning until we process it.

WHAT IS INFORMATION?
Information is processed data that has meaning.
Example: "Ravi is 20 years old and studies in IT department."

WHAT IS A DATABASE?
A database is an organized collection of related data stored in 
one place so that it can be easily accessed, managed, and updated.

Example: A college database stores data about students, teachers, 
courses, marks, fees, etc.

--------------------------------------------------------------------
WHY DO WE NEED A DATABASE SYSTEM? (Problems with File System)
--------------------------------------------------------------------

Before databases, data was stored in simple files (like .txt or 
Excel). This was called a FILE SYSTEM. It had many problems:

1. DATA REDUNDANCY
   Same data was stored in multiple files. 
   Example: Student name stored in marks file AND fees file.
   This wastes storage space.

2. DATA INCONSISTENCY
   If student name changes in one file but not in another, 
   the data becomes inconsistent (two different values for 
   the same thing).

3. DIFFICULTY IN ACCESSING DATA
   To get a simple report (like "all students with marks > 80"), 
   a programmer had to write a whole new program every time.

4. DATA ISOLATION
   Data was scattered in different files and different formats. 
   Hard to combine them.

5. INTEGRITY PROBLEMS
   No way to enforce rules like "marks must be between 0 and 100".
   Bad data could enter easily.

6. ATOMICITY PROBLEMS
   If a program crashed in the middle of updating data, the data 
   was left half-updated (broken state).

7. CONCURRENT ACCESS PROBLEMS
   If two users updated the same file at the same time, 
   one update could overwrite the other.

8. SECURITY PROBLEMS
   No proper way to give different access to different users. 
   Either everyone could read everything, or nothing.

--------------------------------------------------------------------
WHAT IS A DBMS?
--------------------------------------------------------------------

DBMS = Database Management System.

It is software that sits between the user and the actual data. 
It stores data centrally, controls access, enforces rules, and 
allows many users to work at the same time.

Examples of DBMS: MySQL, Oracle, PostgreSQL, SQL Server, MongoDB.

--------------------------------------------------------------------
PURPOSE (USES) OF A DBMS
--------------------------------------------------------------------

1. Store large amounts of data safely on disk.
2. Retrieve data quickly using queries (SQL).
3. Avoid duplication of data (redundancy control).
4. Keep data consistent across all users.
5. Allow many users to share the same data.
6. Control who can read/write what (security).
7. Recover data after a crash (recovery).
8. Enforce rules automatically (constraints).
9. Support concurrent access (many users at once).
10. Provide a simple language (SQL) to work with data.

--------------------------------------------------------------------
MYSQL PRACTICAL — CREATE YOUR FIRST DATABASE
--------------------------------------------------------------------

-- Step 1: Open terminal and connect to MySQL
-- Command (run in terminal, not in MySQL):
-- mysql -u root -p
-- (Then type your password)

-- Step 2: Show all existing databases
SHOW DATABASES;

-- Step 3: Create a new database
CREATE DATABASE college;

-- Step 4: Use that database
USE college;

-- Step 5: Confirm which database is active
SELECT DATABASE();

-- Step 6: See how the database was created (DDL stored in metadata)
SHOW CREATE DATABASE college;

-- Step 7: Delete the database if not needed
-- DROP DATABASE college;


====================================================================
SECTION 1.2 — DATA ABSTRACTION (THREE LEVELS)
====================================================================

WHAT IS DATA ABSTRACTION?

Abstraction means "hiding the complex details and showing only 
what is necessary".

In a DBMS, data is shown at THREE LEVELS. Each level hides the 
details of the level below it. This is called the 
THREE-SCHEMA ARCHITECTURE.

--------------------------------------------------------------------
LEVEL 1 — PHYSICAL LEVEL (Lowest / Internal Level)
--------------------------------------------------------------------

- This is HOW the data is actually stored on the disk.
- Talks about bytes, blocks, files, indexes, pointers.
- Only the DBMS internal code and DBAs deal with this.
- A normal user never sees this level.

Example: "Student data is stored in a file called student.dat 
at disk block 4521, using B+ tree indexing on roll_no."

--------------------------------------------------------------------
LEVEL 2 — LOGICAL LEVEL (Middle / Conceptual Level)
--------------------------------------------------------------------

- This describes WHAT data is stored and WHAT relationships exist.
- Talks about tables, columns, data types, keys.
- Used by DBAs and application programmers.
- This is the level most people mean when they say "database design".

Example: "There is a table Student with columns roll_no (INT), 
name (VARCHAR), dept (VARCHAR). roll_no is the primary key."

--------------------------------------------------------------------
LEVEL 3 — VIEW LEVEL (Highest / External Level)
--------------------------------------------------------------------

- This describes what EACH USER sees.
- Different users see different parts of the same database.
- Hides the rest for security and simplicity.
- Also called "external schema" or "user view".

Example: A clerk in the accounts office can only see 
"roll_no, name, fees_paid". They cannot see marks.

--------------------------------------------------------------------
PICTURE OF THE THREE LEVELS
--------------------------------------------------------------------

     ┌───────────────────────────────────┐
     │  View 1  │  View 2  │  View 3    │  ← View Level (what users see)
     ├───────────────────────────────────┤
     │      Logical Schema               │  ← Logical Level (tables & keys)
     ├───────────────────────────────────┤
     │      Physical Schema              │  ← Physical Level (files & blocks)
     └───────────────────────────────────┘
              Actual Data on Disk

--------------------------------------------------------------------
MYSQL PRACTICAL — SEE ALL THREE LEVELS IN ACTION
--------------------------------------------------------------------

-- LOGICAL LEVEL: create a table with structure
CREATE TABLE student (
   roll_no INT PRIMARY KEY,
   name VARCHAR(50),
   dept VARCHAR(20),
   marks INT
);

-- PHYSICAL LEVEL: see how MySQL stores it internally
SHOW CREATE TABLE student;
-- This shows the exact SQL MySQL uses to store table structure

-- Add an index (physical storage change)
CREATE INDEX idx_name ON student(name);
-- Indexes are physical-level details — users never see them

-- VIEW LEVEL: create different views for different users
CREATE VIEW student_public AS
SELECT roll_no, name FROM student;   -- hides marks & dept

CREATE VIEW student_marks AS
SELECT roll_no, marks FROM student;  -- for teachers only

-- A user with only view access sees only their view
SELECT * FROM student_public;
SELECT * FROM student_marks;

-- Drop views if needed
-- DROP VIEW student_public;


====================================================================
SECTION 1.3 — DATA MODELS
====================================================================

WHAT IS A DATA MODEL?

A data model is a way to describe:
- What data is stored
- How data items relate to each other
- What rules (constraints) apply to the data

Think of it as a "blueprint" of the database.

--------------------------------------------------------------------
TYPES OF DATA MODELS
--------------------------------------------------------------------

1. HIERARCHICAL MODEL
   - Data arranged in a tree (parent-child).
   - Each child has only ONE parent.
   - Example: Company → Departments → Employees.
   - Problem: Cannot easily represent many-to-many relationships.
   - Used in old IBM systems (IMS).

2. NETWORK MODEL
   - Data arranged as a graph.
   - A child can have MULTIPLE parents.
   - Better than hierarchical but complex to use.
   - Used in IDMS, CODASYL.

3. RELATIONAL MODEL
   - Data stored in TABLES (rows + columns).
   - Relationships shown using common columns (keys).
   - Simple to understand and query (SQL).
   - Used by MySQL, Oracle, PostgreSQL, SQL Server.
   - MOST WIDELY USED today.

4. ENTITY-RELATIONSHIP (ER) MODEL
   - Used for DESIGN (not storage).
   - Shows entities (things) and relationships between them.
   - Helps in planning the database before creating tables.

5. OBJECT-ORIENTED MODEL
   - Data and methods (functions) stored together as objects.
   - Supports inheritance, encapsulation.
   - Example: ObjectStore, Versant.

6. SEMI-STRUCTURED MODEL
   - No fixed schema.
   - Data is self-describing (like XML, JSON).
   - Used in NoSQL databases like MongoDB, CouchDB.

--------------------------------------------------------------------
MYSQL PRACTICAL — RELATIONAL MODEL IN ACTION
--------------------------------------------------------------------

-- A relational table: rows = records, columns = fields
CREATE TABLE department (
   dept_id INT PRIMARY KEY,
   dept_name VARCHAR(30)
);

CREATE TABLE student (
   roll_no INT PRIMARY KEY,
   name VARCHAR(50),
   dept_id INT,
   FOREIGN KEY (dept_id) REFERENCES department(dept_id)
);

-- Insert sample data
INSERT INTO department VALUES (1,'IT'), (2,'HR'), (3,'FIN');
INSERT INTO student VALUES 
   (101,'Ravi',1),
   (102,'Priya',2),
   (103,'Arjun',1);

-- Relationship shown by joining two tables
SELECT s.name, d.dept_name
FROM student s
JOIN department d ON s.dept_id = d.dept_id;


====================================================================
SECTION 1.4 — DATA INDEPENDENCE
====================================================================

WHAT IS DATA INDEPENDENCE?

Data independence means:
"Change one level of the schema WITHOUT changing the level above it."

It protects users and applications from changes happening behind 
the scenes in the database structure.

There are TWO types:

--------------------------------------------------------------------
1. PHYSICAL DATA INDEPENDENCE
--------------------------------------------------------------------

Definition: We can change the PHYSICAL storage (how data is stored) 
without changing the LOGICAL schema (tables, columns).

Examples of physical changes:
- Adding an index
- Changing file format
- Moving data to a different disk
- Using a new compression method

If physical independence is achieved, none of these changes 
affect the application programs or the logical schema.

--------------------------------------------------------------------
2. LOGICAL DATA INDEPENDENCE
--------------------------------------------------------------------

Definition: We can change the LOGICAL schema (tables, columns) 
without changing the VIEWS or application programs.

Examples of logical changes:
- Adding a new column to a table
- Splitting a table into two
- Merging two tables into one

If logical independence is achieved, existing views and 
applications keep working even after schema changes.

--------------------------------------------------------------------
WHY IS DATA INDEPENDENCE IMPORTANT?
--------------------------------------------------------------------

- Saves money: no need to rewrite applications for every change.
- Saves time: DBAs can tune the database freely.
- Increases reliability: fewer bugs when schema changes.
- Makes system flexible and easier to maintain.

Note: Physical independence is easier to achieve. 
Logical independence is harder.

--------------------------------------------------------------------
MYSQL PRACTICAL — DATA INDEPENDENCE IN ACTION
--------------------------------------------------------------------

-- Set up sample table
CREATE TABLE student (
   roll_no INT PRIMARY KEY,
   name VARCHAR(50),
   marks INT
);

INSERT INTO student VALUES (1,'Ravi',85),(2,'Priya',78);

-- Create a view (application depends on this)
CREATE VIEW top_students AS
SELECT name, marks FROM student WHERE marks > 80;

-- PHYSICAL CHANGE: Add an index — no application breaks
CREATE INDEX idx_marks ON student(marks);

-- View still works fine
SELECT * FROM top_students;

-- LOGICAL CHANGE: Add a new column — no application breaks
ALTER TABLE student ADD COLUMN email VARCHAR(60);

-- View still works fine (it only selects name and marks)
SELECT * FROM top_students;


====================================================================
SECTION 1.5 — DATA DEFINITION LANGUAGE (DDL)
====================================================================

WHAT IS DDL?

DDL = Data Definition Language.

It is the set of SQL commands used to DEFINE and MODIFY 
the STRUCTURE of the database (tables, views, indexes).

DDL commands change the SCHEMA, not the data inside.

--------------------------------------------------------------------
MAIN DDL COMMANDS
--------------------------------------------------------------------

1. CREATE   → create new objects (table, view, index, database)
2. ALTER    → change existing object structure
3. DROP     → delete an object completely
4. TRUNCATE → delete all rows but keep the structure
5. RENAME   → rename an object

--------------------------------------------------------------------
MYSQL PRACTICAL — DDL COMMANDS
--------------------------------------------------------------------

-- CREATE TABLE
CREATE TABLE employee (
   emp_id INT PRIMARY KEY,
   name VARCHAR(40) NOT NULL,
   salary DECIMAL(10,2),
   hire_date DATE,
   dept VARCHAR(20)
);

-- CREATE another table
CREATE TABLE department (
   dept_id INT PRIMARY KEY,
   dept_name VARCHAR(30)
);

-- ALTER — add a new column
ALTER TABLE employee ADD COLUMN email VARCHAR(60);

-- ALTER — change column data type
ALTER TABLE employee MODIFY salary DECIMAL(12,2);

-- ALTER — drop a column
ALTER TABLE employee DROP COLUMN email;

-- ALTER — add a constraint
ALTER TABLE employee ADD CONSTRAINT chk_sal CHECK (salary > 0);

-- RENAME TABLE
RENAME TABLE employee TO emp;

-- TRUNCATE — remove all rows, keep structure
TRUNCATE TABLE emp;

-- Check the structure after changes
DESCRIBE emp;

-- DROP — remove table completely
DROP TABLE emp;
DROP TABLE department;


====================================================================
SECTION 1.6 — DATA MANIPULATION LANGUAGE (DML)
====================================================================

WHAT IS DML?

DML = Data Manipulation Language.

It is the set of SQL commands used to INSERT, UPDATE, DELETE, 
and RETRIEVE data inside the tables.

DML changes the DATA, not the structure.

--------------------------------------------------------------------
MAIN DML COMMANDS
--------------------------------------------------------------------

1. INSERT  → add new rows
2. UPDATE  → modify existing rows
3. DELETE  → remove rows
4. SELECT  → retrieve (read) rows
   (Some books separate SELECT as DQL — Data Query Language)

--------------------------------------------------------------------
MYSQL PRACTICAL — DML COMMANDS
--------------------------------------------------------------------

-- Set up table first
CREATE TABLE employee (
   emp_id INT PRIMARY KEY,
   name VARCHAR(40),
   salary DECIMAL(10,2),
   hire_date DATE,
   dept VARCHAR(20)
);

-- INSERT — single row
INSERT INTO employee (emp_id, name, salary, hire_date, dept)
VALUES (1, 'Ravi', 45000, '2023-06-01', 'IT');

-- INSERT — multiple rows at once
INSERT INTO employee VALUES
   (2, 'Priya', 52000, '2022-01-15', 'HR'),
   (3, 'Arjun', 38000, '2024-03-10', 'IT'),
   (4, 'Neha', 61000, '2021-11-20', 'FIN');

-- SELECT — view all data
SELECT * FROM employee;

-- SELECT — specific columns with condition
SELECT name, salary FROM employee WHERE dept = 'IT';

-- UPDATE — change one row
UPDATE employee SET salary = 50000 WHERE emp_id = 1;

-- UPDATE — change many rows
UPDATE employee SET salary = salary + 2000 WHERE dept = 'IT';

-- DELETE — remove one row
DELETE FROM employee WHERE emp_id = 4;

-- DELETE — remove multiple rows
DELETE FROM employee WHERE salary < 40000;

-- Verify changes
SELECT * FROM employee;


====================================================================
SECTION 1.7 — DATABASE MANAGER
====================================================================

WHAT IS A DATABASE MANAGER?

The Database Manager is the SOFTWARE LAYER inside the DBMS that 
sits between user queries and the actual stored data on disk.

When you type a SQL query, it does NOT go directly to the disk. 
It passes through the Database Manager, which handles all the 
low-level work.

--------------------------------------------------------------------
COMPONENTS OF THE DATABASE MANAGER
--------------------------------------------------------------------

1. AUTHORIZATION AND INTEGRITY MANAGER
   - Checks if the user has permission to run this query.
   - Checks if the query follows all rules (constraints).
   - Example: "Is Ravi allowed to DELETE from employee table?"

2. TRANSACTION MANAGER
   - Makes sure the database stays consistent even if a crash 
     happens in the middle of a transaction.
   - Handles COMMIT, ROLLBACK, and recovery.

3. FILE MANAGER
   - Manages how data is stored in physical files on disk.
   - Allocates space, keeps track of free blocks.

4. BUFFER MANAGER
   - Manages RAM memory used to cache data blocks.
   - Decides which blocks to keep in memory and which to remove.
   - Uses algorithms like LRU (Least Recently Used).

--------------------------------------------------------------------
QUERY PROCESSING FLOW
--------------------------------------------------------------------

  User writes SQL query
           │
           ▼
    ┌─────────────┐
    │   PARSER    │  Checks syntax
    └─────────────┘
           │
           ▼
    ┌─────────────┐
    │  OPTIMIZER  │  Finds fastest way to run query
    └─────────────┘
           │
           ▼
    ┌─────────────┐
    │  EXECUTOR   │  Runs the query
    └─────────────┘
           │
           ▼
    ┌─────────────┐
    │   BUFFER    │  Checks if data is in RAM
    │   MANAGER   │
    └─────────────┘
           │
           ▼
    ┌─────────────┐
    │    FILE     │  Reads/writes from disk
    │   MANAGER   │
    └─────────────┘
           │
           ▼
        DISK

--------------------------------------------------------------------
MYSQL PRACTICAL — SEE THE DATABASE MANAGER AT WORK
--------------------------------------------------------------------

-- SHOW ENGINE STATUS shows what the query engine is doing
SHOW ENGINE INNODB STATUS;

-- See how many queries are cached
SHOW STATUS LIKE 'Qcache%';

-- See buffer pool stats (like Oracle SGA)
SHOW STATUS LIKE 'Innodb_buffer_pool%';

-- See how MySQL parses and optimizes a query
EXPLAIN SELECT * FROM employee WHERE dept = 'IT';

-- EXPLAIN shows: which index is used, how many rows scanned, etc.

-- Full details
EXPLAIN FORMAT=JSON SELECT * FROM employee WHERE dept='IT';


====================================================================
SECTION 1.8 — DATABASE ADMINISTRATOR (DBA)
====================================================================

WHO IS A DBA?

A DBA is a PERSON (not software) responsible for the entire 
database system. They install, configure, monitor, tune, and 
protect the database.

Think of the DBA as the "manager" of the database.

--------------------------------------------------------------------
MAIN RESPONSIBILITIES OF A DBA
--------------------------------------------------------------------

1. SCHEMA DEFINITION
   - Create tables, views, indexes.
   - Decide the structure of the database.

2. STORAGE STRUCTURE AND ACCESS METHOD DEFINITION
   - Decide where data is stored on disk.
   - Choose which indexes to create.
   - Plan tablespaces and data files.

3. SCHEMA AND PHYSICAL ORGANIZATION MODIFICATION
   - Change schema when business needs change.
   - Reorganize storage for better performance.

4. GRANTING AUTHORIZATION
   - Create users.
   - Give or remove permissions (GRANT, REVOKE).
   - Decide who can read/write/delete what.

5. INTEGRITY CONSTRAINT SPECIFICATION
   - Write rules that data must follow.
   - Examples: age > 0, dept must be IT/HR/FIN.

6. ROUTINE MAINTENANCE
   - Daily backups.
   - Monitor performance.
   - Recover from crashes.
   - Update DBMS software.
   - Tune queries and indexes.

--------------------------------------------------------------------
DBA vs NORMAL USER
--------------------------------------------------------------------

DBA:                | Normal User:
--------------------|------------------
Creates tables      | Only uses tables
Can DROP table      | Cannot drop
Grants permissions  | Uses permissions
Sees all data       | Sees only their view
Handles backups     | Doesn't handle backups

--------------------------------------------------------------------
MYSQL PRACTICAL — DBA TASKS IN MYSQL
--------------------------------------------------------------------

-- Log in as root (DBA) first:
-- mysql -u root -p

-- Create a new user (a normal user)
CREATE USER 'ravi'@'localhost' IDENTIFIED BY 'pass123';

-- Create another user
CREATE USER 'priya'@'localhost' IDENTIFIED BY 'pass456';

-- Give SELECT and INSERT permission on college.student
GRANT SELECT, INSERT ON college.student TO 'ravi'@'localhost';

-- Give only SELECT permission (read-only user)
GRANT SELECT ON college.* TO 'priya'@'localhost';

-- Take back permission from Ravi
REVOKE INSERT ON college.student FROM 'ravi'@'localhost';

-- See all users
SELECT user, host FROM mysql.user;

-- See what privileges a user has
SHOW GRANTS FOR 'ravi'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;

-- Delete a user
-- DROP USER 'ravi'@'localhost';


====================================================================
SECTION 1.9 — DATABASE USERS
====================================================================

DATABASE USERS are the people (or programs) who interact with 
the database. They can be classified into different types based 
on how they use it.

--------------------------------------------------------------------
TYPES OF DATABASE USERS
--------------------------------------------------------------------

1. NAIVE USERS (Parametric Users)
   - Common people who use ready-made applications.
   - They don't write SQL.
   - They just fill forms and click buttons.
   - Example: A bank clerk using software to deposit money.
   - Example: A hotel receptionist booking a room.

2. APPLICATION PROGRAMMERS
   - Write programs (Java, Python, C++) that access the database.
   - They use SQL inside their code.
   - Example: A developer building a college ERP system.

3. SOPHISTICATED USERS
   - Write complex SQL queries directly.
   - They understand the database schema well.
   - Example: Data analysts, scientists, engineers.

4. SPECIALIZED USERS
   - Build very complex database applications.
   - Example: CAD/CAM engineers, GIS specialists, 
     AI/machine learning engineers.

5. DATABASE ADMINISTRATOR (DBA)
   - Manages everything (already covered above).
   - Has highest privileges.

--------------------------------------------------------------------
COMPARISON TABLE
--------------------------------------------------------------------

| User Type        | Writes SQL? | Example                    |
|------------------|-------------|----------------------------|
| Naive            | No          | Bank clerk                 |
| Programmer       | Yes (in code)| Software developer        |
| Sophisticated    | Yes (directly)| Data analyst              |
| Specialized      | Yes (complex)| GIS engineer              |
| DBA              | Yes (all)   | System administrator       |

--------------------------------------------------------------------
MYSQL PRACTICAL — SEEING DIFFERENT USERS
--------------------------------------------------------------------

-- See currently logged-in user
SELECT USER(), CURRENT_USER();

-- As DBA (root), create three users with different roles

-- 1. Naive user — only SELECT on student table
CREATE USER 'clerk'@'localhost' IDENTIFIED BY 'clerk123';
GRANT SELECT ON college.student TO 'clerk'@'localhost';

-- 2. Application programmer — full access to app database
CREATE USER 'dev'@'localhost' IDENTIFIED BY 'dev123';
GRANT SELECT, INSERT, UPDATE, DELETE ON college.* TO 'dev'@'localhost';

-- 3. Sophisticated user — can run any SELECT
CREATE USER 'analyst'@'localhost' IDENTIFIED BY 'an123';
GRANT SELECT ON college.* TO 'analyst'@'localhost';
GRANT PROCESS ON *.* TO 'analyst'@'localhost';

-- See all users
SELECT user, host FROM mysql.user;

-- See privileges
SHOW GRANTS FOR 'clerk'@'localhost';
SHOW GRANTS FOR 'dev'@'localhost';
SHOW GRANTS FOR 'analyst'@'localhost';

FLUSH PRIVILEGES;


====================================================================
SUMMARY OF UNIT I — KEY POINTS
====================================================================

1. A DBMS solves the problems of the old file system: redundancy, 
   inconsistency, difficulty in access, integrity, atomicity, 
   concurrency, and security.

2. Data abstraction has THREE levels: Physical (storage), 
   Logical (tables), View (what each user sees).

3. Data models describe data: Relational (most used), 
   Hierarchical, Network, ER, Object-Oriented, Semi-structured.

4. Data independence = change one level without changing the 
   next level up. Two types: Physical and Logical.

5. DDL commands (CREATE, ALTER, DROP, TRUNCATE, RENAME) change 
   structure.

6. DML commands (INSERT, UPDATE, DELETE, SELECT) change data.

7. The Database Manager is the software layer with Authorization, 
   Transaction, File, and Buffer managers.

8. The DBA is the person responsible for schema, storage, 
   authorization, integrity, and maintenance.

9. Users are classified into: Naive, Application Programmer, 
   Sophisticated, Specialized, and DBA.
