# UNIT – II: ER Model and Normalization

---

## PART A: ENTITY-RELATIONSHIP (ER) MODEL

## 1. What is the ER Model?

The **Entity-Relationship (ER) Model** is a way of representing the structure of a database at a conceptual level, **before** we actually create tables in SQL. It is a design tool. Using this model, a database designer thinks about the real world in terms of "things" (entities) and "connections between things" (relationships), and draws this out as a diagram called an **ER Diagram**.

The whole point of the ER model is to make database design easier to understand — even a non-technical person can look at an ER diagram and roughly understand what data is being stored and how it connects, without needing to know SQL at all.

---

## 2. Entities and Entity Sets

### 2.1 Entity

An **entity** is a real-world object or "thing" that can be distinctly identified and about which we want to store data. An entity can be:
- A physical, tangible object — like a `Student`, `Car`, `Book`, `Employee`.
- An abstract, intangible concept — like a `Course`, `Bank Account`, `Job Position`.

### 2.2 Entity Set

An **entity set** is a collection of similar types of entities. For example, all the students in a college together form the entity set `Student`. Each individual student (like "Aman", roll no 101) is one specific **entity** (also called an instance) within that entity set.

### 2.3 Attributes

An **attribute** is a property or characteristic that describes an entity. For example, the `Student` entity might have attributes like `roll_no`, `name`, `age`, `branch`.

**Types of Attributes:**

1. **Simple Attribute** — cannot be divided further. Example: `roll_no`.
2. **Composite Attribute** — can be divided into smaller sub-parts. Example: `name` can be split into `first_name` and `last_name`; `address` can be split into `street`, `city`, `pincode`.
3. **Single-valued Attribute** — holds only one value for an entity. Example: `date_of_birth`.
4. **Multi-valued Attribute** — can hold more than one value for a single entity. Example: a person can have multiple `phone_numbers`. This is shown in ER diagrams using a double oval.
5. **Derived Attribute** — its value can be calculated/derived from another attribute, and is not stored directly. Example: `age` can be derived from `date_of_birth`. Shown using a dashed oval.
6. **Key Attribute** — an attribute (or a set of attributes) that uniquely identifies each entity in an entity set. Example: `roll_no` uniquely identifies each student. Shown by underlining the attribute name.

---

## 3. Relationships and Relationship Sets

A **relationship** is an association or connection between two or more entities. For example, a `Student` **enrolls in** a `Course` — here "enrolls in" is the relationship connecting the `Student` entity and the `Course` entity.

A **relationship set** is a collection of similar relationships. Just like an entity set is a collection of similar entities, a relationship set is a collection of similar relationships between entity sets.

### 3.1 Degree of a Relationship

This refers to the number of entity sets participating in a relationship.

- **Unary (Degree 1)** — a relationship involving only one entity set. Example: an `Employee` **supervises** another `Employee` (both are from the same entity set `Employee`).
- **Binary (Degree 2)** — a relationship involving two entity sets. Example: `Student` **enrolls in** `Course`. This is the most common type used in real designs.
- **Ternary (Degree 3)** — a relationship involving three entity sets. Example: a `Supplier` **supplies** a `Part` to a `Project`.

---

## 4. Mapping Cardinality / Mapping Constraints

**Mapping cardinality** (also called cardinality ratio) expresses the **number of entities** to which another entity can be associated through a relationship. This is one of the most important concepts in ER modelling, because it decides how tables will later be connected using keys.

For a binary relationship between entity set A and entity set B, there are four types:

### 4.1 One-to-One (1:1)

An entity in A is associated with **at most one** entity in B, and an entity in B is associated with **at most one** entity in A.

**Example:** One `Employee` is assigned **exactly one** parking `Space`, and one parking `Space` is assigned to **exactly one** `Employee`.

```
Employee  ──1───────1──  Space
```

### 4.2 One-to-Many (1:N)

An entity in A can be associated with **many** entities in B, but an entity in B is associated with **at most one** entity in A.

**Example:** One `Department` has **many** `Employees`, but each `Employee` belongs to only **one** `Department`.

```
Department  ──1───────N──  Employee
```

### 4.3 Many-to-One (N:1)

This is simply the reverse direction of one-to-many. Many entities in A relate to one entity in B.

**Example:** Many `Students` study in one `College`.

### 4.4 Many-to-Many (M:N)

An entity in A can be associated with **many** entities in B, and an entity in B can be associated with **many** entities in A.

**Example:** A `Student` can enroll in **many** `Courses`, and a `Course` can have **many** `Students` enrolled in it.

```
Student  ──M───────N──  Course
```

---

## 5. Participation Constraints

This describes whether **every** entity in an entity set must participate in a relationship or not.

1. **Total Participation** — every entity in the entity set **must** be involved in at least one relationship instance. Shown by a **double line** connecting the entity to the relationship in an ER diagram. Example: every `Employee` must belong to some `Department` (total participation of Employee).

2. **Partial Participation** — only **some** entities in the entity set need to be involved in the relationship; it is optional for others. Shown by a **single line**. Example: not every `Employee` is a `Manager`, so participation of Employee in a "manages" relationship is partial.

---

## 6. Keys in the ER Model / Relational Model

Keys are used to uniquely identify a row (entity/tuple) in a table (entity set), and to build relationships between tables.

1. **Super Key** — any set of one or more attributes that, taken together, can uniquely identify a tuple in a table. A table can have many super keys (some with unnecessary extra columns).

2. **Candidate Key** — a super key with **no unnecessary extra attributes** — meaning it is the smallest possible super key (also called a "minimal super key"). A table can have multiple candidate keys.

3. **Primary Key** — the candidate key that the database designer **chooses** as the main way to uniquely identify each row in the table. Only one primary key is chosen per table, even if multiple candidate keys exist.

4. **Alternate Key** — any candidate key that was **not** chosen as the primary key. These remaining candidate keys become alternate keys.

5. **Foreign Key** — an attribute (or set of attributes) in one table that refers to the **primary key** of another (or the same) table. This is what actually creates a relationship/link between two tables in the relational model.

6. **Composite Key** — a primary key that is made up of **two or more** attributes together (used when no single attribute is enough to uniquely identify a row). Example: in an `Enrollment` table, `(roll_no, course_id)` together might form the composite primary key.

### 6.1 Practical: Keys in MySQL

```sql
CREATE DATABASE CollegeERD;
USE CollegeERD;

CREATE TABLE Department (
    dept_id INT PRIMARY KEY,          -- Primary Key
    dept_name VARCHAR(50) UNIQUE,     -- Candidate key / Alternate key (unique but not chosen as primary)
    hod_name VARCHAR(50)
);

CREATE TABLE Student (
    roll_no INT PRIMARY KEY,          -- Primary Key
    aadhar_no VARCHAR(12) UNIQUE,     -- Alternate Key (could have been primary too)
    name VARCHAR(50),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id)   -- Foreign Key: creates the relationship
);

-- Composite Key example: Enrollment links Student and Course (M:N relationship)
CREATE TABLE Course (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(50)
);

CREATE TABLE Enrollment (
    roll_no INT,
    course_id INT,
    enroll_date DATE,
    PRIMARY KEY (roll_no, course_id),         -- Composite Primary Key
    FOREIGN KEY (roll_no) REFERENCES Student(roll_no),
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
);
```

Here, `Enrollment` table itself is the practical implementation of a **Many-to-Many relationship** between `Student` and `Course` — this is exactly how M:N relationships from an ER diagram get converted into real tables (explained further in Section 8).

---

## 7. ER Diagram Notation

An ER Diagram uses standard symbols:

| Symbol | Represents |
|---|---|
| Rectangle | Entity Set |
| Ellipse / Oval | Attribute |
| Double Ellipse | Multi-valued Attribute |
| Dashed Ellipse | Derived Attribute |
| Diamond | Relationship Set |
| Double Rectangle | Weak Entity Set |
| Double Diamond | Identifying Relationship (for weak entity) |
| Lines | Connect entities to their attributes, and entities to relationships |
| Double Lines | Total Participation |

**A simple text-based example of an ER diagram:**

```
   ┌────────────┐          enrolls in           ┌────────────┐
   │  STUDENT   │◇──────────────────────────────◇│   COURSE   │
   └────────────┘         M          N            └────────────┘
     roll_no(key)  name  age             course_id(key)  course_name
```

### 7.1 Weak Entity Set

A **weak entity** is an entity that **cannot** be uniquely identified by its own attributes alone — it depends on another entity (called the "owner" or "identifying" entity) for its identification. A weak entity uses a **partial key** (also called a discriminator) combined with the primary key of its owner entity to become fully identifiable.

**Example:** A `Dependent` (like a child of an employee, for insurance purposes) cannot be identified alone — the same dependent name might repeat across different employees. So `Dependent` is a weak entity, and it depends on the strong entity `Employee`. Its actual identification is `(employee_id, dependent_name)` together.

```
┌──────────┐        has          ┌═══════════┐
│ EMPLOYEE │◇──────────────────◇║ DEPENDENT ║   (weak entity - double rectangle)
└──────────┘        1        N   └═══════════┘
  emp_id(key)                      dependent_name (partial key, dashed underline)
```

---

## 8. Reduction of ER Diagrams to Tables

Once an ER diagram is designed, it needs to be converted into actual relational tables. There are fixed rules for this conversion:

**Rule 1 — Strong Entity Set:**
Becomes a table directly. All its simple/single-valued attributes become columns, and the key attribute becomes the primary key.

**Rule 2 — Weak Entity Set:**
Becomes a table whose primary key is a **combination** of its own partial key and the primary key of its owner (strong) entity, which is also added as a foreign key.

**Rule 3 — Composite Attribute:**
Only its simple sub-parts are taken as separate columns (the composite attribute itself is not directly made into one column).

**Rule 4 — Multi-valued Attribute:**
Becomes a **separate table** of its own, containing the primary key of the original entity (as a foreign key) plus the multi-valued attribute itself.

**Rule 5 — One-to-One Relationship:**
The primary key of either one of the two entities is added as a foreign key into the other entity's table (usually added on the side with total participation, to avoid empty/NULL values).

**Rule 6 — One-to-Many Relationship:**
The primary key of the "one" side entity is added as a foreign key into the table of the "many" side entity.

**Rule 7 — Many-to-Many Relationship:**
A **completely new table** must be created for the relationship itself. This new table contains the primary keys of both participating entities (as foreign keys), and together these form its composite primary key. Any descriptive attribute of the relationship itself (like `enroll_date`) also goes into this new table.

**Rule 8 — Multiple Entities in a Relationship (Ternary etc.):**
A new table is created containing the primary keys of all participating entities as foreign keys.

### 8.1 Practical: Full Reduction Example in MySQL

Let's take an ER design: `Employee (1) ── works in ── (N) Department`, where `Employee` also has a multi-valued attribute `skills`.

```sql
USE CollegeERD;

-- Rule 1: Strong entity Department becomes a table
CREATE TABLE Dept (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50)
);

-- Rule 1 + Rule 6: Strong entity Employee becomes a table,
-- and since it is on the "Many" side of a 1:N relationship,
-- it gets the foreign key of Department
CREATE TABLE Emp (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(50),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES Dept(dept_id)
);

-- Rule 4: Multi-valued attribute "skills" becomes its own separate table
CREATE TABLE Emp_Skills (
    emp_id INT,
    skill VARCHAR(30),
    FOREIGN KEY (emp_id) REFERENCES Emp(emp_id)
);

INSERT INTO Dept VALUES (1, 'IT');
INSERT INTO Emp VALUES (101, 'Rakesh', 1);
INSERT INTO Emp_Skills VALUES (101, 'Java');
INSERT INTO Emp_Skills VALUES (101, 'SQL');   -- same employee, multiple skill rows

SELECT * FROM Emp_Skills;
```

Output:
```
+--------+-------+
| emp_id | skill |
+--------+-------+
|  101   | Java  |
|  101   | SQL   |
+--------+-------+
```

This shows exactly how a multi-valued attribute like "skills" (which cannot fit as a single column) is correctly converted into its own separate table, following Rule 4 above.

---

## 9. Generalization and Specialization

### 9.1 Specialization

**Specialization** is a **top-down** approach where we take one higher-level (general) entity set and divide it into two or more **lower-level (specialized) entity sets**, based on some distinguishing characteristic.

**Example:** The general entity `Employee` can be specialized into `Manager`, `Engineer`, and `Clerk` — because each of these sub-types might have their own extra specific attributes (like a Manager has a `team_size` attribute which a Clerk does not have).

```
              ┌──────────┐
              │ EMPLOYEE │
              └────┬─────┘
                    △   (specialization symbol)
        ┌───────────┼────────────┐
   ┌────┴───┐   ┌────┴─────┐  ┌───┴────┐
   │MANAGER │   │ENGINEER  │  │ CLERK  │
   └────────┘   └──────────┘  └────────┘
```

### 9.2 Generalization

**Generalization** is exactly the **opposite** — a **bottom-up** approach, where we combine two or more lower-level entity sets that **share common attributes**, into one single higher-level, more generalized entity set.

**Example:** If we already have separate entities `Car` and `Truck`, and we notice both share common attributes like `registration_no` and `manufacturer`, we can generalize them into a common higher entity called `Vehicle`.

### 9.3 Constraints on Generalization/Specialization

1. **Disjoint vs Overlapping**
   - **Disjoint**: an entity can belong to **only one** lower-level entity set. Example: an `Employee` is either a `Manager` OR an `Engineer`, not both at the same time.
   - **Overlapping**: an entity **can** belong to more than one lower-level entity set at the same time. Example: a `Person` could be both a `Student` and an `Employee` simultaneously (a working student).

2. **Total vs Partial**
   - **Total**: every entity in the higher-level entity set **must** belong to at least one of the lower-level entity sets.
   - **Partial**: some entities in the higher-level entity set may **not** belong to any lower-level entity set.

### 9.4 Aggregation

**Aggregation** is used when we need to express a **relationship between a relationship and an entity**. Normally, relationships only connect entities to entities — but sometimes we need a relationship itself to participate in another relationship, and the ER model does not directly allow this. Aggregation solves this by treating an existing relationship (along with its participating entities) as if it were a single, higher-level abstract entity, which can then take part in a new relationship.

**Example:** Consider the relationship `Employee works-on Project`. Now suppose we also want to record which `Manager` **monitors** this particular employee-project combination. Here, the whole `(Employee works-on Project)` relationship is aggregated and treated as one unit, which then relates to `Manager` through a new "monitors" relationship.

```
   ┌──────────┐     works-on     ┌──────────┐
   │ EMPLOYEE │◇────────────────◇│ PROJECT  │
   └──────────┘                  └──────────┘
          └───────────┬───────────┘
              (treated as one aggregated unit)
                       │
                    monitors
                       │
                  ┌─────────┐
                  │ MANAGER │
                  └─────────┘
```

### 9.5 Practical: Generalization in MySQL (Table-Per-Subtype Approach)

```sql
USE CollegeERD;

-- Generalized/parent entity - common attributes
CREATE TABLE Person (
    person_id INT PRIMARY KEY,
    name VARCHAR(50),
    address VARCHAR(100)
);

-- Specialized entity 1 - has its own extra attribute
CREATE TABLE StudentInfo (
    person_id INT PRIMARY KEY,
    branch VARCHAR(30),
    FOREIGN KEY (person_id) REFERENCES Person(person_id)
);

-- Specialized entity 2 - has its own extra attribute
CREATE TABLE EmployeeInfo (
    person_id INT PRIMARY KEY,
    salary DECIMAL(10,2),
    FOREIGN KEY (person_id) REFERENCES Person(person_id)
);

INSERT INTO Person VALUES (1, 'Kabir', 'Udaipur');

-- This same person can be BOTH a student and an employee (overlapping specialization)
INSERT INTO StudentInfo VALUES (1, 'CSE');
INSERT INTO EmployeeInfo VALUES (1, 45000.00);
```

Here, Kabir (`person_id = 1`) appears in both `StudentInfo` and `EmployeeInfo` at the same time — a real, practical implementation of **overlapping generalization/specialization**.

---

## 10. Design of an ER Database Scheme (Step-by-Step Process)

When designing a real database using the ER model, a designer generally follows these steps:

1. **Requirement Analysis** — talk to the users/clients and understand exactly what data needs to be stored and what queries need to be answered.

2. **Identify Entities** — list out all the "things" that need to be tracked (e.g., Student, Course, Teacher, Department).

3. **Identify Attributes for each Entity** — decide what properties each entity should have, and mark which attribute(s) will serve as the key.

4. **Identify Relationships** — determine how the entities are connected to each other (e.g., Student enrolls in Course).

5. **Determine Cardinality and Participation Constraints** — decide if each relationship is 1:1, 1:N, or M:N, and whether participation is total or partial.

6. **Identify Generalization/Specialization, if any** — check if any entities can be grouped into a general super-type, or split into more specific sub-types.

7. **Draw the Complete ER Diagram** — put together all entities, attributes, relationships, and constraints visually.

8. **Review the Diagram** — check with users/stakeholders that this design correctly captures all their real-world requirements.

9. **Convert ER Diagram to Relational Schema (Tables)** — apply the reduction rules from Section 8 to generate actual tables, which can then be created using SQL DDL commands.

This step-by-step process ensures that before we write even a single line of SQL, we have a clear, well-thought-out, and verified plan of how the database should be structured — saving a lot of rework later.

---

# PART B: NORMALIZATION

## 11. What is Normalization and Why Do We Need It?

**Normalization** is a step-by-step process of organizing data in a database to **reduce data redundancy** (unnecessary repeated data) and to **remove undesirable anomalies** — problems that occur when inserting, updating, or deleting data.

Normalization is done by dividing large, poorly-structured tables into smaller, well-structured tables, and defining relationships between them using foreign keys, **without losing any information**.

### 11.1 The Three Types of Anomalies (Problems Normalization Solves)

Let's understand this with an unnormalized example table:

```
+---------+---------+------------+---------------+
| roll_no | name    | course     | course_fee    |
+---------+---------+------------+---------------+
|   1     | Aman    | DBMS       |    5000       |
|   1     | Aman    | Java       |    4000       |
|   2     | Riya    | DBMS       |    5000       |
+---------+---------+------------+---------------+
```

1. **Insertion Anomaly**: Suppose a new course "Python" is introduced, but no student has enrolled in it yet. We **cannot** insert this course into the table above, because `roll_no` and `name` cannot be left empty (they are part of identifying the row) — but we have no student to associate it with yet.

2. **Update Anomaly**: If the fee of "DBMS" changes from 5000 to 5500, we must update it in **every single row** where "DBMS" appears. If we accidentally miss updating even one row, the data becomes inconsistent (some rows show 5000, others show 5500 for the same course).

3. **Deletion Anomaly**: If student Riya (roll_no 2) drops out and we delete her row, we **accidentally lose** the information that a course called "DBMS" costs 5000, if that was the last row that had this fee data.

Normalization solves all three of these problems by properly splitting data into smaller related tables.

### 11.2 Functional Dependency (Important Concept Needed for Normalization)

A **functional dependency** exists between two attributes, say X and Y (written as X → Y, read as "X determines Y"), if the value of X uniquely determines the value of Y. This means for every value of X, there is exactly one corresponding value of Y.

**Example:** `roll_no → name` — because for every roll number, there is exactly one specific name. Functional dependencies are the foundation used to decide how to split tables during normalization.

---

## 12. First Normal Form (1NF)

**Rule:** A table is in 1NF if:
- Every column contains only **atomic (indivisible) values** — no multiple values in a single cell.
- Every row is unique (a primary key must exist).
- There is no repeating group of columns.

**Problem table (NOT in 1NF)** — the `course` column has multiple values in one cell:
```
+---------+---------+----------------+
| roll_no | name    | course         |
+---------+---------+----------------+
|   1     | Aman    | DBMS, Java     |   <- multiple values, NOT atomic
+---------+---------+----------------+
```

**Converted to 1NF** — each course gets its own row:
```
+---------+---------+----------------+
| roll_no | name    | course         |
+---------+---------+----------------+
|   1     | Aman    | DBMS           |
|   1     | Aman    | Java           |
+---------+---------+----------------+
```

### 12.1 Practical: Achieving 1NF in MySQL

```sql
CREATE DATABASE NormalizeDemo;
USE NormalizeDemo;

-- WRONG way (violates 1NF) - storing multiple values in one column
CREATE TABLE Bad_Student (
    roll_no INT,
    name VARCHAR(50),
    courses VARCHAR(100)   -- e.g., 'DBMS, Java'  -- NOT atomic, avoid this
);

-- CORRECT 1NF design - one course value per row
CREATE TABLE Student_1NF (
    roll_no INT,
    name VARCHAR(50),
    course VARCHAR(30),
    PRIMARY KEY (roll_no, course)
);

INSERT INTO Student_1NF VALUES (1, 'Aman', 'DBMS');
INSERT INTO Student_1NF VALUES (1, 'Aman', 'Java');
```

---

## 13. Second Normal Form (2NF)

**Rule:** A table is in 2NF if:
- It is already in **1NF**, AND
- It has **no partial dependency** — meaning every non-key column must depend on the **entire** primary key, not just part of it.

Partial dependency can only happen when the primary key is a **composite key** (made of two or more columns). If the primary key is a single column, the table is automatically free of partial dependency once it's in 1NF.

**Problem table (in 1NF, but NOT in 2NF):**
Primary key here is `(roll_no, course)`. But `name` depends only on `roll_no` (not on `course`), and `course_fee` depends only on `course` (not on `roll_no`). This is a **partial dependency**.

```
+---------+----------+---------+------------+
| roll_no | course   | name    | course_fee |
+---------+----------+---------+------------+
|   1     | DBMS     | Aman    |   5000     |
|   1     | Java     | Aman    |   4000     |
|   2     | DBMS     | Riya    |   5000     |
+---------+----------+---------+------------+
```

**Converted to 2NF** — split into separate tables so every non-key column depends on the WHOLE key of its own table:

```
Student table:                 Course table:                 Enrollment table:
+---------+---------+          +----------+------------+     +---------+----------+
| roll_no | name    |          | course   | course_fee |     | roll_no | course   |
+---------+---------+          +----------+------------+     +---------+----------+
|   1     | Aman    |          | DBMS     |   5000     |     |   1     | DBMS     |
|   2     | Riya    |          | Java     |   4000     |     |   1     | Java     |
+---------+---------+          +----------+------------+     |   2     | DBMS     |
                                                               +---------+----------+
```

### 13.1 Practical: Achieving 2NF in MySQL

```sql
USE NormalizeDemo;

CREATE TABLE Student_2NF (
    roll_no INT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE Course_2NF (
    course VARCHAR(30) PRIMARY KEY,
    course_fee DECIMAL(8,2)
);

CREATE TABLE Enrollment_2NF (
    roll_no INT,
    course VARCHAR(30),
    PRIMARY KEY (roll_no, course),
    FOREIGN KEY (roll_no) REFERENCES Student_2NF(roll_no),
    FOREIGN KEY (course) REFERENCES Course_2NF(course)
);

INSERT INTO Student_2NF VALUES (1, 'Aman'), (2, 'Riya');
INSERT INTO Course_2NF VALUES ('DBMS', 5000.00), ('Java', 4000.00);
INSERT INTO Enrollment_2NF VALUES (1, 'DBMS'), (1, 'Java'), (2, 'DBMS');
```

Now, `course_fee` is stored **only once** per course (in `Course_2NF`), so updating a fee needs only one row to change — solving the update anomaly.

---

## 14. Third Normal Form (3NF)

**Rule:** A table is in 3NF if:
- It is already in **2NF**, AND
- It has **no transitive dependency** — meaning a non-key column should not depend on another non-key column; every non-key column must depend **directly** on the primary key only.

**Problem table (in 2NF, but NOT in 3NF):**
Here `roll_no` is the primary key. But `hod_name` (Head of Department) depends on `branch`, and `branch` depends on `roll_no`. So `hod_name` depends on `roll_no` only **indirectly**, through `branch`. This is a **transitive dependency**: `roll_no → branch → hod_name`.

```
+---------+---------+----------+------------+
| roll_no | name    | branch   | hod_name   |
+---------+---------+----------+------------+
|   1     | Aman    | CSE      | Dr. Mehta  |
|   2     | Riya    | CSE      | Dr. Mehta  |
+---------+---------+----------+------------+
```

**Converted to 3NF** — remove the transitive dependency by splitting into two tables:

```
Student table:                        Branch table:
+---------+---------+----------+      +----------+------------+
| roll_no | name    | branch   |      | branch   | hod_name   |
+---------+---------+----------+      +----------+------------+
|   1     | Aman    | CSE      |      | CSE      | Dr. Mehta  |
|   2     | Riya    | CSE      |      +----------+------------+
+---------+---------+----------+
```

### 14.1 Practical: Achieving 3NF in MySQL

```sql
USE NormalizeDemo;

CREATE TABLE Branch_3NF (
    branch VARCHAR(20) PRIMARY KEY,
    hod_name VARCHAR(50)
);

CREATE TABLE Student_3NF (
    roll_no INT PRIMARY KEY,
    name VARCHAR(50),
    branch VARCHAR(20),
    FOREIGN KEY (branch) REFERENCES Branch_3NF(branch)
);

INSERT INTO Branch_3NF VALUES ('CSE', 'Dr. Mehta');
INSERT INTO Student_3NF VALUES (1, 'Aman', 'CSE'), (2, 'Riya', 'CSE');
```

Now if the HOD of CSE changes, we only update **one row** in `Branch_3NF`, instead of updating it in every student's row — this completely removes the update anomaly caused by transitive dependency.

---

## 15. Boyce-Codd Normal Form (BCNF)

**Rule:** A table is in BCNF if:
- It is already in **3NF**, AND
- For **every** functional dependency X → Y, X must be a **super key** (a stronger condition than 3NF).

BCNF is a stricter version of 3NF. Sometimes a table can technically satisfy 3NF but still have a small anomaly, which BCNF catches and fixes. This mainly happens when a table has **multiple overlapping candidate keys**.

**Problem table (in 3NF, but NOT in BCNF):**
Suppose one teacher teaches only one subject, but a subject can be taught by many teachers, and a student can learn a subject from only one specific teacher.

```
+---------+-----------+-----------+
| student | subject   | teacher   |
+---------+-----------+-----------+
| Aman    | DBMS      | Sharma    |
| Riya    | DBMS      | Sharma    |
| Aman    | Java      | Verma     |
+---------+-----------+-----------+
```

Here, functional dependency: `teacher → subject` (since each teacher teaches only one subject). But `teacher` is **not** a super key of this table (the actual key is `student, subject`). This violates BCNF.

**Converted to BCNF** — split so that every determinant becomes a key:

```
Teacher_Subject table:              Student_Teacher table:
+-----------+-----------+           +---------+-----------+
| teacher   | subject   |           | student | teacher   |
+-----------+-----------+           +---------+-----------+
| Sharma    | DBMS      |           | Aman    | Sharma    |
| Verma     | Java      |           | Riya    | Sharma    |
+-----------+-----------+           | Aman    | Verma     |
                                     +---------+-----------+
```

### 15.1 Practical: Achieving BCNF in MySQL

```sql
USE NormalizeDemo;

CREATE TABLE Teacher_Subject (
    teacher VARCHAR(30) PRIMARY KEY,   -- teacher determines subject, so teacher is the key here
    subject VARCHAR(30)
);

CREATE TABLE Student_Teacher (
    student VARCHAR(30),
    teacher VARCHAR(30),
    PRIMARY KEY (student, teacher),
    FOREIGN KEY (teacher) REFERENCES Teacher_Subject(teacher)
);

INSERT INTO Teacher_Subject VALUES ('Sharma', 'DBMS'), ('Verma', 'Java');
INSERT INTO Student_Teacher VALUES ('Aman', 'Sharma'), ('Riya', 'Sharma'), ('Aman', 'Verma');
```

Now every functional dependency's left-hand side (`teacher` in the first table, `(student, teacher)` in the second) is indeed a super key of its own table — satisfying BCNF.

---

## 16. Fourth Normal Form (4NF)

**Rule:** A table is in 4NF if:
- It is already in **BCNF**, AND
- It has **no multi-valued dependency**.

A **multi-valued dependency** happens when one attribute in a table uniquely determines a set of values of another attribute, **completely independent** of a third attribute. This causes unnecessary repeated combinations of unrelated data.

**Problem table (NOT in 4NF):**
Suppose a student can have multiple hobbies AND can speak multiple languages, and these two facts are completely unrelated to each other.

```
+---------+-----------+------------+
| student | hobby     | language   |
+---------+-----------+------------+
| Aman    | Cricket   | Hindi      |
| Aman    | Cricket   | English    |
| Aman    | Reading   | Hindi      |
| Aman    | Reading   | English    |
+---------+-----------+------------+
```

Notice that `hobby` and `language` have nothing to do with each other, but because both are stored in the same table, we are forced to create **every possible combination** (2 hobbies × 2 languages = 4 rows) — pure unnecessary redundancy.

**Converted to 4NF** — split into two independent tables:

```
Student_Hobby:                    Student_Language:
+---------+-----------+           +---------+------------+
| student | hobby     |           | student | language   |
+---------+-----------+           +---------+------------+
| Aman    | Cricket   |           | Aman    | Hindi      |
| Aman    | Reading   |           | Aman    | English    |
+---------+-----------+           +---------+------------+
```

### 16.1 Practical: Achieving 4NF in MySQL

```sql
USE NormalizeDemo;

CREATE TABLE Student_Hobby (
    student VARCHAR(30),
    hobby VARCHAR(30),
    PRIMARY KEY (student, hobby)
);

CREATE TABLE Student_Language (
    student VARCHAR(30),
    language VARCHAR(30),
    PRIMARY KEY (student, language)
);

INSERT INTO Student_Hobby VALUES ('Aman', 'Cricket'), ('Aman', 'Reading');
INSERT INTO Student_Language VALUES ('Aman', 'Hindi'), ('Aman', 'English');
```

This reduces our data from 4 redundant rows to just 4 clean, independent rows (2+2), and this saving becomes much bigger as more hobbies/languages are added — avoiding the "multiplication effect" of unrelated multi-valued facts.

---

## 17. Fifth Normal Form (5NF) / Project-Join Normal Form (PJNF)

**Rule:** A table is in 5NF if:
- It is already in **4NF**, AND
- It has **no join dependency** — meaning the table cannot be split into smaller tables and then perfectly reconstructed (via a join) without any loss or gain of information, unless that split was actually necessary.

5NF deals with cases where a table represents a relationship between **three or more** entities, and splitting it into just two tables (like we did for BCNF/4NF) causes **incorrect extra combinations** to appear when they are joined back together. In such cases, the table must be split into **three** (or more) smaller tables to avoid this problem.

**Example scenario:** A table records which `Agent` sells which `Company`'s products, for which `Product`. Suppose:
- Agent A sells Company X's products.
- Agent A sells Product P.
- Company X makes Product P.

If we simply store all three combinations together in one table and later try to reconstruct relationships from just two smaller tables (like Agent-Company and Agent-Product), we may wrongly conclude relationships that don't actually exist. 5NF requires splitting this correctly into three separate tables (Agent-Company, Agent-Product, Company-Product) so that joining all three back together gives back exactly the original correct data — no more, no less.

### 17.1 Practical: Achieving 5NF in MySQL

```sql
USE NormalizeDemo;

CREATE TABLE Agent_Company (
    agent VARCHAR(30),
    company VARCHAR(30),
    PRIMARY KEY (agent, company)
);

CREATE TABLE Agent_Product (
    agent VARCHAR(30),
    product VARCHAR(30),
    PRIMARY KEY (agent, product)
);

CREATE TABLE Company_Product (
    company VARCHAR(30),
    product VARCHAR(30),
    PRIMARY KEY (company, product)
);

INSERT INTO Agent_Company VALUES ('AgentA', 'CompanyX');
INSERT INTO Agent_Product VALUES ('AgentA', 'ProductP');
INSERT INTO Company_Product VALUES ('CompanyX', 'ProductP');

-- Reconstructing the original valid combination requires joining all THREE tables
SELECT ac.agent, ac.company, ap.product
FROM Agent_Company ac
JOIN Agent_Product ap ON ac.agent = ap.agent
JOIN Company_Product cp ON ac.company = cp.company AND ap.product = cp.product;
```

This three-way join correctly reconstructs only the **valid, true** combinations that actually exist, which is the entire purpose of achieving 5NF — avoiding any false combinations that a simpler two-table split might have incorrectly introduced.

---

## Summary of Unit II

- **ER Model** represents a database conceptually using **entities**, **attributes**, and **relationships**.
- **Mapping cardinalities** (1:1, 1:N, M:N) and **participation constraints** (total/partial) define how entities connect.
- **Keys** (super, candidate, primary, alternate, foreign, composite) uniquely identify and link table rows.
- ER diagrams are converted into actual **tables** using a fixed set of **reduction rules**.
- **Generalization** (bottom-up) and **Specialization** (top-down) organize entities into super-type/sub-type hierarchies; **Aggregation** lets a relationship act like an entity.
- **Normalization** removes redundancy and anomalies step by step:
  - **1NF**: atomic values only.
  - **2NF**: no partial dependency (fixes issues from composite keys).
  - **3NF**: no transitive dependency.
  - **BCNF**: every determinant must be a super key.
  - **4NF**: no multi-valued dependency.
  - **5NF**: no join dependency; correctly split three-or-more-way relationships.
