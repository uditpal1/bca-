# UNIT – III: Oracle RDBMS Architecture

> **Note before we start:** This unit is specifically about **Oracle's internal architecture** — this is theory about how the Oracle database software is built internally, not about writing SQL queries. Since Oracle's exact internal process names (like SGA, DBWR, LGWR) are specific to Oracle software, we cannot run these as "MySQL commands." So, for the practical part of this unit, wherever possible we will show the **equivalent/similar concept in MySQL** (since MySQL, especially with its InnoDB engine, follows very similar architectural ideas), so you can actually see and relate to these concepts hands-on.

---

## 1. Overview of Oracle RDBMS Architecture

Oracle Database is one of the most widely used enterprise-level relational database systems. To handle multiple users, huge amounts of data, and to keep everything fast, safe, and recoverable, Oracle uses a well-organized internal architecture made of two main parts:

1. **Instance** — this is the "live," running part of Oracle in the computer's memory. It consists of memory structures (SGA) and background processes that manage the database.
2. **Database** — this is the actual physical data stored permanently on the disk (data files, control files, redo log files).

In simple words: **the Instance is like the "engine" running in memory, and the Database is the "physical fuel tank and body" sitting on the disk.** When Oracle starts up, it creates an instance in memory, and this instance then mounts and opens the physical database files to make them usable.

```
        ┌─────────────────────────────────────────────┐
        │                 ORACLE INSTANCE               │
        │  ┌───────────────────────────────────────┐   │
        │  │     System Global Area (SGA)            │   │
        │  │  (Shared memory used by all processes)  │   │
        │  └───────────────────────────────────────┘   │
        │                                               │
        │   Background Processes:                      │
        │   DBWR   LGWR   SMON   PMON   CKPT   ARCH     │
        └─────────────────────────────────────────────┘
                          │
                          │  reads / writes
                          ▼
        ┌─────────────────────────────────────────────┐
        │                ORACLE DATABASE                 │
        │   Data Files   Control Files   Redo Log Files  │
        └─────────────────────────────────────────────┘
```

---

## 2. The Oracle Kernel

The **kernel** is the core part of the Oracle software — it is the central engine that actually carries out all the fundamental operations of the database, such as:
- Parsing and executing SQL statements.
- Managing memory allocation (like the SGA).
- Coordinating all the background processes.
- Managing how data is physically read from and written to disk.
- Enforcing locking, concurrency control, and transaction management.

Think of the kernel as the "operating system of the database" — just as a computer's OS kernel manages hardware resources and lets applications run, the Oracle kernel manages database resources (memory, files, processes) and lets SQL statements run correctly. All the background processes and memory structures explained further in this unit are essentially controlled and coordinated by this central kernel.

---

## 3. System Global Area (SGA)

The **System Global Area (SGA)** is a large, shared area of memory that is allocated when an Oracle instance starts. It is used to store data and control information for one particular Oracle instance, and it is **shared by all the users and background processes** connected to that instance. This is why it's called "Global" — every process that belongs to this instance can access this common memory area.

The SGA is the single most important memory structure in Oracle because it dramatically improves performance — instead of reading data from the slow physical disk every single time, Oracle keeps frequently used data in this fast memory area.

### 3.1 Main Components of the SGA

1. **Database Buffer Cache**
   This stores the most recently used **data blocks** read from the data files. When a user runs a query, Oracle first checks if the required data is already sitting in this buffer cache. If yes ("cache hit"), it reads directly from fast memory instead of the slow disk — massively improving speed. If a user modifies data, the change first happens here in memory, and later gets written to the actual disk file (this "later writing" process is handled by the DBWR background process, explained in Section 4).

2. **Redo Log Buffer**
   This is a small circular memory buffer that temporarily stores information about **every change** made to the database (called "redo entries" or "redo records") before these changes are permanently written to the physical **redo log files** on disk. This is critical for recovery — if the system crashes, Oracle can use this redo information to redo/reapply lost changes.

3. **Shared Pool**
   This stores things that can be reused across different users and sessions, mainly:
   - **Library Cache**: stores parsed/compiled versions of recently executed SQL statements and PL/SQL programs, so if the same query is run again, Oracle doesn't need to re-parse it from scratch — saving time.
   - **Data Dictionary Cache**: stores information about database objects — table structures, column definitions, user privileges, etc. — so Oracle doesn't have to repeatedly fetch this metadata from disk.

4. **Large Pool (optional)**
   Used for large memory allocations, such as backup and restore operations, or certain types of server processes, keeping these heavy operations from interfering with the regular Shared Pool.

5. **Java Pool (optional)**
   Used to support Java code execution and Java Virtual Machine (JVM) related operations if Java-based features are used inside Oracle.

### 3.2 Why SGA is Important

Without the SGA, every single read or write operation would need to go directly to the physical disk, which is thousands of times slower than memory access. The SGA is what makes an enterprise-level database like Oracle fast enough to handle thousands of simultaneous users.

### 3.3 Practical (MySQL Equivalent Analogy): Buffer Pool in MySQL

MySQL's InnoDB storage engine has a very similar memory concept, called the **InnoDB Buffer Pool**, which works just like Oracle's Database Buffer Cache — it stores recently used data and index pages in memory to avoid slow disk access.

```sql
-- Check the configured size of MySQL's InnoDB Buffer Pool (equivalent idea to SGA's buffer cache)
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
-- Check how effectively the buffer pool is being used (cache hit information)
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

Here, `Innodb_buffer_pool_read_requests` (total data requests) is much higher than `Innodb_buffer_pool_reads` (actual slow disk reads needed) — this proves that most data was already available in fast memory, exactly the same performance benefit that Oracle's SGA buffer cache provides.

---

## 4. Background Processes

Oracle uses several **background processes** that constantly run in the background (invisible to the normal user) to keep the database running smoothly, handle memory-to-disk writing, and manage recovery.

### 4.1 Database Writer (DBWR / DBWn)

The **Database Writer** process is responsible for **writing modified (dirty) data blocks** from the Database Buffer Cache (in the SGA) **to the actual data files on disk**.

- It does **not** write immediately after every single change — that would be too slow. Instead, it writes in an efficient, batched manner at certain trigger points (like when the buffer cache is getting full, or during a checkpoint).
- This delayed-writing strategy is what makes Oracle fast — changes happen quickly in memory first, and get physically saved to disk later, in the background, without making the user wait.

### 4.2 Log Writer (LGWR)

The **Log Writer** process is responsible for writing the **redo log buffer's contents** (from the SGA) **to the physical redo log files on disk**.

- Unlike DBWR, LGWR writes **much more frequently and urgently** — typically immediately whenever a transaction is committed. This is critical, because the redo log is what guarantees that even if the system crashes right after a commit, the committed change is not lost (this property is part of what's called the "durability" of a transaction).

### 4.3 Process Monitor (PMON)

The **Process Monitor** is responsible for cleaning up after a **failed user process**. If a user's session or connection terminates abnormally (e.g., the network connection drops, or the application crashes), PMON automatically steps in to:
- Roll back any incomplete transaction from that failed process.
- Release any locks that the process was holding.
- Free up any other resources that the process was using.

This ensures that one user's crash never leaves the database in a stuck or locked state for other users.

### 4.4 System Monitor (SMON)

The **System Monitor** performs instance recovery when Oracle restarts after an unexpected shutdown/crash. It applies the redo log entries to redo lost changes, and rolls back any transactions that were incomplete at the time of the crash. It also does routine cleanup, like reclaiming temporary storage space no longer needed.

### 4.5 Checkpoint Process (CKPT)

The **Checkpoint process** signals the DBWR to write all modified buffers to disk, and then updates the control file(s) and data file headers with this checkpoint information — this marks a known "safe point" that recovery can start from, reducing the recovery time needed after a crash.

### 4.6 Archiver Process (ARCn)

If Oracle is running in a special mode called "ARCHIVELOG mode," the **Archiver process** copies old, filled-up redo log files to a separate archive location before they get overwritten. This allows the database to be recovered even from very old points in time, which is essential for very critical enterprise systems.

### 4.7 Practical (MySQL Equivalent Analogy): Similar Concepts in MySQL

| Oracle Process | Purpose | Closest MySQL (InnoDB) Equivalent |
|---|---|---|
| DBWR | Writes dirty memory pages to data files | InnoDB's background page flushing (`innodb_io_capacity` controlled) |
| LGWR | Writes redo buffer to redo log files | InnoDB's redo log writing (`ib_logfile`), controlled by `innodb_flush_log_at_trx_commit` |
| PMON | Cleans up failed processes/locks | InnoDB automatically rolls back the transaction of a dropped/killed connection |
| SMON | Instance/crash recovery | InnoDB Crash Recovery, done automatically at MySQL startup using its redo log |
| CKPT | Marks safe recovery points | InnoDB checkpointing mechanism |

```sql
-- This MySQL setting controls how strictly/frequently the redo log is written to disk on commit -
-- conceptually similar to what LGWR guarantees in Oracle
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
A value of `1` here means MySQL flushes the redo log to disk at every single commit — giving full durability, exactly matching the strict guarantee that Oracle's LGWR process provides.

---

## 5. Database Files

These are the **physical files** stored on the hard disk that actually make up an Oracle database.

### 5.1 Data Files

**Data files** physically store all the actual **data** of the database — every table's rows, every index, and every other database object eventually lives inside one or more data files. A single Oracle database typically has multiple data files, organized into logical storage units called **tablespaces**. Every piece of data you insert using SQL eventually gets physically written into one of these data files (with the DBWR process handling this writing, as explained above).

### 5.2 Redo Log Files

**Redo log files** record every change made to the database, in the exact order it happened, before those changes are made permanent in the data files. Oracle requires **at least two** redo log files, and it writes to them in a circular, rotating fashion (once one file fills up, it starts writing to the next, and eventually cycles back to reuse the first one, if ARCHIVELOG mode isn't preserving it).

These files are essential for **recovery**: if the system crashes after a transaction is committed but before the corresponding data file update physically happens, Oracle can use the redo log during restart to "redo" and correctly reapply that lost change.

### 5.3 Practical (MySQL Equivalent Analogy): Locating These Files in MySQL

```sql
-- Location of MySQL's actual physical data files (analogous to Oracle's Data Files)
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
-- Names/sizes of InnoDB's redo log files (analogous to Oracle's Redo Log Files)
SHOW VARIABLES LIKE 'innodb_log_file_size';
```

If you look inside the MySQL data directory (using the operating system, not SQL) you would actually find files like `ib_logfile0` and `ib_logfile1` — these physically play the exact same role as Oracle's redo log files, recording every change before it's finalized in the actual table's data file.

---

## 6. Control Files

A **control file** is a small but extremely critical binary file that keeps track of the overall **physical structure of the entire database**. It records important information such as:
- The database's name.
- The names and locations of all the data files and redo log files.
- The current timestamp/state information (like the latest checkpoint), used to verify data file consistency at startup.
- Backup-related information.

**Why control files are so important:** When Oracle starts up, the very first thing it needs to do is read the control file to know **where** all its other files (data files, redo logs) are located, and to check whether everything is consistent. If the control file is lost or corrupted, Oracle cannot even properly locate or open its own database — this is why Oracle strongly recommends keeping **multiple identical copies (multiplexed)** of the control file, usually on different physical disks, so that a single disk failure doesn't destroy the database's ability to start up.

### 6.1 Practical (MySQL Equivalent Analogy)

MySQL does not use a single file called a "control file" in the exact Oracle sense, but the **InnoDB metadata files** (like the system tablespace `ibdata1`, which stores the data dictionary information) and MySQL's own configuration file (`my.cnf` / `my.ini`) together perform a similar overall role of telling the database engine where its important files and structural information live.

```sql
-- View overall server configuration information, somewhat analogous to what a
-- control file records about the database's own structure and settings
SHOW VARIABLES LIKE 'innodb_data_file_path';
```

---

## Summary of Unit III

- Oracle's architecture has two big parts: the **Instance** (memory + background processes) and the **Database** (physical files on disk).
- The **Kernel** is the core engine of Oracle software that manages and coordinates everything.
- The **SGA** is shared memory containing the **Buffer Cache**, **Redo Log Buffer**, and **Shared Pool** — designed to make the database fast by reducing disk access.
- **Background processes**: DBWR (writes data to disk), LGWR (writes redo logs, very frequently/urgently), PMON (cleans up failed processes), SMON (instance recovery), CKPT (marks safe recovery points), ARCn (archives old redo logs).
- **Database files**: Data Files (store actual table data) and Redo Log Files (record every change for recovery purposes).
- **Control Files** keep track of the entire database's physical structure and are critical for Oracle to even start up correctly.
- MySQL's InnoDB engine follows very similar architectural principles (Buffer Pool ≈ SGA's buffer cache, InnoDB redo logs ≈ Oracle redo logs), showing that these are universal, foundational RDBMS design concepts, not unique to Oracle alone.
