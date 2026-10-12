# UNIT – I: Introduction to Data Communication and Computer Networks

---

## 1. Data Communication

**Data communication** means the exchange of data between two devices through some transmission medium (like a wire or the air). When you send a WhatsApp message, open a website or make a video call, data communication is happening.

### 1.1 Five Components of a Data Communication System

```
 ┌──────────┐    Message     ┌────────────┐    Message     ┌──────────┐
 │  SENDER  │ ─────────────► │   MEDIUM   │ ─────────────► │ RECEIVER │
 └──────────┘                └────────────┘                └──────────┘
        └──────────── agree on rules (PROTOCOL) ───────────────┘
```

| Component | Meaning | Example |
|---|---|---|
| **Message** | The information (data) to be sent | Text, number, image, audio, video |
| **Sender** | The device that sends the message | Your laptop, phone, camera |
| **Receiver** | The device that receives the message | A server, another phone, a TV |
| **Transmission Medium** | The physical path the message travels on | Cable, fiber, radio waves |
| **Protocol** | A set of rules that both sides agree on | HTTP, TCP/IP, Ethernet |

> Without a protocol, two devices may be connected but still unable to understand each other — like two people speaking different languages.

### 1.2 Data Representation

Computers only understand **bits (0 and 1)**. Different kinds of data are converted to bits before being sent:

- **Text** – coded using ASCII or Unicode (e.g., 'A' = 01000001 in ASCII).
- **Numbers** – converted directly to binary.
- **Images** – divided into tiny dots called pixels; each pixel is a bit pattern (colour value).
- **Audio** – a continuous sound wave that is sampled and converted to bits.
- **Video** – a series of images (frames) shown quickly, plus audio.

### 1.3 Modes of Data Flow (Transmission Modes)

| Mode | Direction | Example |
|---|---|---|
| **Simplex** | One way only. Sender can only send, receiver can only receive. | Keyboard → computer, TV broadcast, radio |
| **Half-Duplex** | Both directions, but **one at a time**. | Walkie-talkie, old Ethernet hub networks |
| **Full-Duplex** | Both directions **at the same time**. | Telephone call, modern switched Ethernet |

```
Simplex       A ─────────►  B

Half-duplex   A ◄────────►  B     (one direction at a time)

Full-duplex   A ◄═════════► B     (both directions together)
```

### 1.4 Characteristics of a Good Data Communication System

1. **Delivery** – data must reach the *correct* destination.
2. **Accuracy** – data must arrive without changes/errors.
3. **Timeliness** – data must arrive in time (very important for live audio/video; late data is useless).
4. **Jitter** – the variation in packet arrival time. If video packets arrive at uneven intervals, the video stutters.

---

## 2. Computer Network

A **computer network** is a collection of two or more computing devices (called **nodes** or **hosts**) connected together so that they can share data and resources.

### 2.1 Why Do We Need Networks? (Uses)

- **Resource sharing** – many users share one printer, one internet connection, one file server.
- **Information sharing** – shared databases, websites, email.
- **Communication** – email, chat, video calls.
- **Cost saving** – one expensive device can be shared instead of buying many.
- **Reliability** – if one machine fails, another can take its job (data can be backed up on multiple machines).
- **Centralised control and backup** – easy to manage security, updates and backups in one place.

### 2.2 Criteria for a Good Network

1. **Performance** – measured by *throughput* (how much data per second) and *delay* (how long data takes).
2. **Reliability** – how often the network fails and how quickly it recovers.
3. **Security** – protection against unauthorised access, viruses and data loss.

### 2.3 Type of Connections

- **Point-to-Point** – a dedicated link between exactly two devices. Example: a remote control and a TV.
- **Multipoint (Multidrop)** – more than two devices share the same link. Example: many computers on one shared cable.

```
Point-to-Point:     A ────────── B

Multipoint:         A ──┬──────┬──────┬── (shared link)
                        B      C      D
```

---

## 3. Basic Performance Terms

### 3.1 Bandwidth

**Bandwidth** is the maximum amount of data that can be sent over a link in one second. It is measured in **bits per second (bps)**, Kbps, Mbps, Gbps. (In analog signals it also means the range of frequencies, measured in Hz.)

> Think of a road: bandwidth is the *width of the road* – a wider road lets more cars pass at the same time.

### 3.2 Throughput

**Throughput** is the *actual* amount of data successfully transferred per second. It is always **less than or equal** to bandwidth, because of delays, errors and congestion.

### 3.3 Latency (Delay)

Latency is the total time a message takes to go from source to destination. It has four parts:

| Delay | Meaning | Formula |
|---|---|---|
| **Propagation delay** | Time for a signal to travel through the medium | Distance ÷ Propagation speed |
| **Transmission delay** | Time to push all bits of the packet onto the link | Packet size ÷ Bandwidth |
| **Queuing delay** | Time a packet waits in a router's buffer | Depends on traffic |
| **Processing delay** | Time the device takes to examine the packet header | Very small |

**Total Latency = Propagation + Transmission + Queuing + Processing**

**Numerical example:** A 1,000-byte packet is sent over a 10 Mbps link that is 2,000 km long. Signal speed in the cable is 2 × 10⁸ m/s. Ignore queuing and processing.

```
Transmission delay = (1000 × 8 bits) / (10 × 10^6 bps) = 8000 / 10,000,000 = 0.0008 s = 0.8 ms
Propagation delay  = 2,000,000 m / (2 × 10^8 m/s)      = 0.01 s            = 10 ms
Total latency      = 0.8 + 10 = 10.8 ms
```

### 3.4 Bandwidth-Delay Product

**Bandwidth × Round-trip delay** = number of bits that can be "in flight" on the link at once (the capacity of the "pipe").

Example: 10 Mbps link, delay 20 ms → 10,000,000 × 0.02 = **200,000 bits** in the pipe.

### 3.5 Transmission Impairments (Why Signals Get Damaged)

| Impairment | Meaning |
|---|---|
| **Attenuation** | Signal loses strength as it travels farther. Fixed by amplifiers/repeaters. |
| **Distortion** | Signal shape changes because different frequencies travel at different speeds. |
| **Noise** | Unwanted signals added from outside (thermal noise, crosstalk, electromagnetic interference, impulse noise). |

**Decibel (dB)** measures signal gain or loss:

```
dB = 10 × log10 (P2 / P1)
```
Example: A signal drops from 10 mW to 5 mW → dB = 10 × log10(5/10) = 10 × (−0.301) = **−3 dB** (a 3 dB loss means half the power is lost).

### 3.6 Data Rate Limits

**Nyquist (noiseless channel):**
```
Maximum bit rate = 2 × B × log2(L)
```
B = bandwidth (Hz), L = number of signal levels.
Example: B = 3000 Hz, 2 levels → 2 × 3000 × log2(2) = **6000 bps**.

**Shannon (noisy channel):**
```
Capacity = B × log2(1 + SNR)
```
Example: B = 3000 Hz, SNR = 3162 (about 35 dB) → 3000 × log2(3163) ≈ 3000 × 11.63 ≈ **34,890 bps**.

### 3.7 Practical: Measuring Delay and Packet Loss with `ping`

`ping` sends small test packets to a device and measures the round-trip time (RTT).

```bash
# Windows / Linux / macOS
ping google.com
```

Sample output:
```
Reply from 142.250.195.46: bytes=32 time=21ms TTL=118
Reply from 142.250.195.46: bytes=32 time=20ms TTL=118
Reply from 142.250.195.46: bytes=32 time=23ms TTL=118
Reply from 142.250.195.46: bytes=32 time=20ms TTL=118

Ping statistics for 142.250.195.46:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 20ms, Maximum = 23ms, Average = 21ms
```

How to read it:
- `time=21ms` → round-trip **latency**.
- Difference between min and max → **jitter**.
- `Lost = 0 (0% loss)` → reliability of the path.
- `TTL` → how many more routers the packet could cross (discussed in Unit V).

Linux/macOS: use `ping -c 4 google.com` (`-c` limits the count). Windows: `ping -n 10 google.com`.

**Python program to calculate delays:**

```python
def total_latency(packet_bytes, bandwidth_bps, distance_m, speed=2e8):
    transmission = (packet_bytes * 8) / bandwidth_bps
    propagation  = distance_m / speed
    return transmission, propagation, transmission + propagation

t, p, total = total_latency(1000, 10e6, 2_000_000)
print(f"Transmission delay : {t*1000:.2f} ms")
print(f"Propagation delay  : {p*1000:.2f} ms")
print(f"Total latency      : {total*1000:.2f} ms")
```

Output:
```
Transmission delay : 0.80 ms
Propagation delay  : 10.00 ms
Total latency      : 10.80 ms
```

---

## 4. Transmission Media

**Transmission media** is the physical path between sender and receiver through which data travels. It is classified as:

```
                 Transmission Media
                /                   \
          GUIDED                  UNGUIDED
     (physical cable)            (wireless)
     /      |       \           /     |      \
 Twisted  Coaxial  Optical   Radio  Micro-  Infrared
  Pair     Cable    Fiber    waves  waves
```

---

### 4.1 Twisted Pair Cable

#### Construction
A twisted pair cable has **pairs of insulated copper wires twisted around each other**. Usually 4 pairs (8 wires) are bundled inside one plastic jacket (the Ethernet cable you see everywhere).

**Why twisted?** When two wires are twisted, outside interference (noise) affects both wires almost equally, so it cancels out at the receiver. Twisting also reduces **crosstalk** (signal leaking from one pair to another).

#### Types

| Type | Full form | Description |
|---|---|---|
| **UTP** | Unshielded Twisted Pair | No metal shield. Cheap, light, flexible. Most common in LANs. |
| **STP** | Shielded Twisted Pair | A metal foil/braid around the pairs gives better protection from noise, but it is costlier, heavier and harder to install. |

#### Categories of UTP

| Category | Max speed | Max frequency | Typical use |
|---|---|---|---|
| Cat 3 | 10 Mbps | 16 MHz | Old telephone/early Ethernet |
| Cat 5 | 100 Mbps | 100 MHz | Fast Ethernet (old) |
| Cat 5e | 1 Gbps | 100 MHz | Home/office networks |
| Cat 6 | 1 Gbps (10 Gbps up to 55 m) | 250 MHz | Offices |
| Cat 6a | 10 Gbps up to 100 m | 500 MHz | Data centres |
| Cat 7 | 10 Gbps+ | 600 MHz | High-end, shielded |

#### Connector and Distance
- Connector: **RJ-45** (for network cables); RJ-11 (for telephone).
- Maximum length of one segment: **100 metres**.

#### Advantages / Disadvantages

| Advantages | Disadvantages |
|---|---|
| Cheap and easy to install | Limited distance (100 m) |
| Flexible and light | Prone to noise (UTP) |
| Widely supported | Lower bandwidth than fiber |

#### Straight-through vs Crossover Cable

Ethernet cables follow a colour-coding standard. The two standards are **T568A** and **T568B**.

| Pin | T568A | T568B |
|---|---|---|
| 1 | White-Green | White-Orange |
| 2 | Green | Orange |
| 3 | White-Orange | White-Green |
| 4 | Blue | Blue |
| 5 | White-Blue | White-Blue |
| 6 | Orange | Green |
| 7 | White-Brown | White-Brown |
| 8 | Brown | Brown |

- **Straight-through cable** – same standard (e.g., T568B) on both ends. Used to connect *different* devices: PC → Switch, Switch → Router.
- **Crossover cable** – T568A on one end and T568B on the other. Used to connect *similar* devices: PC → PC, Switch → Switch. (Modern devices use **Auto-MDIX** and detect this automatically.)

#### Practical: Making an Ethernet Cable (Step by Step)

**Tools:** UTP cable, 2 RJ-45 connectors, crimping tool, cable stripper, cable tester.

1. Strip about 2 cm of the outer jacket from the cable end.
2. Untwist the four pairs and straighten the 8 wires.
3. Arrange the wires in T568B order: *White-Orange, Orange, White-Green, Blue, White-Blue, Green, White-Brown, Brown*.
4. Trim the wire ends evenly (about 1.2 cm should stay outside the jacket).
5. Insert the wires into the RJ-45 connector (clip facing down) until each wire touches the end.
6. Place the connector in the crimping tool and squeeze firmly.
7. Repeat on the other end with the **same** order (straight-through).
8. Plug both ends into the cable tester – all 8 lights should glow in sequence 1 to 8.

**Checking the link on your computer:**
```bash
# Windows (PowerShell) – shows adapters, link status and speed
Get-NetAdapter

# Linux
ip link show
sudo ethtool eth0        # shows "Speed: 1000Mb/s", "Duplex: Full", "Link detected: yes"
```

---

### 4.2 Coaxial Cable

#### Construction
From the centre outwards, a coaxial ("coax") cable has:

```
   ┌─────────────────────────────────────────┐
   │  Outer plastic jacket (insulating cover)│
   │  ┌───────────────────────────────────┐  │
   │  │  Braided metal shield (outer      │  │
   │  │  conductor – also ground)         │  │
   │  │  ┌─────────────────────────────┐  │  │
   │  │  │ Plastic insulator (dielectric)│ │  │
   │  │  │  ┌───────────────────────┐  │  │  │
   │  │  │  │ Central copper core   │  │  │  │
   │  │  │  └───────────────────────┘  │  │  │
   │  │  └─────────────────────────────┘  │  │
   │  └───────────────────────────────────┘  │
   └─────────────────────────────────────────┘
```

1. **Central copper conductor** – carries the signal.
2. **Insulator (dielectric)** – separates the core from the shield.
3. **Metal braided shield** – blocks external noise and acts as the return path.
4. **Outer jacket** – protects the whole cable.

Both conductors share the same axis ("co-axial"), which gives it better protection from noise than twisted pair.

#### Types of Coaxial Cable

| Type | Impedance | Use |
|---|---|---|
| RG-59 | 75 Ω | Cable TV, CCTV |
| RG-6 | 75 Ω | Cable TV, satellite dish, broadband |
| RG-58 (Thinnet) | 50 Ω | Old 10BASE2 Ethernet (up to 185 m) |
| RG-8/RG-11 (Thicknet) | 50 Ω | Old 10BASE5 Ethernet (up to 500 m) |

#### Connectors
**BNC** (Bayonet Neill–Concelman), **T-connector** (to connect a PC to the bus), **terminator** (50 Ω resistor at the cable ends to stop signal reflection), and **F-type** connectors (cable TV).

#### Advantages / Disadvantages

| Advantages | Disadvantages |
|---|---|
| Better noise protection than UTP | Thicker, less flexible, costlier than UTP |
| Longer distance than UTP | Single cable fault can bring down a bus network |
| Higher bandwidth than twisted pair | Mostly replaced by twisted pair and fiber in LANs |

Today coax is still widely used for **cable TV and cable broadband (DOCSIS)**.

---

### 4.3 Optical Fiber

An **optical fiber** carries data as **pulses of light** instead of electrical signals. Light on = 1, light off = 0.

#### Construction

```
 ┌──────────────────────────────────────────────┐
 │ Outer jacket (plastic)                       │
 │ ┌──────────────────────────────────────────┐ │
 │ │ Buffer / coating (protection)            │ │
 │ │ ┌──────────────────────────────────────┐ │ │
 │ │ │ Cladding (glass, lower refractive    │ │ │
 │ │ │ index)                               │ │ │
 │ │ │   ┌──────────────────────────────┐   │ │ │
 │ │ │   │ CORE (thin glass – carries   │   │ │ │
 │ │ │   │ light)                       │   │ │ │
 │ │ │   └──────────────────────────────┘   │ │ │
 │ │ └──────────────────────────────────────┘ │ │
 │ └──────────────────────────────────────────┘ │
 └──────────────────────────────────────────────┘
```

- **Core** – very thin glass/plastic strand (8–62.5 µm) where light travels.
- **Cladding** – glass layer around the core with a *lower refractive index*.
- **Buffer coating and outer jacket** – physical protection.

#### How Light Travels – Total Internal Reflection (TIR)
When light hits the boundary between the core and the cladding at an angle **greater than the critical angle**, it does not leave the core. It reflects back inside (like a mirror) and keeps bouncing forward along the fiber — even around bends.

```
   Cladding  ─────────────────────────────────
              ╲        ╱╲        ╱╲        ╱
   Core        ╲      ╱  ╲      ╱  ╲      ╱   ──► light path
              ╱ ╲    ╱    ╲    ╱    ╲    ╱
   Cladding  ─────────────────────────────────
```

#### Light Source and Detector
- **Transmitter (source):** LED (cheap, short distances) or Laser diode (expensive, long distances).
- **Receiver (detector):** Photodiode that converts light back into electrical signals.

#### Modes of Propagation

| Mode | Core size | Light source | Distance | Notes |
|---|---|---|---|---|
| **Multimode Step-Index** | 50–100 µm | LED | Short | Light rays take many paths; pulses spread out (modal dispersion) |
| **Multimode Graded-Index** | 50–62.5 µm | LED/Laser | Up to ~2 km | Core refractive index decreases gradually, so rays re-focus; less distortion |
| **Single-mode** | 8–10 µm | Laser | 10s–100s of km | Only one path; least dispersion; highest speed |

#### Connectors
**SC** (square, push-pull), **LC** (small, common in data centres), **ST** (round, twist-lock).

#### Advantages / Disadvantages

| Advantages | Disadvantages |
|---|---|
| Very high bandwidth (Tbps possible) | Costly cable and equipment |
| Very low attenuation – long distances without repeaters | Difficult to install and splice |
| **Immune to electromagnetic interference** | Fragile if bent too sharply |
| Very secure – tapping is hard | One-directional: two fibers needed for two-way communication |
| Light weight, thin | |

#### Fiber Loss Calculation (Link Budget)
Typical single-mode fiber loses about 0.35 dB per km. For a 20 km link with 2 connectors (0.5 dB each):
```
Loss = (20 × 0.35) + (2 × 0.5) = 7 + 1 = 8 dB
```
If the transmitter sends at −3 dBm, received power = −3 − 8 = **−11 dBm**. If the receiver's sensitivity is −25 dBm, the link works (14 dB margin).

#### Comparison of Guided Media

| Feature | Twisted Pair | Coaxial | Optical Fiber |
|---|---|---|---|
| Signal | Electrical | Electrical | Light |
| Bandwidth | Low–medium | Medium | Very high |
| Max distance (without repeater) | ~100 m | ~500 m | Many km |
| Noise immunity | Low | Medium | Very high (immune to EMI) |
| Cost | Lowest | Medium | Highest |
| Installation | Easy | Moderate | Difficult |
| Typical use | LAN, telephone | Cable TV, old LAN | Backbone, ISP, undersea cables |

### 4.4 Unguided Media (Brief Overview)
Data travels through air/space as electromagnetic waves, without a physical cable.

| Type | Frequency | Example |
|---|---|---|
| Radio waves | 3 kHz – 1 GHz | FM radio, Wi-Fi, Bluetooth |
| Microwaves | 1 – 300 GHz | Mobile networks, satellite links |
| Infrared | 300 GHz – 400 THz | TV remote (short range, line of sight) |

---

## 5. Network Devices

Network devices connect computers and networks together. They work at different layers of the OSI model (explained in Unit II).

### 5.1 Network Interface Card (NIC)
The hardware inside every computer that connects it to a network. Each NIC has a unique **MAC address** (48 bits, e.g., `00:1A:2B:3C:4D:5E`) burned in by the manufacturer.

**Practical – find your MAC address:**
```bash
# Windows
ipconfig /all          # look for "Physical Address"
# Linux
ip link show           # look for "link/ether"
# macOS
ifconfig en0 | grep ether
```

### 5.2 Repeater
A **repeater** regenerates (cleans and re-amplifies) a weak signal so it can travel further. It works at the **Physical layer** and does not understand data — it just copies bits. It has 2 ports.

### 5.3 Hub

A **hub** is a multi-port repeater. When data arrives on one port, the hub **copies it to all other ports**, whether needed or not.

```
        PC-A ──┐
        PC-B ──┤
        PC-C ──┼── HUB  (broadcasts every frame to ALL ports)
        PC-D ──┘
```

- Works at the **Physical layer (Layer 1)**.
- All devices on a hub are in **one collision domain** and **one broadcast domain**. If two PCs send together, a *collision* occurs.
- Works in **half-duplex** only; bandwidth is **shared** among all devices (a 100 Mbps hub with 4 PCs gives each about 25 Mbps).
- No security (every device can see everyone's data).

**Types of hubs:**
| Type | Description |
|---|---|
| Passive hub | Only connects cables; no signal regeneration |
| Active hub | Regenerates/amplifies the signal (acts like a repeater) |
| Intelligent hub | Active hub with management features (monitoring, diagnostics) |

Hubs are now obsolete because switches are cheap and much better.

### 5.4 Bridge

A **bridge** connects **two LAN segments** and works at the **Data Link layer (Layer 2)**. It reads the **MAC address** in each frame and decides whether to forward the frame to the other segment or keep it local.

```
 Segment 1                         Segment 2
 PC-A  PC-B                        PC-C  PC-D
   │    │                            │    │
 ──┴────┴──────[   BRIDGE   ]────────┴────┴──
```

**How a transparent (learning) bridge works:**
1. **Learning** – When a frame arrives, the bridge notes the source MAC address and the port it came from, and stores it in a **forwarding table**.
2. **Forwarding** – If the destination MAC is in the table on the *other* port, forward it there.
3. **Filtering** – If the destination is on the *same* segment, the bridge drops it (does not forward) — this reduces unnecessary traffic.
4. **Flooding** – If the destination MAC is unknown, send to all ports except the one it arrived on.

Key points:
- Bridge divides a network into **separate collision domains** (but the broadcast domain remains one).
- Usually 2 or a few ports, software-based forwarding.
- Uses the **Spanning Tree Protocol (STP)** to avoid loops.

### 5.5 Switch

A **switch** is a *multi-port bridge* implemented in hardware (ASICs), so it is much faster. It works at **Layer 2** (Layer-3 switches also exist).

```
        PC-A ──┐
        PC-B ──┤
        PC-C ──┼── SWITCH  (sends frame ONLY to the destination port)
        PC-D ──┘
```

**Working:**
- It builds a **MAC address table** (also called CAM table) mapping *MAC address → port* by learning source addresses.
- Frames are sent **only** to the port of the destination (unicast). Unknown destination or broadcast frames are flooded.
- **Every port is its own collision domain**, so collisions disappear and full-duplex is possible. Each device gets the full port bandwidth.

**Switching methods:**

| Method | What it does | Speed | Error checking |
|---|---|---|---|
| **Store-and-Forward** | Receives the whole frame, checks CRC, then forwards | Slowest | Best |
| **Cut-Through** | Starts forwarding after reading the destination MAC (first 6 bytes) | Fastest | None |
| **Fragment-Free** | Reads the first 64 bytes (to filter collision fragments) then forwards | Medium | Partial |

**Other features:**
- **VLAN (Virtual LAN)** – a switch can be logically divided into several separate broadcast domains.
- **Managed vs unmanaged** – managed switches can be configured (VLANs, port security, QoS), unmanaged ones are plug-and-play.
- **Layer-3 switch** – a switch that can also route between VLANs.

### 5.6 Router

A **router** connects **different networks** and works at the **Network layer (Layer 3)**. It examines the **IP address** of each packet and decides the best path (route) towards the destination.

```
 Network A (192.168.1.0/24)              Network B (10.0.0.0/8)
   PC ──── Switch ──────[ ROUTER ]────── Switch ──── Server
                           │
                        INTERNET
```

**Functions of a router:**
1. **Routing** – chooses the best path using a **routing table**.
2. **Forwarding** – moves packets from input interface to output interface.
3. **Separates broadcast domains** – broadcasts do **not** pass through a router. Each router interface is its own broadcast domain.
4. **NAT (Network Address Translation)** – lets many private devices share one public IP.
5. **Security/filtering** – can block traffic using Access Control Lists (ACLs).
6. **Connects LAN to WAN/Internet**.

**Routing table (example):**
```
Destination        Next Hop        Interface
192.168.1.0/24     directly        Fa0/0
10.0.0.0/8         directly        Fa0/1
0.0.0.0/0          203.0.113.1     Se0/0   (default route → Internet)
```

### 5.7 Other Related Devices

| Device | Layer | Purpose |
|---|---|---|
| **Gateway** | Any (often 3–7) | Connects networks that use *different protocols* by translating between them |
| **Modem** | 1 | Converts digital data to analog signals for phone/cable lines and back (MODulator–DEModulator) |
| **Wireless Access Point (AP)** | 2 | Connects Wi-Fi devices to a wired network |

### 5.8 Comparison of Hub, Bridge, Switch and Router

| Feature | Hub | Bridge | Switch | Router |
|---|---|---|---|---|
| OSI Layer | 1 (Physical) | 2 (Data Link) | 2 (Data Link) | 3 (Network) |
| Address used | None | MAC | MAC | IP |
| Number of ports | Many | 2–4 | Many | Few |
| Data sent as | Bits | Frames | Frames | Packets |
| Collision domains | 1 for all ports | 1 per port | 1 per port | 1 per port |
| Broadcast domains | 1 | 1 | 1 (per VLAN) | 1 per interface |
| Intelligence | None | Learns MACs | Learns MACs | Learns routes |
| Duplex | Half | Half/Full | Full | Full |
| Speed | Slow | Medium | Fast | Slower than switch |

### 5.9 Practical: Seeing These Devices Work

**A. ARP table – which MAC addresses has my PC learned?**
```bash
arp -a
```
Output:
```
Interface: 192.168.1.5
  Internet Address      Physical Address      Type
  192.168.1.1           a4-2b-b0-11-22-33     dynamic     <- your router
  192.168.1.8           f0-18-98-aa-bb-cc     dynamic
```

**B. Find your router (default gateway) and the path to the Internet**
```bash
ipconfig                # Windows – look for "Default Gateway"
ip route                # Linux – look for "default via ..."
tracert google.com      # Windows
traceroute google.com   # Linux/macOS
```
`tracert` output lists each **router (hop)** the packet crosses, with the time for each hop:
```
  1     1 ms    1 ms    1 ms   192.168.1.1        <- your home router
  2     8 ms    7 ms    8 ms   10.20.0.1          <- ISP router
  3    15 ms   14 ms   15 ms   72.14.215.85       <- ISP backbone
  ...
```
This shows that routers connect separate networks hop by hop.

**C. Cisco Packet Tracer lab – Hub vs Switch**
1. Place 1 **hub** and 3 PCs (PC0, PC1, PC2). Connect with Copper Straight-Through cables. Give IPs 192.168.1.1/24, .2/24, .3/24.
2. Switch to *Simulation mode*, and send a ping from PC0 to PC1. Observe: the hub **forwards the frame to all ports**, including PC2.
3. Replace the hub with a **switch** and repeat. Observe: the first frame is flooded (the switch does not know the MAC yet), but the later frames go **only** to PC1.
4. Open the switch CLI and view its learned MAC table:
```
Switch> enable
Switch# show mac address-table
          Mac Address Table
-------------------------------------------
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
   1    0001.4321.a1b2    DYNAMIC     Fa0/1
   1    0002.1643.c3d4    DYNAMIC     Fa0/2
```

**D. Basic Cisco router configuration (Packet Tracer)**
```
Router> enable
Router# configure terminal
Router(config)# interface fastEthernet 0/0
Router(config-if)# ip address 192.168.1.1 255.255.255.0
Router(config-if)# no shutdown
Router(config-if)# exit
Router(config)# interface fastEthernet 0/1
Router(config-if)# ip address 10.0.0.1 255.0.0.0
Router(config-if)# no shutdown
Router(config-if)# end
Router# show ip route
```
After this, set each PC's *default gateway* to the router interface on its side, and PCs of the two networks can ping each other.

**E. Python program – simulating a learning switch**
```python
mac_table = {}   # MAC address -> port number

def receive_frame(src_mac, dst_mac, in_port, total_ports=4):
    # 1. Learning: remember which port the source is on
    mac_table[src_mac] = in_port

    # 2. Forwarding decision
    if dst_mac in mac_table:
        print(f"Forward to port {mac_table[dst_mac]} only")
    else:
        others = [p for p in range(1, total_ports + 1) if p != in_port]
        print(f"Unknown destination -> FLOOD to ports {others}")

receive_frame("AA", "BB", 1)   # BB not known yet
receive_frame("BB", "AA", 2)   # AA was learned from first frame
receive_frame("AA", "BB", 1)   # now both known
print("MAC table:", mac_table)
```
Output:
```
Unknown destination -> FLOOD to ports [2, 3, 4]
Forward to port 1 only
Forward to port 2 only
MAC table: {'AA': 1, 'BB': 2}
```
This exactly shows how a switch learns MAC addresses and then stops flooding.

---

## Summary of Unit I

- **Data communication** needs five components: message, sender, receiver, medium and protocol. Data flows in **simplex, half-duplex or full-duplex** mode.
- A **computer network** connects devices for sharing data and resources; its quality is judged by performance, reliability and security.
- **Bandwidth** is capacity, **throughput** is actual speed, **latency** = propagation + transmission + queuing + processing delay. Signals suffer **attenuation, distortion and noise**; **Nyquist** and **Shannon** formulas give the data-rate limits.
- **Twisted pair** (UTP/STP, RJ-45, 100 m) is cheap and common in LANs; **coaxial cable** (core + shield) is used for cable TV and old LANs; **optical fiber** (light, TIR, single/multimode) gives huge bandwidth, long distance and EMI immunity.
- **Hub** (Layer 1, broadcasts to all), **Bridge** (Layer 2, connects two segments using MAC table), **Switch** (Layer 2, multi-port hardware bridge, one collision domain per port), **Router** (Layer 3, forwards by IP address, separates broadcast domains).
