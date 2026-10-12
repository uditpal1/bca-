# UNIT – II: Principle of Layering, OSI Model, TCP/IP Model and Switching

---

## 1. Principle of Layering Concept

### 1.1 Why Do We Need Layers?

Communication over a network is a very complicated job: converting data to signals, finding the path, correcting errors, controlling speed, encrypting, showing data to the user and much more. If one big program did everything, it would be very hard to design, understand, test or upgrade.

**Layering** solves this by **dividing the big job into smaller jobs**, called **layers**. Each layer does one specific job and depends only on the layer below it.

**Real-life analogy – sending a letter:**

```
 Sender side                                   Receiver side
 ───────────                                   ─────────────
 Write letter (Application)          ◄── same job ──►   Read letter
 Put in envelope + address (Transport)◄──────────────►  Open envelope
 Post office sorts by city (Network)  ◄──────────────►  Post office sorts
 Truck / train / plane carries (Link/Physical)  ═══════►  Truck / train arrives
```

Each person does only their own job and does not care how the other layers work.

### 1.2 Advantages of Layering

1. **Modularity** – each layer is a separate module; easy to design and debug.
2. **Independence** – a layer can be changed (e.g., Wi-Fi replaced by Ethernet) without changing the others.
3. **Standardisation** – vendors can build compatible products by following the layer rules.
4. **Easy troubleshooting** – you can find out which layer has the problem.
5. **Simplicity** – a complex task is broken into small understandable pieces.

### 1.3 Important Terms

| Term | Meaning |
|---|---|
| **Protocol** | Rules for communication between the **same layer** on two different machines (peer layers). |
| **Interface** | The boundary between two **adjacent layers on the same machine**. |
| **Service** | What a lower layer offers to the layer above it. |
| **Peer entities** | The same-numbered layers on sender and receiver (e.g., sender's Transport ↔ receiver's Transport). |
| **PDU (Protocol Data Unit)** | The unit of data at a given layer (bits, frame, packet, segment, data). |
| **Header / Trailer** | Extra control information added by a layer around the data. |

### 1.4 Encapsulation and Decapsulation

- **Encapsulation:** when data moves **down** the layers on the sender, each layer **adds its own header** (the data layer also adds a trailer) – like putting a letter in an envelope, then in a bigger envelope.
- **Decapsulation:** at the receiver, as data moves **up**, each layer **removes its own header** and passes the rest to the layer above.

```
SENDER                                              RECEIVER
Application   [      DATA      ]                    [      DATA      ]   Application
Transport     [TCP hdr| DATA   ]  ──(Segment)─►     [TCP hdr| DATA   ]   Transport
Network       [IP hdr|TCP|DATA ]  ──(Packet)──►     [IP hdr|TCP|DATA ]   Network
Data Link     [Eth|IP|TCP|DATA|FCS] ─(Frame)─►      [Eth|IP|TCP|DATA|FCS] Data Link
Physical      0101101010101010101 ──(Bits)────────► 0101101010101010101   Physical
                         ═════════ physical medium ═════════
```

---

## 2. ISO-OSI Reference Model

**OSI** = **Open Systems Interconnection**, developed by the **ISO** (International Organization for Standardization) in 1984. It is a **7-layer reference model** that explains how any two systems should communicate. It is a *theoretical* model (the real Internet uses TCP/IP), but it is the best tool for learning and troubleshooting networks.

### 2.1 The Seven Layers

**Memory trick (top to bottom):** *All People Seem To Need Data Processing*  → **A**pplication, **P**resentation, **S**ession, **T**ransport, **N**etwork, **D**ata Link, **P**hysical.

```
 ┌───┬──────────────┬──────────────┐
 │ 7 │ Application  │              │  ▲  Host (upper) layers –
 │ 6 │ Presentation │   DATA       │  │  deal with user data
 │ 5 │ Session      │              │  │
 ├───┼──────────────┼──────────────┤
 │ 4 │ Transport    │ Segment      │  │  Connects the two sets
 ├───┼──────────────┼──────────────┤  │
 │ 3 │ Network      │ Packet       │  │  Network (lower) layers –
 │ 2 │ Data Link    │ Frame        │  │  deal with data transport
 │ 1 │ Physical     │ Bits         │  ▼
 └───┴──────────────┴──────────────┘
```

---

### Layer 1 – Physical Layer

**Job:** Transmits **raw bits (0s and 1s)** as electrical, light or radio signals over the physical medium.

**Functions:**
1. **Physical characteristics of interfaces and media** – defines connectors, cables, pin layout, voltage levels.
2. **Representation of bits** – how 0 and 1 become signals (line coding such as NRZ, Manchester).
3. **Data rate (transmission rate)** – number of bits per second.
4. **Synchronisation of bits** – sender and receiver clocks must match.
5. **Line configuration** – point-to-point or multipoint.
6. **Physical topology** – bus, star, ring, mesh.
7. **Transmission mode** – simplex, half-duplex, full-duplex.

**PDU:** Bit  **Devices:** Hub, repeater, cables, NIC (physical part)  **Examples:** RJ-45, fiber, Wi-Fi radio, USB.

---

### Layer 2 – Data Link Layer

**Job:** Provides **reliable node-to-node (hop-to-hop) delivery** of data on one link/LAN. It turns the raw bit stream into organised **frames**.

**Functions:**
1. **Framing** – divides the bit stream into frames with start/end markers.
2. **Physical (MAC) addressing** – adds the MAC address of sender and receiver in the frame header.
3. **Error control** – detects (and sometimes corrects) errors using CRC/parity (see Unit IV); requests retransmission.
4. **Flow control** – stops a fast sender from overwhelming a slow receiver (stop-and-wait, sliding window).
5. **Access control** – decides which device can use the shared link at a time (CSMA/CD, CSMA/CA – see Unit III).

**Sub-layers:**
- **LLC (Logical Link Control)** – flow and error control; talks to the Network layer.
- **MAC (Media Access Control)** – addressing and medium access.

**PDU:** Frame  **Devices:** Switch, bridge, NIC, wireless access point  **Protocols:** Ethernet, PPP, HDLC, Wi-Fi (802.11), ARP (between layers 2 and 3).

---

### Layer 3 – Network Layer

**Job:** Delivers packets **from source host to destination host across multiple networks (source-to-destination delivery)**.

**Functions:**
1. **Logical addressing** – adds the **IP address** of sender and receiver (physical addresses are only local; IP addresses are global).
2. **Routing** – chooses the best path through routers.
3. **Fragmentation and reassembly** – breaks large packets so they fit the link's MTU.
4. **Congestion control** – avoids too much traffic on a router.
5. **Internetworking** – connects different networks together.

**PDU:** Packet (datagram)  **Devices:** Router, Layer-3 switch  **Protocols:** IP (IPv4/IPv6), ICMP, IGMP, routing protocols (RIP, OSPF, BGP).

---

### Layer 4 – Transport Layer

**Job:** Provides **end-to-end (process-to-process) delivery** – from one *application* on the source to the correct *application* on the destination.

**Functions:**
1. **Service-point (port) addressing** – port numbers identify the application (e.g., 80 = web, 25 = email).
2. **Segmentation and reassembly** – splits the message into segments with sequence numbers; the receiver puts them back in order.
3. **Connection control** – *connection-oriented* (TCP) or *connectionless* (UDP).
4. **Flow control** – end-to-end (not just link-by-link).
5. **Error control** – ensures the whole message arrives without loss/duplication; retransmits lost segments.
6. **Multiplexing/Demultiplexing** – many applications can use one network connection together.

**PDU:** Segment (TCP) / Datagram (UDP)  **Protocols:** TCP, UDP, SCTP.

---

### Layer 5 – Session Layer

**Job:** Establishes, manages and terminates **sessions** (dialogues) between applications.

**Functions:**
1. **Dialog control** – decides whose turn it is to talk (half-duplex or full-duplex dialogue).
2. **Synchronisation** – inserts **checkpoints** in the data; if a failure occurs, only data after the last checkpoint needs to be resent (e.g., failure after page 90 of a 100-page file → restart from page 90, not page 1).
3. **Session establishment, maintenance and termination.**

**Examples:** NetBIOS, RPC, SQL sessions, login sessions.

---

### Layer 6 – Presentation Layer

**Job:** Takes care of the **syntax and semantics** of the data – makes sure data from one system can be understood by another.

**Functions:**
1. **Translation** – converts between different encodings (ASCII ↔ EBCDIC ↔ Unicode, big-endian ↔ little-endian).
2. **Encryption / Decryption** – protects data for privacy (SSL/TLS conceptually works here).
3. **Compression** – reduces the number of bits to be sent (JPEG, MPEG, MP3, ZIP).

**Examples:** JPEG, GIF, MPEG, ASCII, TLS formatting.

---

### Layer 7 – Application Layer

**Job:** The layer **closest to the user**; provides network services directly to user applications.

**Functions / services:**
1. **Network virtual terminal** – remote login (Telnet, SSH).
2. **File transfer, access and management** – FTP, SFTP.
3. **Mail services** – SMTP, POP3, IMAP.
4. **Directory services / World Wide Web** – DNS, HTTP, HTTPS.

**Note:** Application layer is *not* the application program (like Chrome); it is the protocol that the program uses (HTTP).

### 2.2 Summary Table of OSI Layers

| # | Layer | PDU | Addressing | Main job | Devices | Example protocols |
|---|---|---|---|---|---|---|
| 7 | Application | Data | – | Network services to the user | Gateway | HTTP, FTP, SMTP, DNS, Telnet |
| 6 | Presentation | Data | – | Translation, encryption, compression | Gateway | JPEG, MPEG, ASCII, TLS |
| 5 | Session | Data | – | Dialog control, synchronisation | Gateway | NetBIOS, RPC |
| 4 | Transport | Segment | Port | Process-to-process delivery, reliability | Firewall | TCP, UDP |
| 3 | Network | Packet | IP address | Host-to-host delivery, routing | Router | IP, ICMP, OSPF |
| 2 | Data Link | Frame | MAC address | Hop-to-hop delivery, error detection | Switch, Bridge | Ethernet, PPP, ARP |
| 1 | Physical | Bits | – | Raw bit transmission | Hub, Repeater | RJ-45, Fiber, Bluetooth radio |

### 2.3 Example: What Happens When You Open a Website

1. **Application:** Browser creates an HTTP request "GET /index.html".
2. **Presentation:** Data is encrypted (HTTPS/TLS) and encoded.
3. **Session:** Session with the server is established and managed.
4. **Transport:** TCP divides data into segments, adds source port (e.g., 51234) and destination port (443).
5. **Network:** IP adds source IP and destination IP; the router uses it to pick a path.
6. **Data Link:** Ethernet adds the MAC address of the next hop (your router) and CRC.
7. **Physical:** Frame converted to electrical/light/radio signals and sent.

At the server the layers work in reverse (7 ← 1) and remove headers one by one.

---

## 3. TCP/IP Model

The **TCP/IP model** (also called the **Internet Protocol Suite** or DoD model) is the practical model on which the **Internet** actually runs. It was developed before OSI, by the US Department of Defense (ARPANET). It has **4 layers** (many books show 5 by splitting the first into two).

```
   OSI Model                TCP/IP Model (4 layers)         Protocols
 ┌────────────────┐        ┌──────────────────────┐
 │ 7 Application  │        │                      │   HTTP, HTTPS, FTP, SMTP,
 │ 6 Presentation │   ◄──► │ 4  Application       │   DNS, DHCP, Telnet, SSH,
 │ 5 Session      │        │                      │   SNMP, POP3, IMAP
 ├────────────────┤        ├──────────────────────┤
 │ 4 Transport    │   ◄──► │ 3  Transport         │   TCP, UDP
 ├────────────────┤        ├──────────────────────┤
 │ 3 Network      │   ◄──► │ 2  Internet          │   IP, ICMP, ARP*, IGMP,
 │                │        │                      │   routing protocols
 ├────────────────┤        ├──────────────────────┤
 │ 2 Data Link    │   ◄──► │ 1  Network Access    │   Ethernet, Wi-Fi, PPP,
 │ 1 Physical     │        │   (Link / Host-to-   │   Frame Relay
 └────────────────┘        │    Network)          │
                           └──────────────────────┘
```

### 3.1 Layers of TCP/IP

**1. Network Access (Link) Layer**
Combines OSI's Physical and Data Link layers. Handles how data is physically sent on the local network – Ethernet, Wi-Fi, PPP. Uses MAC addresses and frames.

**2. Internet Layer**
Equivalent to OSI's Network layer. Responsible for logical addressing, routing and fragmentation.
- **IP** – delivers packets (unreliable, "best effort", connectionless).
- **ICMP** – error and diagnostic messages (used by `ping`, `traceroute`).
- **ARP** – finds the MAC address for a known IP address.
- **IGMP** – multicast group management.

**3. Transport Layer**
Process-to-process delivery. Two main protocols:

| Feature | **TCP** (Transmission Control Protocol) | **UDP** (User Datagram Protocol) |
|---|---|---|
| Connection | Connection-oriented (handshake first) | Connectionless |
| Reliability | Reliable – acknowledgements, retransmission | Unreliable – no guarantee |
| Ordering | In-order delivery with sequence numbers | No ordering |
| Speed | Slower (more overhead) | Faster (less overhead) |
| Header size | 20–60 bytes | 8 bytes |
| Flow/congestion control | Yes | No |
| Use cases | Web, email, file transfer | DNS, video/voice streaming, online games, DHCP |

**TCP Three-Way Handshake (connection setup):**
```
 Client                              Server
   │ ───────── SYN (seq=x) ─────────► │   "Can we talk?"
   │ ◄─── SYN+ACK (seq=y, ack=x+1) ── │   "Yes, ready."
   │ ───────── ACK (ack=y+1) ───────► │   "Great, starting."
   │          connection established   │
```
Connection closing uses FIN and ACK segments (four-way termination).

**4. Application Layer**
Equal to OSI's top three layers (Session + Presentation + Application). Contains all high-level protocols:

| Protocol | Port | Use |
|---|---|---|
| HTTP | 80 | Web pages |
| HTTPS | 443 | Secure web |
| FTP | 20, 21 | File transfer |
| SSH | 22 | Secure remote login |
| Telnet | 23 | Remote login (insecure) |
| SMTP | 25 | Sending email |
| DNS | 53 | Domain name → IP address |
| DHCP | 67, 68 | Automatic IP assignment |
| POP3 | 110 | Receiving email |
| IMAP | 143 | Receiving email (server-based) |

### 3.2 Comparison of OSI and TCP/IP Models

| Point | OSI Model | TCP/IP Model |
|---|---|---|
| Layers | 7 | 4 (or 5) |
| Developed by | ISO | DoD / ARPANET |
| Nature | Reference/theoretical model | Practical model used on the Internet |
| Approach | Protocol-independent; protocols were designed after the model | Protocols were designed first, model described them |
| Transport layer | Only connection-oriented *or* connectionless guaranteed by service | TCP (connection-oriented) and UDP (connectionless) |
| Session & Presentation | Separate layers | Merged into Application |
| Network layer service | Both connection-oriented and connectionless | Connectionless (IP) only |
| Reliability | More reliable layering | Less strictly layered, more flexible |
| Usage | Teaching, troubleshooting | The Internet |

### 3.3 Practical: Seeing Layers in Action

**A. Check which TCP connections are open on your computer** (Transport layer, ports, states):
```bash
netstat -an          # Windows / Linux
# or on Linux
ss -tn
```
Sample output:
```
Proto  Local Address          Foreign Address        State
TCP    192.168.1.5:51234      142.250.195.46:443     ESTABLISHED
TCP    192.168.1.5:51240      157.240.7.35:443       ESTABLISHED
TCP    0.0.0.0:135            0.0.0.0:0              LISTENING
```
Here `51234` is the client's random (ephemeral) port and `443` the server's HTTPS port.

**B. DNS lookup (Application layer):**
```bash
nslookup google.com
```
```
Server:   192.168.1.1
Name:     google.com
Addresses: 142.250.195.46
```
DNS converted a name into the IP address that the Network layer needs.

**C. See the HTTP request and TCP/TLS connection details with curl:**
```bash
curl -v http://example.com
```
The output shows the TCP connect, the HTTP request line (`GET / HTTP/1.1`), headers and the response – all application-layer data.

**D. Capture packets with Wireshark** (best way to see encapsulation)
1. Install Wireshark, choose your active interface (Wi-Fi/Ethernet) and click **Start**.
2. In the display filter type `icmp` and press Enter. In another window run `ping 8.8.8.8`.
3. Click a packet. In the middle pane you will see all layers stacked:
```
Frame 12: 74 bytes on wire                  ← Physical layer info
Ethernet II, Src: aa:bb:cc.., Dst: 11:22:33..   ← Data Link (MAC addresses)
Internet Protocol Version 4, Src: 192.168.1.5, Dst: 8.8.8.8   ← Network (IP)
Internet Control Message Protocol           ← ICMP
```
4. Now use the filter `tcp.port == 443` or `dns` or `http` and open a website, then inspect the **TCP flags** to see SYN, SYN-ACK, ACK (the three-way handshake). Filter `tcp.flags.syn == 1` shows only the handshake packets.

**E. Python – a TCP client/server (Transport layer sockets)**

*server.py*
```python
import socket

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)   # SOCK_STREAM = TCP
server.bind(("127.0.0.1", 5000))                              # IP + port
server.listen(1)
print("Server waiting for connection...")

conn, addr = server.accept()          # 3-way handshake completes here
print("Connected by", addr)
data = conn.recv(1024).decode()
print("Received:", data)
conn.send(f"Hello client, I got: {data}".encode())
conn.close()
```

*client.py*
```python
import socket

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(("127.0.0.1", 5000))   # starts the 3-way handshake
client.send("Computer Networks".encode())
print(client.recv(1024).decode())
client.close()
```
Run `server.py` first and `client.py` in another terminal. Output on the client:
```
Hello client, I got: Computer Networks
```

**UDP version (connectionless – no handshake):**
```python
# udp_server.py
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)     # SOCK_DGRAM = UDP
s.bind(("127.0.0.1", 6000))
data, addr = s.recvfrom(1024)
print("Got", data.decode(), "from", addr)

# udp_client.py
import socket
c = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
c.sendto("hello via UDP".encode(), ("127.0.0.1", 6000))  # no connect() needed
```

**F. Building a packet layer by layer with Scapy (shows encapsulation)**
```python
# pip install scapy
from scapy.all import Ether, IP, TCP, Raw

pkt = Ether() / IP(dst="192.168.1.10") / TCP(dport=80) / Raw(load="GET / HTTP/1.1")
pkt.show()
```
The output lists the Ethernet (Layer 2), IP (Layer 3), TCP (Layer 4) and data (Layer 7) parts – a direct view of encapsulation.

---

## 4. Switching Techniques

In a large network, it is impossible to connect every device to every other device with a direct wire. Instead, devices connect through **switches/routers** that move the data from source to destination. **Switching** is the method used to move data through these intermediate nodes. The three main techniques:

```
                 Switching
        ┌───────────┼────────────┐
  Circuit Switching  Message Switching  Packet Switching
                                          ├── Datagram approach
                                          └── Virtual-circuit approach
```

---

### 4.1 Circuit Switching

A **dedicated physical path (circuit)** is established between sender and receiver **before** data transfer starts, and it stays reserved for the entire conversation.

**Three phases:**
1. **Circuit establishment (setup)** – the path is created through switches (like dialling a phone number and the call connecting).
2. **Data transfer** – all data flows over the same dedicated path, in order.
3. **Circuit disconnect (teardown)** – path is released for others.

```
 A ──[S1]══════[S2]══════[S3]══════[S4]── B
        dedicated, reserved bandwidth for the whole call
```

**How the capacity is shared on a link:**
- **FDM (Frequency Division Multiplexing)** – each call gets its own frequency band.
- **TDM (Time Division Multiplexing)** – each call gets a fixed time slot repeatedly.

**Advantages:**
- Guaranteed bandwidth and constant data rate.
- No delay variation (low jitter); data arrives in order.
- No need for headers/addresses in every data unit after setup.

**Disadvantages:**
- Setup time (call set-up delay).
- **Inefficient use of bandwidth** – the line stays reserved even when nobody is talking (silent periods).
- Blocking – if all circuits are busy, a new call fails (busy tone).
- A failure on the path ends the call.

**Example:** Traditional landline telephone network (PSTN).

---

### 4.2 Message Switching

(Some books call this *store-and-forward network switching*.)

The **whole message** is treated as one unit. No path is set up in advance. Each switch **receives the entire message, stores it, then forwards** it to the next switch when the next link is free.

```
 A ──► [S1 stores whole msg] ──► [S2 stores whole msg] ──► [S3 stores] ──► B
```

**Advantages:**
- No connection setup needed.
- Links are shared; better utilisation than circuit switching.
- Switches can store messages while the receiver is busy/off, and priorities can be assigned.

**Disadvantages:**
- Switches need **large storage (disk)** for big messages.
- High, unpredictable delay – the whole message must be received at each hop before sending on (slow for interactive use).
- Not suitable for real-time communication.

**Example:** Old telegram and e-mail forwarding systems.

---

### 4.3 Packet Switching

The message is **divided into small fixed or variable-size pieces called packets**. Each packet has a header with the source and destination address and sequence number. Packets are sent through the network **independently** and are forwarded by store-and-forward at each router. At the destination they are reassembled.

```
 Message → [P1][P2][P3][P4]

         ┌──► R1 ──► R2 ──┐
 A  ────►│                ├──► B
         └──► R3 ─────────┘     (different packets may take different routes)
```

There are two approaches:

#### (a) Datagram Packet Switching (Connectionless)
- Each packet (**datagram**) is treated **independently**; no path is pre-set.
- Every router looks at the destination address of each packet and decides the next hop using its routing table.
- Packets may take **different paths**, arrive **out of order**, get **lost or duplicated**; the destination (or the Transport layer, e.g., TCP) sorts and re-requests.
- **Example:** The **Internet (IP)**.

#### (b) Virtual-Circuit Packet Switching (Connection-oriented)
- A **logical (virtual) path** is set up first (setup phase), and a **Virtual Circuit Identifier (VCI)** is assigned.
- All packets of the connection follow the **same path**, so they arrive in order. Switches use the short VCI instead of full addresses.
- No bandwidth is *dedicated* (unlike circuit switching) – the path is only virtual.
- Phases: setup → data transfer → teardown.
- **Example:** X.25, Frame Relay, ATM, MPLS.

**Advantages of packet switching:**
- **Efficient bandwidth usage** – many users share links (statistical multiplexing).
- Packets can be routed around failures/congestion (robust).
- Low storage need at switches (small packets).
- Pipelining reduces delay: while one packet is being sent forward, the next is being received.

**Disadvantages:**
- Variable delay (jitter) and possible packet loss.
- Each packet carries header overhead.
- Needs reassembly and complex protocols.

### 4.4 Comparison of Switching Techniques

| Feature | Circuit Switching | Message Switching | Packet Switching |
|---|---|---|---|
| Path | Dedicated, fixed | No dedicated path | Datagram: none / VC: virtual |
| Setup phase | Yes (needed) | No | Datagram: No, VC: Yes |
| Unit of data | Continuous stream | Entire message | Small packets |
| Bandwidth | Reserved (wasted when idle) | Shared | Shared (efficient) |
| Store-and-forward | No (after setup) | Yes (whole message) | Yes (each packet) |
| Delay | Setup delay, then constant | High, variable | Low to moderate, variable |
| Order of data | Always in order | In order | Datagram: may be out of order |
| Congestion | At setup (call blocked) | At transfer (delays) | At transfer (delay/loss) |
| Overhead | Only at setup | Header per message | Header per packet |
| Suitable for | Voice calls | Email, store-forward | Data, Internet, VoIP |
| Example | Telephone (PSTN) | Telegram | Internet |

### 4.5 Numerical Example: Delay in Each Technique

**Problem:** A message of **4,000 bits** goes from A to B through **2 intermediate switches** (so there are **3 links**). Each link has a rate of **1 Mbps**. Ignore propagation and processing delay. Circuit setup takes **5 ms**. For packet switching, the message is divided into **4 packets of 1,000 bits** each (ignore headers).

```
Transmission time of the whole message on one link = 4000 / 10^6 = 4 ms
Transmission time of one packet on one link        = 1000 / 10^6 = 1 ms
```

**Circuit switching:**
```
Total = setup + one transmission of the message (path is already built)
      = 5 ms + 4 ms = 9 ms
```

**Message switching** (whole message is stored and forwarded at every link):
```
Total = 3 links × 4 ms = 12 ms
```

**Packet switching** (pipeline: when packet 1 is on link 2, packet 2 is on link 1, …):
```
Total = (number of links + number of packets − 1) × packet time
      = (3 + 4 − 1) × 1 ms = 6 ms
```

Packet switching is the fastest here because the packets are forwarded in a pipeline. Circuit switching is good only when the setup time is small and the connection is used continuously.

### 4.6 Practical: Observing Packet Switching

**A. See that packets of one connection take hops through many routers**
```bash
tracert google.com          # Windows
traceroute google.com       # Linux/macOS
```
Each line is a router (hop) the packets pass through – the Internet is a packet-switched network where every router forwards packets individually.

**B. See that routes can change between packets/time:** run `tracert` to the same site a few times, or to a far-away site. The path may differ, which is the datagram idea.

**C. Python simulation: delay of circuit, message and packet switching**
```python
def delays(msg_bits, rate_bps, links, setup_s, packets):
    msg_time = msg_bits / rate_bps
    pkt_time = (msg_bits / packets) / rate_bps
    circuit = setup_s + msg_time
    message = links * msg_time
    packet  = (links + packets - 1) * pkt_time
    return circuit, message, packet

c, m, p = delays(4000, 1e6, links=3, setup_s=0.005, packets=4)
print(f"Circuit switching : {c*1000:.1f} ms")
print(f"Message switching : {m*1000:.1f} ms")
print(f"Packet switching  : {p*1000:.1f} ms")
```
Output:
```
Circuit switching : 9.0 ms
Message switching : 12.0 ms
Packet switching  : 6.0 ms
```

**D. Python simulation: datagram packets arriving out of order and being reassembled**
```python
import random

message = "NETWORKS"
packets = [(i, ch) for i, ch in enumerate(message)]   # (sequence number, data)

random.shuffle(packets)            # network delivers them in random order
print("Arrived order :", [p[0] for p in packets])

packets.sort(key=lambda p: p[0])   # receiver uses sequence numbers
print("Reassembled   :", "".join(p[1] for p in packets))
```
Possible output:
```
Arrived order : [3, 0, 6, 1, 7, 2, 5, 4]
Reassembled   : NETWORKS
```
This is exactly why packets carry sequence numbers in packet switching.

---

## Summary of Unit II

- **Layering** divides communication into small, independent layers; data gets **headers added (encapsulation)** on the way down and **removed (decapsulation)** on the way up.
- **OSI model (7 layers):** Physical (bits) → Data Link (frames, MAC, error control) → Network (packets, IP, routing) → Transport (segments, ports, end-to-end reliability) → Session (dialog, sync) → Presentation (translation, encryption, compression) → Application (user services).
- **TCP/IP model (4 layers):** Network Access, Internet, Transport (TCP/UDP), Application. It is the practical model of the Internet; OSI is the reference/teaching model.
- **TCP** is reliable and connection-oriented (3-way handshake); **UDP** is fast and connectionless.
- **Circuit switching** = dedicated path, setup needed, wasteful but constant delay. **Message switching** = store and forward whole message, high delay. **Packet switching** = small independent packets (datagram or virtual circuit), efficient and the basis of the Internet.
