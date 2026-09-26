
# ASSIGNMENT

# OVERALL STRUCTURE OF DBMS

---

## PAGE 1 — Introduction and Overall Structure

## 1. Introduction

A **Database Management System (DBMS)** is software that is used to create, store, organize, retrieve, and manage data in a database. It provides an interface between users and the database and allows users to perform operations such as inserting, updating, deleting, and retrieving data.

Examples of DBMS are **MySQL, Oracle, PostgreSQL, Microsoft SQL Server, and SQLite**.

---

## 2. Overall Structure of DBMS

The overall structure of a DBMS consists of **users, application programs, query processor, storage manager, and database storage**. When a user gives a query, the DBMS processes the query and accesses the required data from the database.

### Diagram: Overall Structure of DBMS

```text
                 ┌──────────────────────┐
                 │        USERS         │
                 │  DBA | End Users     │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ APPLICATION PROGRAMS │
                 │ Web / Mobile / Apps  │
                 └──────────┬───────────┘
                            │
                            ▼
              ┌────────────────────────────┐
              │            DBMS            │
              │                            │
              │  ┌──────────────────────┐  │
              │  │   QUERY PROCESSOR    │  │
              │  └──────────┬───────────┘  │
              │             │              │
              │  ┌──────────▼───────────┐  │
              │  │   STORAGE MANAGER    │  │
              │  └──────────┬───────────┘  │
              └─────────────┼──────────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │       DATABASE       │
                 │ Data | Index |       │
                 │ Metadata             │
                 └──────────────────────┘
```

---

## 3. Basic Functions of DBMS

Data Storage

DBMS stores large amounts of data in an organized and structured manner.

Data Retrieval

It allows users to retrieve the required information from the database using queries.

Data Modification

DBMS supports operations such as insertion, deletion, and updating of data.

Data Security

It controls access to the database and prevents unauthorized users from accessing protected data.

Data Integrity

It helps maintain the accuracy, validity, and consistency of data.

Backup and Recovery

DBMS provides mechanisms for backing up data and recovering it after system failures.


---

# PAGE 2 — Main Components of DBMS

4. Query Processor

The Query Processor is responsible for interpreting and executing queries given by users. It converts high-level queries, such as SQL commands, into instructions that the DBMS can execute.

Main Parts of Query Processor

1. DDL Interpreter

The DDL Interpreter processes Data Definition Language (DDL) commands such as:

CREATE

ALTER

DROP


It interprets these commands and updates the database structure.

2. DML Compiler

The DML Compiler processes Data Manipulation Language (DML) commands such as:

SELECT

INSERT

UPDATE

DELETE


It converts the commands into a form that can be executed by the database system.

3. Query Evaluation Engine

The Query Evaluation Engine executes the query and produces the required result.


---

5. Storage Manager

The Storage Manager is responsible for managing the storage of data on physical storage devices. It acts as an interface between the database and the operating system.

Main Parts of Storage Manager

1. File Manager

The File Manager manages the allocation and organization of data files on storage devices.

2. Buffer Manager

The Buffer Manager transfers data between main memory and disk storage whenever required.

3. Transaction Manager

The Transaction Manager maintains the consistency and reliability of the database during transactions.

4. Authorization and Integrity Manager

It checks user permissions and helps maintain database integrity and security.


---

6. Diagram: Components of DBMS
  ```text

┌───────────────┐
                    │     DBMS      │
                    └───────┬───────┘
                            │
             ┌──────────────┴──────────────┐
             ▼                             ▼
     ┌─────────────────┐          ┌─────────────────┐
     │ QUERY PROCESSOR │          │ STORAGE MANAGER │
     └────────┬────────┘          └────────┬────────┘
              │                            │
      ┌───────┼────────┐          ┌────────┼─────────┐
      ▼       ▼        ▼          ▼        ▼         ▼
     DDL     DML     Query       File     Buffer   Transaction
 Interpreter Compiler Engine    Manager   Manager    Manager

                              ┌────────────────────┐
                              │ Authorization &     │
                              │ Integrity Manager   │
                              └────────────────────┘

```
---

7. Database Storage

The database contains actual data as well as supporting information required for managing the data.

Data Files

Data files contain the actual records stored in the database.

Indexes

Indexes are special structures that help the DBMS retrieve data more quickly.

Metadata / Data Dictionary

The Data Dictionary stores information about the database, such as tables, columns, data types, constraints, and users.


---

PAGE 3 — Three-Level Architecture

8. Three-Level Architecture of DBMS

The Three-Level Architecture divides a database system into three different levels. It separates the way users view data from the way data is logically organized and physically stored.

Diagram: Three-Level Architecture
```text
┌─────────────────────────┐
              │      EXTERNAL LEVEL     │
              │   User Views / Schemas  │
              └────────────┬────────────┘
                           │
                           │ External /
                           │ Conceptual Mapping
                           ▼
              ┌─────────────────────────┐
              │     CONCEPTUAL LEVEL   │
              │   Complete Logical DB  │
              └────────────┬────────────┘
                           │
                           │ Conceptual /
                           │ Internal Mapping
                           ▼
              ┌─────────────────────────┐
              │      INTERNAL LEVEL    │
              │  Physical Data Storage │
              └────────────┬────────────┘
                           │
                           ▼
                    Physical Database

```
---

9. External Level

The External Level is the highest level of database architecture. It represents the database from the viewpoint of individual users.

Different users can have different views of the same database.

Example: A student may see only their marks and attendance, while an administrator may see complete student information.


---

10. Conceptual Level

The Conceptual Level describes the complete logical structure of the database. It defines tables, relationships, attributes, and constraints without describing how the data is physically stored.


---

11. Internal Level

The Internal Level describes how data is actually stored on physical storage devices. It deals with files, storage blocks, indexes, and other physical storage details.


---

12. Data Independence

Data Independence means the ability to change one level of the database without requiring major changes at another level.

Types of Data Independence

1. Physical Data Independence

Physical Data Independence means that changes in physical storage do not affect the conceptual level.

Example: Changing the storage method or adding an index should not require changes to the logical database structure.

2. Logical Data Independence

Logical Data Independence means that changes in the conceptual database structure do not require changes to external user views in many cases.

Example: Adding a new attribute to a table should not necessarily change existing user views.


---

13. Advantages of DBMS

Reduces data redundancy.

Provides better data security.

Maintains data consistency.

Allows multiple users to access data.

Provides backup and recovery facilities.

Makes data management easier.

Provides controlled access to data.

Improves data organization.



---

14. Conclusion

The overall structure of a Database Management System (DBMS) consists of different components that work together to store, process, secure, and retrieve data efficiently. The Query Processor handles user queries, while the Storage Manager manages data storage and related operations.

The Three-Level Architecture provides separation between user views, logical database design, and physical storage. This makes the database system more flexible, secure, and easier to manage.


---

References

1. Database System Concepts — Abraham Silberschatz, Henry F. Korth, S. Sudarshan.


2. Fundamentals of Database Systems — Ramez Elmasri and Shamkant B. Navathe.


3. DBMS class notes and university syllabus.


