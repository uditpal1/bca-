# UNIT – V: PL/SQL

> **Shuru karne se pehle ek note:** PL/SQL (**Procedural Language extensions to SQL**) Oracle ki apni procedural programming language hai, khaas taur pe Oracle Database ke saath kaam karne ke liye banayi gayi. Kyunki pichhle units me humare practicals MySQL use karte the, aur MySQL PL/SQL directly run **nahi** karta (MySQL ki apni similar language hai, jise simply **MySQL Stored Procedure syntax** kehte hain), is unit ke liye hum ye karenge: pehle har PL/SQL concept ko real PL/SQL code ke saath properly explain karenge (exactly jaisa syllabus me pucha gaya hai, aur exactly jaise ye Oracle me run hota), aur phir, uske turant neeche, **equivalent working MySQL practical** dikhayenge, taaki tumhe correct PL/SQL theory bhi mile aur kuch actually run karke dekhne wala bhi mile.

---

## 1. PL/SQL ke Basics

### 1.1 PL/SQL Kya Hai aur Ye Kyu Chahiye?

Plain SQL data retrieve aur manipulate karne me bahut achha hai single statements (jaise `SELECT`, `INSERT`) use karke, lekin plain SQL **ye nahi kar sakta**:
- Kisi action ko multiple baar repeat karne ke liye loops use karna.
- Decisions lene ke liye `IF-ELSE` conditions use karna.
- Values temporarily store aur calculate karne ke liye variables declare aur use karna.
- Errors ko properly error-handling logic ke saath gracefully handle karna.

**PL/SQL** ye solve karta hai SQL ki data-handling power ko regular programming languages me milne wale **procedural programming features** (variables, loops, conditions, functions) ke saath combine karke. Isse hum complete programs (jinhe **blocks** kehte hain) likh sakte hain jo directly database ke andar run hote hain, logic aur data access ko saath combine karte hue, bahut efficiently.

### 1.2 Ek PL/SQL Block ki Basic Structure

Har PL/SQL program **blocks** me organize hota hai. Ek block ke chaar sections tak ho sakte hain:

```sql
DECLARE
    -- (Optional) Yahan variables, constants, cursors declare karo
BEGIN
    -- (Mandatory) Actual executable SQL aur procedural statements yahan jaate hain
EXCEPTION
    -- (Optional) Errors handle karne ka code yahan jaata hai
END;
/
```

- **DECLARE section** (optional): jahan hum variables, constants, aur cursors declare karte hain jo block me use honge.
- **BEGIN...END section** (mandatory): actual logic contain karta hai — SQL statements, loops, conditions, calculations.
- **EXCEPTION section** (optional): wo code contain karta hai jo sirf tab run hota hai jab execution ke dauran koi error aaye, jisse hum crash hone ke bajaye ise handle kar sakein.
- Block hamesha `END;` ke saath end hota hai, uske baad ek forward slash `/` (SQL*Plus jaise tools me, `/` Oracle ko batata hai actually block execute karne ke liye).

### 1.3 Ek Simple Pehla PL/SQL Program

```sql
DECLARE
    v_message VARCHAR2(50);
BEGIN
    v_message := 'Hello, ye mera pehla PL/SQL block hai!';
    DBMS_OUTPUT.PUT_LINE(v_message);
END;
/
```
`DBMS_OUTPUT.PUT_LINE` Oracle ka screen pe text output print karne ka tareeka hai (Python me `print()` ya Java me `System.out.println()` jaisa).

### 1.4 Practical (MySQL Equivalent): Ek Simple Stored Procedure

```sql
CREATE DATABASE PLSQLDemo;
USE PLSQLDemo;

DELIMITER //

CREATE PROCEDURE SayHello()
BEGIN
    DECLARE v_message VARCHAR(50);
    SET v_message = 'Hello, ye mera pehla stored procedure hai!';
    SELECT v_message AS message;
END //

DELIMITER ;

-- Ab procedure ko call/execute karo
CALL SayHello();
```

Output:
```
+----------------------------------------------+
| message                                       |
+----------------------------------------------+
| Hello, ye mera pehla stored procedure hai!    |
+----------------------------------------------+
```

---

## 2. PL/SQL me Data Types

PL/SQL saare standard SQL data types support karta hai (jaise `NUMBER`, `VARCHAR2`, `DATE`), plus kuch special PL/SQL-only types:

| Data Type | Description |
|---|---|
| `NUMBER(p,s)` | Numeric value, `p` = precision (total digits), `s` = scale (decimal ke baad digits) |
| `VARCHAR2(n)` | Variable-length character string, `n` characters tak |
| `CHAR(n)` | Fixed-length character string |
| `DATE` | Date aur time saath store karta hai |
| `BOOLEAN` | TRUE, FALSE, ya NULL store karta hai (sirf PL/SQL blocks ke **andar** use ho sakta hai, table column type ki tarah nahi) |
| `%TYPE` | Ek special attribute jo ek variable ko automatically kisi specific table ke column ka **wahi data type** le lene deta hai. Bahut useful hai, kyunki agar baad me column ka data type change ho, variable ka type bhi automatically update ho jaata hai. |
| `%ROWTYPE` | Ek special attribute jo ek variable ko table ki ek **poori row** ki structure le lene deta hai (har column ke liye ek field) |

### 2.1 Practical Example: %TYPE aur %ROWTYPE Use Karna (PL/SQL)

```sql
-- Maan lo ek table hai: Employees(emp_id NUMBER, emp_name VARCHAR2(50), salary NUMBER)

DECLARE
    v_name Employees.emp_name%TYPE;      -- automatically emp_name ka data type match karta hai
    v_emp_row Employees%ROWTYPE;         -- ek variable jo ek poori row hold kar sakta hai
BEGIN
    SELECT emp_name INTO v_name FROM Employees WHERE emp_id = 101;
    DBMS_OUTPUT.PUT_LINE('Employee ka naam: ' || v_name);

    SELECT * INTO v_emp_row FROM Employees WHERE emp_id = 101;
    DBMS_OUTPUT.PUT_LINE('Row se salary: ' || v_emp_row.salary);
END;
/
```

### 2.2 Practical (MySQL Equivalent): Ek Stored Procedure me Variables

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
    DECLARE v_name VARCHAR(50);   -- MySQL me %TYPE nahi hota, isliye hum type manually match karte hain
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

## 3. PL/SQL me Control Structures

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
        DBMS_OUTPUT.PUT_LINE('Count hai: ' || v_count);
        v_count := v_count + 1;
        EXIT WHEN v_count > 5;    -- condition true hone pe loop rok deta hai
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
        DBMS_OUTPUT.PUT_LINE('Count hai: ' || v_count);
        v_count := v_count + 1;
    END LOOP;
END;
/
```

**FOR LOOP:**
```sql
BEGIN
    FOR v_count IN 1..5 LOOP
        DBMS_OUTPUT.PUT_LINE('Count hai: ' || v_count);
    END LOOP;
END;
/
```

### 3.3 Practical (MySQL Equivalent): Ek Stored Procedure me Control Structures

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
        SELECT CONCAT('Count hai: ', v_count) AS output;
        SET v_count = v_count + 1;
    END WHILE;
END //

DELIMITER ;

CALL SalaryCategory(45000);
CALL CountLoop();
```

---

## 4. PL/SQL ke saath Database Access

PL/SQL blocks sirf standalone logic nahi hain — inki asli power directly tables read aur modify karne se aati hai embedded SQL statements use karke.

### 4.1 SELECT INTO

Ek **single row** ki value(s) directly PL/SQL variables me fetch karne ke liye use hota hai.

```sql
DECLARE
    v_salary NUMBER;
BEGIN
    SELECT salary INTO v_salary FROM Employees WHERE emp_id = 101;
    DBMS_OUTPUT.PUT_LINE('Rahul ki salary hai: ' || v_salary);
END;
/
```

**Important:** Agar query **zero rows** ya **ek se zyada rows** return kare, ye ek error dega (`NO_DATA_FOUND` ya `TOO_MANY_ROWS`), isiliye yahan error handling (Section 4.3) important hai.

### 4.2 PL/SQL ke Andar se INSERT, UPDATE, DELETE Perform Karna

```sql
BEGIN
    UPDATE Employees SET salary = salary + 5000 WHERE emp_id = 101;
    INSERT INTO Employees VALUES (107, 'Kabir', 42000);
    DELETE FROM Employees WHERE emp_id = 106;
    COMMIT;   -- in changes ko permanently save karna
END;
/
```

### 4.3 Exception Handling

`EXCEPTION` section wo errors catch karta hai jo `BEGIN...END` block me hote hain, taaki program crash hone ke bajaye gracefully respond kar sake.

```sql
DECLARE
    v_salary NUMBER;
BEGIN
    SELECT salary INTO v_salary FROM Employees WHERE emp_id = 999;  -- exist hi nahi karta
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Us ID ka koi employee nahi mila.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Koi aur error aaya.');
END;
/
```

### 4.4 Practical (MySQL Equivalent): Database Access aur Error Handling

```sql
USE PLSQLDemo;

DELIMITER //

CREATE PROCEDURE GiveRaise(IN p_emp_id INT, IN p_amount DECIMAL(10,2))
BEGIN
    -- Handler: ye MySQL ka error catch karne ka tareeka hai (PL/SQL ke EXCEPTION jaisa)
    DECLARE EXIT HANDLER FOR NOT FOUND
        SELECT 'Us ID ka koi employee nahi mila.' AS error_message;

    UPDATE Employees SET salary = salary + p_amount WHERE emp_id = p_emp_id;
    SELECT CONCAT('Salary update ho gayi emp_id ke liye: ', p_emp_id) AS result;
END //

DELIMITER ;

CALL GiveRaise(101, 5000);
```

---

## 5. Database Connections

PL/SQL (ya koi bhi SQL) actually use karne ke liye, ek application ko pehle Oracle database server se ek **connection** establish karni hoti hai. Ek database connection typically ye chahiye:

- **Username** aur **Password** — authentication ke liye.
- **Host / Service Name / SID** — identify karne ke liye ki kaunse database server aur specific database instance se connect karna hai.
- **Port number** — network port jispe database server listen kar raha hai (Oracle ka default usually `1521` hota hai).

Real applications me, ye connection ek **driver** use karke establish kiya jaata hai, jaise:
- **JDBC (Java Database Connectivity)** — Java applications dwara Oracle (ya kisi bhi database) se connect karne ke liye use hota hai.
- **ODBC (Open Database Connectivity)** — ek zyada general standard jo kai languages se use ho sakta hai.
- **OCI (Oracle Call Interface)** — Oracle ka apna native low-level connection interface.

Connect hone ke baad, ek application is open connection ke through database ko SQL/PL-SQL statements bhej sakti hai aur results wapas receive kar sakti hai.

### 5.1 Practical: Database Connection ka Example (Conceptual, Python + MySQL use karke)

PL/SQL Oracle ke andar hi run hota hai, lekin yahan dikhaya hai ki ek external application (Python me, MySQL ko target database ki tarah use karte hue) ye same tarah ka connection kaise establish karta, concept practically dikhane ke liye:

```python
import mysql.connector

# Connection establish karna - ye practically wahi hai
# jo JDBC/ODBC karta hai jab ek application ko Oracle se connect karta hai
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

Ye "database connection" ka real, practical matlab dikhata hai — ek program (kisi bhi language me likha hua) database server ke saath ek communication channel open karta hai, usse through SQL bhejta hai, aur results wapas padhta hai, phir finally channel close kar deta hai.

---

## 6. PL/SQL me Transaction Management

Ek **transaction** ek ya zyada SQL operations ki sequence hoti hai jise ek single logical unit of work ki tarah treat kiya jaata hai — ya to **saare** operations succeed hote hain, ya **koi bhi** permanently apply nahi hote. Ye already Unit IV (TCL commands) me introduce ho chuka hai, aur PL/SQL exactly wahi commands use karta hai, bas ab ye procedural blocks ke andar embedded hote hain.

```sql
BEGIN
    UPDATE Employees SET salary = salary - 10000 WHERE emp_id = 101;  -- Rahul se deduct karo
    UPDATE Employees SET salary = salary + 10000 WHERE emp_id = 102;  -- Sneha ko add karo

    COMMIT;   -- dono changes saath me, permanently save hote hain
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;   -- agar KUCH BHI galat ho, dono changes completely undo karo
        DBMS_OUTPUT.PUT_LINE('Transaction fail hua aur rollback ho gaya.');
END;
/
```

Ye example do employees ke beech salary/money transfer represent karta hai — ek classic transaction example, jo dikhata hai **atomicity** (all-or-nothing behaviour) kyu itni important hai: hum kabhi nahi chahenge ki Rahul se paisa deduct ho lekin successfully Sneha ko add na ho.

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

**Locking** ek mechanism hai jo database **concurrent access** control karne ke liye use karta hai — ensure karta hai ki jab multiple users same data ko ek hi time pe read/write karne ki koshish karte hain, results correct aur consistent rahein, aur ek user ke changes doosre ke se lost ya corrupt na hon.

### 7.1 Locks ke Types

1. **Shared Lock (Read Lock)** — multiple users ko ek hi time pe same data **read** karne deta hai, lekin unme se kisi ko usme modify karne se rokta hai jab tak shared lock hold hai.

2. **Exclusive Lock (Write Lock)** — sirf **ek** user ko data read aur modify dono karne deta hai; koi doosra user use (strict implementations me) tab tak read bhi nahi kar sakta jab tak exclusive lock release na ho.

### 7.2 Locking Kyu Zaroori Hai — Ek Real Problem Jo Ye Solve Karta Hai

Socho do bank clerks ek account balance ₹1000 exact same time pe padhte hain. Clerk A ₹500 withdraw karta hai (ab balance ₹500 hona chahiye), aur Clerk B, Clerk A ke action se unaware, ₹300 bhi withdraw kar leta hai purane ₹1000 wale balance ke aadhar pe (sochte hue balance ₹700 hona chahiye). Proper locking ke bina, final saved balance galti se ₹700 ya ₹500 ban sakta hai, jabki actually ₹200 hona chahiye (₹1000 − ₹500 − ₹300). Locking exactly is tarah ke conflict ko prevent karta hai, ensure karke ki ek time pe sirf ek transaction is data ko modify kar sake.

### 7.3 Practical: PL/SQL (Oracle) me Locking — `SELECT FOR UPDATE`

```sql
DECLARE
    v_balance NUMBER;
BEGIN
    SELECT balance INTO v_balance FROM Accounts
    WHERE acc_id = 1
    FOR UPDATE;   -- is specific row pe ek exclusive lock leta hai

    UPDATE Accounts SET balance = v_balance - 500 WHERE acc_id = 1;
    COMMIT;   -- transaction save hone ke baad lock release karta hai
END;
/
```

### 7.4 Practical (MySQL Equivalent): Rows Lock Karna

```sql
USE PLSQLDemo;

CREATE TABLE Accounts (
    acc_id INT PRIMARY KEY,
    balance DECIMAL(10,2)
);

INSERT INTO Accounts VALUES (1, 1000.00);

START TRANSACTION;

-- Ye selected row ko exclusively lock karta hai, taaki koi doosra transaction
-- ise modify (ya, isolation level ke depend karke, read bhi) na kar sake jab tak ye commit na ho
SELECT balance FROM Accounts WHERE acc_id = 1 FOR UPDATE;

UPDATE Accounts SET balance = balance - 500 WHERE acc_id = 1;

COMMIT;   -- yahan lock release hota hai
```

Agar ek second session apna khud ka `SELECT ... FOR UPDATE` ya `UPDATE` same row pe run karne ki koshish kare pehla transaction commit hone **se pehle**, wo bas **wait** karega jab tak pehla khatam na ho — yahi exactly hai kaise locking concurrent access ke dauran data correctness ko protect karta hai.

---

## 8. Cursor Management

Ek **cursor** ek special pointer/handle hai jo PL/SQL ek query result set ke saath kaam karne ke liye use karta hai jisme **multiple rows** hoti hain, humein result ko **ek baar me ek row** process karne dete hue. Yaad rakho, plain `SELECT INTO` sirf ek single row ke liye kaam karta hai — agar humein multiple rows expect hain, humein cursor use karna hoga.

### 8.1 Implicit Cursor

Oracle automatically ek **implicit cursor** create karta hai har SQL statement ke liye (jaise ek plain `INSERT`, `UPDATE`, `DELETE`, ya ek single-row `SELECT INTO`) jise hum khud explicitly declare nahi karte. Hum iska status check kar sakte hain attributes use karke jaise `SQL%ROWCOUNT` (affected hui rows ki number), `SQL%FOUND`, `SQL%NOTFOUND`.

```sql
BEGIN
    UPDATE Employees SET salary = salary + 1000 WHERE dept_id = 1;
    DBMS_OUTPUT.PUT_LINE('Rows update hui: ' || SQL%ROWCOUNT);
END;
/
```

### 8.2 Explicit Cursor

Ek **explicit cursor** wo hai jise **hum** khud declare aur control karte hain, khaas taur pe tab use hota hai jab query se **multiple rows** expect ho, aur hum har row ko individually, ek baar me ek, process karna chahte hain.

**Explicit cursor use karne ke steps:** `DECLARE` karo → `OPEN` karo → loop me rows `FETCH` karo → `CLOSE` karo.

```sql
DECLARE
    CURSOR emp_cursor IS SELECT emp_name, salary FROM Employees;
    v_name Employees.emp_name%TYPE;
    v_salary Employees.salary%TYPE;
BEGIN
    OPEN emp_cursor;
    LOOP
        FETCH emp_cursor INTO v_name, v_salary;
        EXIT WHEN emp_cursor%NOTFOUND;   -- saari rows padh lene ke baad loop se exit karo
        DBMS_OUTPUT.PUT_LINE(v_name || ' kamata hai ' || v_salary);
    END LOOP;
    CLOSE emp_cursor;
END;
/
```

### 8.3 Practical (MySQL Equivalent): Ek Stored Procedure me Cursor

MySQL bhi cursors support karta hai, ek bahut similar step-by-step tareeke se, ek stored procedure ke andar:

```sql
USE PLSQLDemo;

DELIMITER //

CREATE PROCEDURE ListEmployees()
BEGIN
    DECLARE v_name VARCHAR(50);
    DECLARE v_salary DECIMAL(10,2);
    DECLARE done INT DEFAULT FALSE;

    -- Multi-row result set ke liye cursor declare karo
    DECLARE emp_cursor CURSOR FOR SELECT emp_name, salary FROM Employees;

    -- Ye handler 'done' ko TRUE set karta hai jab aur fetch karne ke liye rows na bachein
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN emp_cursor;

    read_loop: LOOP
        FETCH emp_cursor INTO v_name, v_salary;
        IF done THEN
            LEAVE read_loop;    -- loop se exit karo, PL/SQL ke EXIT WHEN jaisa hi idea
        END IF;
        SELECT CONCAT(v_name, ' kamata hai ', v_salary) AS output;
    END LOOP;

    CLOSE emp_cursor;
END //

DELIMITER ;

CALL ListEmployees();
```

Ye har employee ke liye ek row output produce karta hai, ek baar me ek print hota hua — exactly dikhata hai ki cursor kaise humein ek multi-row result set ko step by step walk karne deta hai, jo ek simple `SELECT INTO` kabhi nahi kar sakta.

---

## Unit V ka Summary

- **PL/SQL** plain SQL ke upar procedural programming power (variables, loops, conditions, error handling) add karta hai, **DECLARE / BEGIN / EXCEPTION / END** blocks me organize hua.
- **Data types**: standard SQL types plus PL/SQL-specific helpers jaise `%TYPE` (ek column ka type match karta hai) aur `%ROWTYPE` (ek poori row ki structure match karta hai).
- **Control structures**: decisions ke liye `IF-THEN-ELSIF-ELSE`; repetition ke liye `LOOP`, `WHILE LOOP`, `FOR LOOP`.
- **Database access**: single rows ke liye `SELECT INTO`, blocks ke andar direct `INSERT/UPDATE/DELETE`, aur graceful error handling ke liye `EXCEPTION` section.
- **Database connections** JDBC/ODBC/OCI jaise drivers use karke establish ki jaati hain, jinme credentials aur host/port details chahiye, taaki external applications database se baat kar sakein.
- **Transaction management** PL/SQL blocks ke andar `COMMIT`/`ROLLBACK` use karta hai grouped operations ke liye all-or-nothing behaviour guarantee karne ke liye.
- **Locking** (Shared/Exclusive locks, aur `SELECT FOR UPDATE`) data correctness protect karta hai jab multiple users concurrently same data access karte hain.
- **Cursors** (Implicit — automatic, single statements ke liye; Explicit — manually declare aur control kiye jaate hain, multi-row results ke liye) humein query ke result set ko ek baar me ek row process karne dete hain.
