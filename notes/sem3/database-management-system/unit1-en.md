# UNIT – I: Introduction to Database Management System

---

## 1. Purpose of the Database System

Before understanding what a database is, let us understand why it was needed in the first place.

### 1.1 The Old Way — File Processing System

Long ago, before databases became common, organizations used to store their data in simple **files** (like text files or spreadsheets) that were handled directly by application programs. For example, a bank would have separate files for savings accounts, separate files for loans, separate files for customer details, and each of these files was managed by a different program written by a programmer.

This "file-based system" caused many problems:

1. **Data Redundancy and Inconsistency**
   Since the same information (like a customer's address) was stored in multiple files by multiple departments, it got duplicated. If the customer changed their address, someone might update it in one file but forget to update it in another. Now the data becomes inconsistent — two files show two different addresses for the same person.

2. **Difficulty in Accessing Data**
   Suppose a bank manager wants to know "list all customers who live in Mumbai." If this kind of query was not thought of when the file system was designed, there was no easy way to get this information. A new program had to be written from scratch every time a new type of question came up.

3. **Data Isolation**
   Data was scattered in different files, in different formats, and written by different programmers. It became very hard to write new programs that needed data from multiple files together.

4. **Integrity Problems**
   Data has to follow certain rules (called constraints). For example, "account balance should never go below zero." In file systems, these rules were written inside each application program's code. If a new program was added and the programmer forgot to add this check, the rule could be broken.

5. **Atomicity Problems**
   Imagine transferring money from Account A to Account B. This involves two steps: subtract money from A, add money to B. If the system crashes after step 1 but before step 2, the money simply disappears. File systems had no proper mechanism to make sure both steps happen together, or neither happens at all.

6. **Concurrent Access Anomalies**
   When many users try to access and update the same data at the same time (like two people booking the last train ticket at once), file systems had no proper method to manage this and could give wrong results.

7. **Security Problems**
   It was difficult to give different levels of access to different users using simple files. For example, allowing a clerk to only view data but not delete it was hard to enforce.

### 1.2 The Solution — Database Management System (DBMS)

A **Database Management System (DBMS)** is software that is specially designed to solve all the above problems. It sits between the user/application and the actual data stored on disk, and manages the data in an organized, safe, and efficient way.

**Definition:** A DBMS is a collection of interrelated data (called the database) together with a set of programs to access that data. This collection of data is usually referred to as the **database**, and it contains information about one particular enterprise.

The main purpose of a DBMS is:
- To provide a way to **store** and **retrieve** data conveniently and efficiently.
- To remove redundancy and keep data consistent.
- To provide **security**, so unauthorized users cannot see or change data they are not allowed to.
- To handle **concurrent access** safely, so multiple users can use the database at the same time without conflicts.
- To provide **backup and recovery**, so that data is not lost in case of a crash or hardware failure.
- To enforce **integrity constraints**, so the data always follows business rules.

### 1.3 Practical: Why We Need a DBMS (MySQL Example)

Let's actually see the difference. Imagine we are storing student data in a plain text file vs in MySQL.

**Problem with file-based approach (imagine a file `students.txt`):**
```
101, Aman, CSE, 9876543210
102, Riya, ECE, 9123456780
101, Aman, CSE, 9988776655
```
Notice here that student `101` (Aman) appears twice with two different phone numbers. There is no automatic way for a plain text file to stop this duplication. This is exactly the redundancy and inconsistency problem discussed above.

**Now let's do the same thing in MySQL**, where the DBMS enforces rules for us:

```sql
-- Step 1: Create a database
CREATE DATABASE CollegeDB;

-- Step 2: Select the database to use
USE CollegeDB;

-- Step 3: Create a table with a PRIMARY KEY constraint
-- The PRIMARY KEY makes sure roll_no is always unique
CREATE TABLE Students (
    roll_no INT PRIMARY KEY,
    name VARCHAR(50),
    branch VARCHAR(20),
    phone VARCHAR(15)
);

-- Step 4: Insert data
INSERT INTO Students VALUES (101, 'Aman', 'CSE', '9876543210');
INSERT INTO Students VALUES (102, 'Riya', 'ECE', '9123456780');

-- Step 5: Try inserting the same roll_no again (this will FAIL)
INSERT INTO Students VALUES (101, 'Aman', 'CSE', '9988776655');
```

When you run the last statement, MySQL will give an error like:

```
ERROR 1062 (23000): Duplicate entry '101' for key 'PRIMARY'
```

This is the DBMS actively protecting our data from becoming inconsistent — something a plain file could never do on its own. This single example shows the real purpose of a database system: **it doesn't just store data, it protects and manages it.**

---

## 2. Data Abstraction

Data abstraction means **hiding the complex details of how data is actually stored, and showing the user only what they need to see.**

Think about an ATM machine. When you withdraw money, you just press some buttons and get cash. You don't need to know how the bank's database is storing your balance internally, which files it uses, or how it's arranged on the hard disk. This hiding of the internal complicated details is called abstraction.

A DBMS provides data abstraction at **three levels**, and together this is called the **Three-Schema Architecture** (also called the ANSI/SPARC architecture).

### 2.1 The Three Levels of Abstraction

```
 ┌───────────────────────────────────────────┐
 │            VIEW LEVEL (External)           │  ← What each user sees
 │   View 1        View 2        View 3       │
 └───────────────────────────────────────────┘
 ┌───────────────────────────────────────────┐
 │          LOGICAL LEVEL (Conceptual)         │  ← What data is stored,
 │   Tables, relationships, constraints        │     and relationships
 └───────────────────────────────────────────┘
 ┌───────────────────────────────────────────┐
 │          PHYSICAL LEVEL (Internal)          │  ← How data is actually
 │   Files, blocks, indexes on disk            │     stored on disk
 └───────────────────────────────────────────┘
```

**1. Physical Level (Internal Level)**
This is the lowest level. It describes **how** the data is actually stored in the computer — the exact file structures, block sizes, indexing methods, and storage details on the hard disk. This is normally handled by the database system itself and database administrators, not by ordinary users. For example, whether the data is stored as a B-tree index or a hash file is decided here.

**2. Logical Level (Conceptual Level)**
This is the middle level. It describes **what** data is stored in the database and what relationships exist among that data. At this level, we talk about tables, columns, data types, and constraints — for example, "there is a table called Students with columns roll_no, name, branch." Database administrators, who decide what information should be kept in the database, work at this level. Users at this level do not need to know the complicated physical structures underneath.

**3. View Level (External Level)**
This is the highest level and it describes only a **part** of the entire database that is relevant to a particular group of users. Many views can exist for the same database. For example, a college database might have one view for teachers (showing only student marks and attendance) and another view for the accounts department (showing only fee payment details). Each user only sees their own view and not the entire complex database.

### 2.2 Why Data Abstraction is Important

- It **simplifies** how users interact with data — they don't need to learn complicated storage details.
- It provides **data independence** (explained in the next section) — you can change the physical storage without affecting how the users see the data.
- It improves **security**, because a view can be designed to hide sensitive columns like salary from users who should not see it.

### 2.3 Practical: Data Abstraction Using MySQL Views

A **VIEW** in MySQL is a perfect real-life example of the "View Level" of abstraction. Let's create a table with sensitive data and then create a limited view for general staff.

```sql
USE CollegeDB;

-- A table with sensitive data (salary should not be visible to everyone)
CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(30),
    salary DECIMAL(10,2)
);

INSERT INTO Employees VALUES (1, 'Suresh', 'IT', 55000.00);
INSERT INTO Employees VALUES (2, 'Kavita', 'HR', 48000.00);

-- Now create a VIEW that hides the salary column
-- This is exactly the "external / view level" of abstraction
CREATE VIEW Employee_PublicView AS
SELECT emp_id, name, department
FROM Employees;

-- A general staff member can only query the view
SELECT * FROM Employee_PublicView;
```

Output of the view query:

```
+--------+---------+-------------+
| emp_id | name    | department  |
+--------+---------+-------------+
|   1    | Suresh  |     IT      |
|   2    | Kavita  |     HR      |
+--------+---------+-------------+
```

Notice that the `salary` column is completely hidden from anyone using `Employee_PublicView`, even though it fully exists in the real `Employees` table underneath. This is data abstraction in action — the user sees only a simplified, relevant "view" and the real complex table (with all its data) stays hidden.

---

## 3. Data Models

A **data model** is a collection of tools/concepts that describe the structure of a database, meaning it defines: the data, the relationships among the data, and the rules (constraints) that the data must follow.

Think of a data model as a blueprint or plan — just as an architect makes a building plan before construction, a database designer makes a data model before actually creating the database.

### 3.1 Types of Data Models

**1. Relational Model**
This is the most widely used model today (used by MySQL, Oracle, PostgreSQL, etc.). In this model, data is organized into **tables** (also called relations), where each table has **rows** (records/tuples) and **columns** (attributes/fields). Relationships between different tables are created using common columns, especially **keys**.

Example: A `Students` table and a `Courses` table can be related through a common `roll_no` and `course_id`.

**2. Entity-Relationship (ER) Model**
This model is mainly used for **designing** databases at a conceptual level, before actual tables are created. It represents the database in terms of **entities** (real-world objects, like "Student" or "Book") and **relationships** between these entities (like "Student BORROWS Book"). This is drawn using ER diagrams (covered in detail in Unit II).

**3. Object-Based Data Model (Object-Oriented Model)**
Here data is stored in the form of **objects**, similar to object-oriented programming languages like Java or C++. Each object has attributes (data) and methods (behaviour) bundled together. This is used in Object-Oriented Database Systems (OODBMS).

**4. Semi-structured Data Model**
This model allows data items of the same type to have different sets of attributes. This is common in modern applications, like XML or JSON-based databases (such as MongoDB), where every "document" doesn't have to follow the exact same rigid structure.

**5. Hierarchical Model (Older / Legacy Model)**
Data is organized like a **tree structure**, with a parent-child relationship. Each child record has only one parent, but a parent can have many children. For example, a company's organization chart naturally fits a hierarchical model. This model is now largely outdated.

**6. Network Model (Older / Legacy Model)**
This is similar to the hierarchical model, but here a child record can have **more than one parent** as well, forming a network (graph-like) structure instead of a simple tree. This is also largely outdated now, but it was an improvement over the hierarchical model because it could represent more complex relationships.

### 3.2 Practical: The Relational Model in MySQL

Since MySQL is a **Relational Database Management System (RDBMS)**, everything we do in MySQL is based on the relational model — data organized into tables with rows and columns, linked using keys.

```sql
USE CollegeDB;

-- Entity 1: Students table (a "relation" in relational model terms)
CREATE TABLE Students2 (
    roll_no INT PRIMARY KEY,
    name VARCHAR(50)
);

-- Entity 2: Courses table
CREATE TABLE Courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(50)
);

-- Relationship table: which student is enrolled in which course
-- This links two relations together, exactly as the relational model describes
CREATE TABLE Enrollment (
    roll_no INT,
    course_id INT,
    FOREIGN KEY (roll_no) REFERENCES Students2(roll_no),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

INSERT INTO Students2 VALUES (201, 'Neha');
INSERT INTO Courses VALUES (301, 'Database Management System');
INSERT INTO Enrollment VALUES (201, 301);

-- Now fetch data by combining tables using their relationship (a JOIN)
SELECT Students2.name, Courses.course_name
FROM Students2
JOIN Enrollment ON Students2.roll_no = Enrollment.roll_no
JOIN Courses ON Courses.course_id = Enrollment.course_id;
```

Output:
```
+--------+------------------------------+
| name   | course_name                  |
+--------+------------------------------+
| Neha   | Database Management System   |
+--------+------------------------------+
```

This shows the relational model at work: separate tables (relations), each representing one type of entity, connected together using **keys** to form meaningful relationships.

---

## 4. Data Independence

Data independence means the ability to **change the schema (structure/design) at one level of the database without having to change the schema at the next higher level.**

This concept works together with the three-level architecture we discussed earlier (Physical, Logical, View). There are two types:

### 4.1 Physical Data Independence

This is the ability to change the **physical level** (how data is actually stored — file organization, indexing method, storage device) **without** needing to change the **logical level** (the table structure that programs and users see).

**Example:** Suppose the database administrator decides to move student data from one type of storage device to a faster one, or adds a new index to speed up searching. The actual table structure `Students(roll_no, name, branch)` that all your application programs use remains exactly the same. Your `SELECT * FROM Students` queries keep working without any change. This is physical data independence — you changed the "how it's stored" without touching the "how it's viewed logically."

Physical data independence is relatively **easy to achieve**, since the physical details are already at the very bottom and hidden from users.

### 4.2 Logical Data Independence

This is the ability to change the **logical level** (the overall table structure — for example, adding a new column, or splitting one table into two) **without** needing to change the **view level** (the external views and application programs that specific users use).

**Example:** Suppose the college adds a new column `email` to the `Students` table for internal record-keeping. If a teacher's view (`SELECT roll_no, name, marks FROM Students`) does not use the `email` column at all, the teacher's application continues to work perfectly fine without any modification, even though the underlying table structure changed.

Logical data independence is **harder to achieve** than physical data independence, because application programs are usually more closely tied to the logical structure of the data.

### 4.3 Why Data Independence Matters

Without data independence, every small change in storage or table design would force us to rewrite all application programs — this would be extremely costly and impractical for large real-world systems. A DBMS is specially designed to minimize this dependency, which is one of its biggest advantages over old file-based systems.

### 4.4 Practical: Demonstrating Logical Data Independence in MySQL

Let's simulate this. First, we create a view for a teacher who only needs to see names and branches — not everything in the table.

```sql
USE CollegeDB;

CREATE TABLE StudentRecords (
    roll_no INT PRIMARY KEY,
    name VARCHAR(50),
    branch VARCHAR(20)
);

INSERT INTO StudentRecords VALUES (1, 'Arjun', 'CSE');
INSERT INTO StudentRecords VALUES (2, 'Meera', 'IT');

-- Teacher's view only depends on roll_no, name, branch
CREATE VIEW TeacherView AS
SELECT roll_no, name, branch
FROM StudentRecords;

SELECT * FROM TeacherView;
```

Now, imagine the admin decides to add a new column `email` to the base table (a **logical level change**):

```sql
-- Logical level change: adding a new column
ALTER TABLE StudentRecords ADD COLUMN email VARCHAR(50);

UPDATE StudentRecords SET email = 'arjun@example.com' WHERE roll_no = 1;
UPDATE StudentRecords SET email = 'meera@example.com' WHERE roll_no = 2;

-- Now query the SAME view again
SELECT * FROM TeacherView;
```

Output — completely unchanged, still only 3 columns:
```
+---------+--------+--------+
| roll_no | name   | branch |
+---------+--------+--------+
|    1    | Arjun  |  CSE   |
|    2    | Meera  |   IT   |
+---------+--------+--------+
```

Even though we modified the base table's structure by adding a new `email` column, the `TeacherView` (which represents the external/view level used by a particular application) did not break or change at all. This is exactly what **logical data independence** means in practice.

---

## 5. Data Definition Language (DDL)

**DDL** is a set of SQL commands used to **define, create, modify, and delete the structure** of database objects like tables, schemas, indexes, and views. DDL deals with the **design/structure** of the database, not the actual data values inside it.

### 5.1 Main DDL Commands

| Command | Purpose |
|---|---|
| `CREATE` | Creates a new database object (table, database, view, index, etc.) |
| `ALTER` | Modifies the structure of an existing database object |
| `DROP` | Permanently deletes a database object and all its data |
| `TRUNCATE` | Removes all rows from a table but keeps the table structure |
| `RENAME` | Renames a database object |

An important property of DDL commands is that they are **auto-committed** — meaning once you run a DDL command, the change is permanently saved immediately; you cannot roll it back like normal data changes.

### 5.2 Practical: DDL Commands in MySQL

**a) CREATE — creating a database and a table**
```sql
CREATE DATABASE LibraryDB;
USE LibraryDB;

CREATE TABLE Books (
    book_id INT PRIMARY KEY,
    title VARCHAR(100),
    author VARCHAR(50),
    price DECIMAL(8,2)
);
```

**b) ALTER — modifying the table structure**
```sql
-- Add a new column
ALTER TABLE Books ADD COLUMN publish_year INT;

-- Modify an existing column's data type
ALTER TABLE Books MODIFY COLUMN price DECIMAL(10,2);

-- Drop (remove) a column
ALTER TABLE Books DROP COLUMN publish_year;

-- Rename a column
ALTER TABLE Books CHANGE COLUMN author writer VARCHAR(50);
```

**c) TRUNCATE — remove all data but keep the table**
```sql
INSERT INTO Books VALUES (1, 'DBMS Basics', 'R. Sharma', 350.00);
INSERT INTO Books VALUES (2, 'SQL Guide', 'P. Kumar', 420.00);

-- Removes ALL rows instantly, but the empty table Books still exists
TRUNCATE TABLE Books;

SELECT * FROM Books;   -- Returns an empty result, table structure still there
```

**d) DROP — permanently delete the table itself**
```sql
DROP TABLE Books;   -- The table Books no longer exists at all
```

**e) RENAME — rename a table**
```sql
CREATE TABLE OldBooks (id INT, title VARCHAR(50));
RENAME TABLE OldBooks TO NewBooks;
```

**Important distinction to remember:**
- `DELETE` (a DML command, explained next) removes rows but you can filter with `WHERE` and can roll it back.
- `TRUNCATE` (a DDL command) removes ALL rows at once, resets things like auto-increment counters, and cannot easily be rolled back.
- `DROP` removes the entire table structure along with its data — nothing remains.

---

## 6. Data Manipulation Language (DML)

**DML** is a set of SQL commands used to **access, insert, update, and delete the actual data** stored inside database tables. Unlike DDL (which deals with structure), DML deals with the **content/values** inside that structure.

### 6.1 Main DML Commands

| Command | Purpose |
|---|---|
| `SELECT` | Retrieves (reads) data from one or more tables |
| `INSERT` | Adds new rows of data into a table |
| `UPDATE` | Modifies existing data in a table |
| `DELETE` | Removes existing rows of data from a table |

Unlike DDL, DML commands are **not auto-committed** by default in most database systems (this can depend on settings) — meaning you can `COMMIT` (save permanently) or `ROLLBACK` (undo) these changes before they are finalized. This will be covered further in the TCL (Transaction Control Language) section in Unit IV.

### 6.2 Practical: DML Commands in MySQL

**a) INSERT — adding data**
```sql
USE LibraryDB;

CREATE TABLE Members (
    member_id INT PRIMARY KEY,
    name VARCHAR(50),
    city VARCHAR(30),
    fine_due DECIMAL(6,2)
);

-- Insert a single row
INSERT INTO Members VALUES (1, 'Anjali', 'Udaipur', 0.00);

-- Insert multiple rows at once
INSERT INTO Members VALUES
(2, 'Rohit', 'Jaipur', 50.00),
(3, 'Simran', 'Udaipur', 20.00);

-- Insert into specific columns only (others get default/NULL)
INSERT INTO Members (member_id, name) VALUES (4, 'Vikram');
```

**b) SELECT — reading data**
```sql
-- Get all columns, all rows
SELECT * FROM Members;

-- Get specific columns only
SELECT name, city FROM Members;

-- Get rows matching a condition
SELECT * FROM Members WHERE city = 'Udaipur';

-- Get rows matching a condition with sorting
SELECT * FROM Members WHERE fine_due > 0 ORDER BY fine_due DESC;
```

**c) UPDATE — modifying existing data**
```sql
-- Update a single member's fine
UPDATE Members SET fine_due = 0.00 WHERE member_id = 2;

-- Update multiple columns at once
UPDATE Members SET city = 'Udaipur', fine_due = 10.00 WHERE member_id = 4;

-- Careful: without WHERE, ALL rows get updated!
UPDATE Members SET fine_due = 0.00;   -- resets fine for every member
```

**d) DELETE — removing existing data**
```sql
-- Delete a specific row
DELETE FROM Members WHERE member_id = 3;

-- Delete rows matching a condition
DELETE FROM Members WHERE fine_due = 0;

-- Careful: without WHERE, ALL rows are deleted (but table structure stays)
DELETE FROM Members;
```

**Difference between DDL and DML, summarized:**

| Aspect | DDL | DML |
|---|---|---|
| Works on | Structure of database objects | Actual data/values inside objects |
| Examples | CREATE, ALTER, DROP, TRUNCATE | SELECT, INSERT, UPDATE, DELETE |
| Auto-commit | Yes, changes are permanent immediately | No, can be rolled back before commit |
| Effect | Changes table design | Changes table content |

---

## 7. Database Manager

The **Database Manager** is a program module (a core part of the DBMS software itself) that acts as an **interface between the low-level data stored in the database and the application programs/queries submitted by users**.

Think of the database manager as the "brain" of the DBMS software. It is not a person — it is a software component. Its responsibilities include:

1. **Interaction with the file manager** — the database manager takes SQL/query requests and figures out how to retrieve the required data from files stored on disk, using the file manager.

2. **Ensuring data consistency** — even when many users are working simultaneously, the database manager makes sure the data doesn't become inconsistent (using techniques like locking, covered under concurrency control).

3. **Enforcing integrity constraints** — it checks all the rules defined on the data (like primary keys, foreign keys, not-null constraints) before allowing any change to actually happen.

4. **Enforcing security** — it checks whether the user requesting some data or action is actually authorized to do so.

5. **Backup and recovery control** — it works with the recovery manager to make sure that if a system crash happens, the database can be restored to a consistent state.

In simple words: whenever you type a query like `SELECT * FROM Students;`, it is the database manager (working with other internal modules like the query processor, transaction manager, and storage manager) that handles everything behind the scenes to fetch you the correct, safe, and consistent result.

### 7.1 Practical: Seeing the Database Manager's Work Indirectly

We cannot directly "call" the database manager module, since it works internally. But we can clearly observe its effects, for example, how it enforces integrity automatically:

```sql
USE LibraryDB;

CREATE TABLE Loans (
    loan_id INT PRIMARY KEY,
    member_id INT,
    book_id INT,
    FOREIGN KEY (member_id) REFERENCES Members(member_id)
);

-- The database manager checks the foreign key constraint automatically
-- This will FAIL because member_id 99 does not exist in the Members table
INSERT INTO Loans VALUES (1, 99, 5);
```

Output:
```
ERROR 1452 (23000): Cannot add or update a child row:
a foreign key constraint fails
```

This error is generated by the internal database manager component of MySQL, which checked the constraint before letting the insert happen — proving it is always actively working behind every command we run, protecting data integrity automatically.

---

## 8. Database Administrator (DBA)

The **Database Administrator (DBA)** is a **person** (or a team of people) who is responsible for the overall management, control, and maintenance of the database system. Unlike the "Database Manager" (which is software), the DBA is a human role/job title.

### 8.1 Responsibilities of a DBA

1. **Schema Definition**
   The DBA decides and creates the overall logical structure of the database — which tables exist, what columns they have, and how they relate. This is done using DDL commands.

2. **Storage Structure and Access Method Definition**
   The DBA decides how data is physically stored and indexed for the best performance.

3. **Schema and Physical Organization Modification**
   As the organization's needs change over time, the DBA is responsible for modifying the database schema or the physical organization to reflect these changes.

4. **Granting Authorization for Data Access**
   The DBA controls **who** can access **what** part of the data, and what actions (read, write, delete) they are allowed to perform. This is done using DCL commands like `GRANT` and `REVOKE` (covered in Unit IV).

5. **Routine Maintenance**
   This includes periodically backing up the database, ensuring enough disk space is available, and monitoring performance to make sure response times for user requests remain reasonable.

6. **Ensuring Data Security and Integrity**
   The DBA makes sure that unauthorized access is prevented and that all integrity constraints are properly enforced.

### 8.2 Practical: DBA Tasks in MySQL

**a) Creating users and granting/controlling access (an important DBA task)**

```sql
-- Create a new database user (a DBA-level task)
CREATE USER 'library_clerk'@'localhost' IDENTIFIED BY 'ClerkPass123';

-- Grant only SELECT and INSERT permission on the Members table
GRANT SELECT, INSERT ON LibraryDB.Members TO 'library_clerk'@'localhost';

-- Refresh privilege table
FLUSH PRIVILEGES;

-- Later, if needed, the DBA can revoke a permission
REVOKE INSERT ON LibraryDB.Members FROM 'library_clerk'@'localhost';
```

**b) Routine maintenance — backup (a critical DBA task)**

A DBA regularly takes backups of the database so that data is not lost. In MySQL, this is commonly done from the command line (outside the SQL prompt) using a utility called `mysqldump`:

```bash
mysqldump -u root -p LibraryDB > LibraryDB_backup.sql
```

This command exports the entire `LibraryDB` database structure and data into a `.sql` file, which the DBA can use to restore the database later if something goes wrong:

```bash
mysql -u root -p LibraryDB < LibraryDB_backup.sql
```

These two examples show real, hands-on jobs that a Database Administrator performs regularly to keep a database system healthy, secure, and safe from data loss.

---

## 9. Database Users

Database users are the people who actually interact with the database, but in different ways depending on their role and level of technical knowledge. Broadly, users are classified into the following categories:

### 9.1 Types of Database Users

**1. Naive Users (Unsophisticated / End Users)**
These are ordinary users who interact with the database through pre-built application programs, without knowing anything about the database itself. For example, a bank customer using an ATM machine, or a student checking their result on a college website — they simply fill in forms or click buttons. They never write SQL queries directly.

**2. Application Programmers**
These are software developers/computer professionals who write the application programs that naive users interact with. They use programming languages (like Java, Python, PHP) combined with database access methods (like JDBC, ODBC, or embedded SQL) to build these applications.

**3. Sophisticated Users**
These users interact with the database directly by writing their own queries in a query language (like SQL), without needing a ready-made application program. They know how to use the database system well. Examples include data analysts, engineers, and scientists who directly query the database to extract insights.

**4. Specialized Users**
These are sophisticated users who write specialized database applications that do not fit into the traditional data-processing framework — for example, applications involving complex data types like computer-aided design systems, knowledge-based expert systems, or systems that store audio/video data.

**5. Database Administrators (DBA)**
As explained in detail in the previous section, this is the person who has central control over the entire database system.

### 9.2 Practical: Simulating Different User Roles in MySQL

Let's demonstrate the difference between a sophisticated user (writing SQL queries directly) and how a naive user's action might be handled behind an application program.

**Sophisticated user — writes a direct SQL query:**
```sql
-- A data analyst directly queries to find members with pending fines
SELECT name, fine_due
FROM Members
WHERE fine_due > 0
ORDER BY fine_due DESC;
```

**Naive user — simulated through an application program:**
A naive user (say, a librarian who doesn't know SQL) simply clicks a button labeled "Show Members With Pending Fines" on a software screen. Behind the scenes, an application programmer has already written a fixed piece of code (for example, in PHP or Python) that silently runs the exact same SQL query above when that button is clicked. The naive user never sees or types the SQL at all — they only interact with the friendly interface, while the application programmer's code and the database do all the real work.

This example shows practically how different types of users experience the same underlying database in very different ways, depending on their role and technical expertise.

---

## Summary of Unit I

- **Purpose of DBMS**: solves redundancy, inconsistency, security, integrity, and concurrency problems of old file systems.
- **Data Abstraction**: hides complexity using three levels — Physical, Logical, View.
- **Data Models**: blueprints for structuring data — Relational, ER, Object-based, Semi-structured, Hierarchical, Network.
- **Data Independence**: ability to change one level of the database without disturbing the level above it — Physical and Logical independence.
- **DDL**: commands that define/change structure — `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME`.
- **DML**: commands that work with actual data — `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
- **Database Manager**: the internal software module that connects queries to actual stored data, enforcing rules automatically.
- **Database Administrator (DBA)**: the human in charge of designing, securing, and maintaining the whole database system.
- **Database Users**: Naive Users, Application Programmers, Sophisticated Users, Specialized Users, and the DBA.
