# UNIT – II: ER Model aur Normalization

---

## PART A: ENTITY-RELATIONSHIP (ER) MODEL

## 1. ER Model Kya Hai?

**Entity-Relationship (ER) Model** database ki structure ko conceptual level pe represent karne ka ek tareeka hai, actually tables SQL me create karne **se pehle**. Ye ek design tool hai. Is model use karke, ek database designer real world ke baare me "cheezon" (entities) aur "cheezon ke beech connections" (relationships) ke roop me sochta hai, aur ise ek diagram ke roop me draw karta hai jise **ER Diagram** kehte hain.

ER model ka pura point database design ko samajhne me aasan banana hai — ek non-technical insaan bhi ER diagram dekh kar roughly samajh sakta hai ki kya data store ho raha hai aur wo kaise connect hai, bina SQL jaane.

---

## 2. Entities aur Entity Sets

### 2.1 Entity

Ek **entity** ek real-world object ya "cheez" hai jise distinctly identify kiya ja sakta hai aur jiske baare me hum data store karna chahte hain. Entity ho sakti hai:
- Ek physical, tangible object — jaise `Student`, `Car`, `Book`, `Employee`.
- Ek abstract, intangible concept — jaise `Course`, `Bank Account`, `Job Position`.

### 2.2 Entity Set

Ek **entity set** similar type ki entities ka collection hai. Jaise, college ke saare students milkar `Student` entity set banate hain. Har individual student (jaise "Aman", roll no 101) us entity set ke andar ek specific **entity** (instance bhi kehte hain) hai.

### 2.3 Attributes

Ek **attribute** ek property ya characteristic hai jo ek entity ko describe karta hai. Jaise, `Student` entity ke attributes ho sakte hain `roll_no`, `name`, `age`, `branch`.

**Attributes ke Types:**

1. **Simple Attribute** — aage divide nahi ho sakta. Example: `roll_no`.
2. **Composite Attribute** — chhote sub-parts me divide ho sakta hai. Example: `name` ko `first_name` aur `last_name` me split kiya ja sakta hai; `address` ko `street`, `city`, `pincode` me.
3. **Single-valued Attribute** — ek entity ke liye sirf ek value hold karta hai. Example: `date_of_birth`.
4. **Multi-valued Attribute** — ek single entity ke liye ek se zyada values hold kar sakta hai. Example: ek person ke multiple `phone_numbers` ho sakte hain. Ye ER diagrams me double oval se dikhaya jaata hai.
5. **Derived Attribute** — iski value doosre attribute se calculate/derive ki ja sakti hai, aur directly store nahi hoti. Example: `age` ko `date_of_birth` se derive kiya ja sakta hai. Dashed oval se dikhaya jaata hai.
6. **Key Attribute** — ek attribute (ya attributes ka set) jo entity set me har entity ko uniquely identify karta hai. Example: `roll_no` har student ko uniquely identify karta hai. Attribute name ko underline karke dikhaya jaata hai.

---

## 3. Relationships aur Relationship Sets

Ek **relationship** do ya zyada entities ke beech ka association ya connection hai. Jaise, ek `Student` **enrolls in** ek `Course` — yahan "enrolls in" wo relationship hai jo `Student` entity aur `Course` entity ko connect karti hai.

Ek **relationship set** similar relationships ka collection hai. Jaise entity set similar entities ka collection hota hai, waise hi relationship set similar relationships ka collection hai entity sets ke beech.

### 3.1 Relationship ki Degree

Ye relationship me participate kar rahe entity sets ki number ko refer karta hai.

- **Unary (Degree 1)** — sirf ek entity set involve karne wala relationship. Example: ek `Employee` doosre `Employee` ko **supervise** karta hai (dono same entity set `Employee` se hain).
- **Binary (Degree 2)** — do entity sets involve karne wala relationship. Example: `Student` **enrolls in** `Course`. Ye real designs me sabse common type hai.
- **Ternary (Degree 3)** — teen entity sets involve karne wala relationship. Example: ek `Supplier` ek `Part` supply karta hai ek `Project` ko.

---

## 4. Mapping Cardinality / Mapping Constraints

**Mapping cardinality** (cardinality ratio bhi kehte hain) express karta hai ki relationship ke through ek entity **kitni entities** se associate ho sakti hai kisi doosre entity ke saath. Ye ER modelling ka ek sabse important concept hai, kyunki ye decide karta hai baad me tables kaise keys use karke connect honge.

Entity set A aur entity set B ke beech ek binary relationship ke liye, four types hain:

### 4.1 One-to-One (1:1)

A me ek entity B me **zyada se zyada ek** entity ke saath associate hoti hai, aur B me ek entity A me **zyada se zyada ek** entity ke saath.

**Example:** Ek `Employee` ko **exactly ek** parking `Space` assign hoti hai, aur ek parking `Space` **exactly ek** `Employee` ko assign hoti hai.

```
Employee  ──1───────1──  Space
```

### 4.2 One-to-Many (1:N)

A me ek entity B me **kai** entities ke saath associate ho sakti hai, lekin B me ek entity A me **zyada se zyada ek** entity ke saath associate hoti hai.

**Example:** Ek `Department` me **kai** `Employees` hote hain, lekin har `Employee` sirf **ek** `Department` ka hota hai.

```
Department  ──1───────N──  Employee
```

### 4.3 Many-to-One (N:1)

Ye simply one-to-many ki reverse direction hai. A me kai entities B me ek entity se relate hoti hain.

**Example:** Kai `Students` ek `College` me padhte hain.

### 4.4 Many-to-Many (M:N)

A me ek entity B me **kai** entities ke saath associate ho sakti hai, aur B me ek entity A me **kai** entities ke saath associate ho sakti hai.

**Example:** Ek `Student` **kai** `Courses` me enroll kar sakta hai, aur ek `Course` me **kai** `Students` enrolled ho sakte hain.

```
Student  ──M───────N──  Course
```

---

## 5. Participation Constraints

Ye describe karta hai ki entity set ki **har** entity relationship me participate karna zaroori hai ya nahi.

1. **Total Participation** — entity set ki har entity **compulsory** kam se kam ek relationship instance me involve honi chahiye. ER diagram me **double line** se entity ko relationship se connect karke dikhaya jaata hai. Example: har `Employee` kisi na kisi `Department` ka hona hi chahiye (Employee ki total participation).

2. **Partial Participation** — entity set me sirf **kuch** entities relationship me involve hona zaroori hai; baaki ke liye optional hai. **Single line** se dikhaya jaata hai. Example: har `Employee` ek `Manager` nahi hota, isliye "manages" relationship me Employee ki participation partial hai.

---

## 6. ER Model / Relational Model me Keys

Keys ka use table (entity set) me kisi row (entity/tuple) ko uniquely identify karne, aur tables ke beech relationships banane ke liye hota hai.

1. **Super Key** — ek ya zyada attributes ka koi set jo saath milkar table me ek tuple ko uniquely identify kar sakte hain. Ek table ke kai super keys ho sakte hain (kuch me unnecessary extra columns bhi ho sakte hain).

2. **Candidate Key** — ek super key jisme **koi unnecessary extra attributes na ho** — matlab ye sabse chhota possible super key hai ("minimal super key" bhi kehte hain). Ek table ke multiple candidate keys ho sakte hain.

3. **Primary Key** — wo candidate key jise database designer table me har row ko uniquely identify karne ke main tareeke ke roop me **choose** karta hai. Har table ke liye sirf ek primary key choose hoti hai, chahe multiple candidate keys exist karte hon.

4. **Alternate Key** — koi bhi candidate key jise primary key ke roop me **nahi choose kiya gaya**. Ye baaki bache candidate keys alternate keys ban jaati hain.

5. **Foreign Key** — ek attribute (ya attributes ka set) ek table me jo doosri (ya same) table ki **primary key** ko refer karta hai. Yahi actually relational model me do tables ke beech relationship/link create karta hai.

6. **Composite Key** — ek primary key jo **do ya zyada** attributes se milkar bana ho (tab use hoti hai jab koi single attribute row ko uniquely identify karne ke liye kaafi na ho). Example: `Enrollment` table me, `(roll_no, course_id)` saath milkar composite primary key ban sakte hain.

### 6.1 Practical: MySQL me Keys

```sql
CREATE DATABASE CollegeERD;
USE CollegeERD;

CREATE TABLE Department (
    dept_id INT PRIMARY KEY,          -- Primary Key
    dept_name VARCHAR(50) UNIQUE,     -- Candidate key / Alternate key (unique hai lekin primary nahi choose hui)
    hod_name VARCHAR(50)
);

CREATE TABLE Student (
    roll_no INT PRIMARY KEY,          -- Primary Key
    aadhar_no VARCHAR(12) UNIQUE,     -- Alternate Key (ye bhi primary ho sakti thi)
    name VARCHAR(50),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id)   -- Foreign Key: relationship banata hai
);

-- Composite Key example: Enrollment Student aur Course ko link karta hai (M:N relationship)
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

Yahan, `Enrollment` table khud `Student` aur `Course` ke beech ek **Many-to-Many relationship** ka practical implementation hai — yahi exactly hai kaise M:N relationships ER diagram se actual tables me convert hote hain (Section 8 me aage explain kiya hai).

---

## 7. ER Diagram Notation

Ek ER Diagram standard symbols use karta hai:

| Symbol | Represent Karta Hai |
|---|---|
| Rectangle | Entity Set |
| Ellipse / Oval | Attribute |
| Double Ellipse | Multi-valued Attribute |
| Dashed Ellipse | Derived Attribute |
| Diamond | Relationship Set |
| Double Rectangle | Weak Entity Set |
| Double Diamond | Identifying Relationship (weak entity ke liye) |
| Lines | Entities ko unke attributes se, aur entities ko relationships se connect karti hain |
| Double Lines | Total Participation |

**Ek simple text-based ER diagram ka example:**

```
   ┌────────────┐          enrolls in           ┌────────────┐
   │  STUDENT   │◇──────────────────────────────◇│   COURSE   │
   └────────────┘         M          N            └────────────┘
     roll_no(key)  name  age             course_id(key)  course_name
```

### 7.1 Weak Entity Set

Ek **weak entity** wo entity hai jise **khud ke** attributes se uniquely identify **nahi** kiya ja sakta — ye identification ke liye doosri entity (jise "owner" ya "identifying" entity kehte hain) pe depend karta hai. Ek weak entity ek **partial key** (discriminator bhi kehte hain) use karta hai jo apne owner entity ki primary key ke saath combine hoke fully identifiable ban jaata hai.

**Example:** Ek `Dependent` (jaise employee ka bachcha, insurance purpose ke liye) akela identify nahi ho sakta — same dependent name alag-alag employees me repeat ho sakta hai. Isliye `Dependent` ek weak entity hai, aur ye strong entity `Employee` pe depend karta hai. Iski actual identification `(employee_id, dependent_name)` saath me hai.

```
┌──────────┐        has          ┌═══════════┐
│ EMPLOYEE │◇──────────────────◇║ DEPENDENT ║   (weak entity - double rectangle)
└──────────┘        1        N   └═══════════┘
  emp_id(key)                      dependent_name (partial key, dashed underline)
```

---

## 8. ER Diagrams ko Tables me Reduce Karna

Ek baar ER diagram design ho jaaye, ise actual relational tables me convert karna zaroori hota hai. Iske liye fixed rules hain:

**Rule 1 — Strong Entity Set:**
Directly ek table ban jaati hai. Iske saare simple/single-valued attributes columns ban jaate hain, aur key attribute primary key ban jaata hai.

**Rule 2 — Weak Entity Set:**
Ek table banti hai jiski primary key uske khud ke partial key aur owner (strong) entity ki primary key ka **combination** hoti hai, jo foreign key ke roop me bhi add hoti hai.

**Rule 3 — Composite Attribute:**
Sirf iske simple sub-parts alag columns ke roop me liye jaate hain (composite attribute khud directly ek column nahi banta).

**Rule 4 — Multi-valued Attribute:**
Iski khud ki ek **separate table** ban jaati hai, jisme original entity ki primary key (foreign key ke roop me) aur wo multi-valued attribute hota hai.

**Rule 5 — One-to-One Relationship:**
Do entities me se kisi ek ki primary key doosri entity ki table me foreign key ke roop me add hoti hai (usually total participation wali side pe add ki jaati hai, empty/NULL values avoid karne ke liye).

**Rule 6 — One-to-Many Relationship:**
"One" side wali entity ki primary key "many" side wali entity ki table me foreign key ke roop me add hoti hai.

**Rule 7 — Many-to-Many Relationship:**
Relationship ke liye khud ek **bilkul nayi table** create karni padti hai. Ye nayi table dono participating entities ki primary keys contain karti hai (foreign keys ke roop me), aur ye saath milkar iski composite primary key banti hain. Relationship ki koi descriptive attribute (jaise `enroll_date`) bhi is nayi table me jaati hai.

**Rule 8 — Multiple Entities in a Relationship (Ternary waghera):**
Ek nayi table create hoti hai jisme saari participating entities ki primary keys foreign keys ke roop me hoti hain.

### 8.1 Practical: MySQL me Full Reduction Example

Chalo ek ER design lete hain: `Employee (1) ── works in ── (N) Department`, jahan `Employee` me ek multi-valued attribute `skills` bhi hai.

```sql
USE CollegeERD;

-- Rule 1: Strong entity Department ek table ban jaati hai
CREATE TABLE Dept (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50)
);

-- Rule 1 + Rule 6: Strong entity Employee ek table ban jaati hai,
-- aur kyunki ye ek 1:N relationship ki "Many" side pe hai,
-- ise Department ki foreign key milti hai
CREATE TABLE Emp (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(50),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES Dept(dept_id)
);

-- Rule 4: Multi-valued attribute "skills" apni khud ki separate table ban jaati hai
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

Ye exactly dikhata hai ki "skills" jaisa multi-valued attribute (jo ek single column me fit nahi ho sakta) kaise correctly apni khud ki separate table me convert hota hai, Rule 4 ko follow karte hue.

---

## 9. Generalization aur Specialization

### 9.1 Specialization

**Specialization** ek **top-down** approach hai jahan hum ek higher-level (general) entity set ko lekar use do ya zyada **lower-level (specialized) entity sets** me divide karte hain, kisi distinguishing characteristic ke aadhar pe.

**Example:** General entity `Employee` ko `Manager`, `Engineer`, aur `Clerk` me specialize kiya ja sakta hai — kyunki in sub-types ke apne khud ke extra specific attributes ho sakte hain (jaise Manager ka ek `team_size` attribute hai jo Clerk ka nahi hota).

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

**Generalization** exactly iska **opposite** hai — ek **bottom-up** approach, jahan hum do ya zyada lower-level entity sets ko combine karte hain jo **common attributes share karte hain**, ek single higher-level, zyada generalized entity set me.

**Example:** Agar humare paas already alag `Car` aur `Truck` entities hain, aur hum notice karte hain ki dono common attributes share karte hain jaise `registration_no` aur `manufacturer`, hum inhe generalize karke ek common higher entity `Vehicle` bana sakte hain.

### 9.3 Generalization/Specialization pe Constraints

1. **Disjoint vs Overlapping**
   - **Disjoint**: ek entity **sirf ek** lower-level entity set ki hi ho sakti hai. Example: ek `Employee` ya to `Manager` hai YA `Engineer`, dono ek saath nahi.
   - **Overlapping**: ek entity ek saath **ek se zyada** lower-level entity sets ki ho sakti hai. Example: ek `Person` ek saath `Student` aur `Employee` dono ho sakta hai (ek working student).

2. **Total vs Partial**
   - **Total**: higher-level entity set ki har entity kam se kam ek lower-level entity set ki honi **chahiye**.
   - **Partial**: higher-level entity set me kuch entities kisi bhi lower-level entity set ki **nahi** ho sakti.

### 9.4 Aggregation

**Aggregation** tab use hoti hai jab humein **ek relationship aur ek entity ke beech relationship** express karni ho. Normally, relationships sirf entities ko entities se connect karte hain — lekin kabhi-kabhi humein ek relationship ko khud doosri relationship me participate karwana padta hai, aur ER model ise directly allow nahi karta. Aggregation isse solve karta hai ek existing relationship (uski participating entities ke saath) ko ek single, higher-level abstract entity ki tarah treat karke, jo phir ek new relationship me participate kar sake.

**Example:** Relationship `Employee works-on Project` lo. Ab socho hum ye bhi record karna chahte hain ki kaunsa `Manager` is particular employee-project combination ko **monitor** karta hai. Yahan, poori `(Employee works-on Project)` relationship ko aggregate karke ek unit ki tarah treat kiya jaata hai, jo phir ek naye "monitors" relationship ke through `Manager` se relate hoti hai.

```
   ┌──────────┐     works-on     ┌──────────┐
   │ EMPLOYEE │◇────────────────◇│ PROJECT  │
   └──────────┘                  └──────────┘
          └───────────┬───────────┘
              (ek aggregated unit ki tarah treat kiya gaya)
                       │
                    monitors
                       │
                  ┌─────────┐
                  │ MANAGER │
                  └─────────┘
```

### 9.5 Practical: MySQL me Generalization (Table-Per-Subtype Approach)

```sql
USE CollegeERD;

-- Generalized/parent entity - common attributes
CREATE TABLE Person (
    person_id INT PRIMARY KEY,
    name VARCHAR(50),
    address VARCHAR(100)
);

-- Specialized entity 1 - apna khud ka extra attribute
CREATE TABLE StudentInfo (
    person_id INT PRIMARY KEY,
    branch VARCHAR(30),
    FOREIGN KEY (person_id) REFERENCES Person(person_id)
);

-- Specialized entity 2 - apna khud ka extra attribute
CREATE TABLE EmployeeInfo (
    person_id INT PRIMARY KEY,
    salary DECIMAL(10,2),
    FOREIGN KEY (person_id) REFERENCES Person(person_id)
);

INSERT INTO Person VALUES (1, 'Kabir', 'Udaipur');

-- Ye same person EK SAATH student bhi ho sakta hai aur employee bhi (overlapping specialization)
INSERT INTO StudentInfo VALUES (1, 'CSE');
INSERT INTO EmployeeInfo VALUES (1, 45000.00);
```

Yahan, Kabir (`person_id = 1`) ek saath `StudentInfo` aur `EmployeeInfo` dono me appear karta hai — ye ek real, practical implementation hai **overlapping generalization/specialization** ki.

---

## 10. ER Database Scheme Design Karna (Step-by-Step Process)

Jab ER model use karke real database design karna ho, ek designer generally in steps ko follow karta hai:

1. **Requirement Analysis** — users/clients se baat karo aur samjho exactly kya data store karna hai aur kaunse queries answer karni hain.

2. **Entities Identify Karo** — saari "cheezein" list karo jinko track karna hai (jaise, Student, Course, Teacher, Department).

3. **Har Entity ke liye Attributes Identify Karo** — decide karo har entity ki kya properties honi chahiye, aur mark karo kaunsa attribute(s) key ka kaam karega.

4. **Relationships Identify Karo** — determine karo entities aapas me kaise connected hain (jaise, Student enrolls in Course).

5. **Cardinality aur Participation Constraints Determine Karo** — decide karo har relationship 1:1, 1:N, ya M:N hai, aur participation total hai ya partial.

6. **Generalization/Specialization Identify Karo, agar koi ho** — check karo koi entities ek general super-type me group ho sakte hain, ya zyada specific sub-types me split ho sakte hain.

7. **Poora ER Diagram Draw Karo** — saare entities, attributes, relationships, aur constraints ko visually saath jodo.

8. **Diagram Review Karo** — users/stakeholders ke saath check karo ki ye design unki real-world requirements ko correctly capture karta hai.

9. **ER Diagram ko Relational Schema (Tables) me Convert Karo** — Section 8 ke reduction rules apply karo actual tables generate karne ke liye, jo phir SQL DDL commands use karke create ki ja sakti hain.

Ye step-by-step process ensure karta hai ki SQL ki ek bhi line likhne se pehle, humare paas database structure ka ek clear, well-thought-out, aur verified plan ho — jo baad me bahut sara rework bacha deta hai.

---

# PART B: NORMALIZATION

## 11. Normalization Kya Hai aur Ye Kyu Chahiye?

**Normalization** ek step-by-step process hai database me data ko organize karne ka taaki **data redundancy** (unnecessary repeated data) kam ho aur wo undesirable anomalies remove ho jaayein — problems jo data insert, update, ya delete karte waqt hoti hain.

Normalization large, poorly-structured tables ko chhote, well-structured tables me divide karke kiya jaata hai, aur unke beech relationships foreign keys use karke define kiye jaate hain, **bina koi information lose kiye**.

### 11.1 Anomalies ke Teen Types (Jo Normalization Solve Karta Hai)

Chalo ek unnormalized example table se samajhte hain:

```
+---------+---------+------------+---------------+
| roll_no | name    | course     | course_fee    |
+---------+---------+------------+---------------+
|   1     | Aman    | DBMS       |    5000       |
|   1     | Aman    | Java       |    4000       |
|   2     | Riya    | DBMS       |    5000       |
+---------+---------+------------+---------------+
```

1. **Insertion Anomaly**: Maan lo ek naya course "Python" introduce hota hai, lekin abhi tak koi student enroll nahi hua. Hum upar wali table me ise **insert nahi kar sakte**, kyunki `roll_no` aur `name` empty nahi chhode ja sakte (ye row identify karne ka part hain) — lekin humare paas abhi koi student hi nahi hai jisse associate karein.

2. **Update Anomaly**: Agar "DBMS" ki fee 5000 se 5500 change ho jaaye, humein ise **har single row** me update karna padega jahan "DBMS" appear ho raha hai. Agar hum galti se ek bhi row update karna bhool jaayein, data inconsistent ho jaata hai (kuch rows 5000 dikhati hain, kuch 5500, same course ke liye).

3. **Deletion Anomaly**: Agar student Riya (roll_no 2) drop out ho jaaye aur hum uski row delete kar dein, hum **accidentally** ye information lose kar sakte hain ki "DBMS" naam ke course ki fee 5000 hai, agar wo last row thi jisme ye fee data tha.

Normalization data ko properly chhoti related tables me split karke in teeno problems ko solve karta hai.

### 11.2 Functional Dependency (Normalization ke liye zaroori important concept)

Ek **functional dependency** do attributes, maan lo X aur Y, ke beech exist karti hai (X → Y likha jaata hai, "X, Y ko determine karta hai" padha jaata hai), agar X ki value Y ki value ko uniquely determine karti hai. Matlab X ki har value ke liye, Y ki exactly ek corresponding value hoti hai.

**Example:** `roll_no → name` — kyunki har roll number ke liye, exactly ek specific name hoti hai. Functional dependencies wo foundation hain jinke aadhar pe normalization ke dauran tables split karne ka decide kiya jaata hai.

---

## 12. First Normal Form (1NF)

**Rule:** Ek table 1NF me hai agar:
- Har column me sirf **atomic (indivisible) values** ho — ek cell me multiple values nahi.
- Har row unique ho (primary key exist karni chahiye).
- Columns ka koi repeating group na ho.

**Problem table (1NF me NAHI hai)** — `course` column me ek cell me multiple values hain:
```
+---------+---------+----------------+
| roll_no | name    | course         |
+---------+---------+----------------+
|   1     | Aman    | DBMS, Java     |   <- multiple values, atomic nahi hain
+---------+---------+----------------+
```

**1NF me convert kiya gaya** — har course ki apni row:
```
+---------+---------+----------------+
| roll_no | name    | course         |
+---------+---------+----------------+
|   1     | Aman    | DBMS           |
|   1     | Aman    | Java           |
+---------+---------+----------------+
```

### 12.1 Practical: MySQL me 1NF Achieve Karna

```sql
CREATE DATABASE NormalizeDemo;
USE NormalizeDemo;

-- GALAT tareeka (1NF violate karta hai) - ek column me multiple values store karna
CREATE TABLE Bad_Student (
    roll_no INT,
    name VARCHAR(50),
    courses VARCHAR(100)   -- jaise 'DBMS, Java'  -- atomic nahi hai, ise avoid karo
);

-- SAHI 1NF design - har row me ek course value
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

**Rule:** Ek table 2NF me hai agar:
- Ye already **1NF** me hai, AUR
- Isme **koi partial dependency nahi** hai — matlab har non-key column poori **entire** primary key pe depend kare, sirf uske ek part pe nahi.

Partial dependency tabhi ho sakti hai jab primary key ek **composite key** ho (do ya zyada columns se bani ho). Agar primary key ek single column hai, table 1NF me hone ke baad automatically partial dependency se free ho jaati hai.

**Problem table (1NF me hai, lekin 2NF me NAHI):**
Yahan primary key `(roll_no, course)` hai. Lekin `name` sirf `roll_no` pe depend karta hai (`course` pe nahi), aur `course_fee` sirf `course` pe depend karta hai (`roll_no` pe nahi). Ye ek **partial dependency** hai.

```
+---------+----------+---------+------------+
| roll_no | course   | name    | course_fee |
+---------+----------+---------+------------+
|   1     | DBMS     | Aman    |   5000     |
|   1     | Java     | Aman    |   4000     |
|   2     | DBMS     | Riya    |   5000     |
+---------+----------+---------+------------+
```

**2NF me convert kiya gaya** — alag tables me split kiya taaki har non-key column apni table ki POORI key pe depend kare:

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

### 13.1 Practical: MySQL me 2NF Achieve Karna

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

Ab, `course_fee` sirf **ek baar** har course ke liye store hoti hai (`Course_2NF` me), isliye fee update karne me sirf ek row change karni padti hai — update anomaly solve ho gayi.

---

## 14. Third Normal Form (3NF)

**Rule:** Ek table 3NF me hai agar:
- Ye already **2NF** me hai, AUR
- Isme **koi transitive dependency nahi** hai — matlab ek non-key column ko doosre non-key column pe depend nahi karna chahiye; har non-key column ko sirf primary key pe **directly** depend karna chahiye.

**Problem table (2NF me hai, lekin 3NF me NAHI):**
Yahan `roll_no` primary key hai. Lekin `hod_name` (Head of Department) `branch` pe depend karta hai, aur `branch` `roll_no` pe depend karta hai. To `hod_name` `roll_no` pe sirf **indirectly** depend karta hai, `branch` ke through. Ye ek **transitive dependency** hai: `roll_no → branch → hod_name`.

```
+---------+---------+----------+------------+
| roll_no | name    | branch   | hod_name   |
+---------+---------+----------+------------+
|   1     | Aman    | CSE      | Dr. Mehta  |
|   2     | Riya    | CSE      | Dr. Mehta  |
+---------+---------+----------+------------+
```

**3NF me convert kiya gaya** — transitive dependency remove karne ke liye do tables me split karo:

```
Student table:                        Branch table:
+---------+---------+----------+      +----------+------------+
| roll_no | name    | branch   |      | branch   | hod_name   |
+---------+---------+----------+      +----------+------------+
|   1     | Aman    | CSE      |      | CSE      | Dr. Mehta  |
|   2     | Riya    | CSE      |      +----------+------------+
+---------+---------+----------+
```

### 14.1 Practical: MySQL me 3NF Achieve Karna

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

Ab agar CSE ka HOD change ho jaaye, humein sirf `Branch_3NF` me **ek row** update karni padegi, har student ki row me update karne ke bajaye — ye transitive dependency ki wajah se hone wali update anomaly ko poori tarah remove kar deta hai.

---

## 15. Boyce-Codd Normal Form (BCNF)

**Rule:** Ek table BCNF me hai agar:
- Ye already **3NF** me hai, AUR
- **Har** functional dependency X → Y ke liye, X ek **super key** hona chahiye (3NF se ek stricter condition).

BCNF, 3NF ka ek stricter version hai. Kabhi-kabhi ek table technically 3NF satisfy kar sakti hai lekin fir bhi usme ek chhoti anomaly ho sakti hai, jise BCNF catch karke fix karta hai. Ye mainly tab hota hai jab table me **multiple overlapping candidate keys** hon.

**Problem table (3NF me hai, lekin BCNF me NAHI):**
Maan lo ek teacher sirf ek subject padhata hai, lekin ek subject kai teachers padha sakte hain, aur ek student ek subject sirf ek specific teacher se seekhta hai.

```
+---------+-----------+-----------+
| student | subject   | teacher   |
+---------+-----------+-----------+
| Aman    | DBMS      | Sharma    |
| Riya    | DBMS      | Sharma    |
| Aman    | Java      | Verma     |
+---------+-----------+-----------+
```

Yahan, functional dependency: `teacher → subject` (kyunki har teacher sirf ek subject padhata hai). Lekin `teacher` is table ki **super key nahi hai** (actual key `student, subject` hai). Ye BCNF violate karta hai.

**BCNF me convert kiya gaya** — split karo taaki har determinant khud key ban jaaye:

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

### 15.1 Practical: MySQL me BCNF Achieve Karna

```sql
USE NormalizeDemo;

CREATE TABLE Teacher_Subject (
    teacher VARCHAR(30) PRIMARY KEY,   -- teacher subject determine karta hai, isliye teacher yahan key hai
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

Ab har functional dependency ka left-hand side (pehli table me `teacher`, doosri me `(student, teacher)`) actually apni table ki super key hai — jo BCNF ko satisfy karta hai.

---

## 16. Fourth Normal Form (4NF)

**Rule:** Ek table 4NF me hai agar:
- Ye already **BCNF** me hai, AUR
- Isme **koi multi-valued dependency nahi** hai.

Ek **multi-valued dependency** tab hoti hai jab ek attribute table me kisi doosre attribute ki values ka ek set uniquely determine karta hai, teesre attribute se **poori tarah independent**. Isse unrelated data ke unnecessary repeated combinations ban jaate hain.

**Problem table (4NF me NAHI):**
Maan lo ek student ke multiple hobbies ho sakte hain AUR multiple languages bol sakta hai, aur ye do facts aapas me bilkul unrelated hain.

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

Dekho `hobby` aur `language` ka aapas me koi lena-dena nahi hai, lekin kyunki dono same table me store hain, humein **har possible combination** banani padi (2 hobbies × 2 languages = 4 rows) — pure unnecessary redundancy.

**4NF me convert kiya gaya** — do independent tables me split karo:

```
Student_Hobby:                    Student_Language:
+---------+-----------+           +---------+------------+
| student | hobby     |           | student | language   |
+---------+-----------+           +---------+------------+
| Aman    | Cricket   |           | Aman    | Hindi      |
| Aman    | Reading   |           | Aman    | English    |
+---------+-----------+           +---------+------------+
```

### 16.1 Practical: MySQL me 4NF Achieve Karna

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

Ye humara data 4 redundant rows se sirf 4 clean, independent rows (2+2) tak kam kar deta hai, aur jaise-jaise zyada hobbies/languages add hoti jaayengi, ye saving aur bhi badi ho jaayegi — unrelated multi-valued facts ke "multiplication effect" se bachate hue.

---

## 17. Fifth Normal Form (5NF) / Project-Join Normal Form (PJNF)

**Rule:** Ek table 5NF me hai agar:
- Ye already **4NF** me hai, AUR
- Isme **koi join dependency nahi** hai — matlab table ko chhoti tables me split karke, join ke through bina kisi information ke loss ya gain ke, wapas perfectly reconstruct nahi kiya ja sakta, jab tak wo split actually zaroori na ho.

5NF unn cases se deal karta hai jahan ek table **teen ya zyada** entities ke beech relationship represent karti hai, aur ise sirf do tables me split karna (jaise humne BCNF/4NF ke liye kiya) galat extra combinations create kar deta hai jab wo wapas join ki jaati hain. Aise cases me, table ko **teen** (ya zyada) chhoti tables me split karna zaroori hota hai isse bachne ke liye.

**Example scenario:** Ek table record karti hai kaunsa `Agent` kaunsi `Company` ke products bechta hai, kis `Product` ke liye. Maan lo:
- Agent A Company X ke products bechta hai.
- Agent A Product P bechta hai.
- Company X Product P banati hai.

Agar hum simply saare combinations ek table me store karein aur baad me sirf do chhoti tables (jaise Agent-Company aur Agent-Product) se relationships reconstruct karne ki koshish karein, hum galti se aise relationships ka conclusion nikal sakte hain jo actually exist hi nahi karte. 5NF ye require karta hai ki ise correctly teen alag tables me split kiya jaaye (Agent-Company, Agent-Product, Company-Product) taaki sabko wapas join karne pe exactly wahi original correct data mile — na kam, na zyada.

### 17.1 Practical: MySQL me 5NF Achieve Karna

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

-- Original valid combination ko reconstruct karne ke liye TEENO tables ko join karna padta hai
SELECT ac.agent, ac.company, ap.product
FROM Agent_Company ac
JOIN Agent_Product ap ON ac.agent = ap.agent
JOIN Company_Product cp ON ac.company = cp.company AND ap.product = cp.product;
```

Ye three-way join correctly sirf **valid, true** combinations ko reconstruct karta hai jo actually exist karte hain, jo 5NF achieve karne ka pura purpose hai — kisi bhi false combination se bachte hue jo ek simpler two-table split shayad incorrectly introduce kar deta.

---

## Unit II ka Summary

- **ER Model** database ko conceptually represent karta hai use karke **entities**, **attributes**, aur **relationships** ka.
- **Mapping cardinalities** (1:1, 1:N, M:N) aur **participation constraints** (total/partial) define karte hain entities kaise connect hote hain.
- **Keys** (super, candidate, primary, alternate, foreign, composite) table rows ko uniquely identify aur link karti hain.
- ER diagrams ko actual **tables** me convert kiya jaata hai ek fixed set of **reduction rules** use karke.
- **Generalization** (bottom-up) aur **Specialization** (top-down) entities ko super-type/sub-type hierarchies me organize karte hain; **Aggregation** ek relationship ko entity ki tarah act karne deta hai.
- **Normalization** step by step redundancy aur anomalies remove karta hai:
  - **1NF**: sirf atomic values.
  - **2NF**: no partial dependency (composite keys se aane wale issues fix karta hai).
  - **3NF**: no transitive dependency.
  - **BCNF**: har determinant super key hona chahiye.
  - **4NF**: no multi-valued dependency.
  - **5NF**: no join dependency; teen-ya-zyada-way relationships ko correctly split karna.
