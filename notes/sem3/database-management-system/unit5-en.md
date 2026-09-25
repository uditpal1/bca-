# UNIT – V: PL/SQL

> **Note before we start:** PL/SQL (**Procedural Language extensions to SQL**) is Oracle's own procedural programming language, built specifically to work with Oracle Database. Since our practicals in the previous units used MySQL, and MySQL does **not** run PL/SQL directly (MySQL has its own similar language, simply called **MySQL Stored Procedure syntax**), we will do the following for this unit: first explain each PL/SQL concept properly with real PL/SQL code (exactly as asked in the syllabus, and exactly as it would run in Oracle), and then, right below it, show the **equivalent working MySQL practical**, so you get both the correct PL/SQL theory and something you can actually run and see working.

---

## 1. Basics of PL/SQL

### 1.1 What is PL/SQL and Why Do We Need It?

Plain SQL is very good at retrieving and manipulating data using single statements (like `SELECT`, `INSERT`), but plain SQL **cannot** do things like:
- Use loops to repeat an action multiple times.
- Use `IF-ELSE` conditions to make decisions.
- Declare and use variables to temporarily store and calculate values.
- Handle errors gracefully with proper error-handling logic.

**PL/SQL** solves this by combining the data-handling power of SQL with the **procedural programming features** (variables, loops, conditions, functions) found in regular programming languages. This lets us write complete programs (called **blocks**) that run directly inside the Oracle database, combining logic and data access together, very efficiently.

### 1.2 The Basic Structure of a PL/SQL Block

Every PL/SQL program is organized into **blocks**. A block has up to four sections:

```sql
DECLARE
    -- (Optional) Declare variables, constants, cursors here
BEGIN
    -- (Mandatory) The actual executable SQL and procedural statements go here
EXCEPTION
    -- (Optional) Code to handle errors goes here
END;
/
```

- **DECLARE section** (optional): where we declare variables, constants, and cursors that will be used in the block.
- **BEGIN...END section** (mandatory): contains the actual logic — SQL statements, loops, conditions, calculations.
- **EXCEPTION section** (optional): contains code that runs only if an error occurs during execution, allowing us to handle it instead of crashing.
- The block always ends with `END;` followed by a forward slash `/` (in tools like SQL*Plus, the `/` tells Oracle to actually execute the block).

### 1.3 A Simple First PL/SQL Program

```sql
DECLARE
    v_message VARCHAR2(50);
BEGIN
    v_message := 'Hello, this is my first PL/SQL block!';
    DBMS_OUTPUT.PUT_LINE(v_message);
END;
/
```
`DBMS_OUTPUT.PUT_LINE` is Oracle's way of printing text output to the screen (similar to `print()` in Python or `System.out.println()` in Java).

### 1.4 Practical (MySQL Equivalent): A Simple Stored Procedure

```sql
CREATE DATABASE PLSQLDemo;
USE PLSQLDemo;

DELIMITER //

CREATE PROCEDURE SayHello()
BEGIN
    DECLARE v_message VARCHAR(50);
    SET v_message = 'Hello, this is my first stored procedure!';
    SELECT v_message AS message;
END //

DELIMITER ;

-- Now call/execute the procedure
CALL SayHello();
```

Output:
```
+----------------------------------------------+
| message                                       |
+----------------------------------------------+
| Hello, this is my first stored procedure!     |
+----------------------------------------------+
```

---

## 2. Data Types in PL/SQL

PL/SQL supports all standard SQL data types (like `NUMBER`, `VARCHAR2`, `DATE`), plus a few special PL/SQL-only types:

| Data Type | Description |
|---|---|
| `NUMBER(p,s)` | Numeric value, `p` = precision (total digits), `s` = scale (digits after decimal) |
| `VARCHAR2(n)` | Variable-length character string, up to `n` characters |
| `CHAR(n)` | Fixed-length character string |
| `DATE` | Stores date and time together |
| `BOOLEAN` | Stores TRUE, FALSE, or NULL (can only be used **inside** PL/SQL blocks, not as a table column type) |
| `%TYPE` | A special attribute that lets a variable automatically take on the **same data type** as a specific table's column. Very useful, because if the column's data type changes later, the variable's type updates automatically too. |
| `%ROWTYPE` | A special attribute that lets a variable take on the structure of an **entire row** of a table (one field for every column) |

### 2.1 Practical Example: Using %TYPE and %ROWTYPE (PL/SQL)

```sql
-- Assume a table: Employees(emp_id NUMBER, emp_name VARCHAR2(50), salary NUMBER)

DECLARE
    v_name Employees.emp_name%TYPE;      -- automatically matches emp_name's data type
    v_emp_row Employees%ROWTYPE;         -- a variable that can hold one entire row
BEGIN
    SELECT emp_name INTO v_name FROM Employees WHERE emp_id = 101;
    DBMS_OUTPUT.PUT_LINE('Employee name: ' || v_name);

    SELECT * INTO v_emp_row FROM Employees WHERE emp_id = 101;
    DBMS_OUTPUT.PUT_LINE('Salary from row: ' || v_emp_row.salary);
END;
/
```

### 2.2 Practical (MySQL Equivalent): Variables in a Stored Procedure

```sql
USE PLSQLDemo;

CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(50),
    salary DECIMAL(10,2)
);

INSERT INTO Employees VALUES (101, 'Rahul', 55000.00), (102, 'Sneha', 48000.00);

DELIMITER //

CREATE PROCEDURE ShowEmployeeName(IN p_emp_id INT)
BEGIN
    DECLARE v_name VARCHAR(50);   -- MySQL doesn't have %TYPE, so we match the type manually
    SELECT emp_name INTO v_name FROM Employees WHERE emp_id = p_emp_id;
    SELECT v_name AS employee_name;
END //

DELIMITER ;

CALL ShowEmployeeName(101);
```

Output:
```
+-----------------+
| employee_name   |
+-----------------+
| Rahul           |
+-----------------+
```

---

## 3. Control Structures in PL/SQL

### 3.1 Conditional Statements (IF-THEN-ELSE)

```sql
DECLARE
    v_salary NUMBER := 45000;
BEGIN
    IF v_salary > 50000 THEN
        DBMS_OUTPUT.PUT_LINE('High salary');
    ELSIF v_salary > 30000 THEN
        DBMS_OUTPUT.PUT_LINE('Medium salary');
    ELSE
        DBMS_OUTPUT.PUT_LINE('Low salary');
    END IF;
END;
/
```

### 3.2 Loops

**Basic LOOP:**
```sql
DECLARE
    v_count NUMBER := 1;
BEGIN
    LOOP
        DBMS_OUTPUT.PUT_LINE('Count is: ' || v_count);
        v_count := v_count + 1;
        EXIT WHEN v_count > 5;    -- stops the loop when the condition becomes true
    END LOOP;
END;
/
```

**WHILE LOOP:**
```sql
DECLARE
    v_count NUMBER := 1;
BEGIN
    WHILE v_count <= 5 LOOP
        DBMS_OUTPUT.PUT_LINE('Count is: ' || v_count);
        v_count := v_count + 1;
    END LOOP;
END;
/
```

**FOR LOOP:**
```sql
BEGIN
    FOR v_count IN 1..5 LOOP
        DBMS_OUTPUT.PUT_LINE('Count is: ' || v_count);
    END LOOP;
END;
/
```

### 3.3 Practical (MySQL Equivalent): Control Structures in a Stored Procedure

```sql
USE PLSQLDemo;

DELIMITER //

CREATE PROCEDURE SalaryCategory(IN p_salary DECIMAL(10,2))
BEGIN
    IF p_salary > 50000 THEN
        SELECT 'High salary' AS category;
    ELSEIF p_salary > 30000 THEN
        SELECT 'Medium salary' AS category;
    ELSE
        SELECT 'Low salary' AS category;
    END IF;
END //

CREATE PROCEDURE CountLoop()
BEGIN
    DECLARE v_count INT DEFAULT 1;
    WHILE v_count <= 5 DO
        SELECT CONCAT('Count is: ', v_count) AS output;
        SET v_count = v_count + 1;
    END WHILE;
END //

DELIMITER ;

CALL SalaryCategory(45000);
CALL CountLoop();
```

---

## 4. Database Access with PL/SQL

PL/SQL blocks are not just standalone logic — their real power comes from directly reading and modifying database tables using embedded SQL statements.

### 4.1 SELECT INTO

Used to fetch a **single row's** value(s) directly into PL/SQL variables.

```sql
DECLARE
    v_salary NUMBER;
BEGIN
    SELECT salary INTO v_salary FROM Employees WHERE emp_id = 101;
    DBMS_OUTPUT.PUT_LINE('Rahul salary is: ' || v_salary);
END;
/
```

**Important:** If the query returns **zero rows** or **more than one row**, this will cause an error (`NO_DATA_FOUND` or `TOO_MANY_ROWS`), which is why error handling (Section 4.3) is important here.

### 4.2 Performing INSERT, UPDATE, DELETE from within PL/SQL

```sql
BEGIN
    UPDATE Employees SET salary = salary + 5000 WHERE emp_id = 101;
    INSERT INTO Employees VALUES (107, 'Kabir', 42000);
    DELETE FROM Employees WHERE emp_id = 106;
    COMMIT;   -- saving these changes permanently
END;
/
```

### 4.3 Exception Handling

The `EXCEPTION` section catches errors that occur in the `BEGIN...END` block, so the program can respond gracefully instead of crashing.

```sql
DECLARE
    v_salary NUMBER;
BEGIN
    SELECT salary INTO v_salary FROM Employees WHERE emp_id = 999;  -- doesn't exist
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('No employee found with that ID.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Some other error occurred.');
END;
/
```

### 4.4 Practical (MySQL Equivalent): Database Access and Error Handling

```sql
USE PLSQLDemo;

DELIMITER //

CREATE PROCEDURE GiveRaise(IN p_emp_id INT, IN p_amount DECIMAL(10,2))
BEGIN
    -- Handler: this is MySQL's way of catching an error (similar to EXCEPTION in PL/SQL)
    DECLARE EXIT HANDLER FOR NOT FOUND
        SELECT 'No employee found with that ID.' AS error_message;

    UPDATE Employees SET salary = salary + p_amount WHERE emp_id = p_emp_id;
    SELECT CONCAT('Salary updated for emp_id: ', p_emp_id) AS result;
END //

DELIMITER ;

CALL GiveRaise(101, 5000);
```

---

## 5. Database Connections

To actually use PL/SQL (or any SQL), an application must first establish a **connection** to the Oracle database server. A database connection typically requires:

- **Username** and **Password** — for authentication.
- **Host / Service Name / SID** — to identify which database server and specific database instance to connect to.
- **Port number** — the network port the database server is listening on (Oracle's default is usually `1521`).

In real applications, this connection is established using a **driver**, such as:
- **JDBC (Java Database Connectivity)** — used by Java applications to connect to Oracle (or any database).
- **ODBC (Open Database Connectivity)** — a more general standard usable from many languages.
- **OCI (Oracle Call Interface)** — Oracle's own native low-level connection interface.

Once connected, an application can send SQL/PL-SQL statements to the database and receive results back, all through this open connection.

### 5.1 Practical: A Database Connection Example (Conceptual, using Python + MySQL)

While PL/SQL runs inside Oracle itself, here is how an external application (in Python, using MySQL as the target database) would establish this same kind of connection, to show the concept practically:

```python
import mysql.connector

# Establishing a connection - this is the practical equivalent
# of what JDBC/ODBC does when connecting an application to Oracle
connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="your_password",
    database="PLSQLDemo"
)

cursor = connection.cursor()
cursor.execute("SELECT emp_name, salary FROM Employees")

for row in cursor.fetchall():
    print(row)

connection.close()
```

This shows the real, practical meaning of a "database connection" — a program (written in any language) opens a communication channel to the database server, sends SQL through it, and reads back results, before finally closing the channel.

---

## 6. Transaction Management in PL/SQL

A **transaction** is a sequence of one or more SQL operations treated as a single logical unit of work — either **all** operations succeed, or **none** of them take permanent effect. This was already introduced in Unit IV (TCL commands), and PL/SQL uses the exact same commands, but now embedded inside procedural blocks.

```sql
BEGIN
    UPDATE Employees SET salary = salary - 10000 WHERE emp_id = 101;  -- deduct from Rahul
    UPDATE Employees SET salary = salary + 10000 WHERE emp_id = 102;  -- add to Sneha

    COMMIT;   -- both changes are saved together, permanently
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;   -- if ANYTHING goes wrong, undo both changes completely
        DBMS_OUTPUT.PUT_LINE('Transaction failed and was rolled back.');
END;
/
```

This example represents transferring salary/money between two employees — a classic transaction example, showing why **atomicity** (all-or-nothing behaviour) is so important: we would never want money to be deducted from Rahul without successfully being added to Sneha.

### 6.1 Practical (MySQL Equivalent): Transaction Management

```sql
USE PLSQLDemo;

START TRANSACTION;

UPDATE Employees SET salary = salary - 10000 WHERE emp_id = 101;
UPDATE Employees SET salary = salary + 10000 WHERE emp_id = 102;

COMMIT;

SELECT * FROM Employees WHERE emp_id IN (101, 102);
```

---

## 7. Database Locking

**Locking** is a mechanism used by the database to control **concurrent access** to data — ensuring that when multiple users try to read/write the same data at the same time, the results remain correct and consistent, and one user's changes don't get lost or corrupted by another's.

### 7.1 Types of Locks

1. **Shared Lock (Read Lock)** — allows multiple users to **read** the same data at the same time, but prevents any of them from modifying it while the shared lock is held.

2. **Exclusive Lock (Write Lock)** — allows only **one** user to both read and modify the data; no other user can even read it (in strict implementations) until the exclusive lock is released.

### 7.2 Why Locking is Necessary — A Real Problem It Solves

Imagine two bank clerks both read an account balance of ₹1000 at the exact same time. Clerk A withdraws ₹500 (now the balance should be ₹500), and Clerk B, unaware of Clerk A's action, also withdraws ₹300 based on the old balance of ₹1000 they read (thinking the balance should become ₹700). Without proper locking, the final saved balance could incorrectly end up as ₹700 or ₹500, when it should actually be ₹200 (₹1000 − ₹500 − ₹300). Locking prevents this exact kind of conflict by making sure only one transaction can modify this data at a time.

### 7.3 Practical: Locking in PL/SQL (Oracle) — `SELECT FOR UPDATE`

```sql
DECLARE
    v_balance NUMBER;
BEGIN
    SELECT balance INTO v_balance FROM Accounts
    WHERE acc_id = 1
    FOR UPDATE;   -- takes an exclusive lock on this specific row

    UPDATE Accounts SET balance = v_balance - 500 WHERE acc_id = 1;
    COMMIT;   -- releases the lock after the transaction is saved
END;
/
```

### 7.4 Practical (MySQL Equivalent): Locking Rows

```sql
USE PLSQLDemo;

CREATE TABLE Accounts (
    acc_id INT PRIMARY KEY,
    balance DECIMAL(10,2)
);

INSERT INTO Accounts VALUES (1, 1000.00);

START TRANSACTION;

-- This locks the selected row exclusively, so no other transaction
-- can modify (or, depending on isolation level, even read) it until this commits
SELECT balance FROM Accounts WHERE acc_id = 1 FOR UPDATE;

UPDATE Accounts SET balance = balance - 500 WHERE acc_id = 1;

COMMIT;   -- the lock is released here
```

If a second session tries to run its own `SELECT ... FOR UPDATE` or `UPDATE` on the same row **before** the first transaction commits, it will simply **wait** until the first one finishes — this is exactly how locking protects data correctness during concurrent access.

---

## 8. Cursor Management

A **cursor** is a special pointer/handle that PL/SQL uses to work with a query result set that contains **multiple rows**, allowing us to process the result **one row at a time**. Remember, plain `SELECT INTO` only works for a single row — if we expect multiple rows, we must use a cursor.

### 8.1 Implicit Cursor

Oracle automatically creates an **implicit cursor** for every SQL statement (like a plain `INSERT`, `UPDATE`, `DELETE`, or a single-row `SELECT INTO`) that we don't explicitly declare ourselves. We can check its status using attributes like `SQL%ROWCOUNT` (number of rows affected), `SQL%FOUND`, `SQL%NOTFOUND`.

```sql
BEGIN
    UPDATE Employees SET salary = salary + 1000 WHERE dept_id = 1;
    DBMS_OUTPUT.PUT_LINE('Rows updated: ' || SQL%ROWCOUNT);
END;
/
```

### 8.2 Explicit Cursor

An **explicit cursor** is one that **we** declare and control ourselves, used specifically when a query is expected to return **multiple rows**, and we want to process each row individually, one at a time.

**Steps to use an explicit cursor:** `DECLARE` it → `OPEN` it → `FETCH` rows from it in a loop → `CLOSE` it.

```sql
DECLARE
    CURSOR emp_cursor IS SELECT emp_name, salary FROM Employees;
    v_name Employees.emp_name%TYPE;
    v_salary Employees.salary%TYPE;
BEGIN
    OPEN emp_cursor;
    LOOP
        FETCH emp_cursor INTO v_name, v_salary;
        EXIT WHEN emp_cursor%NOTFOUND;   -- exit the loop once all rows are read
        DBMS_OUTPUT.PUT_LINE(v_name || ' earns ' || v_salary);
    END LOOP;
    CLOSE emp_cursor;
END;
/
```

### 8.3 Practical (MySQL Equivalent): Cursor in a Stored Procedure

MySQL also supports cursors, used in a very similar step-by-step way, inside a stored procedure:

```sql
USE PLSQLDemo;

DELIMITER //

CREATE PROCEDURE ListEmployees()
BEGIN
    DECLARE v_name VARCHAR(50);
    DECLARE v_salary DECIMAL(10,2);
    DECLARE done INT DEFAULT FALSE;

    -- Declare the cursor for a multi-row result set
    DECLARE emp_cursor CURSOR FOR SELECT emp_name, salary FROM Employees;

    -- This handler sets 'done' to TRUE once there are no more rows to fetch
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN emp_cursor;

    read_loop: LOOP
        FETCH emp_cursor INTO v_name, v_salary;
        IF done THEN
            LEAVE read_loop;    -- exit the loop, same idea as EXIT WHEN in PL/SQL
        END IF;
        SELECT CONCAT(v_name, ' earns ', v_salary) AS output;
    END LOOP;

    CLOSE emp_cursor;
END //

DELIMITER ;

CALL ListEmployees();
```

This produces one row of output per employee, printed one at a time — showing exactly how a cursor lets us walk through a multi-row result set step by step, which a simple `SELECT INTO` could never do.

---

## Summary of Unit V

- **PL/SQL** adds procedural programming power (variables, loops, conditions, error handling) on top of plain SQL, organized into **DECLARE / BEGIN / EXCEPTION / END** blocks.
- **Data types**: standard SQL types plus PL/SQL-specific helpers like `%TYPE` (matches a column's type) and `%ROWTYPE` (matches an entire row's structure).
- **Control structures**: `IF-THEN-ELSIF-ELSE` for decisions; `LOOP`, `WHILE LOOP`, `FOR LOOP` for repetition.
- **Database access**: `SELECT INTO` for single rows, direct `INSERT/UPDATE/DELETE` inside blocks, and the `EXCEPTION` section for graceful error handling.
- **Database connections** are established using drivers like JDBC/ODBC/OCI, requiring credentials and host/port details, to let external applications talk to the database.
- **Transaction management** uses `COMMIT`/`ROLLBACK` inside PL/SQL blocks to guarantee all-or-nothing behaviour for grouped operations.
- **Locking** (Shared/Exclusive locks, and `SELECT FOR UPDATE`) protects data correctness when multiple users access the same data concurrently.
- **Cursors** (Implicit — automatic, for single statements; Explicit — declared and controlled manually, for multi-row results) let us process a query's result set one row at a time.
