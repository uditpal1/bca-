# UNIT – III: LAN, MAN, WAN, Topologies, Access Techniques, Reliability and Security

---

## 1. Classification of Networks by Size

Networks are commonly classified by the **geographical area** they cover.

```
 PAN      LAN         MAN              WAN
 (few m)  (building)  (city)           (country / world)
  ●        ●●●         ●●●●●●           ●●●●●●●●●●●●●●●●
 Bluetooth  Office     Cable TV /       Internet / bank
 devices    / College  Metro network    branch network
```

| Network | Full form | Area covered | Typical speed | Example |
|---|---|---|---|---|
| **PAN** | Personal Area Network | Around one person (1–10 m) | Low–medium | Phone + smartwatch via Bluetooth |
| **LAN** | Local Area Network | One room, building or campus (up to a few km) | 10 Mbps – 10 Gbps | College computer lab |
| **MAN** | Metropolitan Area Network | A city or large campus (5–50 km) | Medium–high | Cable TV network, city-wide Wi-Fi |
| **WAN** | Wide Area Network | Country, continent, world | Lower, expensive links | The Internet, bank branch network |

---

## 2. Elements of LAN

### 2.1 What is a LAN?
A **Local Area Network (LAN)** connects computers and devices within a **limited area** such as a lab, office, school or home. It is usually **owned and managed by a single organisation**.

### 2.2 Main Elements (Components) of a LAN

| Element | Role |
|---|---|
| **Nodes / Workstations** | Computers, printers, phones, IP cameras that use the network |
| **Server** | A powerful computer that provides services (files, printing, web, database) to the other nodes |
| **NIC (Network Interface Card)** | Connects each node to the LAN; has a unique MAC address |
| **Transmission medium** | UTP cable, fiber, or wireless (Wi-Fi) |
| **Connecting devices** | Hub/switch (to connect nodes), access point (wireless), router (to connect to other networks) |
| **Network Operating System (NOS)** | Software that manages shared resources and users (Windows Server, Linux) |
| **Protocols** | Ethernet, TCP/IP, etc. – rules for communication |
| **Topology** | The layout of the network (bus, star, ring) |
| **Access method** | The rule for who may transmit (CSMA/CD, CSMA/CA, token passing) |

### 2.3 Characteristics of LAN
- Small geographical area, high data rate (100 Mbps – 10 Gbps), low delay, low error rate.
- Privately owned, cheap to set up and maintain.
- Uses broadcast/shared or switched media.

### 2.4 Elements of MAN
- A MAN spans a city; it is built using **high-speed backbone links (fiber, microwave)** connecting many LANs.
- Elements: backbone fiber ring, routers/switches at each site, service provider equipment.
- Examples: cable TV network, metro Ethernet, city-wide government network. Older technologies: **FDDI** and **DQDB (IEEE 802.6)**.

### 2.5 Elements of WAN
- A WAN connects LANs/MANs over very long distances, often using **leased lines or public carriers** (telephone companies, ISPs).
- Elements: **routers** (main connecting devices), **switches** (packet/circuit), **modems/CSU-DSU**, **transmission links** (leased lines, optical fiber, satellite, MPLS), **ISP/carrier network**.
- Technologies: Leased line, Frame Relay, ATM, MPLS, VPN over the Internet.

### 2.6 Comparison: LAN vs MAN vs WAN

| Feature | LAN | MAN | WAN |
|---|---|---|---|
| Area | Small (room/building/campus) | City | Country/world |
| Ownership | Private | Private or public | Public / multiple organisations |
| Speed | Very high | High | Lower |
| Delay | Very low | Low | High |
| Error rate | Low | Moderate | Higher |
| Cost | Low | Moderate | High |
| Typical media | UTP, Wi-Fi | Fiber, microwave | Fiber, satellite, leased lines |
| Example | Computer lab | Cable TV network | Internet |

---

## 3. LAN Topologies

**Topology** is the **geometric arrangement** of devices and links in a network. There are two types: *physical topology* (how cables are actually laid) and *logical topology* (how data flows).

### 3.1 Bus Topology

All devices are connected to **one common backbone cable (the bus)** using drop lines/taps. The cable ends are closed with **terminators** (to stop signal reflection).

```
  Terminator                                                Terminator
     ▐━━━━━━┯━━━━━━━━━┯━━━━━━━━━┯━━━━━━━━━┯━━━━━━━━━━━━━━━━━▌
            │         │         │         │
          PC-A       PC-B      PC-C     Server         (main cable = BUS)
```

**Working:** A device sends data onto the bus; the signal travels in **both directions**; every device sees it, but only the device whose address matches accepts it. Since the cable is shared, the **CSMA/CD** method is used to avoid collisions.

| Advantages | Disadvantages |
|---|---|
| Cheap and uses little cable | A break in the main cable stops the whole network |
| Easy to add a new device | Difficult to find faults |
| Good for small networks | Performance decreases as more devices are added (collisions) |
| No central device needed | Limited cable length and number of nodes; low security |

### 3.2 Star Topology

Every device is connected by a **separate cable to a central device** – a hub or (usually) a switch.

```
              PC-A
                \
        PC-D ─── [ SWITCH / HUB ] ─── PC-B
                /
              PC-C
```

**Working:** All data passes through the central device. With a switch, data goes only to the intended device; with a hub, to everyone.

| Advantages | Disadvantages |
|---|---|
| Failure of one cable/device does not affect others | Failure of the central switch/hub stops the whole network (**single point of failure**) |
| Easy to install, manage, add or remove devices | More cable needed than bus |
| Easy fault detection (check one link) | Cost of central device |
| Good performance with a switch | |

**Star is the most popular LAN topology today** (home, office, college Ethernet).

### 3.3 Ring Topology

Each device is connected to **exactly two neighbours**, forming a closed loop.

```
          PC-A ────── PC-B
         ╱               ╲
     PC-F                 PC-C
         ╲               ╱
          PC-E ────── PC-D
```

**Working:** Data travels **in one direction** (unidirectional ring) from device to device. Each device has a **repeater** that regenerates the signal. A device accepts the data meant for it; otherwise passes it on. Access is controlled by a **token** (token ring). A *dual ring* (two rings in opposite directions) gives fault tolerance (e.g., FDDI).

| Advantages | Disadvantages |
|---|---|
| Orderly access – no collisions with token | Failure of one device/cable can break the whole ring (single ring) |
| Equal chance for all stations | Adding/removing a device disturbs the network |
| Performs well under heavy load | Troubleshooting is harder |
| Needs no central server | Data passes through every node → delay increases with size |

### 3.4 Other Topologies (for completeness)

- **Mesh:** every device is connected to every other device. Number of links for *n* devices = **n(n−1)/2**; each device needs *n−1* ports. Very reliable but very costly (used in backbones).
  Example: 5 devices → 5×4/2 = **10 links**, 4 ports on each device.
- **Tree:** a hierarchy of star networks joined to a root (used in large organisations).
- **Hybrid:** a mix of two or more topologies (e.g., star-bus).

### 3.5 Comparison of Bus, Star and Ring

| Feature | Bus | Star | Ring |
|---|---|---|---|
| Central device | None | Hub/Switch | None |
| Cable required | Least | More | Medium |
| Cost | Low | Medium–High | Medium |
| One link/node failure | Bus break = total failure | Only that node fails | Ring break = failure (single ring) |
| Fault finding | Hard | Easy | Hard |
| Adding a node | Easy | Easy | Hard |
| Access method | CSMA/CD | CSMA/CD (hub) / none (switch) | Token passing |
| Performance under load | Poor | Good | Good |
| Example | 10BASE2 Ethernet | Modern Ethernet | Token Ring, FDDI |

### 3.6 Practical: Building a Star Network in Cisco Packet Tracer

1. Open Packet Tracer. From **End Devices** drag 4 PCs; from **Network Devices → Switches** drag one 2960 switch.
2. Choose **Connections → Copper Straight-Through** and connect each PC (FastEthernet0) to a switch port (Fa0/1 … Fa0/4).
3. Wait for the link lights to turn green.
4. Click each PC → **Desktop → IP Configuration** and set:

| PC | IP address | Subnet mask |
|---|---|---|
| PC0 | 192.168.1.1 | 255.255.255.0 |
| PC1 | 192.168.1.2 | 255.255.255.0 |
| PC2 | 192.168.1.3 | 255.255.255.0 |
| PC3 | 192.168.1.4 | 255.255.255.0 |

5. On PC0 open **Command Prompt** and test:
```
C:\> ping 192.168.1.4

Pinging 192.168.1.4 with 32 bytes of data:
Reply from 192.168.1.4: bytes=32 time<1ms TTL=128
Reply from 192.168.1.4: bytes=32 time<1ms TTL=128
Ping statistics: Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)
```
6. **Test the single point of failure:** delete the switch (or use *Delete* on one cable). Observe: removing one PC's cable affects only that PC, but removing the switch cuts off everyone – the key property of a star topology.

**Bus topology (simulation idea):** Packet Tracer has no pure bus device, so a hub chain is used to represent a shared medium (all PCs connected to one hub). In Simulation mode you will see that every frame is copied to all ports.

---

## 4. LAN Access Techniques (Medium Access Control – MAC Methods)

### 4.1 Why Are They Needed?
When many devices share **one communication channel**, two devices transmitting at the same time cause a **collision** and the data is destroyed. A **Medium Access Control (MAC) protocol** decides **who can transmit and when**.

```
                   Multiple Access Protocols
        ┌─────────────────┬──────────────────┬──────────────────┐
  Random Access       Controlled Access     Channelization
  (contention)        (no collisions)       (divide the channel)
  • ALOHA             • Reservation         • FDMA
  • CSMA              • Polling             • TDMA
  • CSMA/CD           • Token passing       • CDMA
  • CSMA/CA             (Token Ring,
                         Token Bus)
```

---

### 4.2 ALOHA

**ALOHA** was developed at the University of Hawaii (1970) for radio communication between islands. It is the simplest random-access method.

#### (a) Pure ALOHA
**Rule:** *If you have a frame, send it immediately. If the acknowledgement does not arrive (a collision happened), wait a random time and send again.*

```
Station A:  ████████                           (frame 1 sent)
Station B:       ████████                      (starts before A ends → COLLISION)
```

- **Vulnerable time** (time in which a collision can happen) = **2 × Tfr** (Tfr = frame transmission time). A frame can collide with one that started up to Tfr before or up to Tfr after it.
- **Throughput:** `S = G × e^(−2G)`
  where G = average number of frames generated per frame time.
- **Maximum throughput = 0.184 (18.4%)** at **G = 0.5**.
- **Back-off:** after a collision each station waits a random time (K × Tfr or K × Tp, K chosen randomly, range doubles after each failure up to a limit); after a maximum number of tries (Kmax = 15) it gives up.

#### (b) Slotted ALOHA
Time is divided into **equal slots** of one frame time. A station may send **only at the beginning of a slot**, so frames either collide completely or not at all.

- **Vulnerable time = Tfr** (half of pure ALOHA).
- **Throughput:** `S = G × e^(−G)`
- **Maximum throughput = 0.368 (36.8%)** at **G = 1**.
- Needs time synchronisation among stations.

**Numerical example:** A network of ALOHA stations uses a 200-kbps channel; each frame is 200 bits. Find the throughput if the system (all stations together) produces **1000 frames per second**.
```
Tfr = 200 bits / 200,000 bps = 1 ms = 0.001 s
G   = frames per frame-time = 1000 × 0.001 = 1

Pure ALOHA:     S = G e^(−2G) = 1 × e^(−2) = 0.135   → 0.135 × 1000 = 135 frames/s succeed
Slotted ALOHA:  S = G e^(−G)  = 1 × e^(−1) = 0.368   → 0.368 × 1000 = 368 frames/s succeed
```

#### Practical: Python Simulation of Pure and Slotted ALOHA
```python
import random, math

def poisson(lam):
    """Number of frames generated in one slot (Poisson random number)."""
    L, k, p = math.exp(-lam), 0, 1.0
    while True:
        p *= random.random()
        if p <= L:
            return k
        k += 1

def slotted_aloha(G, slots=100000):
    success = sum(1 for _ in range(slots) if poisson(G) == 1)  # exactly one sender = success
    return success / slots

def pure_aloha(G, frames=100000):
    t, times = 0.0, []
    for _ in range(frames):
        t += random.expovariate(G)          # frame start times (frame length = 1)
        times.append(t)
    ok = 0
    for i in range(frames):
        before_ok = i == 0 or times[i] - times[i-1] >= 1   # no one started within 1 before
        after_ok  = i == frames-1 or times[i+1] - times[i] >= 1  # no one starts within 1 after
        if before_ok and after_ok:
            ok += 1
    return G * ok / frames

for G in (0.5, 1.0, 2.0):
    print(f"G={G}: pure={pure_aloha(G):.3f} (theory {G*math.exp(-2*G):.3f}) | "
          f"slotted={slotted_aloha(G):.3f} (theory {G*math.exp(-G):.3f})")
```
Sample output (values vary slightly each run):
```
G=0.5: pure=0.184 (theory 0.184) | slotted=0.303 (theory 0.303)
G=1.0: pure=0.136 (theory 0.135) | slotted=0.368 (theory 0.368)
G=2.0: pure=0.037 (theory 0.037) | slotted=0.271 (theory 0.271)
```
Notice that increasing the load beyond the best point makes the throughput **fall** because of more collisions.

---

### 4.3 CSMA (Carrier Sense Multiple Access)

ALOHA transmits blindly. **CSMA** improves it with the rule: **"Listen before you talk."** A station first **senses the channel** (carrier sense). If the channel is idle, it transmits; if busy, it waits. This reduces collisions but cannot remove them entirely, because of **propagation delay** – a station may not yet hear a transmission that has just started at a far-away station.

**Vulnerable time = propagation time (Tp)** of the signal between the two farthest stations.

**Persistence methods (what to do if the channel is busy):**

| Method | Behaviour | Result |
|---|---|---|
| **1-persistent** | Keep sensing; send **immediately (probability 1)** when the channel becomes idle | Highest collision chance if many stations are waiting (used in Ethernet) |
| **Non-persistent** | If busy, **wait a random time** and sense again | Fewer collisions, but wastes idle time |
| **p-persistent** (slotted channels) | When idle, send with probability **p**; with probability (1−p) wait for the next slot | Balances collisions and idle time |

---

### 4.4 CSMA/CD (Collision Detection) – used in classic wired Ethernet (IEEE 802.3)

CSMA does nothing if a collision occurs – the whole damaged frame is still transmitted. **CSMA/CD** adds: **"Listen while talking."** A station keeps monitoring the channel while sending; if it detects a collision, it **stops immediately**, which saves time.

**Steps (algorithm):**
```
1. Frame ready to send.
2. Sense the channel. If BUSY → wait (1-persistent: keep sensing).
3. If IDLE → start transmitting and keep listening.
4. If NO collision is detected until the whole frame is sent → SUCCESS.
5. If a collision IS detected:
     a) Send a short JAM signal (so all stations know about the collision).
     b) Stop sending. Increase the collision counter n.
     c) If n > 16 → abort (give up, report error).
     d) Otherwise wait a BACK-OFF time (see below) and go to step 2.
```

**Binary Exponential Back-off:** after the *n*-th collision, choose a random number **K from 0 to 2ⁿ − 1** (n limited to 10) and wait **K × slot time**. Slot time for 10 Mbps Ethernet = **51.2 µs** (512 bit-times). The range doubles each time, so repeated collisions spread the retry times out.

| Collision number | Range of K | Max wait (slots) |
|---|---|---|
| 1st | 0, 1 | 1 |
| 2nd | 0 – 3 | 3 |
| 3rd | 0 – 7 | 7 |
| 10th and above | 0 – 1023 | 1023 |

**Minimum frame size:** A sender must still be transmitting when the collision signal returns, otherwise it would not know its frame was damaged. So the transmission time of a frame must be at least the **round-trip propagation time (2 × Tp)**:
```
Tfr ≥ 2 × Tp         →   Minimum frame size = Bandwidth × 2 × Tp
```
In standard 10 Mbps Ethernet the slot time is **51.2 µs**, which gives a minimum frame size of 10 × 10⁶ × 51.2 × 10⁻⁶ = **512 bits = 64 bytes** (this includes extra margin for repeaters and the jam signal). Shorter frames are padded.

**Practical: Python simulation of binary exponential back-off**
```python
import random

def backoff_wait(collision_no, slot_time_us=51.2):
    n = min(collision_no, 10)                 # n is capped at 10
    k = random.randint(0, 2**n - 1)           # pick K in [0, 2^n - 1]
    return k, k * slot_time_us

for attempt in range(1, 8):
    k, wait = backoff_wait(attempt)
    print(f"Collision {attempt}: K chosen from 0..{2**min(attempt,10)-1} -> K={k}, wait={wait:.1f} microseconds")
```
Sample output:
```
Collision 1: K chosen from 0..1 -> K=1, wait=51.2 microseconds
Collision 2: K chosen from 0..3 -> K=2, wait=102.4 microseconds
Collision 3: K chosen from 0..7 -> K=5, wait=256.0 microseconds
Collision 4: K chosen from 0..15 -> K=9, wait=460.8 microseconds
...
```

**Note:** In a modern **full-duplex switched Ethernet** there are no collisions (each port is a separate collision domain), so CSMA/CD is not actually used, but it is the basis of Ethernet design.

---

### 4.5 CSMA/CA (Collision Avoidance) – used in Wi-Fi (IEEE 802.11)

In **wireless** networks a station **cannot detect collisions while transmitting** (its own signal is much stronger than the incoming one) and also suffers from the **hidden terminal problem**:

```
   A ))))))))  ((((((((  C       A and C are both in range of B,
      (       B          )       but A and C cannot hear each other.
                                  If both send to B → collision at B,
                                  and neither A nor C knows.
```

So Wi-Fi tries to **avoid** collisions before they happen (**CA = Collision Avoidance**) using:

1. **Interframe Space (IFS):** after finding the channel idle, a station waits a short fixed time (DIFS) before doing anything. High-priority frames (like ACKs) use shorter IFS (SIFS).
2. **Contention window and random back-off:** the station picks a random back-off count and counts down **only while the channel is idle**; it sends when the count reaches 0. If the channel becomes busy, the countdown pauses.
3. **Acknowledgement (ACK):** the receiver sends an ACK after SIFS. No ACK → assumed collision → retry with a larger contention window.
4. **RTS/CTS handshake (optional):** to solve the hidden-terminal problem:
```
 Sender ── RTS (Request To Send) ──►  Access Point / Receiver
 Sender ◄── CTS (Clear To Send) ─────  (everyone in range hears CTS and stays silent)
 Sender ── DATA ─────────────────────►
 Sender ◄── ACK ──────────────────────
```
5. **NAV (Network Allocation Vector):** a timer set by stations that hear RTS/CTS, telling them how long to stay quiet (virtual carrier sensing).

**CSMA/CD vs CSMA/CA**

| Feature | CSMA/CD | CSMA/CA |
|---|---|---|
| Used in | Wired Ethernet (802.3) | Wi-Fi (802.11) |
| Strategy | Detect collision and stop | Avoid collision beforehand |
| Detects collision? | Yes, while sending | No – uses ACK absence |
| Extra signals | Jam signal | RTS, CTS, ACK, NAV |
| Efficiency | Wasted time only until detection | Overhead of waiting & ACKs |

---

### 4.6 Controlled Access – Token Ring and Token Bus

In controlled access, stations take turns, so **no collisions** occur. The right to transmit is given by a special small frame called a **token**.

#### Token Ring (IEEE 802.5)
- Topology: **physical ring** (often a star-wired ring using a MAU – Multistation Access Unit).
- A special 3-byte **token** circulates continuously around the ring when no one is transmitting (*free token*).
- **Operation:**
```
1. A station wanting to send waits for the free token.
2. It captures the token (changes it into a "busy" token), attaches its data frame (with destination address) and sends it round the ring.
3. Each station checks the destination address. The destination copies the data and sets "address recognised / frame copied" bits.
4. The frame travels back to the sender, which removes it (stripping) from the ring.
5. The sender then generates a new free token and releases it.
```
- A **Token Holding Time** limits how long a station can keep the token, ensuring fairness.
- One station is the **Active Monitor**; it detects lost tokens, duplicate tokens and orphan frames.
- **Speeds:** 4 Mbps and 16 Mbps. **Priority** and **reservation** bits allow high-priority traffic.
- *Early token release* (16 Mbps) – the sender releases the token immediately after sending the frame instead of waiting for it to return.

#### Token Bus (IEEE 802.4)
- Topology: **physical bus (or tree)**, but a **logical ring** is formed among stations by arranging them in order of their addresses.
- The token is passed from station to station in the logical order (highest address → lowest → back to highest).
- Only the token holder may transmit; it then passes the token to the *next* station in the logical ring (its successor).
- Stations can join or leave the logical ring through special control frames.
- **Used in:** factory automation and industrial control (e.g., MAP – Manufacturing Automation Protocol) where predictable delay is important.

**Advantages of token passing:** no collisions, deterministic (predictable) maximum delay, good under heavy load, supports priorities.
**Disadvantages:** token overhead at light load, token loss/duplication needs recovery, more complex hardware, failure of a station can disturb the ring.

### 4.7 Comparison of MAC Techniques

| Technique | Medium/Topology | Collisions | Best when | Max efficiency |
|---|---|---|---|---|
| Pure ALOHA | Radio / any shared | Many | Very light load | 18.4% |
| Slotted ALOHA | Radio / any shared | Fewer | Light load | 36.8% |
| CSMA | Bus | Some (propagation delay) | Light–moderate load | Higher than ALOHA |
| CSMA/CD | Wired bus/hub Ethernet | Detected and handled | Moderate load | Up to ~90%+ (with short cable & big frames) |
| CSMA/CA | Wireless | Avoided | Wireless LAN | Lower due to overhead |
| Token Ring | Ring | None | Heavy load, predictable delay | High (≈ 100%) at heavy load |
| Token Bus | Bus (logical ring) | None | Industrial, real-time | High at heavy load |

---

## 5. Issues Related to Network Reliability

A **reliable network** is one that works correctly and continuously, and recovers quickly from faults.

### 5.1 Causes of Unreliability (Common Problems)
| Category | Examples |
|---|---|
| **Hardware failure** | Faulty NIC, switch/router failure, disk failure in server, power supply failure |
| **Link/media failure** | Cable cut, loose connectors, fiber break, interference |
| **Software problems** | OS crash, bugs, wrong configuration, outdated firmware |
| **Power problems** | Power cut, voltage spikes, surges |
| **Congestion/overload** | Too much traffic causing delay and packet loss |
| **Transmission errors** | Noise, attenuation, crosstalk flipping bits (see error detection in Unit IV) |
| **Human error** | Wrong settings, accidental deletion, unplugging cables |
| **Environmental** | Heat, dust, humidity, fire, flood, lightning |
| **Malicious attacks** | DoS attack, malware (see Section 6) |

### 5.2 Measuring Reliability
- **MTBF (Mean Time Between Failures)** – average working time between two failures. Higher is better.
- **MTTR (Mean Time To Repair)** – average time to fix a failure. Lower is better.
- **Availability** = MTBF / (MTBF + MTTR)

**Example:** A switch fails every 1,000 hours on average and takes 2 hours to repair.
```
Availability = 1000 / (1000 + 2) = 0.998 = 99.8 %
Downtime per year ≈ 0.002 × 8760 h ≈ 17.5 hours
```

### 5.3 Techniques to Improve Reliability
1. **Redundancy** – duplicate critical parts: two routers, two links to the ISP, dual power supplies, **mesh** or **dual-ring** topologies, RAID disks.
2. **Fault tolerance and quick recovery** – automatic failover, alternate routing.
3. **Error detection and correction** – CRC, parity, ARQ (retransmission) – Unit IV.
4. **Flow and congestion control** – prevents overloading.
5. **Backups** – regular data backups, off-site copies, disaster-recovery plan.
6. **UPS / generators** – keep devices running during power cuts; surge protectors.
7. **Quality equipment and cabling**, proper installation and labelling.
8. **Network monitoring and maintenance** – SNMP tools, logging, alerts, timely updates.
9. **Load balancing** – spread traffic among several servers/links.
10. **Choosing a suitable topology** – e.g., star limits damage to one node; mesh gives multiple paths.

### 5.4 Practical: Measuring Reliability of a Link

**A. Check packet loss and stability using ping**
```bash
# Windows: send 100 packets          # Linux/macOS: ping -c 100 8.8.8.8
ping -n 100 8.8.8.8
```
At the end, read:
```
Packets: Sent = 100, Received = 97, Lost = 3 (3% loss)
Minimum = 18ms, Maximum = 240ms, Average = 31ms
```
Loss above 1–2% or large jump between minimum and maximum shows an unreliable link.

**B. Continuous test to find when the connection fails**
```bash
ping -t 8.8.8.8        # Windows (Ctrl+C to stop, shows statistics)
ping 8.8.8.8           # Linux/macOS runs continuously by default
```

**C. Python – availability calculator**
```python
def availability(mtbf_hours, mttr_hours):
    return mtbf_hours / (mtbf_hours + mttr_hours)

a = availability(1000, 2)
print(f"Availability = {a*100:.2f}%")
print(f"Downtime per year = {(1-a)*8760:.1f} hours")

# Two identical devices in parallel (redundancy): system fails only if BOTH fail
a_parallel = 1 - (1 - a) ** 2
print(f"With a redundant device: {a_parallel*100:.4f}%")
```
Output:
```
Availability = 99.80%
Downtime per year = 17.5 hours
With a redundant device: 99.9996%
```
This shows how **redundancy** drastically improves reliability.

---

## 6. Issues Related to Network Security

**Network security** protects the network and the data in it from unauthorised access, misuse, modification or destruction.

### 6.1 Security Goals – the CIA Triad
| Goal | Meaning | Threat against it |
|---|---|---|
| **Confidentiality** | Only authorised people can read the data | Eavesdropping, data theft |
| **Integrity** | Data is not altered by unauthorised persons | Tampering, modification |
| **Availability** | Network/services are available when needed | DoS attacks, hardware failure |

Other goals: **Authentication** (proving identity), **Non-repudiation** (sender cannot deny sending), **Access control** (who can do what).

### 6.2 Common Threats and Attacks

| Attack | Description |
|---|---|
| **Eavesdropping / Sniffing** | Capturing packets on the network (easy on hubs or open Wi-Fi) |
| **Spoofing** | Pretending to be another device by faking IP, MAC or e-mail address |
| **Man-in-the-Middle (MITM)** | Attacker secretly sits between two parties and reads/modifies messages |
| **Denial of Service (DoS) / DDoS** | Flooding a server/network with traffic so real users cannot use it |
| **Malware** | Viruses, worms, trojans, ransomware, spyware |
| **Phishing / Social engineering** | Fake e-mails/websites that trick users into giving passwords |
| **Password attacks** | Guessing, brute force, dictionary attacks |
| **Unauthorised access** | Intruders using weak passwords or open ports |
| **Replay attack** | Recording valid data and sending it again later |
| **Physical attacks** | Stealing devices, tapping cables |

### 6.3 Security Measures (Countermeasures)

1. **Cryptography (Encryption)** – converts readable data (plaintext) to unreadable form (ciphertext).
   - *Symmetric key* (same key to encrypt & decrypt): AES, DES – fast.
   - *Asymmetric key* (public key + private key): RSA – used for key exchange, digital signatures.
   - Secure protocols: HTTPS/TLS, SSH, IPsec, WPA2/WPA3 for Wi-Fi.
2. **Authentication** – passwords, OTP, biometrics, digital certificates, multi-factor authentication.
3. **Firewall** – a device/software that allows or blocks traffic based on rules (IP, port, protocol).
4. **IDS/IPS** – Intrusion Detection/Prevention Systems watch for suspicious activity.
5. **VPN (Virtual Private Network)** – encrypted tunnel over the public Internet.
6. **Antivirus/anti-malware** and regular **software updates/patches**.
7. **Access control and least privilege** – give users only the permissions they need.
8. **Network segmentation (VLANs, DMZ)** – isolate sensitive parts.
9. **Using switches instead of hubs** – frames go only to the intended port, so sniffing is harder.
10. **Backups and security policies, user awareness training.**

```
 Internet ───► [ FIREWALL ] ───► [ Router ] ───► Internal LAN (switch + PCs)
                    │
                  [ DMZ ]  (public web server placed here, isolated)
```

### 6.4 Practical: Security Tasks You Can Try

**A. Check your Wi-Fi security type (Windows)**
```bash
netsh wlan show interfaces
```
Look at lines like:
```
Radio type       : 802.11ac
Authentication   : WPA2-Personal
Cipher           : CCMP
```
Prefer WPA2/WPA3; avoid "Open" or old WEP networks.

**B. See open ports/listening services on your own computer**
```bash
netstat -an | findstr LISTENING      # Windows
ss -tuln                              # Linux
```
Every listening port is a possible entry point; close services you do not need.

**C. Firewall rule examples**
```bash
# Linux (ufw): deny all incoming, allow SSH and web
sudo ufw default deny incoming
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw enable
sudo ufw status

# Windows: block incoming Telnet (port 23)
netsh advfirewall firewall add rule name="Block Telnet" dir=in action=block protocol=TCP localport=23
```

**D. Scan open ports of your OWN machine with Nmap** (only scan systems you own or have permission to test)
```bash
nmap 127.0.0.1
```
```
PORT    STATE SERVICE
135/tcp open  msrpc
445/tcp open  microsoft-ds
```

**E. Storing passwords safely – hashing in Python (integrity/confidentiality)**
```python
import hashlib, os

password = "MyStrongPass@123"
salt = os.urandom(16)                                   # random salt
hashed = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 100_000)
print("Salt  :", salt.hex())
print("Hash  :", hashed.hex())

# Verification: hash the entered password with the same salt and compare
attempt = hashlib.pbkdf2_hmac("sha256", "MyStrongPass@123".encode(), salt, 100_000)
print("Login OK" if attempt == hashed else "Wrong password")
```

**F. Symmetric encryption demo (confidentiality)**
```python
# pip install cryptography
from cryptography.fernet import Fernet

key = Fernet.generate_key()          # secret key shared by sender and receiver
f = Fernet(key)

cipher = f.encrypt(b"Bank account PIN is 4821")
print("Ciphertext:", cipher)         # unreadable to an eavesdropper
print("Decrypted :", f.decrypt(cipher).decode())
```

**G. See why open Wi-Fi/hub traffic is risky (Wireshark):** capture on a test network and filter `http`. Unencrypted HTTP shows pages and form fields in clear text, while HTTPS (`tls`) shows only encrypted data. This is why encryption protocols are essential.

---

## Summary of Unit III

- Networks are classified by size: **PAN, LAN, MAN, WAN**. A LAN has nodes, server, NIC, medium, switch/hub, NOS, protocols, topology and an access method; MAN covers a city; WAN uses routers and carrier links over long distances.
- **Topologies:** **Bus** (one shared cable, cheap, single break fails all), **Star** (central switch, easy to manage, most popular, central point of failure), **Ring** (each node has two neighbours, token passing). Mesh, tree and hybrid are other types.
- **Access methods:** **Pure ALOHA** (max 18.4%, vulnerable time 2Tfr), **Slotted ALOHA** (max 36.8%, vulnerable time Tfr), **CSMA** (listen before send), **CSMA/CD** (detect collision, jam, binary exponential back-off, wired Ethernet), **CSMA/CA** (avoid collision with IFS, back-off, ACK, RTS/CTS, wireless), **Token Ring (802.5)** and **Token Bus (802.4)** (token passing, no collisions).
- **Reliability** is improved by redundancy, backups, UPS, error control, monitoring and a suitable topology; it is measured by **MTBF, MTTR and availability**.
- **Security** protects confidentiality, integrity and availability against sniffing, spoofing, MITM, DoS, malware, phishing, etc., using **encryption, authentication, firewalls, IDS/IPS, VPN, updates and access control**.
