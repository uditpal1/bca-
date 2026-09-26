# UNIT – III: Oracle RDBMS Architecture

> **Shuru karne se pehle ek note:** Ye unit khaas taur pe **Oracle ke internal architecture** ke baare me hai — ye theory hai ki Oracle database software internally kaise bana hota hai, SQL queries likhne ke baare me nahi. Kyunki Oracle ke exact internal process names (jaise SGA, DBWR, LGWR) Oracle software ke liye specific hain, hum inhe "MySQL commands" ki tarah run nahi kar sakte. Isliye, is unit ke practical part ke liye, jahan bhi possible hoga hum **MySQL me equivalent/similar concept** dikhayenge (kyunki MySQL, khaas taur pe apne InnoDB engine ke saath, bahut similar architectural ideas follow karta hai), taaki tum inhe actually hands-on dekh aur relate kar sako.

---

## 1. Oracle RDBMS Architecture ka Overview

Oracle Database duniya ke sabse widely used enterprise-level relational database systems me se ek hai. Multiple users, huge amounts of data handle karne, aur sab kuch fast, safe, aur recoverable rakhne ke liye, Oracle ek well-organized internal architecture use karta hai jo do main parts se bana hai:

1. **Instance** — ye Oracle ka "live," running part hai computer ki memory me. Ye memory structures (SGA) aur background processes se bana hota hai jo database ko manage karte hain.
2. **Database** — ye actual physical data hai jo permanently disk pe store hota hai (data files, control files, redo log files).

Simple words me: **Instance ek "engine" ki tarah hai jo memory me chal raha hai, aur Database ek "physical fuel tank aur body" ki tarah hai jo disk pe baitha hai.** Jab Oracle start hota hai, ye memory me ek instance create karta hai, aur ye instance phir physical database files ko mount aur open karta hai use karne layak banane ke liye.

```
        ┌─────────────────────────────────────────────┐
        │                 ORACLE INSTANCE               │
        │  ┌───────────────────────────────────────┐   │
        │  │     System Global Area (SGA)            │   │
        │  │  (Shared memory jo saare processes use  │   │
        │  │   karte hain)                            │   │
        │  └───────────────────────────────────────┘   │
        │                                               │
        │   Background Processes:                      │
        │   DBWR   LGWR   SMON   PMON   CKPT   ARCH     │
        └─────────────────────────────────────────────┘
                          │
                          │  read / write karta hai
                          ▼
        ┌─────────────────────────────────────────────┐
        │                ORACLE DATABASE                 │
        │   Data Files   Control Files   Redo Log Files  │
        └─────────────────────────────────────────────┘
```

---

## 2. Oracle Kernel

**Kernel** Oracle software ka core part hai — ye central engine hai jo actually database ke saare fundamental operations perform karta hai, jaise:
- SQL statements ko parse aur execute karna.
- Memory allocation manage karna (jaise SGA).
- Saare background processes ko coordinate karna.
- Ye manage karna ki data physically disk se kaise read aur write hota hai.
- Locking, concurrency control, aur transaction management enforce karna.

Kernel ko "database ka operating system" ki tarah socho — jaise ek computer ka OS kernel hardware resources manage karta hai aur applications ko run hone deta hai, waise hi Oracle kernel database resources (memory, files, processes) manage karta hai aur SQL statements ko correctly run hone deta hai. Is unit me aage explain kiye gaye saare background processes aur memory structures essentially isi central kernel dwara control aur coordinate kiye jaate hain.

---

## 3. System Global Area (SGA)

**System Global Area (SGA)** memory ka ek bada, shared area hai jo Oracle instance start hone par allocate hota hai. Ye ek particular Oracle instance ke liye data aur control information store karne ke liye use hota hai, aur ye us instance se connected **saare users aur background processes dwara shared** hota hai. Isiliye ise "Global" bola jaata hai — us instance se belong karne wala har process is common memory area ko access kar sakta hai.

SGA Oracle ki sabse important memory structure hai kyunki ye performance dramatically improve karta hai — har baar slow physical disk se data padhne ke bajaye, Oracle frequently use hone wale data ko is fast memory area me rakhta hai.

### 3.1 SGA ke Main Components

1. **Database Buffer Cache**
   Ye data files se recently read kiye gaye **data blocks** store karta hai. Jab ek user query run karta hai, Oracle sabse pehle check karta hai ki required data pehle se buffer cache me hai ya nahi. Agar haan ("cache hit"), ye slow disk ke bajaye directly fast memory se read karta hai — speed massively improve karta hai. Agar ek user data modify karta hai, change pehle yahan memory me hota hai, aur baad me actual disk file me write hota hai (ye "baad me write" karne wala process DBWR background process handle karta hai, Section 4 me explain kiya hai).

2. **Redo Log Buffer**
   Ye ek small circular memory buffer hai jo temporarily database me hue **har change** ki information store karta hai ("redo entries" ya "redo records" kehte hain) usse permanently physical **redo log files** disk pe write karne se pehle. Ye recovery ke liye critical hai — agar system crash ho jaaye, Oracle is redo information ka use karke lost changes ko redo/reapply kar sakta hai.

3. **Shared Pool**
   Ye wo cheezein store karta hai jo alag-alag users aur sessions ke beech reuse ho sakti hain, mainly:
   - **Library Cache**: recently executed SQL statements aur PL/SQL programs ke parsed/compiled versions store karta hai, taaki agar wahi query dobara run ho, Oracle ko use scratch se re-parse na karna pade — time bachta hai.
   - **Data Dictionary Cache**: database objects ke baare me information store karta hai — table structures, column definitions, user privileges, waghera — taaki Oracle ko baar-baar ye metadata disk se fetch na karna pade.

4. **Large Pool (optional)**
   Bade memory allocations ke liye use hota hai, jaise backup aur restore operations, ya certain types ke server processes, taaki ye heavy operations regular Shared Pool ke saath interfere na karein.

5. **Java Pool (optional)**
   Java code execution aur Java Virtual Machine (JVM) related operations support karne ke liye use hota hai agar Oracle me Java-based features use ho rahi hon.

### 3.2 SGA Kyu Important Hai

SGA ke bina, har single read ya write operation ko directly physical disk pe jaana padega, jo memory access se hazaron guna slower hota hai. SGA hi wo cheez hai jo Oracle jaise enterprise-level database ko itna fast banata hai ki wo hazaron simultaneous users handle kar sake.

### 3.3 Practical (MySQL Equivalent Analogy): MySQL me Buffer Pool

MySQL ka InnoDB storage engine ek bahut similar memory concept rakhta hai, jise **InnoDB Buffer Pool** kehte hain, jo Oracle ke Database Buffer Cache ki tarah hi kaam karta hai — recently used data aur index pages ko memory me store karta hai slow disk access se bachne ke liye.

```sql
-- MySQL ke InnoDB Buffer Pool ki configured size check karo (SGA ke buffer cache jaisa idea)
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';
```

Sample Output:
```
+-------------------------+-----------+
| Variable_name           | Value     |
+-------------------------+-----------+
| innodb_buffer_pool_size | 134217728 |
+-------------------------+-----------+
```

```sql
-- Check karo buffer pool kitne effectively use ho raha hai (cache hit information)
SHOW STATUS LIKE 'Innodb_buffer_pool_read%';
```

Sample Output:
```
+---------------------------------------+---------+
| Variable_name                         | Value   |
+---------------------------------------+---------+
| Innodb_buffer_pool_read_requests      |  15420  |
| Innodb_buffer_pool_reads              |    38   |
+---------------------------------------+---------+
```

Yahan, `Innodb_buffer_pool_read_requests` (total data requests) `Innodb_buffer_pool_reads` (actual slow disk reads jo zaroori the) se bahut zyada hai — ye prove karta hai ki zyadatar data already fast memory me available tha, exactly wahi performance benefit jo Oracle ka SGA buffer cache deta hai.

---

## 4. Background Processes

Oracle kai **background processes** use karta hai jo continuously background me chalte rehte hain (normal user se invisible) database ko smoothly chalane, memory-to-disk writing handle karne, aur recovery manage karne ke liye.

### 4.1 Database Writer (DBWR / DBWn)

**Database Writer** process responsible hai **modified (dirty) data blocks** ko Database Buffer Cache (SGA me) se **actual data files disk pe write karne** ke liye.

- Ye **har single** change ke baad immediately write nahi karta — wo bahut slow hoga. Iske bajaye, ye ek efficient, batched manner me certain trigger points pe write karta hai (jaise jab buffer cache full hone laga ho, ya ek checkpoint ke dauran).
- Ye delayed-writing strategy hi Oracle ko fast banati hai — changes memory me pehle jaldi hote hain, aur baad me physically disk pe save hote hain, background me, bina user ko wait karwaye.

### 4.2 Log Writer (LGWR)

**Log Writer** process responsible hai **redo log buffer ke contents** ko (SGA se) **physical redo log files disk pe write karne** ke liye.

- DBWR ke ulat, LGWR **bahut zyada frequently aur urgently** write karta hai — typically immediately jab bhi ek transaction commit hoti hai. Ye critical hai, kyunki redo log hi guarantee karta hai ki agar system commit ke turant baad crash ho jaaye, committed change lose nahi hoti (ye property transaction ki "durability" ka part hai).

### 4.3 Process Monitor (PMON)

**Process Monitor** ek **failed user process** ke baad cleanup karne ke liye responsible hai. Agar kisi user ka session ya connection abnormally terminate ho jaaye (jaise, network connection drop ho jaaye, ya application crash ho jaaye), PMON automatically step in karta hai:
- Us failed process ki koi incomplete transaction rollback karta hai.
- Us process ke pass jo bhi locks the unhe release karta hai.
- Koi aur resources jo wo process use kar raha tha unhe free karta hai.

Ye ensure karta hai ki ek user ka crash kabhi doosre users ke liye database ko stuck ya locked state me na chhode.

### 4.4 System Monitor (SMON)

**System Monitor** instance recovery perform karta hai jab Oracle ek unexpected shutdown/crash ke baad restart hota hai. Ye redo log entries apply karta hai lost changes ko redo karne ke liye, aur crash ke time incomplete thi wo transactions rollback karta hai. Ye routine cleanup bhi karta hai, jaise temporary storage space reclaim karna jo ab zaroori nahi hai.

### 4.5 Checkpoint Process (CKPT)

**Checkpoint process** DBWR ko signal karta hai saare modified buffers ko disk pe write karne ke liye, aur phir control file(s) aur data file headers ko is checkpoint information ke saath update karta hai — ye ek known "safe point" mark karta hai jahan se recovery start ho sakti hai, crash ke baad zaroori recovery time kam karte hue.

### 4.6 Archiver Process (ARCn)

Agar Oracle ek special mode me chal raha hai jise "ARCHIVELOG mode" kehte hain, **Archiver process** purani, bhari hui redo log files ko ek alag archive location pe copy kar deta hai unke overwrite hone se pehle. Ye database ko bahut purane point in time se bhi recover karna possible banata hai, jo bahut critical enterprise systems ke liye essential hai.

### 4.7 Practical (MySQL Equivalent Analogy): MySQL me Similar Concepts

| Oracle Process | Purpose | Sabse Close MySQL (InnoDB) Equivalent |
|---|---|---|
| DBWR | Dirty memory pages ko data files me write karta hai | InnoDB ka background page flushing (`innodb_io_capacity` se control hota hai) |
| LGWR | Redo buffer ko redo log files me write karta hai | InnoDB ka redo log writing (`ib_logfile`), `innodb_flush_log_at_trx_commit` se control hota hai |
| PMON | Failed processes/locks clean karta hai | InnoDB automatically ek dropped/killed connection ki transaction rollback karta hai |
| SMON | Instance/crash recovery | InnoDB Crash Recovery, MySQL startup pe automatically hota hai apne redo log use karke |
| CKPT | Safe recovery points mark karta hai | InnoDB checkpointing mechanism |

```sql
-- Ye MySQL setting control karti hai ki redo log kitni strictly/frequently disk pe write ho commit pe -
-- conceptually similar hai us guarantee ke jo Oracle me LGWR process deta hai
SHOW VARIABLES LIKE 'innodb_flush_log_at_trx_commit';
```

Sample Output:
```
+---------------------------------+-------+
| Variable_name                   | Value |
+---------------------------------+-------+
| innodb_flush_log_at_trx_commit  |   1   |
+---------------------------------+-------+
```
Yahan `1` value ka matlab hai MySQL redo log ko disk pe flush karta hai har single commit pe — full durability deta hue, exactly wahi strict guarantee jo Oracle ka LGWR process deta hai.

---

## 5. Database Files

Ye wo **physical files** hain jo hard disk pe store hoti hain jo actually Oracle database banati hain.

### 5.1 Data Files

**Data files** database ka saara actual **data** physically store karti hain — har table ki rows, har index, aur har aur database object eventually ek ya zyada data files ke andar hi rehta hai. Ek single Oracle database typically multiple data files rakhta hai, jo **tablespaces** naam ki logical storage units me organize hote hain. Jo bhi data tum SQL use karke insert karte ho, wo eventually physically in data files me se kisi ek me likha jaata hai (DBWR process is writing ko handle karta hai, jaisa upar explain kiya).

### 5.2 Redo Log Files

**Redo log files** database me hue har change ko record karti hain, exact order me jisme wo hua, un changes ko data files me permanent banaye jaane se pehle. Oracle ko **kam se kam do** redo log files chahiye hoti hain, aur ye unme circular, rotating fashion me write karta hai (ek file bharne ke baad, ye next file me likhna shuru karta hai, aur eventually pehli file ko reuse karne ke liye wapas cycle karta hai, agar ARCHIVELOG mode use na preserve kiya ho).

Ye files **recovery** ke liye essential hain: agar transaction commit hone ke baad lekin corresponding data file update physically hone se pehle system crash ho jaaye, Oracle restart ke waqt redo log use karke us lost change ko "redo" aur correctly reapply kar sakta hai.

### 5.3 Practical (MySQL Equivalent Analogy): MySQL me In Files ko Locate Karna

```sql
-- MySQL ki actual physical data files ki location (Oracle ke Data Files jaisi)
SHOW VARIABLES LIKE 'datadir';
```

Sample Output:
```
+---------------+------------------------+
| Variable_name | Value                  |
+---------------+------------------------+
| datadir       | /var/lib/mysql/        |
+---------------+------------------------+
```

```sql
-- InnoDB ki redo log files ke names/sizes (Oracle ke Redo Log Files jaise)
SHOW VARIABLES LIKE 'innodb_log_file_size';
```

Agar tum MySQL data directory ke andar (operating system use karke, SQL nahi) dekho, tumhe actually `ib_logfile0` aur `ib_logfile1` jaisi files milengi — ye physically exactly wahi role play karti hain jo Oracle ki redo log files, har change ko record karte hue usse actual table ki data file me finalize hone se pehle.

---

## 6. Control Files

Ek **control file** ek chhoti lekin extremely critical binary file hai jo poore database ki overall **physical structure** ka track rakhti hai. Ye ye important information record karti hai jaise:
- Database ka naam.
- Saari data files aur redo log files ke names aur locations.
- Current timestamp/state information (jaise latest checkpoint), jo startup pe data file consistency verify karne ke liye use hoti hai.
- Backup-related information.

**Control files itni important kyu hain:** Jab Oracle start hota hai, sabse pehla kaam ye hota hai control file padhna ye jaanne ke liye ki uski baaki files (data files, redo logs) **kahan** located hain, aur ye check karne ke liye ki sab kuch consistent hai. Agar control file lost ya corrupt ho jaaye, Oracle apna khud ka database properly locate ya open bhi nahi kar sakta — isiliye Oracle strongly recommend karta hai control file ki **multiple identical copies (multiplexed)** rakhne ki, usually alag physical disks pe, taaki ek single disk failure database ki start hone ki ability destroy na kar de.

### 6.1 Practical (MySQL Equivalent Analogy)

MySQL exact Oracle wale sense me ek single file "control file" nahi use karta, lekin **InnoDB metadata files** (jaise system tablespace `ibdata1`, jo data dictionary information store karta hai) aur MySQL ki apni configuration file (`my.cnf` / `my.ini`) saath milkar ek similar overall role play karti hain — engine ko batane ka ki uski important files aur structural information kahan hai.

```sql
-- Overall server configuration information dekho, somewhat analogous us cheez se
-- jo control file database ki apni structure aur settings ke baare me record karta hai
SHOW VARIABLES LIKE 'innodb_data_file_path';
```

---

## Unit III ka Summary

- Oracle ke architecture ke do bade parts hain: **Instance** (memory + background processes) aur **Database** (disk pe physical files).
- **Kernel** Oracle software ka core engine hai jo sab kuch manage aur coordinate karta hai.
- **SGA** shared memory hai jisme **Buffer Cache**, **Redo Log Buffer**, aur **Shared Pool** hote hain — database ko fast banane ke liye design kiya gaya, disk access kam karke.
- **Background processes**: DBWR (data ko disk pe write karta hai), LGWR (redo logs write karta hai, bahut frequently/urgently), PMON (failed processes clean karta hai), SMON (instance recovery), CKPT (safe recovery points mark karta hai), ARCn (purane redo logs archive karta hai).
- **Database files**: Data Files (actual table data store karti hain) aur Redo Log Files (recovery ke liye har change record karti hain).
- **Control Files** poore database ki physical structure ka track rakhti hain aur Oracle ke correctly start hone ke liye critical hain.
- MySQL ka InnoDB engine bahut similar architectural principles follow karta hai (Buffer Pool ≈ SGA ka buffer cache, InnoDB redo logs ≈ Oracle redo logs), ye dikhata hai ki ye universal, foundational RDBMS design concepts hain, sirf Oracle tak limited nahi.
