# CSA6001T – DATABASE MANAGEMENT SYSTEM

# UNIT – II
## ER Model, Database Design and Normalization

---

# 1. Introduction to ER Model

The **Entity-Relationship (ER) Model** is a high-level conceptual data model used to represent the structure of a database.

It describes three main things:

1. **Entities** – real-world objects about which data is stored.
2. **Attributes** – properties of entities.
3. **Relationships** – associations between entities.

The ER model is mainly used during the **conceptual database design** stage.

### Example

In a college database:

- **Student** is an entity.
- **Roll_No, Name, Mobile, Email** are attributes.
- **Student enrolls in Course** is a relationship.

```text
+----------+        ENROLLS        +----------+
| STUDENT  | --------------------- | COURSE   |
+----------+                       +----------+
```

---

# 2. Entity

An **Entity** is a real-world object, person, place, thing, or concept that can be uniquely identified and about which information can be stored.

### Examples

- Student
- Teacher
- Employee
- Customer
- Product
- Book
- Department
- Course
- Passenger

### Example

```text
Student:
Roll_No = 101
Name = Rahul
Semester = 2
```

Here, the particular student Rahul is an **entity**.

---

# 3. Entity Set

An **Entity Set** is a collection of similar entities that have the same type of attributes.

### Example

All students in a college form the **Student Entity Set**.

```text
+--------+----------+----------+
| Roll_No| Name     | Semester |
+--------+----------+----------+
| 101    | Rahul    | 2        |
| 102    | Amit     | 2        |
| 103    | Neha     | 2        |
+--------+----------+----------+
```

### Difference Between Entity and Entity Set

| Entity | Entity Set |
|---|---|
| One individual object | Collection of similar objects |
| Example: Rahul | Example: All students |
| Represents one instance | Represents a group |

---

# 4. Strong Entity

A **Strong Entity** is an entity that has its own key attribute and can be uniquely identified independently.

### Example

A Student entity can have `Roll_No` as its primary key.

```text
+----------------------+
|       STUDENT        |
|----------------------|
| Roll_No (PK)         |
| Name                 |
| Mobile               |
| Semester             |
+----------------------+
```

A strong entity does not depend on another entity for its identification.

A strong entity is traditionally represented using a **single rectangle**.

---

# 5. Weak Entity

A **Weak Entity** is an entity that cannot be uniquely identified by its own attributes alone.

It depends on a related **Strong Entity** for identification.

A weak entity normally has a **partial key**.

### Example

Consider an Employee and their Dependents.

```text
EMPLOYEE
---------
Employee_ID
Name
```

```text
DEPENDENT
---------
Dependent_Name
Age
Relation
```

A dependent may be identified using:

```text
Employee_ID + Dependent_Name
```

A weak entity is traditionally represented by a **double rectangle** and its identifying relationship by a **double diamond**.

---

# 6. Attribute

An **Attribute** is a property or characteristic that describes an entity.

### Example

For Student:

```text
Student
----------------
Roll_No
Name
Mobile
Email
Semester
```

---

# 7. Types of Attributes

Important types are:

1. **Simple Attribute**
2. **Composite Attribute**
3. **Single-Valued Attribute**
4. **Multi-Valued Attribute**
5. **Derived Attribute**
6. **Key Attribute**

## 7.1 Simple Attribute

A **Simple Attribute** cannot be divided into smaller meaningful components.

Examples: Age, Gender, Salary, Roll_No.

## 7.2 Composite Attribute

A **Composite Attribute** can be divided into smaller meaningful components.

```text
Name
 |
 +-- First_Name
 +-- Middle_Name
 +-- Last_Name
```

Address can contain House_No, Street, City, State and PIN.

## 7.3 Single-Valued Attribute

A **Single-Valued Attribute** has only one value for a particular entity.

Examples: Roll_No, Gender, Date_of_Birth.

## 7.4 Multi-Valued Attribute

A **Multi-Valued Attribute** can have more than one value for one entity.

Example: a student may have multiple phone numbers.

In traditional ER notation, it is represented using a **double oval**.

In a relational database, it is normally stored in a separate table.

## 7.5 Derived Attribute

A **Derived Attribute** is calculated from another stored attribute.

Example: Age can be calculated from Date_of_Birth.

In traditional ER notation, a derived attribute is represented using a **dashed oval**.

## 7.6 Key Attribute

A **Key Attribute** uniquely identifies an entity. It is traditionally shown as **underlined**.

---

# 8. Relationship

A **Relationship** represents an association between two or more entities.

```text
+----------+       ENROLLS       +----------+
| STUDENT  | ------------------- | COURSE   |
+----------+                     +----------+
```

Here Student and Course are entities and Enrolls is the relationship.

---

# 9. Relationship Set

A **Relationship Set** is a collection of similar relationships among entity sets.

For example, all student-course enrollment associations together form the **ENROLLS relationship set**.

---

# 10. Degree of Relationship

The **Degree of a Relationship** indicates the number of entity sets participating in a relationship.

## 10.1 Unary Relationship

A **Unary Relationship** involves one entity set and is also called a recursive relationship.

Example: an employee supervises another employee.

```text
       SUPERVISES
     ↗           ↘
EMPLOYEE       EMPLOYEE
```

## 10.2 Binary Relationship

A **Binary Relationship** involves two entity sets.

```text
+----------+       WORKS_FOR       +------------+
| EMPLOYEE | --------------------- | DEPARTMENT |
+----------+                       +------------+
```

## 10.3 Ternary Relationship

A **Ternary Relationship** involves three entity sets.

```text
             SUPPLIES
          /     |      \\
         /      |       \\
   SUPPLIER    PART    PROJECT
```

---

# 11. Mapping Constraints

**Mapping Constraints** describe how entities are associated with other entities.

They mainly include:

1. **Cardinality**
2. **Participation Constraint**

---

# 12. Cardinality

**Cardinality** specifies the number of entities that can be associated with another entity.

Common types:

1. **One-to-One (1:1)**
2. **One-to-Many (1:N)**
3. **Many-to-One (N:1)**
4. **Many-to-Many (M:N)**

## 12.1 One-to-One (1:1)

One entity of A is associated with at most one entity of B, and vice versa.

```text
+---------+        HAS        +----------+
| PERSON  | ----------------- | PASSPORT |
+---------+                   +----------+
     1                            1
```

## 12.2 One-to-Many (1:N)

One entity of the first entity set can be associated with many entities of the second entity set.

```text
+------------+       HAS       +----------+
| DEPARTMENT | --------------< | EMPLOYEE |
+------------+                 +----------+
      1                            N
```

## 12.3 Many-to-One (N:1)

Many entities of the first entity set are associated with one entity of the second entity set.

```text
+----------+       WORKS_IN       +------------+
| EMPLOYEE | -------------------- | DEPARTMENT |
+----------+                      +------------+
     N                                  1
```

## 12.4 Many-to-Many (M:N)

Many entities from one entity set can be associated with many entities from another entity set.

```text
+----------+       ENROLLS       +----------+
| STUDENT  | >----------------< | COURSE   |
+----------+                    +----------+
      M                              N
```

---

# 13. Participation Constraint

Participation specifies whether every entity must participate in a relationship.

There are two types:

1. **Total Participation**
2. **Partial Participation**

## 13.1 Total Participation

In **Total Participation**, every entity in the entity set must participate in at least one relationship. It is also called mandatory participation.

In traditional notation, a **double line** represents total participation.

## 13.2 Partial Participation

In **Partial Participation**, some entities may not participate in the relationship. A **single line** represents partial participation in traditional notation.

---

# 14. ER Diagram

An **ER Diagram (ERD)** is a graphical representation of entities, attributes and relationships in a database.

| Component | Traditional Symbol |
|---|---|
| Strong Entity | Rectangle |
| Weak Entity | Double Rectangle |
| Relationship | Diamond |
| Identifying Relationship | Double Diamond |
| Attribute | Oval |
| Key Attribute | Underlined |
| Multi-Valued Attribute | Double Oval |
| Derived Attribute | Dashed Oval |
| Total Participation | Double Line |

---

# 15. Keys in Database

A **Key** is an attribute or combination of attributes used to identify records uniquely.

Important types:

1. **Super Key**
2. **Candidate Key**
3. **Primary Key**
4. **Alternate Key**
5. **Foreign Key**
6. **Composite Key**

## 15.1 Super Key

A **Super Key** is any set of one or more attributes that can uniquely identify a tuple.

Example possible super keys include `Roll_No`, `Email`, or combinations containing a unique attribute.

## 15.2 Candidate Key

A **Candidate Key** is a minimal super key. It uniquely identifies a record and contains no unnecessary attribute.

## 15.3 Primary Key

A **Primary Key** is the candidate key selected to uniquely identify records.

```sql
CREATE TABLE student (
    roll_no INT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100)
);
```

Important properties:

- Unique
- Cannot be NULL
- One primary-key constraint is defined for a table
- It can contain multiple columns

## 15.4 Alternate Key

Candidate keys that are not selected as the primary key are called **Alternate Keys**.

Example:

```text
Candidate Keys: Roll_No, Email
Primary Key: Roll_No
Alternate Key: Email
```

## 15.5 Foreign Key

A **Foreign Key** is an attribute that references a key in another table.

```sql
CREATE TABLE department (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50)
);

CREATE TABLE employee (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(50),
    dept_id INT,
    FOREIGN KEY (dept_id)
        REFERENCES department(dept_id)
);
```

## 15.6 Composite Key

A **Composite Key** consists of two or more attributes used together to uniquely identify a record.

```sql
CREATE TABLE enrollment (
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    PRIMARY KEY (student_id, course_id)
);
```

---

# 16. Reduction of ER Diagram to Relational Tables

**ER-to-Relational Mapping** means converting an ER model into relational tables.

General rules:

1. Strong entity → Table
2. Simple attributes → Columns
3. Key attribute → Primary Key
4. Composite attribute → Store component attributes
5. Multi-valued attribute → Separate table
6. Weak entity → Table containing owner key
7. 1:1 relationship → Foreign key in one table
8. 1:N relationship → Foreign key on N-side
9. M:N relationship → New relationship table
10. Relationship attributes → Columns in the appropriate table

---

# 17. Mapping Strong Entity

```text
STUDENT
---------
Roll_No
Name
Mobile
Semester
```

becomes a table with `Roll_No` as the primary key.

```sql
CREATE TABLE student (
    roll_no INT PRIMARY KEY,
    name VARCHAR(50),
    mobile VARCHAR(15),
    semester INT
);
```

---

# 18. Mapping Composite Attribute

If:

```text
Name
 |
 +-- First_Name
 +-- Last_Name
```

store `first_name` and `last_name` as separate columns.

---

# 19. Mapping Multi-Valued Attribute

If one student has multiple phone numbers:

```text
STUDENT
----------------
roll_no
name

STUDENT_PHONE
----------------
roll_no
phone
```

```sql
CREATE TABLE student_phone (
    roll_no INT,
    phone VARCHAR(15),
    PRIMARY KEY (roll_no, phone),
    FOREIGN KEY (roll_no)
        REFERENCES student(roll_no)
);
```

---

# 20. Mapping 1:1 Relationship

Suppose:

```text
PERSON -------- HAS -------- PASSPORT
   1                         1
```

A foreign key can be placed in one of the tables.

```sql
CREATE TABLE person (
    person_id INT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE passport (
    passport_no VARCHAR(20) PRIMARY KEY,
    person_id INT UNIQUE,
    FOREIGN KEY (person_id)
        REFERENCES person(person_id)
);
```

`UNIQUE` helps enforce the one-to-one association for this design.

---

# 21. Mapping 1:N Relationship

Suppose:

```text
DEPARTMENT -------- HAS -------- EMPLOYEE
     1                              N
```

The primary key of the 1-side is added as a foreign key to the N-side.

```sql
CREATE TABLE department (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50)
);

CREATE TABLE employee (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(50),
    dept_id INT,
    FOREIGN KEY (dept_id)
        REFERENCES department(dept_id)
);
```

---

# 22. Mapping M:N Relationship

Suppose:

```text
STUDENT -------- ENROLLS -------- COURSE
    M                               N
```

An M:N relationship is converted into a new table.

```sql
CREATE TABLE student (
    student_id INT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE course (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100)
);

CREATE TABLE enrollment (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id)
        REFERENCES student(student_id),
    FOREIGN KEY (course_id)
        REFERENCES course(course_id)
);
```

---

# 23. Generalization

**Generalization** is a bottom-up approach in which two or more lower-level entity sets are combined into a higher-level entity set based on common characteristics.

### Example

```text
       VEHICLE
       /      \\
      /        \\
    CAR       TRUCK
```

Common attributes such as Vehicle_No, Color and Model can be placed in Vehicle.

**Generalization = Bottom-up.**

---

# 24. Specialization

**Specialization** is a top-down approach in which a higher-level entity is divided into more specific lower-level entity sets.

```text
          EMPLOYEE
          /      \\
         /        \\
    MANAGER     ENGINEER
```

**Specialization = Top-down.**

---

# 25. Generalization vs Specialization

| Generalization | Specialization |
|---|---|
| Bottom-up | Top-down |
| Specific → General | General → Specific |
| Combines similar entities | Divides a general entity |
| Finds common properties | Finds specialized properties |

---

# 26. Aggregation

**Aggregation** is an abstraction mechanism in which a relationship set is treated as a higher-level entity/object so that it can participate in another relationship.

Example:

```text
EMPLOYEE ---- WORKS_ON ---- PROJECT
```

A Manager monitors this employee-project assignment. The `WORKS_ON` relationship can therefore be treated as a higher-level object through aggregation.

```text
Employee + Works_On + Project
             |
             v
       Aggregated Object
             |
             v
          Manager
```

---

# 27. Database Schema Design

A **Database Schema** describes the logical structure of a database, including tables, attributes, relationships and constraints.

A good schema should:

- Reduce unnecessary duplication.
- Maintain consistency.
- Clearly define relationships.
- Use appropriate keys.
- Minimize anomalies.
- Support required operations.

---

# 28. Steps for Designing an ER Database Scheme

## Step 1: Collect Requirements

Understand what information the organization needs.

## Step 2: Identify Entities

Example: Student, Course, Teacher, Department.

## Step 3: Identify Attributes

For Student: Student_ID, Name, Mobile, Email, Semester.

## Step 4: Identify Keys

Example: Student_ID and Course_ID.

## Step 5: Identify Relationships

Example: Student enrolls in Course.

## Step 6: Identify Cardinality

Example: Student : Course = M:N.

## Step 7: Identify Participation

Decide whether participation is total or partial.

## Step 8: Draw ER Diagram

Represent entities, attributes and relationships.

## Step 9: Convert ER Model into Tables

Map entities and relationships to relational tables.

## Step 10: Normalize

Check redundancy and dependency problems.

## Step 11: Implement in DBMS

Create tables using SQL and apply constraints.

---

# 29. Normalization

**Normalization** is a database design technique used to organize data into appropriate relations to reduce redundancy and prevent anomalies.

### Objectives

- Reduce data duplication.
- Improve consistency.
- Remove undesirable dependencies.
- Prevent insertion anomaly.
- Prevent update anomaly.
- Prevent deletion anomaly.

### Normal Forms

1. **1NF – First Normal Form**
2. **2NF – Second Normal Form**
3. **3NF – Third Normal Form**
4. **BCNF – Boyce-Codd Normal Form**
5. **4NF – Fourth Normal Form**
6. **5NF – Fifth Normal Form**

---

# 30. Anomalies

Poor database design can produce:

1. **Insertion Anomaly**
2. **Update Anomaly**
3. **Deletion Anomaly**

## 30.1 Insertion Anomaly

An **Insertion Anomaly** occurs when some information cannot be inserted without inserting unrelated information.

## 30.2 Update Anomaly

An **Update Anomaly** occurs when the same information is stored in multiple rows and must be updated at several places.

## 30.3 Deletion Anomaly

A **Deletion Anomaly** occurs when deleting one record unintentionally removes other useful information.

---

# 31. Functional Dependency

A **Functional Dependency (FD)** describes a relationship between attributes.

It is written as:

```text
A → B
```

This means **A determines B**.

Examples:

```text
Roll_No → Student_Name
Course_ID → Course_Name
```

---

# 32. Full Functional Dependency

An attribute is **fully functionally dependent** on a composite key if it depends on the whole key and not on any proper subset of that key.

Example:

```text
(Student_ID, Course_ID) → Marks
```

Marks depend on both Student_ID and Course_ID.

---

# 33. Partial Dependency

A **Partial Dependency** occurs when a non-key attribute depends on only part of a composite candidate key.

Example:

```text
ENROLLMENT
----------------------------------------
Student_ID | Course_ID | Student_Name
----------------------------------------
101        | C01       | Rahul
101        | C02       | Rahul
```

Composite key:

```text
(Student_ID, Course_ID)
```

But:

```text
Student_ID → Student_Name
```

Therefore Student_Name depends only on part of the composite key.

Partial dependency is removed while moving from **1NF to 2NF**.

---

# 34. Transitive Dependency

A **Transitive Dependency** occurs when a non-key attribute depends on another non-key attribute.

Example:

```text
Student_ID → Department_ID
Department_ID → Department_Name
```

Therefore:

```text
Student_ID → Department_Name
```

through Department_ID.

It is removed while moving from **2NF to 3NF**.

---

# 35. First Normal Form (1NF)

A relation is in **1NF** if:

- Each column contains atomic values.
- There are no repeating groups.
- Each cell contains a single value.

### Not in 1NF

```text
STUDENT
----------------------------------
ID | Name  | Phone
----------------------------------
1  | Rahul | 9876, 9123
```

Phone contains multiple values.

### 1NF Design

```text
STUDENT
--------------------
ID | Name
--------------------
1  | Rahul
```

```text
STUDENT_PHONE
--------------------
ID | Phone
--------------------
1  | 9876
1  | 9123
```

**1NF = Atomic Values + No Repeating Groups**

---

# 36. Second Normal Form (2NF)

A relation is in **2NF** if:

1. It is already in 1NF.
2. No non-key attribute is partially dependent on a proper subset of a candidate key.

2NF is especially important when a table has a composite key.

### Example

```text
ENROLLMENT
------------------------------------------------
Student_ID | Course_ID | Student_Name | Course_Name
------------------------------------------------
101        | C01       | Rahul        | DBMS
101        | C02       | Rahul        | C++
102        | C01       | Amit         | DBMS
```

Composite key:

```text
(Student_ID, Course_ID)
```

Dependencies:

```text
Student_ID → Student_Name
Course_ID → Course_Name
```

These are partial dependencies.

### Decomposition

```text
STUDENT
--------------------
Student_ID | Name

COURSE
--------------------
Course_ID | Course_Name

ENROLLMENT
--------------------
Student_ID | Course_ID
```

**2NF = 1NF + No Partial Dependency**

---

# 37. Third Normal Form (3NF)

A relation is in **3NF** if:

1. It is in 2NF.
2. It has no problematic transitive dependency.

Formal condition: for every non-trivial functional dependency `X → A`, either X is a super key or A is a prime attribute.

### Example

```text
STUDENT
----------------------------------------
Student_ID | Student_Name | Dept_ID | Dept_Name
----------------------------------------
101        | Rahul        | D01     | Computer
102        | Amit         | D01     | Computer
103        | Neha         | D02     | Management
```

Dependencies:

```text
Student_ID → Student_Name, Dept_ID
Dept_ID → Dept_Name
```

Therefore Student_ID determines Dept_Name through Dept_ID. This is transitive dependency.

### Decomposition

```text
STUDENT
------------------------
Student_ID | Student_Name | Dept_ID

DEPARTMENT
------------------------
Dept_ID | Dept_Name
```

**3NF = 2NF + No Transitive Dependency**

---

# 38. BCNF – Boyce-Codd Normal Form

**BCNF** is a stronger form of 3NF.

A relation is in **BCNF** if for every non-trivial functional dependency:

```text
X → Y
```

X is a **super key**.

### Difference

```text
3NF:
X is a super key OR Y is a prime attribute.

BCNF:
X must be a super key.
```

Therefore, every BCNF relation satisfies 3NF, but a 3NF relation may not always satisfy BCNF.

### Key Idea

```text
BCNF = Every determinant is a Super Key
```

---

# 39. Fourth Normal Form (4NF)

**4NF** deals with **Multivalued Dependencies (MVDs)**.

A relation is in 4NF if:

1. It is in BCNF.
2. It has no non-trivial multivalued dependency unless its determinant is a super key.

### Example

Suppose a student has multiple independent hobbies and languages.

```text
STUDENT_HOBBY_LANGUAGE
--------------------------------
Student | Hobby   | Language
--------------------------------
Rahul   | Cricket | Hindi
Rahul   | Cricket | English
Rahul   | Music   | Hindi
Rahul   | Music   | English
```

### Decomposition

```text
STUDENT_HOBBY
----------------
Student | Hobby

STUDENT_LANGUAGE
----------------
Student | Language
```

**4NF = BCNF + No Problematic Multivalued Dependency**

---

# 40. Fifth Normal Form (5NF)

**5NF** is also called **Project-Join Normal Form (PJ/NF)**.

It deals with **Join Dependencies**.

A relation is in 5NF when every non-trivial join dependency is implied by candidate keys.

5NF is mainly useful in complex database designs where a relation can be decomposed into smaller relations and correctly reconstructed using joins.

**5NF = Deals with Join Dependencies**

---

# 41. Normalization Summary

| Normal Form | Main Requirement |
|---|---|
| 1NF | Atomic values and no repeating groups |
| 2NF | 1NF + No partial dependency |
| 3NF | 2NF + No problematic transitive dependency |
| BCNF | Every determinant is a super key |
| 4NF | No problematic multivalued dependency |
| 5NF | No problematic join dependency |

### Easy Memory Trick

```text
1NF  → Atomic Values
2NF  → Partial Dependency Removed
3NF  → Transitive Dependency Removed
BCNF → Determinant = Super Key
4NF  → Multivalued Dependency
5NF  → Join Dependency
```

---

# 42. Complete College ER Example

Consider a college database containing Students, Courses, Departments and Enrollment.

### Entities

```text
STUDENT
---------
Student_ID
Name
Mobile
Email

COURSE
---------
Course_ID
Course_Name
Credits

DEPARTMENT
---------
Dept_ID
Dept_Name
```

### Relationships

```text
DEPARTMENT ---- OFFERS ---- COURSE

STUDENT ---- ENROLLS ---- COURSE
```

### Cardinality

```text
DEPARTMENT : COURSE = 1:N
STUDENT : COURSE = M:N
```

Because Student–Course is M:N, create an Enrollment table.

---

# 43. MySQL Practical – Create College Database

## Aim

To create a simple college database containing Student, Department, Course and Enrollment tables.

## Step 1: Create Database

```sql
CREATE DATABASE college_db;
```

## Step 2: Select Database

```sql
USE college_db;
```

## Step 3: Create Department Table

```sql
CREATE TABLE department (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL
);
```

## Step 4: Create Student Table

```sql
CREATE TABLE student (
    student_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    mobile VARCHAR(15),
    email VARCHAR(100),
    dept_id INT,
    FOREIGN KEY (dept_id)
        REFERENCES department(dept_id)
);
```

## Step 5: Create Course Table

```sql
CREATE TABLE course (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    credits INT
);
```

## Step 6: Create Enrollment Table

```sql
CREATE TABLE enrollment (
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id)
        REFERENCES student(student_id),
    FOREIGN KEY (course_id)
        REFERENCES course(course_id)
);
```

---

# 44. Insert Department Data

```sql
INSERT INTO department VALUES
(1, 'Computer Science'),
(2, 'Management');
```

```sql
SELECT * FROM department;
```

### Output

```text
+---------+------------------+
| dept_id | dept_name        |
+---------+------------------+
| 1       | Computer Science |
| 2       | Management       |
+---------+------------------+
```

---

# 45. Insert Student Data

```sql
INSERT INTO student
(student_id, name, mobile, email, dept_id)
VALUES
(101, 'Rahul', '9876543210', 'rahul@gmail.com', 1),
(102, 'Amit', '9123456780', 'amit@gmail.com', 1),
(103, 'Neha', '9988776655', 'neha@gmail.com', 2);
```

```sql
SELECT * FROM student;
```

### Output

```text
+------------+-------+------------+-------------------+---------+
| student_id | name  | mobile     | email             | dept_id |
+------------+-------+------------+-------------------+---------+
| 101        | Rahul | 9876543210 | rahul@gmail.com   | 1       |
| 102        | Amit  | 9123456780 | amit@gmail.com    | 1       |
| 103        | Neha  | 9988776655 | neha@gmail.com    | 2       |
+------------+-------+------------+-------------------+---------+
```

---

# 46. Insert Course Data

```sql
INSERT INTO course VALUES
(201, 'DBMS', 4),
(202, 'Data Structures', 4),
(203, 'C++ Programming', 3);
```

```sql
SELECT * FROM course;
```

### Output

```text
+-----------+-----------------+---------+
| course_id | course_name     | credits |
+-----------+-----------------+---------+
| 201       | DBMS            | 4       |
| 202       | Data Structures | 4       |
| 203       | C++ Programming | 3       |
+-----------+-----------------+---------+
```

---

# 47. Insert Enrollment Data

```sql
INSERT INTO enrollment
(student_id, course_id, enrollment_date)
VALUES
(101, 201, '2026-07-01'),
(101, 202, '2026-07-01'),
(102, 201, '2026-07-02'),
(103, 203, '2026-07-03');
```

```sql
SELECT * FROM enrollment;
```

### Output

```text
+------------+-----------+-----------------+
| student_id | course_id | enrollment_date |
+------------+-----------+-----------------+
| 101        | 201       | 2026-07-01      |
| 101        | 202       | 2026-07-01      |
| 102        | 201       | 2026-07-02      |
| 103        | 203       | 2026-07-03      |
+------------+-----------+-----------------+
```

---

# 48. Practical – Display Student With Department

## Aim

To display student names along with their department names.

```sql
SELECT
    s.student_id,
    s.name,
    d.dept_name
FROM student s
JOIN department d
ON s.dept_id = d.dept_id;
```

### Output

```text
+------------+-------+------------------+
| student_id | name  | dept_name        |
+------------+-------+------------------+
| 101        | Rahul | Computer Science |
| 102        | Amit  | Computer Science |
| 103        | Neha  | Management       |
+------------+-------+------------------+
```

The foreign key connects `student.dept_id` with `department.dept_id`.

---

# 49. Practical – Display Students and Courses

## Aim

To display students along with their enrolled courses.

```sql
SELECT
    s.name AS student_name,
    c.course_name
FROM student s
JOIN enrollment e
ON s.student_id = e.student_id
JOIN course c
ON e.course_id = c.course_id;
```

### Output

```text
+--------------+-----------------+
| student_name | course_name     |
+--------------+-----------------+
| Rahul        | DBMS            |
| Rahul        | Data Structures |
| Amit         | DBMS            |
| Neha         | C++ Programming |
+--------------+-----------------+
```

---

# 50. Practical – Demonstrate Composite Primary Key

The Enrollment table uses:

```sql
PRIMARY KEY (student_id, course_id)
```

The combination of both columns must be unique.

If `(101, 201)` already exists, the following statement will fail:

```sql
INSERT INTO enrollment
VALUES (101, 201, '2026-07-05');
```

This demonstrates a **Composite Primary Key**.

---

# 51. Practical – Demonstrate Foreign Key

Suppose department `10` does not exist.

```sql
INSERT INTO student
(student_id, name, mobile, email, dept_id)
VALUES
(104, 'Ravi', '9000000000', 'ravi@gmail.com', 10);
```

This will normally fail because the referenced department does not exist, demonstrating **Referential Integrity**.

---

# 52. Practical – Multi-Valued Attribute

Suppose one student has multiple phone numbers.

```sql
CREATE TABLE student_basic (
    student_id INT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE student_phone (
    student_id INT,
    phone VARCHAR(15),
    PRIMARY KEY (student_id, phone),
    FOREIGN KEY (student_id)
        REFERENCES student_basic(student_id)
);

INSERT INTO student_basic
VALUES (101, 'Rahul');

INSERT INTO student_phone
VALUES
(101, '9876543210'),
(101, '9123456780');

SELECT * FROM student_phone;
```

### Output

```text
+------------+------------+
| student_id | phone      |
+------------+------------+
| 101        | 9876543210 |
| 101        | 9123456780 |
+------------+------------+
```

---

# 53. Practical – Demonstrating 1NF

## Non-1NF

```text
STUDENT
--------------------------------
Student_ID | Name  | Phone
--------------------------------
101        | Rahul | 9876,9123
```

Phone contains multiple values.

## 1NF

```text
STUDENT
--------------------
Student_ID | Name
--------------------
101        | Rahul
```

```text
STUDENT_PHONE
--------------------
Student_ID | Phone
--------------------
101        | 9876
101        | 9123
```

This design keeps values atomic.

---

# 54. Practical – Demonstrating 2NF

Consider:

```text
ENROLLMENT
------------------------------------------------
Student_ID | Course_ID | Student_Name | Course_Name
------------------------------------------------
101        | C01       | Rahul        | DBMS
101        | C02       | Rahul        | C++
102        | C01       | Amit         | DBMS
```

Composite key:

```text
(Student_ID, Course_ID)
```

Dependencies:

```text
Student_ID → Student_Name
Course_ID → Course_Name
```

These are partial dependencies.

### Decompose

```text
STUDENT
--------------------
Student_ID | Name

COURSE
--------------------
Course_ID | Course_Name

ENROLLMENT
--------------------
Student_ID | Course_ID
```

---

# 55. Practical – Demonstrating 3NF

Suppose:

```text
STUDENT
----------------------------------------
Student_ID | Name  | Dept_ID | Dept_Name
----------------------------------------
101        | Rahul | D01     | Computer
102        | Amit  | D01     | Computer
```

Dependencies:

```text
Student_ID → Dept_ID
Dept_ID → Dept_Name
```

Therefore `Student_ID → Dept_Name` is transitive.

### Decompose

```text
STUDENT
------------------------
Student_ID | Name | Dept_ID

DEPARTMENT
------------------------
Dept_ID | Dept_Name
```

This removes the transitive dependency.

---

# 56. Complete MySQL Practical

## Aim

To implement a simple ER model in MySQL using tables, primary keys and foreign keys.

```sql
CREATE DATABASE college_db;

USE college_db;

CREATE TABLE department (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL
);

CREATE TABLE student (
    student_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    mobile VARCHAR(15),
    email VARCHAR(100),
    dept_id INT,
    FOREIGN KEY (dept_id)
        REFERENCES department(dept_id)
);

CREATE TABLE course (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    credits INT
);

CREATE TABLE enrollment (
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id)
        REFERENCES student(student_id),
    FOREIGN KEY (course_id)
        REFERENCES course(course_id)
);

INSERT INTO department VALUES
(1, 'Computer Science'),
(2, 'Management');

INSERT INTO student
VALUES
(101, 'Rahul', '9876543210', 'rahul@gmail.com', 1),
(102, 'Amit', '9123456780', 'amit@gmail.com', 1),
(103, 'Neha', '9988776655', 'neha@gmail.com', 2);

INSERT INTO course VALUES
(201, 'DBMS', 4),
(202, 'Data Structures', 4),
(203, 'C++ Programming', 3);

INSERT INTO enrollment
VALUES
(101, 201, '2026-07-01'),
(101, 202, '2026-07-01'),
(102, 201, '2026-07-02'),
(103, 203, '2026-07-03');

SELECT * FROM department;
SELECT * FROM student;
SELECT * FROM course;
SELECT * FROM enrollment;
```

---

# 57. Database Structure

```text
COLLEGE_DB
│
├── DEPARTMENT
│   ├── dept_id PK
│   └── dept_name
│
├── STUDENT
│   ├── student_id PK
│   ├── name
│   ├── mobile
│   ├── email
│   └── dept_id FK
│
├── COURSE
│   ├── course_id PK
│   ├── course_name
│   └── credits
│
└── ENROLLMENT
    ├── student_id PK/FK
    ├── course_id PK/FK
    └── enrollment_date
```

---

# 58. Important Differences

## Entity vs Attribute

| Entity | Attribute |
|---|---|
| Real-world object | Property of object |
| Example: Student | Example: Name |
| Has attributes | Describes entity |

## Strong Entity vs Weak Entity

| Strong Entity | Weak Entity |
|---|---|
| Has its own key | Depends on owner entity |
| Independent identification | Dependent identification |
| Single rectangle | Double rectangle |
| Example: Employee | Example: Dependent |

## Generalization vs Specialization

| Generalization | Specialization |
|---|---|
| Bottom-up | Top-down |
| Specific → General | General → Specific |
| Combines entities | Divides entity |
| Finds common properties | Finds specific properties |

## 1NF vs 2NF vs 3NF

| 1NF | 2NF | 3NF |
|---|---|---|
| Atomic values | No partial dependency | No transitive dependency |
| No repeating groups | Must be in 1NF | Must be in 2NF |

---

# 59. Important Exam Definitions

### Entity

An **entity** is a distinguishable real-world object about which information is stored.

### Entity Set

An **entity set** is a collection of similar entities.

### Attribute

An **attribute** is a property that describes an entity.

### Relationship

A **relationship** is an association between entities.

### Cardinality

**Cardinality** specifies how many entities can participate in a relationship.

### Primary Key

A **primary key** uniquely identifies each record in a table.

### Foreign Key

A **foreign key** is an attribute that references a key in another table.

### Normalization

**Normalization** is the process of organizing data to reduce redundancy and undesirable dependencies.

### Functional Dependency

A **functional dependency** describes a relationship in which one set of attributes determines another set of attributes.

### Generalization

**Generalization** is a bottom-up process of combining similar lower-level entities into a higher-level entity.

### Specialization

**Specialization** is a top-down process of dividing a higher-level entity into lower-level specialized entities.

### Aggregation

**Aggregation** treats a relationship set as a higher-level object so that it can participate in another relationship.

---

# 60. Important Long Answer Questions

1. Explain the **ER Model** with a suitable example.
2. Explain **entities, entity sets and attributes**.
3. Explain different **types of attributes**.
4. Explain **strong and weak entities**.
5. Explain different **types of relationships**.
6. Explain **mapping constraints and cardinality**.
7. Explain **total and partial participation**.
8. Explain different **types of keys**.
9. Explain the process of **converting an ER diagram into relational tables**.
10. Explain **generalization and specialization** with examples.
11. Explain **aggregation** in the ER model.
12. Explain the steps of **database schema design**.
13. What is **normalization**? Explain its need.
14. Explain **insertion, update and deletion anomalies**.
15. Explain **functional dependency** with examples.
16. Explain **1NF, 2NF and 3NF** with examples.
17. Explain **BCNF** and its difference from 3NF.
18. Explain **4NF and multivalued dependency**.
19. Explain **5NF and join dependency**.
20. Explain the complete process of **ER-to-relational mapping**.

---

# 61. Important Short Questions

### Q1. What is an ER Model?

An ER Model is a conceptual data model that represents entities, attributes and relationships in a database.

### Q2. What is an entity?

An entity is a distinguishable real-world object about which data is stored.

### Q3. What is an attribute?

An attribute is a property of an entity.

### Q4. What is a weak entity?

A weak entity is an entity that depends on another entity for identification.

### Q5. What is cardinality?

Cardinality defines the number of entities that can participate in a relationship.

### Q6. What is a primary key?

A primary key uniquely identifies each record in a table.

### Q7. What is a foreign key?

A foreign key references a key of another table.

### Q8. What is normalization?

Normalization organizes database tables to reduce redundancy and dependency problems.

### Q9. What is 1NF?

1NF requires atomic values and no repeating groups.

### Q10. What is 2NF?

2NF is 1NF with no partial dependency of non-key attributes on a proper subset of a candidate key.

### Q11. What is 3NF?

3NF is 2NF with no problematic transitive dependency.

### Q12. What is BCNF?

BCNF requires every determinant of a non-trivial functional dependency to be a super key.

### Q13. What is 4NF?

4NF deals with multivalued dependencies.

### Q14. What is 5NF?

5NF deals with join dependencies.

---

# 62. Viva Questions

### Q1. What does ER stand for?

**Entity-Relationship**.

### Q2. Which symbol represents an entity?

A **rectangle**.

### Q3. Which symbol represents a relationship?

A **diamond**.

### Q4. Which symbol represents an attribute?

An **oval**.

### Q5. How is a key attribute shown traditionally?

It is **underlined**.

### Q6. What is a binary relationship?

A relationship involving two entity sets.

### Q7. What is a ternary relationship?

A relationship involving three entity sets.

### Q8. What does M:N mean?

**Many-to-Many**.

### Q9. Which key connects related relational tables?

A **foreign key**.

### Q10. What is a composite key?

A key made from two or more attributes.

### Q11. Which normal form removes partial dependency?

**2NF**.

### Q12. Which normal form removes transitive dependency?

**3NF**.

### Q13. Which normal form is stronger than 3NF?

**BCNF**.

### Q14. Which normal form deals with multivalued dependencies?

**4NF**.

### Q15. Which normal form deals with join dependencies?

**5NF**.

### Q16. Is generalization bottom-up or top-down?

**Bottom-up**.

### Q17. Is specialization top-down or bottom-up?

**Top-down**.

### Q18. What is the purpose of normalization?

To reduce redundancy and prevent anomalies and undesirable dependencies.

---

# 63. Quick Revision

```text
ER MODEL
   |
   +-- Entity
   +-- Attribute
   +-- Relationship
   +-- Cardinality
   +-- Participation
   +-- Keys
   |
   v
ER DIAGRAM
   |
   v
RELATIONAL TABLES
   |
   v
NORMALIZATION
   |
   +-- 1NF → Atomic Values
   +-- 2NF → No Partial Dependency
   +-- 3NF → No Transitive Dependency
   +-- BCNF → Determinant is Super Key
   +-- 4NF → Multivalued Dependency
   +-- 5NF → Join Dependency
```

---

# 64. One-Page Memory Notes

```text
ENTITY
= Real-world object

ENTITY SET
= Collection of similar entities

ATTRIBUTE
= Property of entity

RELATIONSHIP
= Association between entities

CARDINALITY
= 1:1, 1:N, N:1, M:N

PARTICIPATION
= Total / Partial

STRONG ENTITY
= Has own key

WEAK ENTITY
= Depends on strong entity

PRIMARY KEY
= Uniquely identifies record

FOREIGN KEY
= References another table's key

COMPOSITE KEY
= Multiple columns together form key

GENERALIZATION
= Bottom-up

SPECIALIZATION
= Top-down

AGGREGATION
= Relationship treated as higher-level object

NORMALIZATION
= Reduces redundancy and anomalies

1NF
= Atomic values

2NF
= 1NF + No Partial Dependency

3NF
= 2NF + No Transitive Dependency

BCNF
= Every determinant is a Super Key

4NF
= No problematic Multivalued Dependency

5NF
= No problematic Join Dependency
```

---

# 65. Important SQL Commands

```sql
-- Create database
CREATE DATABASE college_db;

-- Select database
USE college_db;

-- Create table
CREATE TABLE student (
    student_id INT PRIMARY KEY,
    name VARCHAR(50)
);

-- Insert data
INSERT INTO student
VALUES (101, 'Rahul');

-- Display data
SELECT * FROM student;

-- View table structure
DESCRIBE student;

-- Delete table
DROP TABLE student;
```

---

# 66. Final Exam Strategy

For a long-answer question, write:

```text
1. Definition
2. Explanation
3. Types
4. Diagram
5. Example
6. SQL/Table example if applicable
7. Advantages/importance
8. Conclusion
```

### Normalization Flow

```text
UN-NORMALIZED
      ↓
     1NF
      ↓
     2NF
      ↓
     3NF
      ↓
    BCNF
      ↓
     4NF
      ↓
     5NF
```

### Most Important Topics

- **ER Model**
- **Entities and Attributes**
- **Relationships**
- **Cardinality**
- **Participation Constraints**
- **Keys**
- **ER-to-Relational Mapping**
- **Generalization**
- **Specialization**
- **Aggregation**
- **Normalization**
- **Functional Dependency**
- **1NF**
- **2NF**
- **3NF**
- **BCNF**
- **4NF**
- **5NF**

---

# END OF UNIT-II
