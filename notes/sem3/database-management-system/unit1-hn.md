# UNIT – I: Database Management System ka Introduction

---

## 1. Database System ka Purpose

Pehle samajhte hain ki database kya hota hai, aur ye zaroorat kyu padi.

### 1.1 Purana Tareeka — File Processing System

Bahut time pehle, database aane se pehle, organizations apna data simple **files** (jaise text files ya spreadsheets) me store karte the, jinhe application programs directly handle karte the. Jaise, ek bank ke paas savings accounts ki alag files hoti, loans ki alag files, customer details ki alag files, aur har file ko koi alag programmer likha hua program manage karta tha.

Is "file-based system" me kaafi problems aati thi:

1. **Data Redundancy aur Inconsistency**
   Kyunki same information (jaise customer ka address) multiple files me alag-alag departments dwara store hoti thi, wo duplicate ho jaati thi. Agar customer apna address change kare, ho sakta hai kisi ne ek file me update kar diya lekin dusri file me bhool gaya. Ab data inconsistent ho gaya — do files me ek hi insaan ke do alag addresses show ho rahe hain.

2. **Data Access me Difficulty**
   Maan lo bank manager ko jaanna hai "Mumbai me rehne wale sab customers ki list do." Agar file system design karte waqt is tarah ka sawal socha hi nahi gaya tha, to ye information nikalne ka koi aasan tareeka nahi hota. Har baar naya type ka sawal aane par ek naya program shuru se likhna padta.

3. **Data Isolation**
   Data alag-alag files me, alag-alag formats me, alag-alag programmers ne likha hua bikhra hua padha rehta tha. Naya program likhna jisme multiple files ka data ek saath chahiye ho, bahut mushkil ho jaata tha.

4. **Integrity Problems**
   Data ko kuch rules (constraints) follow karne hote hain. Jaise, "account balance kabhi zero se neeche nahi jaana chahiye." File systems me ye rules har application program ke code ke andar likhe jaate the. Agar koi naya program add hua aur programmer ye check likhna bhool gaya, to rule toot sakta tha.

5. **Atomicity Problems**
   Socho Account A se Account B me paisa transfer karna hai. Isme do steps hain: A se paisa ghatao, B me paisa jodo. Agar step 1 ke baad system crash ho jaaye aur step 2 se pehle, to paisa gayab ho jaata hai. File systems ke paas ye guarantee karne ka koi proper mechanism nahi tha ki dono steps saath me ho, ya bilkul na ho.

6. **Concurrent Access Anomalies**
   Jab bahut sare users same data ko ek hi time pe access aur update karne ki koshish karte hain (jaise do log ek hi last train ticket book karne ki koshish kar rahe hon), file systems ke paas ise sahi tarike se manage karne ka koi tareeka nahi tha aur galat result de sakte the.

7. **Security Problems**
   Simple files use karke alag-alag users ko alag level ka access dena mushkil tha. Jaise, ek clerk ko sirf data dekhne diya jaaye lekin delete karne na diya jaaye — ye enforce karna hard tha.

### 1.2 Solution — Database Management System (DBMS)

Ek **Database Management System (DBMS)** aisa software hai jo khaas taur pe upar wali sab problems solve karne ke liye banaya gaya hai. Ye user/application aur disk pe actually store hue data ke beech me baithta hai, aur data ko organized, safe, aur efficient tarike se manage karta hai.

**Definition:** DBMS interrelated data (jise database bola jaata hai) ka ek collection hai, saath me us data ko access karne ke liye programs ka ek set. Ye data ka collection usually **database** bola jaata hai, aur ismein kisi ek particular organization ke baare me information hoti hai.

DBMS ka main purpose ye hai:
- Data ko convenient aur efficient tarike se **store** aur **retrieve** karne ka tareeka dena.
- Redundancy hatana aur data ko consistent rakhna.
- **Security** dena, taaki unauthorized users wo data na dekh paayen ya change na kar paayen jiski unhe permission nahi hai.
- **Concurrent access** ko safely handle karna, taaki multiple users ek saath database use kar sakein bina kisi conflict ke.
- **Backup aur recovery** dena, taaki crash ya hardware failure ki condition me data loss na ho.
- **Integrity constraints** enforce karna, taaki data hamesha business rules follow kare.

### 1.3 Practical: Hume DBMS Kyu Chahiye (MySQL Example)

Chalo actually mein difference dekhte hain. Socho hum student data ko plain text file me store kar rahe hain vs MySQL me.

**File-based approach me problem (socho ek file `students.txt`):**
```
101, Aman, CSE, 9876543210
102, Riya, ECE, 9123456780
101, Aman, CSE, 9988776655
```
Yahan dekho student `101` (Aman) do baar aa raha hai, do alag phone numbers ke saath. Plain text file ke paas is duplication ko rokne ka koi automatic tareeka nahi hai. Ye exactly wahi redundancy aur inconsistency wali problem hai jo upar discuss ki thi.

**Ab yahi cheez MySQL me karte hain**, jahan DBMS humare liye rules enforce karta hai:

```sql
-- Step 1: Ek database banao
CREATE DATABASE CollegeDB;

-- Step 2: Us database ko select karo use karne ke liye
USE CollegeDB;

-- Step 3: Ek table banao PRIMARY KEY constraint ke saath
-- PRIMARY KEY ye ensure karta hai ki roll_no hamesha unique rahe
CREATE TABLE Students (
    roll_no INT PRIMARY KEY,
    name VARCHAR(50),
    branch VARCHAR(20),
    phone VARCHAR(15)
);

-- Step 4: Data insert karo
INSERT INTO Students VALUES (101, 'Aman', 'CSE', '9876543210');
INSERT INTO Students VALUES (102, 'Riya', 'ECE', '9123456780');

-- Step 5: Wahi roll_no dobara insert karne ki koshish karo (ye FAIL hoga)
INSERT INTO Students VALUES (101, 'Aman', 'CSE', '9988776655');
```

Jab tum ye last statement run karoge, MySQL ye error dega:

```
ERROR 1062 (23000): Duplicate entry '101' for key 'PRIMARY'
```

Ye DBMS actively humare data ko inconsistent hone se bacha raha hai — jo ek plain file kabhi khud se nahi kar sakti. Ye ek example DBMS ka asli purpose dikhata hai: **ye sirf data store nahi karta, balki use protect aur manage bhi karta hai.**

---

## 2. Data Abstraction

Data abstraction ka matlab hai **data actually kaise store hota hai uski complex details ko hide karna, aur user ko sirf wahi dikhana jo unhe dekhna zaroori hai.**

ATM machine ke baare me socho. Jab tum paisa nikalte ho, tum bas kuch buttons press karte ho aur cash mil jaata hai. Tumhe ye jaanne ki zaroorat nahi ki bank ka database internally tumhara balance kaise store kar raha hai, kaunsi files use kar raha hai, ya hard disk pe kaise arrange kiya hai. Internal complicated details ko is tarah chupana hi abstraction kehlata hai.

DBMS data abstraction **teen levels** pe provide karta hai, aur inhe saath me **Three-Schema Architecture** (ANSI/SPARC architecture bhi bolte hain) kaha jaata hai.

### 2.1 Abstraction ke Teen Levels

```
 ┌───────────────────────────────────────────┐
 │            VIEW LEVEL (External)           │  ← Har user kya dekhta hai
 │   View 1        View 2        View 3       │
 └───────────────────────────────────────────┘
 ┌───────────────────────────────────────────┐
 │          LOGICAL LEVEL (Conceptual)         │  ← Kya data store hai,
 │   Tables, relationships, constraints        │     aur relationships
 └───────────────────────────────────────────┘
 ┌───────────────────────────────────────────┐
 │          PHYSICAL LEVEL (Internal)          │  ← Data actually disk pe
 │   Files, blocks, indexes on disk            │     kaise store hai
 └───────────────────────────────────────────┘
```

**1. Physical Level (Internal Level)**
Ye sabse neeche wala level hai. Ye describe karta hai ki data computer me actually **kaise** store hota hai — exact file structures, block sizes, indexing methods, aur hard disk pe storage details. Ye normally database system khud aur database administrators handle karte hain, normal users nahi. Jaise, data B-tree index ki tarah store ho raha hai ya hash file ki tarah, ye yahan decide hota hai.

**2. Logical Level (Conceptual Level)**
Ye middle level hai. Ye describe karta hai ki database me **kya** data store hai aur us data ke beech kya relationships hain. Is level pe hum tables, columns, data types, aur constraints ki baat karte hain — jaise "Students naam ki ek table hai jisme roll_no, name, branch columns hain." Database administrators, jo decide karte hain database me kya information rakhni chahiye, is level pe kaam karte hain. Is level ke users ko neeche wali complicated physical structures jaanne ki zaroorat nahi.

**3. View Level (External Level)**
Ye sabse upar wala level hai aur ye sirf pure database ka wo **part** describe karta hai jo kisi particular group of users ke liye relevant hai. Ek hi database ke liye kai views ho sakte hain. Jaise, ek college database me teachers ke liye ek view ho sakta hai (sirf student marks aur attendance dikhana) aur accounts department ke liye dusra view (sirf fee payment details dikhana). Har user sirf apna khud ka view dekhta hai, poora complex database nahi.

### 2.2 Data Abstraction Kyu Important Hai

- Ye users ke data ke saath interact karne ko **simplify** karta hai — unhe complicated storage details seekhne ki zaroorat nahi.
- Ye **data independence** provide karta hai (next section me explain kiya hai) — tum physical storage change kar sakte ho bina users ke dekhne ke tareeke pe asar dale.
- Ye **security** improve karta hai, kyunki ek view design kiya ja sakta hai jo sensitive columns jaise salary ko un users se hide kare jinhe wo nahi dikhne chahiye.

### 2.3 Practical: MySQL Views se Data Abstraction

MySQL me ek **VIEW** "View Level" of abstraction ka perfect real-life example hai. Chalo ek sensitive data wali table banate hain aur general staff ke liye ek limited view banate hain.

```sql
USE CollegeDB;

-- Ek table jisme sensitive data hai (salary sabko nahi dikhni chahiye)
CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(30),
    salary DECIMAL(10,2)
);

INSERT INTO Employees VALUES (1, 'Suresh', 'IT', 55000.00);
INSERT INTO Employees VALUES (2, 'Kavita', 'HR', 48000.00);

-- Ab ek VIEW banao jo salary column ko hide kare
-- Ye exactly "external / view level" of abstraction hai
CREATE VIEW Employee_PublicView AS
SELECT emp_id, name, department
FROM Employees;

-- General staff sirf view ko query kar sakta hai
SELECT * FROM Employee_PublicView;
```

View query ka output:

```
+--------+---------+-------------+
| emp_id | name    | department  |
+--------+---------+-------------+
|   1    | Suresh  |     IT      |
|   2    | Kavita  |     HR      |
+--------+---------+-------------+
```

Dekho, `salary` column `Employee_PublicView` use karne wale kisi bhi user se completely hidden hai, halanki ye asli `Employees` table me poori tarah maujood hai. Ye data abstraction ka live example hai — user sirf simplified, relevant "view" dekhta hai aur neeche wali real complex table (uske pure data ke saath) hidden rehti hai.

---

## 3. Data Models

Ek **data model** tools/concepts ka collection hai jo database ki structure describe karta hai, matlab ye define karta hai: data, data ke beech ke relationships, aur wo rules (constraints) jo data ko follow karne hain.

Data model ko ek blueprint ya plan ki tarah socho — jaise koi architect building banane se pehle plan banata hai, waise hi database designer database banane se pehle ek data model banata hai.

### 3.1 Data Models ke Types

**1. Relational Model**
Ye aaj sabse zyada use hone wala model hai (MySQL, Oracle, PostgreSQL waghera use karte hain). Is model me data **tables** (relations bhi kehte hain) me organize hota hai, jisme har table me **rows** (records/tuples) aur **columns** (attributes/fields) hote hain. Alag-alag tables ke beech relationships common columns use karke banaye jaate hain, especially **keys**.

Example: Ek `Students` table aur ek `Courses` table ko common `roll_no` aur `course_id` se relate kiya ja sakta hai.

**2. Entity-Relationship (ER) Model**
Ye model mainly **conceptual level** pe database **design** karne ke liye use hota hai, actual tables banane se pehle. Ye database ko **entities** (real-world objects, jaise "Student" ya "Book") aur in entities ke beech ke **relationships** (jaise "Student BORROWS Book") ke roop me represent karta hai. Ye ER diagrams se draw kiya jaata hai (Unit II me detail me cover kiya hai).

**3. Object-Based Data Model (Object-Oriented Model)**
Yahan data **objects** ke form me store hota hai, object-oriented programming languages jaise Java ya C++ jaisa. Har object ke paas attributes (data) aur methods (behaviour) saath me bundled hote hain. Ye Object-Oriented Database Systems (OODBMS) me use hota hai.

**4. Semi-structured Data Model**
Ye model same type ke data items ko alag-alag sets of attributes rakhne deta hai. Ye modern applications me common hai, jaise XML ya JSON-based databases (jaise MongoDB), jahan har "document" ko exact same rigid structure follow karna zaroori nahi hota.

**5. Hierarchical Model (Purana / Legacy Model)**
Data ek **tree structure** ki tarah organize hota hai, parent-child relationship ke saath. Har child record ka sirf ek parent hota hai, lekin ek parent ke kai children ho sakte hain. Jaise, ek company ka organization chart naturally hierarchical model me fit hota hai. Ye model ab largely outdated hai.

**6. Network Model (Purana / Legacy Model)**
Ye hierarchical model jaisa hi hai, lekin yahan ek child record ke **ek se zyada parents** bhi ho sakte hain, jisse ek network (graph-like) structure banti hai simple tree ke bajaye. Ye bhi ab largely outdated hai, lekin ye hierarchical model se improvement tha kyunki ye zyada complex relationships represent kar sakta tha.

### 3.2 Practical: MySQL me Relational Model

Kyunki MySQL ek **Relational Database Management System (RDBMS)** hai, hum MySQL me jo bhi karte hain wo relational model pe based hota hai — data tables me organize hota hai rows aur columns ke saath, keys use karke linked.

```sql
USE CollegeDB;

-- Entity 1: Students table (relational model ki terms me ek "relation")
CREATE TABLE Students2 (
    roll_no INT PRIMARY KEY,
    name VARCHAR(50)
);

-- Entity 2: Courses table
CREATE TABLE Courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(50)
);

-- Relationship table: kaunsa student kaunse course me enrolled hai
-- Ye do relations ko saath jodta hai, exactly jaisa relational model describe karta hai
CREATE TABLE Enrollment (
    roll_no INT,
    course_id INT,
    FOREIGN KEY (roll_no) REFERENCES Students2(roll_no),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

INSERT INTO Students2 VALUES (201, 'Neha');
INSERT INTO Courses VALUES (301, 'Database Management System');
INSERT INTO Enrollment VALUES (201, 301);

-- Ab tables ko unke relationship ka use karke combine karo (ek JOIN)
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

Ye relational model ko action me dikhata hai: alag-alag tables (relations), har ek ek type ki entity represent karti hai, **keys** use karke saath jodi gayi hain meaningful relationships banane ke liye.

---

## 4. Data Independence

Data independence ka matlab hai ye ability ki **schema (structure/design) ko ek level pe change kiya ja sake bina next higher level ka schema change kiye.**

Ye concept upar discuss ki gayi three-level architecture (Physical, Logical, View) ke saath kaam karta hai. Iske do types hain:

### 4.1 Physical Data Independence

Ye ability hai ki **physical level** ko change kiya ja sake (data actually kaise store hai — file organization, indexing method, storage device) **bina** **logical level** (table structure jo programs aur users dekhte hain) ko change kiye.

**Example:** Maan lo database administrator student data ko ek type ke storage device se faster wale me move karne ka decide karta hai, ya searching speed badhane ke liye ek naya index add karta hai. Actual table structure `Students(roll_no, name, branch)` jo saari application programs use karti hain, bilkul same rehta hai. Tumhari `SELECT * FROM Students` queries bina kisi change ke kaam karti rehti hain. Ye hai physical data independence — tumne "kaise store hai" change kiya bina "logically kaise dikhta hai" ko touch kiye.

Physical data independence achieve karna relatively **aasan** hai, kyunki physical details already sabse neeche aur users se hidden hoti hain.

### 4.2 Logical Data Independence

Ye ability hai ki **logical level** ko change kiya ja sake (overall table structure — jaise, naya column add karna, ya ek table ko do me split karna) **bina** **view level** (specific users ke external views aur application programs) ko change kiye.

**Example:** Maan lo college `Students` table me internal record-keeping ke liye naya column `email` add karta hai. Agar ek teacher ka view (`SELECT roll_no, name, marks FROM Students`) `email` column ko bilkul use nahi karta, to teacher ki application bina koi modification ke perfectly fine kaam karti rehti hai, halanki neeche wali table structure change ho gayi.

Logical data independence achieve karna physical data independence se **zyada mushkil** hai, kyunki application programs usually data ki logical structure se zyada closely tied hote hain.

### 4.3 Data Independence Kyu Matter Karta Hai

Data independence ke bina, storage ya table design me har chhoti si change hume saari application programs dobara likhwane pe majboor karti — ye large real-world systems ke liye bahut costly aur impractical hota. DBMS is dependency ko minimize karne ke liye khaas taur pe design kiya gaya hai, jo old file-based systems se iska ek sabse bada advantage hai.

### 4.4 Practical: MySQL me Logical Data Independence Dikhana

Chalo isko simulate karte hain. Pehle, ek teacher ke liye view banate hain jise sirf names aur branches dekhne hain — pure table me sab kuch nahi.

```sql
USE CollegeDB;

CREATE TABLE StudentRecords (
    roll_no INT PRIMARY KEY,
    name VARCHAR(50),
    branch VARCHAR(20)
);

INSERT INTO StudentRecords VALUES (1, 'Arjun', 'CSE');
INSERT INTO StudentRecords VALUES (2, 'Meera', 'IT');

-- Teacher ka view sirf roll_no, name, branch pe depend karta hai
CREATE VIEW TeacherView AS
SELECT roll_no, name, branch
FROM StudentRecords;

SELECT * FROM TeacherView;
```

Ab, socho admin base table me naya column `email` add karne ka decide karta hai (ek **logical level change**):

```sql
-- Logical level change: naya column add karna
ALTER TABLE StudentRecords ADD COLUMN email VARCHAR(50);

UPDATE StudentRecords SET email = 'arjun@example.com' WHERE roll_no = 1;
UPDATE StudentRecords SET email = 'meera@example.com' WHERE roll_no = 2;

-- Ab wahi view dobara query karo
SELECT * FROM TeacherView;
```

Output — bilkul unchanged, abhi bhi sirf 3 columns:
```
+---------+--------+--------+
| roll_no | name   | branch |
+---------+--------+--------+
|    1    | Arjun  |  CSE   |
|    2    | Meera  |   IT   |
+---------+--------+--------+
```

Halanki humne naya `email` column add karke base table ki structure modify ki, `TeacherView` (jo external/view level represent karta hai jo ek particular application use karti hai) bilkul nahi tooti ya change nahi hui. Yahi exactly hai **logical data independence** practically.

---

## 5. Data Definition Language (DDL)

**DDL** SQL commands ka ek set hai jo database objects jaise tables, schemas, indexes, aur views ki **structure define, create, modify, aur delete** karne ke liye use hota hai. DDL database ke **design/structure** se deal karta hai, uske andar ke actual data values se nahi.

### 5.1 Main DDL Commands

| Command | Purpose |
|---|---|
| `CREATE` | Naya database object banata hai (table, database, view, index, waghera) |
| `ALTER` | Existing database object ki structure modify karta hai |
| `DROP` | Ek database object aur uska sara data permanently delete karta hai |
| `TRUNCATE` | Table ki saari rows remove karta hai lekin table structure rakhta hai |
| `RENAME` | Database object ka naam badalta hai |

DDL commands ki ek important property ye hai ki wo **auto-committed** hote hain — matlab ek baar tum DDL command run karo, change immediately permanently save ho jaata hai; tum ise normal data changes ki tarah rollback nahi kar sakte.

### 5.2 Practical: MySQL me DDL Commands

**a) CREATE — database aur table banana**
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

**b) ALTER — table structure modify karna**
```sql
-- Naya column add karo
ALTER TABLE Books ADD COLUMN publish_year INT;

-- Existing column ka data type modify karo
ALTER TABLE Books MODIFY COLUMN price DECIMAL(10,2);

-- Column drop (remove) karo
ALTER TABLE Books DROP COLUMN publish_year;

-- Column ka naam rename karo
ALTER TABLE Books CHANGE COLUMN author writer VARCHAR(50);
```

**c) TRUNCATE — sara data remove karo lekin table rakho**
```sql
INSERT INTO Books VALUES (1, 'DBMS Basics', 'R. Sharma', 350.00);
INSERT INTO Books VALUES (2, 'SQL Guide', 'P. Kumar', 420.00);

-- Saari rows instantly remove karta hai, lekin empty table Books abhi bhi exist karti hai
TRUNCATE TABLE Books;

SELECT * FROM Books;   -- Empty result return karta hai, table structure abhi bhi hai
```

**d) DROP — table ko hi permanently delete karo**
```sql
DROP TABLE Books;   -- Books table ab bilkul exist nahi karti
```

**e) RENAME — table ka naam badlo**
```sql
CREATE TABLE OldBooks (id INT, title VARCHAR(50));
RENAME TABLE OldBooks TO NewBooks;
```

**Yaad rakhne wala important difference:**
- `DELETE` (ek DML command, aage explain kiya hai) rows remove karta hai lekin tum `WHERE` se filter kar sakte ho aur rollback bhi kar sakte ho.
- `TRUNCATE` (ek DDL command) ek saath ALL rows remove karta hai, chizein jaise auto-increment counters reset karta hai, aur aasani se rollback nahi ho sakta.
- `DROP` poori table structure uske data ke saath remove kar deta hai — kuch bhi nahi bachta.

---

## 6. Data Manipulation Language (DML)

**DML** SQL commands ka ek set hai jo database tables ke andar store **actual data ko access, insert, update, aur delete** karne ke liye use hota hai. DDL (jo structure se deal karta hai) ke ulat, DML us structure ke andar ke **content/values** se deal karta hai.

### 6.1 Main DML Commands

| Command | Purpose |
|---|---|
| `SELECT` | Ek ya zyada tables se data retrieve (read) karta hai |
| `INSERT` | Table me naye rows of data add karta hai |
| `UPDATE` | Table me existing data modify karta hai |
| `DELETE` | Table se existing rows of data remove karta hai |

DDL ke ulat, DML commands most database systems me default me **auto-committed nahi** hote (ye settings pe depend kar sakta hai) — matlab tum in changes ko finalize hone se pehle `COMMIT` (permanently save) ya `ROLLBACK` (undo) kar sakte ho. Ye Unit IV me TCL (Transaction Control Language) section me aur cover hoga.

### 6.2 Practical: MySQL me DML Commands

**a) INSERT — data add karna**
```sql
USE LibraryDB;

CREATE TABLE Members (
    member_id INT PRIMARY KEY,
    name VARCHAR(50),
    city VARCHAR(30),
    fine_due DECIMAL(6,2)
);

-- Ek single row insert karo
INSERT INTO Members VALUES (1, 'Anjali', 'Udaipur', 0.00);

-- Ek saath multiple rows insert karo
INSERT INTO Members VALUES
(2, 'Rohit', 'Jaipur', 50.00),
(3, 'Simran', 'Udaipur', 20.00);

-- Sirf specific columns me insert karo (baaki default/NULL milte hain)
INSERT INTO Members (member_id, name) VALUES (4, 'Vikram');
```

**b) SELECT — data padhna**
```sql
-- Saare columns, saari rows lo
SELECT * FROM Members;

-- Sirf specific columns lo
SELECT name, city FROM Members;

-- Ek condition match karne wale rows lo
SELECT * FROM Members WHERE city = 'Udaipur';

-- Condition match karne wale rows lo, sorting ke saath
SELECT * FROM Members WHERE fine_due > 0 ORDER BY fine_due DESC;
```

**c) UPDATE — existing data modify karna**
```sql
-- Ek single member ki fine update karo
UPDATE Members SET fine_due = 0.00 WHERE member_id = 2;

-- Ek saath multiple columns update karo
UPDATE Members SET city = 'Udaipur', fine_due = 10.00 WHERE member_id = 4;

-- Dhyan rakho: WHERE ke bina, ALL rows update ho jaayengi!
UPDATE Members SET fine_due = 0.00;   -- har member ki fine reset kar deta hai
```

**d) DELETE — existing data remove karna**
```sql
-- Ek specific row delete karo
DELETE FROM Members WHERE member_id = 3;

-- Ek condition match karne wale rows delete karo
DELETE FROM Members WHERE fine_due = 0;

-- Dhyan rakho: WHERE ke bina, ALL rows delete ho jaati hain (lekin table structure rehta hai)
DELETE FROM Members;
```

**DDL aur DML ka difference, summarized:**

| Aspect | DDL | DML |
|---|---|---|
| Kis pe kaam karta hai | Database objects ki structure | Objects ke andar ka actual data/values |
| Examples | CREATE, ALTER, DROP, TRUNCATE | SELECT, INSERT, UPDATE, DELETE |
| Auto-commit | Haan, changes immediately permanent | Nahi, commit se pehle rollback ho sakta hai |
| Effect | Table design change karta hai | Table content change karta hai |

---

## 7. Database Manager

**Database Manager** ek program module hai (DBMS software ka hi ek core part) jo **database me store low-level data aur application programs/user dwara submit ki gayi queries ke beech ek interface ki tarah kaam karta hai**.

Database manager ko DBMS software ka "brain" samjho. Ye koi insaan nahi hai — ye ek software component hai. Iski responsibilities include hain:

1. **File manager ke saath interaction** — database manager SQL/query requests leta hai aur decide karta hai ki disk pe store files se required data kaise retrieve karna hai, file manager use karke.

2. **Data consistency ensure karna** — jab bahut sare users ek saath kaam kar rahe hote hain, database manager ye ensure karta hai ki data inconsistent na ho (locking jaisi techniques use karke, concurrency control ke under cover kiya hai).

3. **Integrity constraints enforce karna** — ye data pe define ki gayi saari rules (jaise primary keys, foreign keys, not-null constraints) check karta hai koi bhi change actually hone se pehle.

4. **Security enforce karna** — ye check karta hai ki koi data ya action request karne wala user actually authorized hai ya nahi.

5. **Backup aur recovery control** — ye recovery manager ke saath kaam karta hai ye ensure karne ke liye ki agar system crash ho jaaye, database ko consistent state me restore kiya ja sake.

Simple words me: jab bhi tum `SELECT * FROM Students;` jaisi query type karte ho, ye database manager hi hai (dusre internal modules jaise query processor, transaction manager, aur storage manager ke saath) jo peeche se sab kuch handle karta hai tumhe correct, safe, aur consistent result laane ke liye.

### 7.1 Practical: Database Manager ka Kaam Indirectly Dekhna

Hum database manager module ko directly "call" nahi kar sakte, kyunki ye internally kaam karta hai. Lekin hum uske effects clearly observe kar sakte hain, jaise, ye kaise integrity automatically enforce karta hai:

```sql
USE LibraryDB;

CREATE TABLE Loans (
    loan_id INT PRIMARY KEY,
    member_id INT,
    book_id INT,
    FOREIGN KEY (member_id) REFERENCES Members(member_id)
);

-- Database manager foreign key constraint automatically check karta hai
-- Ye FAIL hoga kyunki member_id 99 Members table me exist hi nahi karta
INSERT INTO Loans VALUES (1, 99, 5);
```

Output:
```
ERROR 1452 (23000): Cannot add or update a child row:
a foreign key constraint fails
```

Ye error MySQL ke internal database manager component ne generate kiya hai, jisne insert hone dene se pehle constraint check kiya — ye prove karta hai ki ye hamesha hamari har command ke peeche actively kaam karta hai, data integrity ko automatically protect karte hue.

---

## 8. Database Administrator (DBA)

**Database Administrator (DBA)** ek **insaan** (ya logon ki team) hai jo database system ke overall management, control, aur maintenance ke liye responsible hota hai. "Database Manager" (jo software hai) ke ulat, DBA ek human role/job title hai.

### 8.1 DBA ki Responsibilities

1. **Schema Definition**
   DBA database ki overall logical structure decide aur create karta hai — kaunse tables exist karenge, unke kya columns honge, aur wo kaise related hain. Ye DDL commands use karke kiya jaata hai.

2. **Storage Structure aur Access Method Definition**
   DBA decide karta hai ki data physically kaise store aur index kiya jaaye best performance ke liye.

3. **Schema aur Physical Organization Modification**
   Jaise-jaise organization ki zaroortein time ke saath change hoti hain, DBA in changes ko reflect karne ke liye database schema ya physical organization modify karne ke liye responsible hota hai.

4. **Data Access ke liye Authorization Grant Karna**
   DBA control karta hai **kaun** data ke **kis part** ko access kar sakta hai, aur wo kya actions (read, write, delete) perform kar sakte hain. Ye DCL commands jaise `GRANT` aur `REVOKE` use karke kiya jaata hai (Unit IV me cover kiya hai).

5. **Routine Maintenance**
   Isme periodically database ka backup lena, enough disk space available rehna ensure karna, aur performance monitor karna include hai taaki user requests ke response times reasonable rahein.

6. **Data Security aur Integrity Ensure Karna**
   DBA ensure karta hai ki unauthorized access prevent ho aur saare integrity constraints properly enforce ho.

### 8.2 Practical: MySQL me DBA Tasks

**a) Users create karna aur access grant/control karna (ek important DBA task)**

```sql
-- Ek naya database user banao (ek DBA-level task)
CREATE USER 'library_clerk'@'localhost' IDENTIFIED BY 'ClerkPass123';

-- Members table pe sirf SELECT aur INSERT permission grant karo
GRANT SELECT, INSERT ON LibraryDB.Members TO 'library_clerk'@'localhost';

-- Privilege table refresh karo
FLUSH PRIVILEGES;

-- Baad me, zaroorat pade to, DBA ek permission revoke kar sakta hai
REVOKE INSERT ON LibraryDB.Members FROM 'library_clerk'@'localhost';
```

**b) Routine maintenance — backup (ek critical DBA task)**

Ek DBA regularly database ka backup leta hai taaki data lost na ho. MySQL me, ye commonly command line se (SQL prompt ke bahar) `mysqldump` naam ki ek utility use karke kiya jaata hai:

```bash
mysqldump -u root -p LibraryDB > LibraryDB_backup.sql
```

Ye command poori `LibraryDB` database ki structure aur data ko ek `.sql` file me export karta hai, jise DBA baad me use kar sakta hai database ko restore karne ke liye agar kuch galat ho jaaye:

```bash
mysql -u root -p LibraryDB < LibraryDB_backup.sql
```

Ye do examples real, hands-on jobs dikhate hain jo ek Database Administrator regularly perform karta hai database system ko healthy, secure, aur data loss se safe rakhne ke liye.

---

## 9. Database Users

Database users wo log hain jo actually database ke saath interact karte hain, lekin alag-alag tareeke se depending on unka role aur technical knowledge ka level. Broadly, users ko in categories me classify kiya jaata hai:

### 9.1 Database Users ke Types

**1. Naive Users (Unsophisticated / End Users)**
Ye ordinary users hain jo pre-built application programs ke through database ke saath interact karte hain, bina database ke baare me kuch jaane. Jaise, ek bank customer ATM machine use kar raha ho, ya ek student college website pe apna result check kar raha ho — wo bas forms fill karte hain ya buttons click karte hain. Wo kabhi directly SQL queries nahi likhte.

**2. Application Programmers**
Ye software developers/computer professionals hain jo wo application programs likhte hain jinke saath naive users interact karte hain. Wo programming languages (jaise Java, Python, PHP) ko database access methods (jaise JDBC, ODBC, ya embedded SQL) ke saath combine karke ye applications banate hain.

**3. Sophisticated Users**
Ye users directly database ke saath interact karte hain apni khud ki queries ek query language (jaise SQL) me likh kar, bina kisi ready-made application program ki zaroorat ke. Wo database system achhe se use karna jaante hain. Examples me data analysts, engineers, aur scientists include hain jo directly database query karke insights nikalte hain.

**4. Specialized Users**
Ye sophisticated users hain jo specialized database applications likhte hain jo traditional data-processing framework me fit nahi hote — jaise, applications jinme complex data types involve hote hain jaise computer-aided design systems, knowledge-based expert systems, ya systems jo audio/video data store karte hain.

**5. Database Administrators (DBA)**
Jaise pichhle section me detail me explain kiya gaya hai, ye wo insaan hai jiska poore database system pe central control hota hai.

### 9.2 Practical: MySQL me Alag-Alag User Roles Simulate Karna

Chalo demonstrate karte hain sophisticated user (directly SQL queries likhne wale) aur naive user ke action ko application program ke peeche kaise handle kiya jaata hai, ka difference.

**Sophisticated user — direct SQL query likhta hai:**
```sql
-- Ek data analyst directly query karta hai pending fines wale members dhundhne ke liye
SELECT name, fine_due
FROM Members
WHERE fine_due > 0
ORDER BY fine_due DESC;
```

**Naive user — application program ke through simulate kiya gaya:**
Ek naive user (maan lo, ek librarian jo SQL nahi jaanta) bas ek software screen pe "Show Members With Pending Fines" label wala button click karta hai. Peeche se, ek application programmer ne pehle se hi ek fixed piece of code likha hua hai (jaise, PHP ya Python me) jo silently upar wali exact wahi SQL query run karta hai jab wo button click hota hai. Naive user ne kabhi SQL dekha ya type kiya hi nahi — wo sirf friendly interface ke saath interact karta hai, jabki application programmer ka code aur database asli kaam karte hain.

Ye example practically dikhata hai ki alag-alag types ke users same underlying database ko kaise bahut alag-alag tareeke se experience karte hain, depending on unka role aur technical expertise.

---

## Unit I ka Summary

- **DBMS ka Purpose**: purane file systems ki redundancy, inconsistency, security, integrity, aur concurrency problems solve karta hai.
- **Data Abstraction**: teen levels use karke complexity hide karta hai — Physical, Logical, View.
- **Data Models**: data structure karne ke blueprints — Relational, ER, Object-based, Semi-structured, Hierarchical, Network.
- **Data Independence**: database ke ek level ko upar wale level ko disturb kiye bina change karne ki ability — Physical aur Logical independence.
- **DDL**: commands jo structure define/change karte hain — `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME`.
- **DML**: commands jo actual data ke saath kaam karte hain — `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
- **Database Manager**: internal software module jo queries ko actually store data se connect karta hai, rules ko automatically enforce karte hue.
- **Database Administrator (DBA)**: wo insaan jo poore database system ko design, secure, aur maintain karne ka incharge hota hai.
- **Database Users**: Naive Users, Application Programmers, Sophisticated Users, Specialized Users, aur DBA.
