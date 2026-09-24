
# UNIT – I
## Database System Concepts

---

## Table of Contents

1. Purpose of Database System
2. Traditional File System and Its Problems
3. Database Management System (DBMS)
4. Advantages of DBMS
5. Data Abstraction
6. Three-Level Architecture
7. Data Model
8. Types of Data Models
9. Data Independence
10. Data Definition Language (DDL)
11. Data Manipulation Language (DML)
12. Data Query Language (DQL)
13. Database Manager
14. Database Administrator (DBA)
15. Database Users
16. Important DBMS Terms
17. MySQL Practical – Database Creation
18. MySQL Practical – Table Creation
19. MySQL Practical – Insert Data
20. MySQL Practical – Display Data
21. MySQL Practical – ALTER TABLE
22. MySQL Practical – UPDATE
23. MySQL Practical – DELETE
24. MySQL Practical – TRUNCATE
25. MySQL Practical – DROP
26. DDL vs DML vs DQL
27. Important Exam Questions
28. Unit-I Quick Revision
29. MySQL Practical Cheat Sheet

---

# 1. Purpose of Database System

## Definition of Database

A **database** is an organized collection of related data that can be easily stored, accessed, managed, updated and retrieved.

### Example

A college may maintain information about students:

| Roll No | Name | Course | Semester | Mobile |
|---|---|---|---|---|
| 101 | Rahul | BCA | 2 | 9876543210 |
| 102 | Amit | BCA | 2 | 9876543211 |
| 103 | Neha | BCA | 2 | 9876543212 |

This collection of related student information can be stored in a database.

---

# 2. What is DBMS?

## Definition

**DBMS (Database Management System)** is a software system that allows users to create, store, organize, retrieve, update and manage data in a database.

Examples:

- MySQL
- Oracle Database
- PostgreSQL
- Microsoft SQL Server
- SQLite

### Simple Example

Without DBMS:

```text
Student information
        ↓
Different files
        ↓
Difficult to search and maintain

With DBMS:

Users
  ↓
DBMS
  ↓
Database
  ↓
Student Information

The DBMS acts as an interface between the users/applications and the database.


---

3. Purpose of a Database System

The main purpose of a database system is to provide an efficient and reliable method for storing and managing large amounts of data.

The important purposes are:

1. Data storage


2. Easy data retrieval


3. Data modification


4. Data security


5. Data integrity


6. Reduction of data redundancy


7. Data sharing


8. Concurrent access


9. Backup and recovery


10. Data independence




---

3.1 Data Storage

A DBMS provides a systematic way to store large amounts of data.

Example

A university can store:

Student information
Teacher information
Course information
Attendance
Examination
Fees
Results

in a database.


---

3.2 Easy Data Retrieval

DBMS allows users to quickly retrieve required information.

For example:

SELECT *
FROM student
WHERE semester = 2;

This query retrieves students studying in semester 2.


---

3.3 Data Modification

Data can be:

Inserted

Updated

Deleted


Example:

UPDATE student
SET semester = 3
WHERE roll_no = 101;

This changes the semester of student 101.


---

3.4 Data Security

A DBMS provides mechanisms to control access to data.

For example:

Administrator → Full access

Teacher → Student academic information

Student → Limited personal information

Thus, every user does not necessarily have access to every piece of information.


---

3.5 Data Integrity

Data integrity means maintaining the accuracy, validity and consistency of data.

For example:

A student's roll number should not be duplicated if it is defined as a primary key.

Similarly:

Age = -25

would normally be invalid data.

DBMS constraints help prevent invalid data.


---

3.6 Reduction of Data Redundancy

Data redundancy means unnecessary duplication of the same data.

Example

Suppose a student's details are stored in:

Admission file
Examination file
Fee file
Attendance file

If the same address is stored separately in all four places, unnecessary duplication occurs.

A properly designed database can reduce such redundancy.


---

3.7 Data Sharing

A database allows authorized users and applications to share data.

Example

A college database can be accessed by:

Admission Department
        ↓
Examination Department
        ↓
Accounts Department
        ↓
Library Department
        ↓
Administration

All can work with appropriate portions of the same database.


---

3.8 Concurrent Access

Multiple users can access a database at the same time.

Example

In a banking system:

Customer A → ATM
Customer B → Mobile Banking
Customer C → Bank Counter

All may access the banking database simultaneously.

The DBMS manages such concurrent operations.


---

3.9 Backup and Recovery

A DBMS provides mechanisms for backup and recovery.

If a failure occurs because of:

Hardware failure

Software failure

Power failure

System crash

Transaction failure


the database can be recovered using appropriate backup and recovery mechanisms.


---

3.10 Data Independence

DBMS provides data independence.

It means changes at one level of database architecture can be made without unnecessarily affecting higher levels.

Data independence is discussed in detail later in this unit.


---

4. Traditional File System

Before DBMS became common, organizations often stored data in separate files.

Example:

College
│
├── student.txt
├── fees.txt
├── attendance.txt
├── exam.txt
└── library.txt

Each application might maintain its own files.


---

5. Problems of Traditional File System

Traditional file systems have several disadvantages.

5.1 Data Redundancy

The same data may be stored in multiple files.

Example:

student.txt
     ↓
Rahul, BCA, 2

fees.txt
     ↓
Rahul, BCA, 2

exam.txt
     ↓
Rahul, BCA, 2

The same information is repeated.


---

5.2 Data Inconsistency

If duplicated data is not updated everywhere, different files may contain different information.

Example:

Student file → Mobile = 9876543210

Fee file → Mobile = 9876543299

Now the database information is inconsistent.


---

5.3 Difficulty in Data Access

Searching information from many independent files can be difficult.

For example:

> Find all BCA students whose semester is 2.



In a DBMS, this can be done using a simple SQL query.


---

5.4 Data Isolation

Data may be distributed among different files and formats.

This makes it difficult to combine and process the information.


---

5.5 Integrity Problems

It can be difficult to enforce rules on data.

For example:

Semester must be between 1 and 6

A traditional file system may not easily enforce such rules.


---

5.6 Security Problems

It can be difficult to provide detailed access control.


---

5.7 Concurrent Access Problems

Multiple users modifying the same file simultaneously may cause conflicts.


---

5.8 Backup and Recovery Problems

Recovering data after failures can be more difficult.


---

6. File System vs DBMS

Feature	File System	DBMS

Data organization	Separate files	Integrated database
Redundancy	Usually higher	Can be reduced
Consistency	Difficult to maintain	Better control
Security	Limited	Better access control
Data sharing	Difficult	Easier
Concurrent access	Limited/difficult	Supported
Backup	More difficult	Built-in mechanisms
Recovery	Difficult	Recovery facilities
Querying	Application dependent	SQL
Data independence	Low	Higher
Integrity constraints	Limited	Supported



---

7. Advantages of DBMS

The important advantages of DBMS are:

1. Reduced data redundancy

Unnecessary duplication can be minimized.

2. Improved data consistency

Centralized data management helps maintain consistent information.

3. Better data security

Access permissions can be assigned to users.

4. Data sharing

Authorized users can access common data.

5. Data integrity

Constraints help maintain valid data.

6. Backup and recovery

DBMS supports recovery mechanisms.

7. Concurrent access

Multiple users can work with the database.

8. Data independence

Storage or logical changes can often be isolated from applications.

9. Efficient data retrieval

SQL provides a powerful mechanism for retrieving information.

10. Centralized management

Database administrators can manage the database centrally.


---

8. Data Abstraction

Definition

Data abstraction is the process of hiding unnecessary implementation details from users and showing only the information required by them.

A database may contain extremely complex storage details, but users do not need to know all of those details.


---

9. Levels of Data Abstraction

There are three major levels:

1. Physical Level


2. Logical Level


3. View Level



These are also commonly called:

Internal Level
Conceptual Level
External Level


---

10. Physical Level

Definition

The physical level describes how data is actually stored in the storage system.

It deals with details such as:

Storage blocks

Files

Indexes

Record organization

Disk locations

Storage structures


Example

A student record may physically exist in a particular disk block.

The normal user does not need to know:

Disk 1
Block 250
Record 15


---

11. Logical Level

Definition

The logical level describes what data is stored in the database and the relationships between different data items.

Example:

STUDENT
--------------------
Roll_No
Name
Course
Semester
Mobile

The logical level describes the structure of the student table without describing the exact disk storage.


---

12. View Level

Definition

The view level is the highest level of data abstraction.

It describes only the portion of the database that a particular user needs.

Example

A student may see:

Roll No
Name
Course
Semester

A teacher may see:

Roll No
Name
Course
Semester
Marks
Attendance

An accounts employee may see:

Roll No
Name
Fee
Payment Status

All these views may come from the same underlying database.


---

13. Three-Level Database Architecture

USERS
                   |
          +----------------+
          |   VIEW LEVEL   |
          |  EXTERNAL LEVEL|
          +----------------+
                   |
                   ↓
          +----------------+
          | LOGICAL LEVEL  |
          |CONCEPTUAL LEVEL|
          +----------------+
                   |
                   ↓
          +----------------+
          | PHYSICAL LEVEL |
          | INTERNAL LEVEL |
          +----------------+
                   |
                   ↓
              DATABASE

Easy way to remember

VIEW
  ↓
LOGICAL
  ↓
PHYSICAL

or:

EXTERNAL
  ↓
CONCEPTUAL
  ↓
INTERNAL


---

14. Data Model

Definition

A data model is a collection of concepts used to describe the structure of a database, relationships among data and constraints on data.

In simple words:

> A data model describes how data is organized and related inside a database.




---

15. Types of Data Models

Important data models include:

1. Hierarchical Data Model


2. Network Data Model


3. Relational Data Model


4. Entity-Relationship Model


5. Object-Oriented Data Model




---

16. Hierarchical Data Model

In the hierarchical model, data is organized in a tree-like structure.

It mainly represents parent-child relationships.

Example

COLLEGE
                       |
              +--------+--------+
              |                 |
          DEPARTMENT         DEPARTMENT
              |                 |
          COMPUTER            SCIENCE
              |
          STUDENTS

Characteristics

Tree structure

Parent-child relationship

One parent can have multiple children

Suitable for hierarchical data



---

17. Network Data Model

The network model represents data using records and relationships/links.

Unlike a simple hierarchical structure, a record can participate in multiple relationships.

Example

STUDENT
        /    \
       /      \
   COURSE ---- TEACHER

It can represent many-to-many relationships.


---

18. Relational Data Model

The relational model represents data in the form of tables.

A table contains:

Rows

Columns


Example

STUDENT
+---------+-------+--------+----------+
| Roll_No | Name  | Course | Semester |
+---------+-------+--------+----------+
| 101     | Rahul | BCA    | 2        |
| 102     | Amit  | BCA    | 2        |
| 103     | Neha  | BCA    | 3        |
+---------+-------+--------+----------+

Important terms

Row → Record/Tuple

Column → Attribute

Table → Relation

Relational DBMS examples include:

MySQL

Oracle Database

PostgreSQL

SQL Server



---

19. Entity-Relationship Model

The ER model represents the database using:

Entities

Attributes

Relationships


Example:

+---------+       ENROLLS       +---------+
| STUDENT |---------------------| COURSE  |
+---------+                     +---------+

ER models are especially useful during database design.

The ER model will be covered in detail in Unit-II.


---

20. Object-Oriented Data Model

The object-oriented model represents information as objects.

An object can contain:

Data
+
Operations

It is useful for applications involving complex objects.


---

21. Data Independence

Definition

Data independence is the ability to change the schema at one level of a database system without requiring changes at the next higher level.

There are two types:

1. Physical Data Independence


2. Logical Data Independence




---

22. Physical Data Independence

Definition

Physical data independence means that changes to the physical/internal storage of the database do not require changes to the logical/conceptual schema.

Example

Suppose the database administrator changes:

Storage organization

or:

Adds an index

The application that uses:

Student(Roll_No, Name, Course)

does not necessarily need to change.

Examples of physical changes

Changing file organization

Adding indexes

Changing storage structures

Changing storage devices



---

23. Logical Data Independence

Definition

Logical data independence means that changes to the conceptual/logical schema do not require changes to external views or application programs, wherever possible.

Example

Suppose a student table is:

STUDENT
-----------------------
Roll_No
Name
Course

Later, a new attribute is added:

Semester

Existing applications/views that do not use the new attribute may continue to work without modification.


---

24. Physical vs Logical Data Independence

Physical Data Independence	Logical Data Independence

Deals with physical storage	Deals with logical structure
Internal level changes	Conceptual level changes
Example: adding an index	Example: adding an attribute
Generally easier to achieve	Generally more difficult
Hides storage changes	Hides logical schema changes


Exam Trick

Remember:

PHYSICAL
    ↓
Storage

LOGICAL
    ↓
Structure


---

25. Data Definition Language (DDL)

Definition

DDL (Data Definition Language) consists of SQL commands used to define and modify the structure of database objects.

Common DDL commands:

CREATE
ALTER
DROP
TRUNCATE

RENAME is also commonly classified as DDL.


---

26. CREATE Command

The CREATE command is used to create database objects.

Create Database

CREATE DATABASE college;

Explanation

CREATE
   ↓
Command used to create

DATABASE
   ↓
Object being created

college
   ↓
Database name


---

Select Database

USE college;

This tells MySQL that subsequent table operations should be performed in the college database.


---

Create Table

CREATE TABLE student (
    roll_no INT,
    name VARCHAR(50),
    course VARCHAR(20),
    semester INT
);

Explanation

student
   ↓
Table name

roll_no
   ↓
Column name

INT
   ↓
Integer data type

name
   ↓
Column name

VARCHAR(50)
   ↓
Variable-length character data
maximum length = 50 characters


---

27. ALTER Command

Definition

ALTER is used to modify the structure of an existing table.


---

Add a Column

ALTER TABLE student
ADD mobile VARCHAR(15);

This adds a new mobile column.


---

Add Multiple Columns

ALTER TABLE student
ADD email VARCHAR(100),
ADD city VARCHAR(50);


---

Modify Column

ALTER TABLE student
MODIFY name VARCHAR(100);

This changes the maximum length of name.


---

Rename Column

ALTER TABLE student
RENAME COLUMN name TO student_name;

Modern MySQL versions support this syntax.


---

28. DROP Command

Definition

DROP permanently removes a database object.

Drop Table

DROP TABLE student;

After executing this command:

student table → removed
table structure → removed
table data → removed


---

Drop Database

DROP DATABASE college;

This removes the complete database and its objects.

Warning

DROP should be used carefully because the object is removed.


---

29. TRUNCATE Command

Definition

TRUNCATE removes all rows from a table while keeping the table structure.

TRUNCATE TABLE student;

After execution:

Table → Exists
Columns → Exist
Rows → 0


---

30. DROP vs TRUNCATE

DROP	TRUNCATE

Removes table/object	Removes all rows
Structure removed	Structure remains
Data removed	Data removed
Table must be recreated	Table can be reused
DDL	DDL



---

31. Data Manipulation Language (DML)

Definition

DML (Data Manipulation Language) consists of commands used to insert, modify and delete data stored in database tables.

Important commands:

INSERT
UPDATE
DELETE


---

32. INSERT Command

Definition

INSERT is used to add new records to a table.

Example

INSERT INTO student
(roll_no, name, course, semester)
VALUES
(101, 'Rahul', 'BCA', 2);

Explanation

INSERT INTO
      ↓
Specifies table

student
      ↓
Table name

(roll_no, name, course, semester)
      ↓
Columns

VALUES
      ↓
Values to be inserted

(101, 'Rahul', 'BCA', 2)
      ↓
Record


---

Insert Multiple Records

INSERT INTO student
(roll_no, name, course, semester)
VALUES
(102, 'Amit', 'BCA', 2),
(103, 'Neha', 'BCA', 2),
(104, 'Ravi', 'BCA', 3);


---

33. UPDATE Command

Definition

UPDATE is used to modify existing records.

Example

UPDATE student
SET semester = 3
WHERE roll_no = 101;

Explanation

UPDATE student
      ↓
Select table

SET semester = 3
      ↓
New value

WHERE roll_no = 101
      ↓
Select particular record


---

Important Warning

Always use WHERE when you want to update a specific record.

Example

UPDATE student
SET semester = 3;

This can update the semester of all records.


---

34. DELETE Command

Definition

DELETE is used to remove records from a table.

Delete a specific record

DELETE FROM student
WHERE roll_no = 104;

Only the record satisfying the condition is deleted.


---

Delete All Records

DELETE FROM student;

This removes all records but keeps the table structure.


---

35. Data Query Language (DQL)

Definition

DQL is commonly used to describe SQL commands used for retrieving data from database tables.

The main command is:

SELECT


---

36. SELECT Command

Display all columns

SELECT *
FROM student;

* means all columns.


---

Display selected columns

SELECT name, course
FROM student;

Only name and course are displayed.


---

SELECT with WHERE

SELECT *
FROM student
WHERE semester = 2;

This displays students whose semester is 2.


---

37. Database Manager

Definition

A Database Manager is a component of a DBMS that manages the interaction between applications/users and the data stored in the database.

It helps in:

Data storage management

Query processing

Transaction management

Authorization

Integrity checking

Recovery

File management


Basic flow

USER
  |
  ↓
APPLICATION
  |
  ↓
DBMS
  |
  ↓
DATABASE MANAGER
  |
  ↓
DATABASE


---

38. Database Administrator (DBA)

Definition

A Database Administrator (DBA) is a person who is responsible for managing, maintaining, securing and monitoring a database system.


---

39. Responsibilities of DBA

39.1 Database Installation

The DBA may install and configure the database management system.


---

39.2 Database Security

The DBA controls who can access particular data.

Example:

Administrator
    ↓
Full privileges

Teacher
    ↓
Academic information

Student
    ↓
Limited access


---

39.3 User Management

The DBA creates users and assigns privileges.


---

39.4 Backup

The DBA plans and manages database backups.


---

39.5 Recovery

The DBA helps recover databases after failures.


---

39.6 Performance Monitoring

The DBA monitors database performance and identifies bottlenecks.


---

39.7 Storage Management

The DBA manages storage requirements.


---

39.8 Integrity Management

The DBA ensures that database constraints and rules are properly maintained.


---

39.9 Database Maintenance

The DBA performs routine maintenance and configuration activities.


---

40. Database Users

Different types of users interact with a DBMS.

Important categories include:

1. Naive/Parametric Users


2. Application Programmers


3. Sophisticated Users


4. Specialized Users


5. Database Administrators




---

41. Naive or Parametric Users

These users interact with the database through predefined applications.

They usually do not write SQL queries directly.

Examples

Bank cashier

Railway reservation clerk

College data-entry operator

ATM user



---

42. Application Programmers

Application programmers develop software applications that interact with databases.

Examples

Web developers

Software developers

Mobile application developers


For example, a programmer may create a college management system that stores information in MySQL.


---

43. Sophisticated Users

Sophisticated users directly interact with the database using queries and database tools.

Examples

Data analysts

Engineers

Researchers

Database experts


They may write SQL queries to analyze data.


---

44. Specialized Users

Specialized users develop or use specialized database applications.

Examples:

Scientific applications

CAD systems

Geographic information systems

AI/data-intensive applications



---

45. Database Administrator

The DBA manages the overall database environment.

The DBA is responsible for:

Security
Backup
Recovery
Performance
Users
Storage
Integrity
Maintenance


---

46. Important DBMS Terms

46.1 Database

An organized collection of related data.


---

46.2 DBMS

Software used to create, store, retrieve and manage databases.


---

46.3 Table

A collection of rows and columns used to store data in a relational database.


---

46.4 Row

A row represents one record/tuple.

Example:

101 | Rahul | BCA | 2


---

46.5 Column

A column represents an attribute/field.

Example:

Roll_No
Name
Course
Semester


---

46.6 Schema

A schema describes the logical structure of a database.

Example:

STUDENT
(
    Roll_No,
    Name,
    Course,
    Semester
)


---

46.7 Instance

An instance is the actual data stored in the database at a particular moment.

Example:

101 | Rahul | BCA | 2
102 | Amit  | BCA | 2

The data can change over time while the schema may remain the same.


---

47. MYSQL PRACTICALS

The following practicals provide a complete basic Unit-I MySQL workflow.


---

PRACTICAL 1

Create a Database

Aim

To create a database named college.

SQL Command

CREATE DATABASE college;

Output

Query OK, 1 row affected

Explanation

CREATE DATABASE creates a new database.


---

PRACTICAL 2

Select the Database

Command

USE college;

Output

Database changed

Explanation

USE selects the database in which we want to perform operations.


---

PRACTICAL 3

Create Student Table

Aim

To create a student table.

Command

CREATE TABLE student (
    roll_no INT,
    name VARCHAR(50),
    course VARCHAR(20),
    semester INT
);

Output

Query OK, 0 rows affected


---

PRACTICAL 4

Display Tables

Command

SHOW TABLES;

Expected Output

+-------------------+
| Tables_in_college |
+-------------------+
| student           |
+-------------------+


---

PRACTICAL 5

Display Table Structure

Command

DESC student;

Expected Output

+----------+-------------+------+-----+---------+-------+
| Field    | Type        | Null | Key | Default | Extra |
+----------+-------------+------+-----+---------+-------+
| roll_no  | int         | YES  |     | NULL    |       |
| name     | varchar(50) | YES  |     | NULL    |       |
| course   | varchar(20) | YES  |     | NULL    |       |
| semester | int         | YES  |     | NULL    |       |
+----------+-------------+------+-----+---------+-------+

> Exact formatting can differ slightly depending on the MySQL version/interface.




---

PRACTICAL 6

Insert One Record

Command

INSERT INTO student
(roll_no, name, course, semester)
VALUES
(101, 'Rahul', 'BCA', 2);

Output

Query OK, 1 row affected


---

PRACTICAL 7

Insert Multiple Records

Command

INSERT INTO student
(roll_no, name, course, semester)
VALUES
(102, 'Amit', 'BCA', 2),
(103, 'Neha', 'BCA', 2),
(104, 'Ravi', 'BCA', 3),
(105, 'Pooja', 'BCA', 3);

Output

Query OK, 4 rows affected


---

PRACTICAL 8

Display All Records

Command

SELECT *
FROM student;

Expected Output

+---------+-------+--------+----------+
| roll_no | name  | course | semester |
+---------+-------+--------+----------+
| 101     | Rahul | BCA    | 2        |
| 102     | Amit  | BCA    | 2        |
| 103     | Neha  | BCA    | 2        |
| 104     | Ravi  | BCA    | 3        |
| 105     | Pooja | BCA    | 3        |
+---------+-------+--------+----------+


---

PRACTICAL 9

Display Specific Columns

Command

SELECT name, course
FROM student;

Expected Output

+-------+--------+
| name  | course |
+-------+--------+
| Rahul | BCA    |
| Amit  | BCA    |
| Neha  | BCA    |
| Ravi  | BCA    |
| Pooja | BCA    |
+-------+--------+


---

PRACTICAL 10

Display Semester 2 Students

Command

SELECT *
FROM student
WHERE semester = 2;

Expected Output

+---------+-------+--------+----------+
| roll_no | name  | course | semester |
+---------+-------+--------+----------+
| 101     | Rahul | BCA    | 2        |
| 102     | Amit  | BCA    | 2        |
| 103     | Neha  | BCA    | 2        |
+---------+-------+--------+----------+


---

PRACTICAL 11

Add a Mobile Column Using ALTER

Aim

To add a mobile number column to an existing table.

Command

ALTER TABLE student
ADD mobile VARCHAR(15);

Output

Query OK, 0 rows affected


---

PRACTICAL 12

Insert Mobile Numbers into Existing Records

After adding the mobile column, existing records contain NULL in that column.

We can update individual records.

Student 101

UPDATE student
SET mobile = '9876543210'
WHERE roll_no = 101;

Student 102

UPDATE student
SET mobile = '9876543211'
WHERE roll_no = 102;

Student 103

UPDATE student
SET mobile = '9876543212'
WHERE roll_no = 103;

Student 104

UPDATE student
SET mobile = '9876543213'
WHERE roll_no = 104;

Student 105

UPDATE student
SET mobile = '9876543214'
WHERE roll_no = 105;

Now check:

SELECT *
FROM student;


---

PRACTICAL 13

Update a Student's Semester

Aim

To update the semester of a particular student.

Command

UPDATE student
SET semester = 3
WHERE roll_no = 101;

Verify

SELECT *
FROM student
WHERE roll_no = 101;

Explanation

UPDATE student

selects the table.

SET semester = 3

changes the semester.

WHERE roll_no = 101

selects only the student whose roll number is 101.


---

PRACTICAL 14

Update Multiple Columns

Suppose we want to change course and semester.

UPDATE student
SET course = 'BCA',
    semester = 4
WHERE roll_no = 101;


---

PRACTICAL 15

Delete a Particular Student

Command

DELETE FROM student
WHERE roll_no = 105;

Verify

SELECT *
FROM student;

The student with roll number 105 will be removed.


---

PRACTICAL 16

Delete All Records

DELETE FROM student;

This deletes all records.

However, the table itself remains.

Verify:

SELECT *
FROM student;

The result will contain zero rows.


---

PRACTICAL 17

TRUNCATE Table

First insert some data again:

INSERT INTO student
(roll_no, name, course, semester, mobile)
VALUES
(101, 'Rahul', 'BCA', 2, '9876543210'),
(102, 'Amit', 'BCA', 2, '9876543211');

Now:

TRUNCATE TABLE student;

This removes all rows while keeping the table structure.

Check:

DESC student;

The columns still exist.


---

PRACTICAL 18

DROP Table

Command

DROP TABLE student;

Now:

student table → deleted

Check:

SHOW TABLES;

The student table will no longer be listed.


---

48. Complete MySQL Practical in One Flow

If you want to practice Unit-I from beginning to end, use this sequence.

CREATE DATABASE college;

USE college;

CREATE TABLE student (
    roll_no INT,
    name VARCHAR(50),
    course VARCHAR(20),
    semester INT
);

SHOW TABLES;

DESC student;

INSERT INTO student
(roll_no, name, course, semester)
VALUES
(101, 'Rahul', 'BCA', 2),
(102, 'Amit', 'BCA', 2),
(103, 'Neha', 'BCA', 2),
(104, 'Ravi', 'BCA', 3),
(105, 'Pooja', 'BCA', 3);

SELECT * FROM student;

SELECT name, course
FROM student;

SELECT *
FROM student
WHERE semester = 2;

ALTER TABLE student
ADD mobile VARCHAR(15);

UPDATE student
SET mobile = '9876543210'
WHERE roll_no = 101;

UPDATE student
SET mobile = '9876543211'
WHERE roll_no = 102;

UPDATE student
SET mobile = '9876543212'
WHERE roll_no = 103;

UPDATE student
SET mobile = '9876543213'
WHERE roll_no = 104;

UPDATE student
SET mobile = '9876543214'
WHERE roll_no = 105;

SELECT * FROM student;

UPDATE student
SET semester = 3
WHERE roll_no = 101;

SELECT *
FROM student
WHERE roll_no = 101;

DELETE FROM student
WHERE roll_no = 105;

SELECT * FROM student;


---

49. DDL vs DML vs DQL

Language	Full Form	Main Purpose	Commands

DDL	Data Definition Language	Database structure	CREATE, ALTER, DROP, TRUNCATE
DML	Data Manipulation Language	Manipulate stored data	INSERT, UPDATE, DELETE
DQL	Data Query Language	Retrieve data	SELECT



---

50. Important Difference Between DELETE, TRUNCATE and DROP

Feature	DELETE	TRUNCATE	DROP

Removes rows	Yes	Yes, all	Yes
Removes selected rows	Yes	No	No
Table remains	Yes	Yes	No
Structure remains	Yes	Yes	No
WHERE allowed	Yes	No	No
Main purpose	Delete records	Empty table	Remove table


Example

DELETE FROM student
WHERE roll_no = 101;

Deletes one selected record.

TRUNCATE TABLE student;

Removes all records but keeps the table.

DROP TABLE student;

Removes the table itself.


---

51. Important SQL Command Categories

SQL
│
├── DDL
│   ├── CREATE
│   ├── ALTER
│   ├── DROP
│   └── TRUNCATE
│
├── DML
│   ├── INSERT
│   ├── UPDATE
│   └── DELETE
│
└── DQL
    └── SELECT

Other SQL categories such as TCL and DCL are covered in Unit-IV.


---

52. Important Exam Questions

Very Short Questions

Q1. What is a database?

A database is an organized collection of related data that can be stored, accessed and managed efficiently.

Q2. What is DBMS?

DBMS is software used to create, store, retrieve, update and manage data in databases.

Q3. What is data abstraction?

Data abstraction is the process of hiding unnecessary implementation details and showing only required information to users.

Q4. Name the three levels of data abstraction.

1. Physical/Internal level


2. Logical/Conceptual level


3. View/External level



Q5. What is data independence?

Data independence is the ability to change a database schema at one level without requiring changes at a higher level.

Q6. Name the types of data independence.

1. Physical data independence


2. Logical data independence



Q7. What is DDL?

DDL stands for Data Definition Language and is used to define or modify database structures.

Q8. Give examples of DDL commands.

CREATE
ALTER
DROP
TRUNCATE

Q9. What is DML?

DML stands for Data Manipulation Language and is used to manipulate data stored in tables.

Q10. Give examples of DML commands.

INSERT
UPDATE
DELETE

Q11. What is DQL?

DQL is commonly used for commands that retrieve data from a database. The main command is SELECT.

Q12. Who is a DBA?

DBA stands for Database Administrator. A DBA manages and maintains the database system.


---

53. Short Answer Questions

Q1. Explain the purpose of a database system.

A database system is used to efficiently store, retrieve, modify and manage data. It provides data security, integrity, sharing, concurrent access, backup and recovery, and helps reduce unnecessary data redundancy.


---

Q2. Explain data abstraction.

Data abstraction hides unnecessary database implementation details from users.

It has three levels:

View Level
    ↓
Logical Level
    ↓
Physical Level

The view level shows user-specific information, the logical level describes the database structure, and the physical level describes how the data is stored.


---

Q3. Explain physical data independence.

Physical data independence means that changes to physical storage do not require changes to the logical database schema.

Example:

Adding an index or changing storage organization generally does not require changing application programs.


---

Q4. Explain logical data independence.

Logical data independence means that changes in the logical/conceptual schema do not require changes to external views or applications wherever possible.

Example:

Adding a new attribute to a table without affecting existing views that do not use it.


---

Q5. Explain the responsibilities of DBA.

A DBA is responsible for:

Database security

User management

Backup

Recovery

Performance monitoring

Storage management

Integrity

Database maintenance



---

54. Long Answer Questions

Q1. Explain DBMS and its advantages over the traditional file system.

Answer structure

1. Define database.


2. Define DBMS.


3. Explain traditional file system.


4. Explain problems of file system.


5. Explain advantages of DBMS.


6. Give comparison table.




---

Q2. Explain three levels of data abstraction with diagram.

Answer structure

1. Define data abstraction.


2. Explain physical level.


3. Explain logical level.


4. Explain view level.


5. Draw three-level architecture.



Users
  ↓
View / External Level
  ↓
Logical / Conceptual Level
  ↓
Physical / Internal Level
  ↓
Database


---

Q3. Explain data independence and its types.

Answer structure

1. Definition


2. Physical data independence


3. Example


4. Logical data independence


5. Example


6. Difference table




---

Q4. Explain different types of data models.

Discuss:

1. Hierarchical


2. Network


3. Relational


4. ER


5. Object-oriented




---

Q5. Explain DDL, DML and DQL with examples.

DDL

CREATE TABLE student (
    roll_no INT,
    name VARCHAR(50)
);

DML

INSERT INTO student
VALUES (101, 'Rahul');

DQL

SELECT *
FROM student;


---

Q6. Explain database users and DBA.

Discuss:

Naive / Parametric Users
Application Programmers
Sophisticated Users
Specialized Users
DBA


---

55. Viva Questions

1. What is DBMS?

Software used to manage databases.

2. What does SQL stand for?

Structured Query Language.

3. Which command creates a database?

CREATE DATABASE

4. Which command selects a database in MySQL?

USE

5. Which command creates a table?

CREATE TABLE

6. Which command adds a new column?

ALTER TABLE ... ADD

7. Which command removes a table?

DROP TABLE

8. Which command removes all records while keeping the table?

TRUNCATE TABLE

9. Which command inserts records?

INSERT

10. Which command modifies records?

UPDATE

11. Which command deletes records?

DELETE

12. Which command retrieves records?

SELECT

13. What does * mean in SELECT?

It represents all columns.

14. What is DBA?

Database Administrator.

15. What are the three levels of data abstraction?

Physical, Logical and View.


---

56. Unit-I Quick Revision

DATABASE
↓
Organized collection of related data

DBMS
↓
Software used to manage databases

PURPOSE
↓
Storage
Retrieval
Modification
Security
Integrity
Sharing
Backup
Recovery
Concurrent Access
Data Independence

DATA ABSTRACTION
↓
View
↓
Logical
↓
Physical

DATA MODELS
↓
Hierarchical
Network
Relational
ER
Object-Oriented

DATA INDEPENDENCE
↓
Physical
Logical

DDL
↓
CREATE
ALTER
DROP
TRUNCATE

DML
↓
INSERT
UPDATE
DELETE

DQL
↓
SELECT

DATABASE MANAGER
↓
Manages interaction between DBMS and stored data

DBA
↓
Security
Backup
Recovery
Performance
Users
Storage
Maintenance

DATABASE USERS
↓
Naive
Application Programmers
Sophisticated
Specialized
DBA


---

57. MySQL Practical Cheat Sheet

-- Create database
CREATE DATABASE college;

-- Select database
USE college;

-- Create table
CREATE TABLE student (
    roll_no INT,
    name VARCHAR(50),
    course VARCHAR(20),
    semester INT
);

-- Show databases
SHOW DATABASES;

-- Show tables
SHOW TABLES;

-- Show table structure
DESC student;

-- Insert one record
INSERT INTO student
VALUES (101, 'Rahul', 'BCA', 2);

-- Insert multiple records
INSERT INTO student
VALUES
(102, 'Amit', 'BCA', 2),
(103, 'Neha', 'BCA', 3);

-- Display all records
SELECT * FROM student;

-- Display selected columns
SELECT name, course
FROM student;

-- Display records according to condition
SELECT *
FROM student
WHERE semester = 2;

-- Add column
ALTER TABLE student
ADD mobile VARCHAR(15);

-- Modify column
ALTER TABLE student
MODIFY name VARCHAR(100);

-- Rename column
ALTER TABLE student
RENAME COLUMN name TO student_name;

-- Update specific record
UPDATE student
SET semester = 3
WHERE roll_no = 101;

-- Delete specific record
DELETE FROM student
WHERE roll_no = 103;

-- Delete all records
DELETE FROM student;

-- Remove all rows but keep table
TRUNCATE TABLE student;

-- Remove table
DROP TABLE student;

-- Remove database
DROP DATABASE college;


---

58. Unit-I Final Summary

Unit-I establishes the basic foundation of Database Management Systems.

The most important concepts are:

Database
      ↓
DBMS
      ↓
Purpose of DBMS
      ↓
Data Abstraction
      ↓
Data Models
      ↓
Data Independence
      ↓
DDL
      ↓
DML
      ↓
DQL
      ↓
Database Manager
      ↓
DBA
      ↓
Database Users

For practical preparation, remember this basic MySQL sequence:

CREATE DATABASE
       ↓
USE DATABASE
       ↓
CREATE TABLE
       ↓
INSERT
       ↓
SELECT
       ↓
ALTER
       ↓
UPDATE
       ↓
DELETE
       ↓
TRUNCATE
       ↓
DROP

