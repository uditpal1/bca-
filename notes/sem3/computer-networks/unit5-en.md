# UNIT – V: IP Addressing, IPv4 Packet Format and IPv6

---

## 1. Internet Protocol (IP) – Introduction

The **Internet Protocol (IP)** works at the **Network layer** (Internet layer of TCP/IP). Its job is to deliver data (packets) **from the source host to the destination host, across many different networks**.

**Key characteristics of IP (IPv4):**
| Property | Meaning |
|---|---|
| **Connectionless** | No connection is set up before sending; every packet is treated independently |
| **Unreliable / best-effort** | IP does not guarantee delivery, order or error-free data. Packets may be lost, duplicated or arrive out of order. Reliability is provided by the upper layer (TCP) |
| **Packet-switched (datagram)** | Each datagram carries the full source and destination address and can take a different route |
| **Hierarchical addressing** | An address has a network part and a host part, so routers only need to know about networks, not every host |

IP is supported by helper protocols: **ICMP** (error messages, `ping`), **ARP** (finds MAC for an IP), **DHCP** (automatic IP assignment), **NAT** (private↔public addresses).

---

## 2. Types of Addresses: Physical and Logical

To deliver data, a network uses different addresses at different layers.

| Address type | Layer | Size | Example | Scope | Who assigns |
|---|---|---|---|---|---|
| **Physical address (MAC address)** | Data Link | 48 bits | `A4:2B:B0:11:22:33` | Local network (one hop) | Manufacturer (burned into NIC) |
| **Logical address (IP address)** | Network | 32 bits (IPv4) / 128 bits (IPv6) | `192.168.1.10` | Global (end-to-end) | Network administrator / DHCP / ISP |
| **Port address** | Transport | 16 bits | `80`, `443` | Identifies the application on a host | Application/OS |

### 2.1 Physical Address vs Logical Address

| Feature | Physical (MAC) address | Logical (IP) address |
|---|---|---|
| Layer | Data Link (Layer 2) | Network (Layer 3) |
| Length | 48 bits (hex) | 32 bits (IPv4), 128 bits (IPv6) |
| Changes when device moves to another network? | **No** – fixed to the hardware | **Yes** – depends on the network it joins |
| Changes at each hop? | **Yes** – rewritten at each router (hop-to-hop) | **No** – stays the same from source to destination (except with NAT) |
| Used for | Delivery within the same LAN | Delivery across different networks |
| Hierarchy | Flat (OUI + serial) | Hierarchical (network part + host part) |

**Why do we need both?** MAC addresses are flat and have no information about location, so they cannot be used to route across the world. IP addresses are hierarchical (like a postal address), so routers can forward packets towards the right network. Inside the final network, the MAC address is used to actually reach the device.

### 2.2 How Both Addresses Work Together

Suppose **PC-A (IP 192.168.1.10)** sends data to **Server (IP 10.0.0.5)** through a router **R**. 

```
 PC-A ─────── [ R ] ─────────────── Server
 192.168.1.10   Fa0/0: 192.168.1.1   10.0.0.5
 MAC: AAAA      MAC: R1             MAC: SSSS
                Fa0/1: 10.0.0.1  MAC: R2
```

| Hop | Source IP | Destination IP | Source MAC | Destination MAC |
|---|---|---|---|---|
| PC-A → Router | 192.168.1.10 | 10.0.0.5 | AAAA | **R1** (router's LAN interface) |
| Router → Server | 192.168.1.10 | 10.0.0.5 | **R2** | SSSS |

The **IP addresses stay the same** all the way; the **MAC addresses change at every hop**.

### 2.3 ARP – Finding the MAC Address from an IP Address
**ARP (Address Resolution Protocol)** converts a known IP address into the MAC address on the same LAN.
```
Host A:  "Who has 192.168.1.1? Tell 192.168.1.10"   → ARP Request (broadcast to FF:FF:FF:FF:FF:FF)
Router:  "192.168.1.1 is at A4:2B:B0:11:22:33"       → ARP Reply (unicast to A)
```
The result is saved in the **ARP cache** for some time.

**Practical – see the ARP cache:**
```bash
arp -a
```
```
Interface: 192.168.1.10
  Internet Address      Physical Address      Type
  192.168.1.1           a4-2b-b0-11-22-33     dynamic
```
**Practical – clear the cache and watch ARP in Wireshark:**
```bash
arp -d *                 # Windows (run as administrator)
ping 192.168.1.1         # makes the PC send a fresh ARP request
```
In Wireshark use filter `arp` – you will see the broadcast "Who has…?" and the reply.

---

## 3. IPv4 Address

### 3.1 Structure
An **IPv4 address is 32 bits long**, written as **four decimal numbers (octets) separated by dots** – *dotted decimal notation*. Each octet is 8 bits (0–255).

```
Binary :  11000000 . 10101000 . 00000001 . 00001010
Decimal:     192   .    168    .     1    .    10
```
Total possible addresses = 2³² = **4,294,967,296 (about 4.3 billion)**.

**Converting decimal to binary (example 192):**
```
192 = 128 + 64  → 1 1 0 0 0 0 0 0
```
Weights of bits in an octet: **128  64  32  16  8  4  2  1**

### 3.2 Network Part and Host Part

Every IP address has two parts:

```
 ┌─────────────────────────┬──────────────────────┐
 │  NETWORK part (Net ID)  │   HOST part (Host ID)│
 └─────────────────────────┴──────────────────────┘
   identifies the network     identifies the device
   (all devices on the same   inside that network
    network share it)
```

Example: In `192.168.1.10` with default Class C mask:
- Network part = `192.168.1` (first 24 bits) → network **192.168.1.0**
- Host part = `10` (last 8 bits) → host number 10 in that network.

It is like a phone number: **area code (network)** + **local number (host)**.

### 3.3 Classful Addressing

In the original design, the Internet used five **classes** which decided how many bits are in the network part and how many in the host part.

| Class | First bits | First octet range | Default mask | Network bits / Host bits | Number of networks | Hosts per network | Use |
|---|---|---|---|---|---|---|---|
| **A** | `0` | 1 – 126 | 255.0.0.0 (/8) | 8 / 24 | 126 (2⁷ − 2) | 16,777,214 (2²⁴ − 2) | Very large organisations |
| **B** | `10` | 128 – 191 | 255.255.0.0 (/16) | 16 / 16 | 16,384 (2¹⁴) | 65,534 (2¹⁶ − 2) | Medium–large organisations |
| **C** | `110` | 192 – 223 | 255.255.255.0 (/24) | 24 / 8 | 2,097,152 (2²¹) | 254 (2⁸ − 2) | Small networks |
| **D** | `1110` | 224 – 239 | – | – | – | – | **Multicast** (group communication) |
| **E** | `1111` | 240 – 255 | – | – | – | – | **Reserved** (experimental) |

```
Class A:  0 NNNNNNN . HHHHHHHH . HHHHHHHH . HHHHHHHH
Class B:  10 NNNNNN . NNNNNNNN . HHHHHHHH . HHHHHHHH
Class C:  110 NNNNN . NNNNNNNN . NNNNNNNN . HHHHHHHH
Class D:  1110 MMMM . MMMMMMMM . MMMMMMMM . MMMMMMMM   (multicast group)
```
- **Why "− 2" hosts?** The **all-0s** host part is the network address and the **all-1s** host part is the broadcast address; neither can be assigned to a device. So **usable hosts = 2^h − 2** (h = number of host bits).
- Network 127.x.x.x (Class A) is reserved for **loopback**; so Class A has 126 usable networks.

**Examples of finding the class:**
| IP address | First octet | Class |
|---|---|---|
| 10.5.20.1 | 10 | A |
| 172.16.5.10 | 172 | B |
| 192.168.1.1 | 192 | C |
| 224.0.0.5 | 224 | D |

**Problem with classful addressing:** wasteful. A company needing 300 hosts would get a Class B (65,534 addresses) and waste more than 65,000. This led to **subnetting** and **CIDR**.

### 3.4 Special IPv4 Addresses

| Address / range | Meaning |
|---|---|
| **Network address** (host bits all 0), e.g., `192.168.1.0` | Identifies the network itself |
| **Directed broadcast** (host bits all 1), e.g., `192.168.1.255` | Sends to all hosts of that network |
| **Limited broadcast** `255.255.255.255` | Broadcast to all hosts on the local network (not forwarded by routers) |
| `0.0.0.0` | "This host" / unknown address (used when a device has no IP yet, e.g., DHCP start); also the default route |
| **Loopback** `127.0.0.0/8` (usually `127.0.0.1`) | Refers to your own computer, used for testing the TCP/IP stack |
| **Private addresses** | Not routed on the public Internet; used inside LANs (with NAT to reach the Internet): |
| `10.0.0.0/8` (10.0.0.0 – 10.255.255.255) | Class A private |
| `172.16.0.0/12` (172.16.0.0 – 172.31.255.255) | Class B private |
| `192.168.0.0/16` (192.168.0.0 – 192.168.255.255) | Class C private |
| **APIPA / link-local** `169.254.0.0/16` | Self-assigned when DHCP fails |
| **Multicast** `224.0.0.0/4` | Class D |

### 3.5 Practical: See and Test IP Addresses

```bash
ipconfig                 # Windows – shows IPv4 address, subnet mask, default gateway
ipconfig /all            # more details (MAC address, DHCP server, DNS)
ip addr show             # Linux
ifconfig                 # macOS / older Linux
```
Sample output:
```
Ethernet adapter Ethernet:
   IPv4 Address. . . . . . . . . . . : 192.168.1.10
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.1.1
```
```bash
ping 127.0.0.1           # test your own TCP/IP software (loopback)
ping 192.168.1.1         # test the connection to your router
```
**Python – binary form and class of an address:**
```python
def to_binary(ip):
    return ".".join(f"{int(o):08b}" for o in ip.split("."))

def ip_class(ip):
    first = int(ip.split(".")[0])
    if first < 128: return "A"
    if first < 192: return "B"
    if first < 224: return "C"
    if first < 240: return "D"
    return "E"

for ip in ("10.1.1.1", "172.16.5.10", "192.168.1.10", "224.0.0.5"):
    print(ip, "->", to_binary(ip), "-> Class", ip_class(ip))
```
Output:
```
10.1.1.1 -> 00001010.00000001.00000001.00000001 -> Class A
172.16.5.10 -> 10101100.00010000.00000101.00001010 -> Class B
192.168.1.10 -> 11000000.10101000.00000001.00001010 -> Class C
224.0.0.5 -> 11100000.00000000.00000000.00000101 -> Class D
```

---

## 4. Network Masks (Subnet Masks)

### 4.1 What is a Mask?
A **network mask (subnet mask)** is a 32-bit number that tells **which part of an IP address is the network part and which part is the host part**.
- **1s** in the mask → network (and subnet) bits.
- **0s** in the mask → host bits.

```
IP address :  11000000.10101000.00000001.00001010   = 192.168.1.10
Mask       :  11111111.11111111.11111111.00000000   = 255.255.255.0
               └────── network ───────┘ └─ host ─┘
```
Masks always have **continuous 1s followed by continuous 0s**.

### 4.2 Finding the Network Address – Bitwise AND
**Network address = IP address AND Mask** (bit by bit).

**Example 1:** IP = 172.16.5.10, Mask = 255.255.0.0
```
172.16.5.10  = 10101100.00010000.00000101.00001010
255.255.0.0  = 11111111.11111111.00000000.00000000
AND          = 10101100.00010000.00000000.00000000  = 172.16.0.0   ← Network address
```
- Host part = `0.0.5.10`
- Broadcast address = network with all host bits 1 = **172.16.255.255**
- Usable host range = 172.16.0.1 – 172.16.255.254 (65,534 hosts)

A router uses this AND operation on the destination address to decide whether the destination is in the **same network** (deliver directly) or in **another network** (send to the router).

### 4.3 Default Masks

| Class | Default mask | Prefix |
|---|---|---|
| A | 255.0.0.0 | /8 |
| B | 255.255.0.0 | /16 |
| C | 255.255.255.0 | /24 |

### 4.4 CIDR Notation and Prefix Length
**CIDR (Classless Inter-Domain Routing)** removes the fixed class boundaries. The mask is written as a **prefix length** after a slash: `192.168.1.10/24` means the first 24 bits are the network part (mask 255.255.255.0). Any prefix length from /0 to /32 is allowed, so networks of the right size can be created.

**Common masks:**

| Prefix | Subnet mask | Host bits | Total addresses | Usable hosts |
|---|---|---|---|---|
| /8 | 255.0.0.0 | 24 | 16,777,216 | 16,777,214 |
| /16 | 255.255.0.0 | 16 | 65,536 | 65,534 |
| /24 | 255.255.255.0 | 8 | 256 | 254 |
| /25 | 255.255.255.128 | 7 | 128 | 126 |
| /26 | 255.255.255.192 | 6 | 64 | 62 |
| /27 | 255.255.255.224 | 5 | 32 | 30 |
| /28 | 255.255.255.240 | 4 | 16 | 14 |
| /29 | 255.255.255.248 | 3 | 8 | 6 |
| /30 | 255.255.255.252 | 2 | 4 | 2 |
| /31 | 255.255.255.254 | 1 | 2 | 2 (point-to-point links) |
| /32 | 255.255.255.255 | 0 | 1 | 1 (single host) |

**Quick formulas:**
```
Total addresses in a block = 2^(32 − prefix)
Usable hosts               = 2^(32 − prefix) − 2
Block size (in the interesting octet) = 256 − (mask value in that octet)
```

### 4.5 Subnetting

**Subnetting** divides **one large network into several smaller networks (subnets)** by **borrowing bits from the host part** and using them as extra network (subnet) bits.

```
Before:  | Network (24 bits)        | Host (8 bits)         |
After :  | Network (24) | Subnet (2) | Host (6 bits)        |  → /26
```
**Why subnet?** Better use of addresses, smaller broadcast domains (less traffic), better security and easier management (each department gets its own subnet).

**Example – divide 192.168.10.0/24 into 4 equal subnets**
1. Need 4 subnets → borrow **2 bits** (2² = 4) → new prefix **/26**, mask **255.255.255.192**.
2. Block size = 256 − 192 = **64**.
3. Hosts per subnet = 2⁶ − 2 = **62**.

| Subnet | Network address | First host | Last host | Broadcast address |
|---|---|---|---|---|
| 1 | 192.168.10.0/26 | 192.168.10.1 | 192.168.10.62 | 192.168.10.63 |
| 2 | 192.168.10.64/26 | 192.168.10.65 | 192.168.10.126 | 192.168.10.127 |
| 3 | 192.168.10.128/26 | 192.168.10.129 | 192.168.10.190 | 192.168.10.191 |
| 4 | 192.168.10.192/26 | 192.168.10.193 | 192.168.10.254 | 192.168.10.255 |

**Example – which subnet does 192.168.1.130/26 belong to?**
```
Last octet 130 = 10000010
Mask  192      = 11000000
AND            = 10000000 = 128
→ Network = 192.168.1.128, block size 64, so
  Broadcast = 192.168.1.191, usable hosts = 192.168.1.129 – 192.168.1.190
```

**Example – design by host requirement:** A department needs **50 hosts**.
```
Need host bits h such that 2^h − 2 ≥ 50  → h = 6 (64 − 2 = 62)
Prefix = 32 − 6 = /26 (mask 255.255.255.192)
```

**VLSM (Variable Length Subnet Masking):** using *different* subnet masks within the same network so each subnet gets exactly the size it needs (e.g., /26 for 50 hosts, /30 for a router-to-router link).

**Supernetting (route aggregation):** combining several small networks into one larger prefix (e.g., 192.168.0.0/24 + 192.168.1.0/24 → 192.168.0.0/23) to reduce the routing table size.

### 4.6 Practical: Subnetting with Python (`ipaddress` module)
```python
import ipaddress

# 1. Split a /24 into four /26 subnets
net = ipaddress.ip_network("192.168.10.0/24")
for s in net.subnets(new_prefix=26):
    hosts = list(s.hosts())
    print(f"{s}  mask={s.netmask}  hosts: {hosts[0]} - {hosts[-1]}  "
          f"broadcast={s.broadcast_address}  usable={s.num_addresses - 2}")

# 2. Network and broadcast address for a given host
iface = ipaddress.ip_interface("192.168.1.130/26")
print("\nHost      :", iface.ip)
print("Network   :", iface.network)
print("Mask      :", iface.netmask)
print("Broadcast :", iface.network.broadcast_address)

# 3. Is a destination in the same network?
a = ipaddress.ip_interface("192.168.1.10/24")
b = ipaddress.ip_address("192.168.1.77")
c = ipaddress.ip_address("10.0.0.5")
print("\nSame network as 192.168.1.77?", b in a.network)    # True  -> deliver directly
print("Same network as 10.0.0.5?    ", c in a.network)        # False -> send to router
```
Output:
```
192.168.10.0/26  mask=255.255.255.192  hosts: 192.168.10.1 - 192.168.10.62  broadcast=192.168.10.63  usable=62
192.168.10.64/26  mask=255.255.255.192  hosts: 192.168.10.65 - 192.168.10.126  broadcast=192.168.10.127  usable=62
192.168.10.128/26  mask=255.255.255.192  hosts: 192.168.10.129 - 192.168.10.190  broadcast=192.168.10.191  usable=62
192.168.10.192/26  mask=255.255.255.192  hosts: 192.168.10.193 - 192.168.10.254  broadcast=192.168.10.255  usable=62

Host      : 192.168.1.130
Network   : 192.168.1.128/26
Mask      : 255.255.255.192
Broadcast : 192.168.1.191

Same network as 192.168.1.77? True
Same network as 10.0.0.5?     False
```

**Subnetting in Cisco Packet Tracer:**
1. Create two LANs: PC0, PC1 on `192.168.10.0/26` (e.g., .1 and .2, gateway .62) and PC2, PC3 on `192.168.10.64/26` (.65 and .66, gateway .126), each LAN with its own switch, joined by one router.
2. Router configuration:
```
Router(config)# interface fa0/0
Router(config-if)# ip address 192.168.10.62 255.255.255.192
Router(config-if)# no shutdown
Router(config-if)# interface fa0/1
Router(config-if)# ip address 192.168.10.126 255.255.255.192
Router(config-if)# no shutdown
```
3. Set PC masks to `255.255.255.192` and gateways to the router address of their subnet. `ping` from PC0 to PC2 succeeds only through the router – proving the two subnets are separate networks.

---

## 5. IPv4 Packet Format

An IPv4 packet (called a **datagram**) has a **header** (20–60 bytes) followed by the **data (payload)**.

```
  0                   1                   2                   3
  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 ┌───────┬───────┬───────────────┬───────────────────────────────┐
 │Version│  IHL  │  DSCP / ToS   │         Total Length          │
 │ (4)   │ (4)   │  (8 bits)     │           (16 bits)           │
 ├───────┴───────┴───────────────┼─────┬─────────────────────────┤
 │        Identification         │Flags│     Fragment Offset     │
 │          (16 bits)            │(3)  │        (13 bits)        │
 ├───────────────┬───────────────┼─────┴─────────────────────────┤
 │ Time To Live  │   Protocol    │       Header Checksum         │
 │   (8 bits)    │   (8 bits)    │          (16 bits)            │
 ├───────────────┴───────────────┴───────────────────────────────┤
 │                     Source IP Address (32 bits)               │
 ├───────────────────────────────────────────────────────────────┤
 │                  Destination IP Address (32 bits)             │
 ├───────────────────────────────────────────────────────────────┤
 │                  Options (if any)  +  Padding                 │
 ├───────────────────────────────────────────────────────────────┤
 │                          DATA (Payload)                       │
 └───────────────────────────────────────────────────────────────┘
        Each row = 32 bits (4 bytes).  Minimum header = 5 rows = 20 bytes.
```

### 5.1 Header Fields Explained

| Field | Size | Meaning |
|---|---|---|
| **Version** | 4 bits | IP version = `4` for IPv4 |
| **IHL (Internet Header Length)** | 4 bits | Header length in **32-bit words**. Minimum 5 (20 bytes), maximum 15 (60 bytes). Header bytes = IHL × 4 |
| **DSCP / ToS (Type of Service)** | 8 bits | Quality-of-service marking (6 bits DSCP + 2 bits ECN) – tells routers about priority (e.g., voice traffic) |
| **Total Length** | 16 bits | Length of the whole datagram (header + data) in bytes. Maximum = 65,535 bytes |
| **Identification** | 16 bits | A number given by the sender; all fragments of the same original datagram carry the same value, so the receiver can reassemble them |
| **Flags** | 3 bits | Bit 0 = reserved (0); **Bit 1 = DF** (Don't Fragment); **Bit 2 = MF** (More Fragments: 1 = more fragments follow, 0 = last fragment) |
| **Fragment Offset** | 13 bits | Position of this fragment's data in the original datagram, counted in **units of 8 bytes** |
| **TTL (Time To Live)** | 8 bits | Maximum number of routers (hops) the packet may cross. Each router **decreases it by 1**; when it reaches 0 the packet is discarded and an ICMP "Time Exceeded" message is sent. Prevents packets looping forever |
| **Protocol** | 8 bits | Which upper-layer protocol is inside: **1 = ICMP, 2 = IGMP, 6 = TCP, 17 = UDP**, 89 = OSPF |
| **Header Checksum** | 16 bits | Error detection for the **header only** (not data). Recalculated at each router because TTL changes |
| **Source IP address** | 32 bits | Sender's IP |
| **Destination IP address** | 32 bits | Receiver's IP |
| **Options** | 0–40 bytes | Rarely used (record route, timestamp, security) |
| **Padding** | variable | Zeros added to make the header a multiple of 32 bits |

**Header length example:** IHL = 5 → 5 × 4 = **20 bytes**. IHL = 8 → 32 bytes (so 12 bytes of options).

### 5.2 Fragmentation

Each network link has a **Maximum Transmission Unit (MTU)** – the biggest packet it can carry (Ethernet MTU = **1500 bytes**). If a router must forward a datagram larger than the next link's MTU, it **fragments** it (unless DF = 1, in which case it drops the datagram and sends an ICMP "Fragmentation needed" message). **Reassembly is done only at the final destination.**

**Rules:**
- Each fragment gets its own IP header (copied from the original, with changed Total Length, MF and Offset).
- Data in each fragment (except the last) must be a **multiple of 8 bytes**, since the offset is counted in 8-byte units.
- MF = 1 for all fragments except the last one (MF = 0).

**Worked example:** A datagram of **4000 bytes** (20-byte header + 3980 bytes data) must pass through a link with **MTU = 1500**.
```
Maximum data per fragment = 1500 − 20 = 1480 bytes (1480 is divisible by 8 → OK)

Fragment 1: data bytes    0 – 1479  (1480 bytes) → Total length 1500, MF = 1, Offset = 0 / 8    = 0
Fragment 2: data bytes 1480 – 2959  (1480 bytes) → Total length 1500, MF = 1, Offset = 1480 / 8 = 185
Fragment 3: data bytes 2960 – 3979  (1020 bytes) → Total length 1040, MF = 0, Offset = 2960 / 8 = 370
```
Check: 1480 + 1480 + 1020 = 3980 data bytes ✓.

### 5.3 Practical: Looking at the IPv4 Packet

**A. TTL and hops with ping / tracert**
```bash
ping google.com
```
```
Reply from 142.250.195.46: bytes=32 time=21ms TTL=118
```
Each router reduced the TTL. Common starting values: 64 (Linux/macOS), 128 (Windows), 255 (network devices). A reply TTL of 118 suggests the packet started at 128 and crossed about 10 routers.

`tracert` works by sending packets with TTL = 1, 2, 3, … so each router in turn returns an ICMP "Time Exceeded" message and reveals itself:
```bash
tracert google.com        # Windows
traceroute google.com     # Linux/macOS
```

**B. Find the MTU of your path (using the DF flag)**
```bash
# Windows: -f = set Don't Fragment, -l = data size
ping -f -l 1472 google.com      # 1472 + 8 (ICMP) + 20 (IP) = 1500 → works
ping -f -l 1473 google.com      # "Packet needs to be fragmented but DF set." → too big

# Linux
ping -M do -s 1472 google.com
```

**C. Wireshark** – capture and click an IP packet; expand *Internet Protocol Version 4*:
```
Version: 4
Header Length: 20 bytes (5)
Differentiated Services Field: 0x00
Total Length: 115
Identification: 0x0000 (0)
Flags: 0x40, Don't fragment
Fragment Offset: 0
Time to Live: 64
Protocol: UDP (17)
Header Checksum: 0xb861 [correct]
Source Address: 192.168.0.1
Destination Address: 192.168.0.199
```
Use filters like `ip.addr == 192.168.1.10`, `ip.ttl < 5`, `ip.flags.mf == 1` (fragments only).

**D. Python – decode an IPv4 header**
```python
import struct, ipaddress

# Raw 20-byte IPv4 header (hex)
header = bytes.fromhex("45000073000040004011b861c0a80001c0a800c7")

(ver_ihl, tos, total_len, ident, flags_frag,
 ttl, proto, checksum, src, dst) = struct.unpack("!BBHHHBBH4s4s", header)

flags = (flags_frag >> 13) & 0x7
print("Version            :", ver_ihl >> 4)
print("Header length      :", (ver_ihl & 0xF) * 4, "bytes")
print("Total length       :", total_len, "bytes")
print("Identification     :", ident)
print("DF / MF flags      :", (flags >> 1) & 1, "/", flags & 1)
print("Fragment offset    :", flags_frag & 0x1FFF)
print("TTL                :", ttl)
print("Protocol           :", proto, {1: "ICMP", 6: "TCP", 17: "UDP"}.get(proto, ""))
print("Header checksum    :", hex(checksum))
print("Source IP          :", ipaddress.ip_address(src))
print("Destination IP     :", ipaddress.ip_address(dst))
```
Output:
```
Version            : 4
Header length      : 20 bytes
Total length       : 115 bytes
Identification     : 0
DF / MF flags      : 1 / 0
Fragment offset    : 0
TTL                : 64
Protocol           : 17 UDP
Header checksum    : 0xb861
Source IP          : 192.168.0.1
Destination IP     : 192.168.0.199
```

**E. Python – fragmentation calculator**
```python
def fragment(total_len, mtu, header=20):
    data = total_len - header
    max_data = (mtu - header) // 8 * 8          # must be a multiple of 8
    offset, frags = 0, []
    while data > 0:
        d = min(max_data, data)
        data -= d
        mf = 1 if data > 0 else 0
        frags.append((d + header, offset // 8, mf))
        offset += d
    return frags

for i, (length, off, mf) in enumerate(fragment(4000, 1500), 1):
    print(f"Fragment {i}: total length={length}, offset={off}, MF={mf}")
```
Output:
```
Fragment 1: total length=1500, offset=0, MF=1
Fragment 2: total length=1500, offset=185, MF=1
Fragment 3: total length=1040, offset=370, MF=0
```

---

## 6. Introduction to IPv6

### 6.1 Why IPv6?
- IPv4 has only about **4.3 billion** addresses, which are **exhausted** because of the growth of phones, computers and IoT devices. NAT and CIDR only delayed the problem.
- **IPv6** (defined in RFC 2460/8200, also called IPng) was designed to replace IPv4 with a huge address space and better features.

### 6.2 IPv6 Address

- **128 bits** long → 2¹²⁸ ≈ **3.4 × 10³⁸ addresses** (roughly 6 × 10²³ addresses for every square metre of the Earth's surface).
- Written as **eight groups of four hexadecimal digits** separated by **colons**:
```
2001:0db8:0000:0000:0000:ff00:0042:8329
```
- Each group = 16 bits.

**Rules for shortening (compressing) an IPv6 address:**
1. **Leading zeros** in a group can be removed: `0db8 → db8`, `0042 → 42`, `0000 → 0`.
2. **One sequence of consecutive all-zero groups** can be replaced by `::` (only **once** in an address).

```
Full      : 2001:0db8:0000:0000:0000:ff00:0042:8329
Rule 1    : 2001:db8:0:0:0:ff00:42:8329
Rule 2    : 2001:db8::ff00:42:8329
```
Other examples: loopback `0:0:0:0:0:0:0:1` = `::1`; unspecified address `::`.

**Prefix notation:** like CIDR, e.g., `2001:db8::/32` (first 32 bits are the network prefix). A typical LAN uses a **/64** prefix: first 64 bits = network (subnet), last 64 bits = **interface ID**.

### 6.3 Types of IPv6 Addresses

| Type | Meaning | Prefix / Example |
|---|---|---|
| **Unicast** | One-to-one: identifies a single interface | |
| – Global unicast | Public, routable on the Internet | `2000::/3` (starts with 2 or 3) |
| – Link-local | Valid only on the local link; auto-configured on every interface, used for neighbour discovery | `fe80::/10` |
| – Unique local | Private addresses (like 10.x.x.x in IPv4) | `fc00::/7` (usually `fd..`) |
| – Loopback | The host itself | `::1/128` |
| **Multicast** | One-to-many (to a group) | `ff00::/8` (e.g., `ff02::1` = all nodes on the link) |
| **Anycast** | Same address on several devices; packet goes to the **nearest** one | Taken from unicast space |

**There is no broadcast in IPv6** – multicast is used instead.

### 6.4 IPv6 Packet Format

The IPv6 base header is **fixed 40 bytes**, simpler than IPv4:

```
 ┌───────┬───────────────┬──────────────────────────────────────┐
 │Version│ Traffic Class │            Flow Label                │
 │ (4)   │    (8)        │              (20)                    │
 ├───────┴───────────────┴───────────┬──────────────┬───────────┤
 │          Payload Length (16)      │ Next Header  │ Hop Limit │
 │                                   │    (8)       │   (8)     │
 ├───────────────────────────────────┴──────────────┴───────────┤
 │                  Source Address (128 bits)                   │
 ├──────────────────────────────────────────────────────────────┤
 │                Destination Address (128 bits)                │
 └──────────────────────────────────────────────────────────────┘
```

| Field | Size | Meaning |
|---|---|---|
| Version | 4 bits | `6` |
| Traffic Class | 8 bits | Priority/QoS (like DSCP) |
| Flow Label | 20 bits | Identifies packets of the same flow (e.g., a video stream) for special handling |
| Payload Length | 16 bits | Length of data after the 40-byte header |
| Next Header | 8 bits | Type of next header – upper layer protocol (TCP = 6, UDP = 17, ICMPv6 = 58) or an extension header |
| Hop Limit | 8 bits | Same as IPv4 TTL |
| Source / Destination | 128 bits each | Addresses |

**Extension headers** (optional, placed after the base header) carry features like routing, fragmentation, authentication (AH) and encryption (ESP).

### 6.5 Main Features of IPv6
1. **Huge address space** (128 bits).
2. **Simpler, fixed 40-byte header** – faster processing by routers; **no header checksum**; options moved to extension headers.
3. **Auto-configuration (SLAAC)** – a host can create its own address from the network prefix without DHCP.
4. **No fragmentation by routers** – only the source fragments (using Path MTU Discovery); minimum MTU is 1280 bytes.
5. **Built-in security support (IPsec)** – authentication and encryption support are part of the design.
6. **Better multicast and anycast; no broadcast.**
7. **Neighbour Discovery Protocol (NDP)** using ICMPv6 replaces ARP.
8. **QoS support** through Traffic Class and Flow Label.
9. **No need for NAT** – every device can have its own global address (end-to-end connectivity).

### 6.6 IPv4 vs IPv6

| Feature | IPv4 | IPv6 |
|---|---|---|
| Address length | 32 bits | 128 bits |
| Address format | Dotted decimal (192.168.1.1) | Hexadecimal with colons (2001:db8::1) |
| Number of addresses | ≈ 4.3 × 10⁹ | ≈ 3.4 × 10³⁸ |
| Header size | 20–60 bytes (variable) | 40 bytes (fixed) |
| Header checksum | Yes | No |
| Fragmentation | By routers and sender | Only by the sender |
| Broadcast | Yes | No (multicast instead) |
| Address resolution | ARP | NDP (ICMPv6) |
| Configuration | Manual or DHCP | SLAAC (auto), DHCPv6, manual |
| NAT | Widely needed | Not needed |
| IPsec | Optional | Supported in design (header support) |
| QoS | ToS field | Traffic Class + Flow Label |

### 6.7 Transition from IPv4 to IPv6
Because the whole Internet cannot switch at once, three techniques are used:
1. **Dual stack** – devices run **both** IPv4 and IPv6 at the same time (most common).
2. **Tunnelling** – IPv6 packets are wrapped inside IPv4 packets to cross an IPv4-only network (e.g., 6to4, Teredo).
3. **Translation** – devices such as NAT64/DNS64 translate between IPv6 and IPv4.

### 6.8 Practical: Working with IPv6
```bash
ipconfig                      # Windows – look for "IPv6 Address" and "Link-local IPv6 Address"
ip -6 addr show               # Linux
```
Sample output:
```
IPv6 Address. . . . . . . . . . . : 2401:4900:1234:5678::25
Link-local IPv6 Address . . . . . : fe80::a1b2:c3d4:e5f6:1a2b%12
```
```bash
ping ::1                      # IPv6 loopback  (Linux: ping6 ::1  or  ping -6 ::1)
ping -6 google.com            # test IPv6 connectivity to a website
tracert -6 google.com         # trace the path using IPv6
```
You can also open **test-ipv6.com** in a browser to check whether your connection supports IPv6.

**Packet Tracer – enable IPv6 on a router:**
```
Router(config)# ipv6 unicast-routing
Router(config)# interface fa0/0
Router(config-if)# ipv6 address 2001:db8:1::1/64
Router(config-if)# no shutdown
Router# show ipv6 interface brief
```

**Python – IPv6 address handling**
```python
import ipaddress

a = ipaddress.ip_address("2001:0db8:0000:0000:0000:ff00:0042:8329")
print("Compressed :", a.compressed)         # 2001:db8::ff00:42:8329
print("Expanded   :", a.exploded)           # 2001:0db8:0000:0000:0000:ff00:0042:8329

print("::1 is loopback        :", ipaddress.ip_address("::1").is_loopback)
print("fe80::1 is link-local  :", ipaddress.ip_address("fe80::1").is_link_local)

net = ipaddress.ip_network("2001:db8::/32")
print("Addresses in 2001:db8::/32 =", net.num_addresses)   # 2^96 = 79228162514264337593543950336
print("IPv4 total addresses       =", 2**32)
print("IPv6 total addresses       =", 2**128)
```
Output:
```
Compressed : 2001:db8::ff00:42:8329
Expanded   : 2001:0db8:0000:0000:0000:ff00:0042:8329
::1 is loopback        : True
fe80::1 is link-local  : True
Addresses in 2001:db8::/32 = 79228162514264337593543950336
IPv4 total addresses       = 4294967296
IPv6 total addresses       = 340282366920938463463374607431768211456
```

---

## Summary of Unit V

- **IP** is a connectionless, best-effort Network-layer protocol. **Physical (MAC) addresses** (48-bit, local, change at each hop) and **logical (IP) addresses** (global, hierarchical, constant end-to-end) work together; **ARP** maps IP → MAC.
- An **IPv4 address** is 32 bits (dotted decimal) with a **network part** and a **host part**. **Classful addressing** (A: 1–126, B: 128–191, C: 192–223, D: multicast, E: reserved) was replaced by **CIDR** (prefix notation like /26). Usable hosts = 2^h − 2. Special addresses include network, broadcast, loopback 127.0.0.1, private ranges (10/8, 172.16/12, 192.168/16) and APIPA 169.254/16.
- A **network mask** separates network and host bits; **Network address = IP AND mask**. **Subnetting** borrows host bits to create smaller subnets (VLSM for variable sizes, supernetting for aggregation).
- The **IPv4 packet** has a 20–60 byte header: Version, IHL, ToS, Total Length, Identification, Flags (DF/MF), Fragment Offset, TTL, Protocol, Header Checksum, Source IP, Destination IP, Options. **Fragmentation** splits packets larger than the MTU (offset in 8-byte units).
- **IPv6** uses 128-bit addresses (hex with colons, shortened with `::`), a fixed 40-byte header without checksum, auto-configuration, multicast/anycast instead of broadcast, NDP instead of ARP and built-in IPsec support; transition uses dual stack, tunnelling and translation.
