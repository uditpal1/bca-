# UNIT – IV: Ethernet, Wireless Standards, Error Detection and Correction

---

# PART A: ETHERNET AND OTHER LAN STANDARDS

## 1. IEEE 802 Standards – Overview

The **IEEE (Institute of Electrical and Electronics Engineers)** created the **IEEE 802 project** to standardise LANs and MANs. These standards work at the **Physical and Data Link layers** of the OSI model. The Data Link layer is divided into two sub-layers:

```
 ┌──────────────────────────────────────────────┐
 │  Data Link Layer                             │
 │   ┌────────────────────────────────────────┐ │
 │   │ LLC – Logical Link Control (IEEE 802.2)│ │  common for all LANs
 │   ├────────────────────────────────────────┤ │
 │   │ MAC – Media Access Control             │ │  different for each standard
 │   └────────────────────────────────────────┘ │
 ├──────────────────────────────────────────────┤
 │  Physical Layer                              │
 └──────────────────────────────────────────────┘
```

| Standard | Technology |
|---|---|
| **IEEE 802.3** | Ethernet (wired LAN) |
| **IEEE 802.11** | Wi-Fi (wireless LAN) |
| **IEEE 802.15.1** | Bluetooth (PAN) |
| **IEEE 802.15.4** | ZigBee (low-power PAN) |
| **IEEE 802.16** | WiMAX (wireless MAN) |
| IEEE 802.5 | Token Ring |
| IEEE 802.1Q | VLAN tagging |

---

## 2. Ethernet (IEEE 802.3)

**Ethernet** is the most widely used wired LAN technology in the world. It was invented by **Robert Metcalfe** at Xerox PARC in 1973 (10 Mbps, thick coaxial cable) and standardised as **IEEE 802.3** in 1983. Over the years its speed has grown from 10 Mbps to 400 Gbps while keeping the same basic frame format, so old and new equipment still work together.

### 2.1 Ethernet Frame Format

Every piece of data sent on an Ethernet LAN is packed in a **frame**:

```
┌──────────┬─────┬──────────┬──────────┬────────┬────────────────┬───────┐
│ Preamble │ SFD │   Dest   │  Source  │ Type / │      Data      │  FCS  │
│          │     │   MAC    │   MAC    │ Length │   (Payload)    │ (CRC) │
│  7 bytes │ 1 B │  6 bytes │  6 bytes │ 2 B    │  46 – 1500 B   │ 4 B   │
└──────────┴─────┴──────────┴──────────┴────────┴────────────────┴───────┘
 ◄── Physical-layer header ──►◄──────────── Frame (64 – 1518 bytes) ─────────►
```

| Field | Size | Purpose |
|---|---|---|
| **Preamble** | 7 bytes | Pattern `10101010…` that lets the receiver synchronise its clock |
| **SFD (Start Frame Delimiter)** | 1 byte | `10101011` – signals "frame starts now" |
| **Destination address** | 6 bytes | MAC address of the receiving NIC |
| **Source address** | 6 bytes | MAC address of the sending NIC |
| **Type / Length** | 2 bytes | Which upper-layer protocol is inside (e.g., `0x0800` = IPv4, `0x0806` = ARP, `0x86DD` = IPv6) or the length of data |
| **Data (Payload)** | 46 – 1500 bytes | The actual data (an IP packet). If smaller than 46 bytes, **padding** is added. **1500 bytes = MTU** |
| **FCS (Frame Check Sequence)** | 4 bytes | **CRC-32** for error detection (explained below) |

- **Minimum frame size = 64 bytes** (14 header + 46 data + 4 CRC) – needed for CSMA/CD collision detection (Unit III).
- **Maximum frame size = 1518 bytes** (14 + 1500 + 4).

### 2.2 MAC (Physical) Address
- **48 bits (6 bytes)** written in hexadecimal, e.g., `A4:2B:B0:11:22:33` or `A4-2B-B0-11-22-33`.
- First 3 bytes = **OUI** (Organisationally Unique Identifier) assigned to the manufacturer; last 3 bytes = serial number given by the manufacturer.
- Types of addresses:

| Type | Meaning | Example |
|---|---|---|
| **Unicast** | One specific device | `A4:2B:B0:11:22:33` (least-significant bit of first byte = 0) |
| **Multicast** | A group of devices | `01:00:5E:xx:xx:xx` (LSB of first byte = 1) |
| **Broadcast** | All devices on the LAN | `FF:FF:FF:FF:FF:FF` |

### 2.3 Ethernet Standards (Evolution)

**Naming rule:** `<speed><signalling>-<medium>` → e.g., **10BASE-T** = 10 Mbps, **BASE**band signalling, **T**wisted pair. For `10BASE5`, the 5 means 500 m maximum segment length; for `10BASE2`, 2 means ≈200 m (185 m).

| Generation | Standard | Speed | Medium | Max segment | Notes |
|---|---|---|---|---|---|
| **Standard (Traditional) Ethernet** | 10BASE5 (Thicknet) | 10 Mbps | Thick coax | 500 m | Bus, vampire taps |
| | 10BASE2 (Thinnet) | 10 Mbps | Thin coax (RG-58) | 185 m | Bus, BNC T-connectors |
| | **10BASE-T** | 10 Mbps | Cat3 UTP (2 pairs) | 100 m | Star with hub |
| | 10BASE-F (FL) | 10 Mbps | Fiber | 2 km | |
| **Fast Ethernet** (802.3u) | **100BASE-TX** | 100 Mbps | Cat5 UTP (2 pairs) | 100 m | Most common |
| | 100BASE-T4 | 100 Mbps | Cat3 UTP (4 pairs) | 100 m | Obsolete |
| | 100BASE-FX | 100 Mbps | Multimode fiber | 2 km | |
| **Gigabit Ethernet** (802.3ab/z) | **1000BASE-T** | 1 Gbps | Cat5e/6 UTP (4 pairs) | 100 m | Common in PCs today |
| | 1000BASE-SX | 1 Gbps | Multimode fiber | 550 m | |
| | 1000BASE-LX | 1 Gbps | Single-mode / multimode fiber | 5 km (SMF) | |
| **10 Gigabit Ethernet** (802.3ae/an) | 10GBASE-T | 10 Gbps | Cat6a UTP | 100 m | |
| | 10GBASE-SR / LR | 10 Gbps | Multimode / single-mode fiber | 300 m / 10 km | Data centres, backbones |
| **40/100/400 Gigabit** | 40GBASE-*, 100GBASE-*, 400GBASE-* | 40–400 Gbps | Fiber | – | ISPs, cloud data centres |

**Key changes with time:**
1. Bus (coax) → **star** with twisted pair.
2. **Hubs → Switches**, giving full-duplex links and **no collisions** (so CSMA/CD no longer needed).
3. Higher speeds by using better cables and encoding, but the **same frame format** is kept.

### 2.4 Practical: Exploring Ethernet on Your Computer

**A. Find the MAC address, speed and duplex of your Ethernet adapter**
```bash
ipconfig /all                  # Windows → "Physical Address"
Get-NetAdapter                 # Windows PowerShell → LinkSpeed column (e.g., 1 Gbps)
ip link show                   # Linux → link/ether
sudo ethtool eth0              # Linux → Speed: 1000Mb/s  Duplex: Full
```

**B. Look at an Ethernet frame in Wireshark**
1. Start capturing on your Ethernet/Wi-Fi interface.
2. Click any packet and expand **Ethernet II**:
```
Ethernet II, Src: a4:2b:b0:11:22:33, Dst: ff:ff:ff:ff:ff:ff
    Destination: Broadcast (ff:ff:ff:ff:ff:ff)
    Source: a4:2b:b0:11:22:33
    Type: ARP (0x0806)
```
3. Filter `arp` to see broadcast frames (destination `ff:ff:ff:ff:ff:ff`) and `eth.dst == ff:ff:ff:ff:ff:ff`.

**C. Python – decode the header of an Ethernet frame**
```python
import struct

# A sample frame: broadcast ARP frame (header + 46 bytes of padding)
raw = bytes.fromhex("ffffffffffff" "a42bb0112233" "0806") + b"\x00" * 46

dst, src, eth_type = struct.unpack("!6s6sH", raw[:14])     # 6 + 6 + 2 bytes
mac = lambda b: ":".join(f"{x:02x}" for x in b)

print("Destination MAC :", mac(dst))
print("Source MAC      :", mac(src))
print("Type            :", hex(eth_type), "(ARP)" if eth_type == 0x0806 else "")
print("Frame length    :", len(raw) + 4, "bytes (including 4-byte FCS)")
```
Output:
```
Destination MAC : ff:ff:ff:ff:ff:ff
Source MAC      : a4:2b:b0:11:22:33
Type            : 0x806 (ARP)
Frame length    : 64 bytes (including 4-byte FCS)
```
The frame is exactly the minimum size of 64 bytes, because the data was padded up to 46 bytes.

---

## 3. Wi-Fi (IEEE 802.11) – Wireless LAN

**Wi-Fi** is the brand name (of the Wi-Fi Alliance) for wireless LAN products based on the **IEEE 802.11** standards. It connects laptops, phones, TVs and IoT devices to a LAN/Internet using **radio waves**, without cables.

### 3.1 Architecture and Terms

```
                          ┌── Distribution System (wired LAN) ──┐
                          │                                     │
                      [ AP-1 ]                              [ AP-2 ]
                      ((( )))                               ((( )))
                    ╱    │    ╲                          ╱    │    ╲
                 STA   STA   STA                      STA   STA   STA
                 └─── BSS-1 ───┘                      └─── BSS-2 ───┘
                 └──────────────── ESS (same SSID) ───────────────┘
```

| Term | Meaning |
|---|---|
| **STA (Station)** | Any Wi-Fi device (phone, laptop) |
| **AP (Access Point)** | Device that connects Wi-Fi stations to the wired network (your Wi-Fi router) |
| **BSS (Basic Service Set)** | One AP and the stations connected to it |
| **ESS (Extended Service Set)** | Several BSSs joined by a wired distribution system, giving roaming |
| **SSID** | The name of the Wi-Fi network |
| **Infrastructure mode** | Stations communicate through an AP (normal mode) |
| **Ad hoc (IBSS) mode** | Stations talk directly to each other, no AP |

### 3.2 Access Method
Wi-Fi uses **CSMA/CA** (see Unit III) with ACKs and optional RTS/CTS, because wireless stations cannot detect collisions.

### 3.3 Wi-Fi Standards

| IEEE standard | Wi-Fi name | Year | Frequency | Max theoretical rate | Features |
|---|---|---|---|---|---|
| 802.11 | – | 1997 | 2.4 GHz | 2 Mbps | First standard |
| 802.11b | – | 1999 | 2.4 GHz | 11 Mbps | Long range, cheap |
| 802.11a | – | 1999 | 5 GHz | 54 Mbps | OFDM, less interference, shorter range |
| 802.11g | – | 2003 | 2.4 GHz | 54 Mbps | Backward compatible with b |
| 802.11n | **Wi-Fi 4** | 2009 | 2.4 & 5 GHz | up to 600 Mbps | **MIMO** (multiple antennas), channel bonding |
| 802.11ac | **Wi-Fi 5** | 2013 | 5 GHz | up to ~3.5 Gbps | MU-MIMO (downlink), 160 MHz channels |
| 802.11ax | **Wi-Fi 6 / 6E** | 2019 | 2.4, 5 (and 6 GHz in 6E) | up to ~9.6 Gbps | **OFDMA**, better for crowded places |
| 802.11be | **Wi-Fi 7** | 2024 | 2.4, 5, 6 GHz | up to ~46 Gbps | 320 MHz channels, Multi-Link Operation |

*Real speeds are much lower than the theoretical maximum.*

### 3.4 Bands and Channels
- **2.4 GHz:** longer range, passes through walls better, but crowded (microwaves, Bluetooth). It has 13 channels (India: 1–13), but only **1, 6 and 11** do not overlap.
- **5 GHz:** higher speed, less crowded, shorter range.
- **6 GHz (Wi-Fi 6E/7):** the least congested, highest speed, shortest range.

### 3.5 Wi-Fi Security

| Protocol | Status |
|---|---|
| **WEP** | Broken – never use |
| **WPA** (TKIP) | Weak – obsolete |
| **WPA2** (AES-CCMP) | Good, widely used |
| **WPA3** | Best – stronger password protection (SAE), protection against offline guessing |

### 3.6 Practical: Exploring Wi-Fi

```bash
# Windows – list nearby networks with signal strength, channel, band, security
netsh wlan show networks mode=bssid

# Windows – details of the current connection (standard, channel, speed)
netsh wlan show interfaces

# Linux
nmcli dev wifi list
iwconfig wlan0
```
Sample output of `netsh wlan show interfaces`:
```
SSID               : College-WiFi
Radio type         : 802.11ac
Authentication     : WPA2-Personal
Channel            : 36
Receive rate (Mbps): 433
Transmit rate (Mbps): 433
Signal             : 88%
```
From this you can read the Wi-Fi standard (802.11ac = Wi-Fi 5), channel (36 means 5 GHz band), and signal quality.

**Tip:** If the signal is weak or the network is slow, change the router to a less crowded channel (use 1, 6 or 11 on 2.4 GHz) or use the 5 GHz band.

---

## 4. ZigBee (IEEE 802.15.4)

**ZigBee** is a wireless technology designed for **low-power, low-data-rate, low-cost, short-range** communication, especially for **IoT (Internet of Things)** devices that run for years on small batteries. The physical and MAC layers come from **IEEE 802.15.4**, and the network and application layers are defined by the **ZigBee Alliance**.

### 4.1 Key Features
- **Data rate:** 20 kbps (868 MHz), 40 kbps (915 MHz), **250 kbps (2.4 GHz, 16 channels)**.
- **Range:** about 10–100 m (more with mesh).
- **Very low power** – devices sleep most of the time.
- **Self-forming, self-healing mesh network** – up to thousands of nodes.
- **Security:** AES-128 encryption.
- **Access method:** CSMA/CA.

### 4.2 Device Types

| Device | Role |
|---|---|
| **Coordinator (ZC)** | One per network; forms the network, chooses the channel, stores network information, acts as trust centre |
| **Router (ZR)** | Passes messages for other nodes, extends the range; always powered on |
| **End Device (ZED)** | Simple sensor/actuator; sleeps to save battery; talks only through its parent (router/coordinator) |

### 4.3 Topologies

```
   STAR                     TREE                         MESH
     E   E                    C                          R ─── R
      \ /                    / \                         │ ╲ ╱ │
   E ─ C ─ E               R     R                       C ─ R ─ R
      / \                 / \     \                       │     ╲
     E   E               E   E     E                      E      E
 (C = Coordinator, R = Router, E = End device)
```

### 4.4 Applications
Smart home lighting, smart meters, door sensors, industrial monitoring, medical sensors, agriculture sensors.

---

## 5. Comparison of Wi-Fi, Bluetooth and ZigBee (and Ethernet)

| Feature | Ethernet (802.3) | Wi-Fi (802.11) | Bluetooth (802.15.1) | ZigBee (802.15.4) |
|---|---|---|---|---|
| Medium | Wired (copper/fiber) | Radio 2.4/5/6 GHz | Radio 2.4 GHz | Radio 2.4 GHz / 868 / 915 MHz |
| Range | 100 m per copper segment | 30–100 m | ~10 m (Class 2) | 10–100 m (mesh extends) |
| Data rate | 10 Mbps – 400 Gbps | Up to Gbps | 1–3 Mbps (classic), 2 Mbps (BLE) | 20–250 kbps |
| Power use | Plugged in | High | Low | **Very low** |
| Topology | Star (switch) | Star (AP) | Piconet / scatternet | Star, tree, **mesh** |
| Access method | CSMA/CD (full-duplex now) | CSMA/CA | Master–slave polling (TDD) | CSMA/CA |
| Typical use | LAN, data centres | Internet access | Headphones, wearables | Smart home, sensors |

---

# PART B: ERROR DETECTION AND CORRECTION

## 6. Why Do Errors Occur?

When bits travel through a medium, **noise, attenuation, interference or crosstalk** can change a bit (0 becomes 1 or 1 becomes 0). The receiver must know whether the data it got is correct.

### 6.1 Types of Errors

**1. Single-bit error** – only **one** bit in the data unit is changed.
```
Sent:      0 1 0 0 1 1 0 1
Received:  0 1 0 1 1 1 0 1      (4th bit flipped)
```

**2. Burst error** – **two or more** bits are changed. Burst length is measured from the **first corrupted bit to the last corrupted bit** (not all bits in between must be wrong). Burst errors are more common than single-bit errors, because noise usually lasts for a short duration and affects many consecutive bits.
```
Position:   1 2 3 4 5 6 7 8
Sent:       0 1 0 0 1 1 0 1
Received:   0 1 1 0 0 0 0 1
                ↑   ↑ ↑          (bits 3, 5 and 6 changed)
```
Here the burst length is **4** (from bit 3, the first corrupted bit, to bit 6, the last corrupted bit), even though bit 4 in between was not changed.

### 6.2 Redundancy
Error detection and correction work by adding **extra (redundant) bits** to the data. The receiver uses these extra bits to check or correct the data. The data plus redundant bits is called a **codeword**.

```
Sender:    DATA (k bits) ──► [ Encoder adds r check bits ] ──► Codeword (n = k + r bits) ──► channel
Receiver:  Codeword ──► [ Decoder: check ] ──► OK → remove check bits, deliver data
                                           └─► Error → detect (ask resend) or correct
```

### 6.3 Detection vs Correction

| Approach | Meaning | Used when |
|---|---|---|
| **Error detection** | Only find out that an error happened; receiver asks for **retransmission (ARQ – Automatic Repeat reQuest)** | Reliable networks like Ethernet, TCP |
| **Error correction (FEC – Forward Error Correction)** | Receiver finds *where* the error is and fixes it itself, without asking again | Satellite, deep-space, mobile, memory (ECC RAM), where resending is costly or impossible |

Correction needs **more redundant bits** than detection.

### 6.4 Hamming Distance (Important Concept)
**Hamming distance** between two codewords = number of bit positions in which they differ.
```
1 0 1 1 0 0 1
1 1 1 0 0 0 1
  ↑   ↑          → differ in 2 positions → Hamming distance d = 2
```
**Minimum Hamming distance (d_min)** of a code = smallest distance between any two valid codewords. It decides the power of the code:

| Capability | Needed minimum distance |
|---|---|
| **Detect** up to **s** errors | d_min ≥ **s + 1** |
| **Correct** up to **t** errors | d_min ≥ **2t + 1** |
| Correct t errors **and** detect s errors | d_min ≥ t + s + 1 |

Example: d_min = 3 → can detect 2 errors, **or** correct 1 error. d_min = 5 → can correct 2 errors.

---

## 7. Parity Check

### 7.1 Simple Parity (Single Parity Bit)
One extra bit (**parity bit**) is added so that the total number of 1s becomes **even** (even parity) or **odd** (odd parity).

**Example (even parity):** Data = `1011001` → number of 1s = 4 (already even) → parity bit = `0` → sent `10110010`.
Data = `1011011` → number of 1s = 5 (odd) → parity bit = `1` → sent `10110111`.

**Receiver:** counts 1s in the received codeword. If the count is not even → error detected.

**Limitations:**
- Detects only an **odd number of bit errors** (1, 3, 5, …). If **2 bits** flip, the parity stays correct and the error goes **unnoticed**.
- Cannot tell *which* bit is wrong (no correction).
- Weak against burst errors.

### 7.2 Two-Dimensional (2D) Parity Check
Data is arranged in a table (rows × columns). A parity bit is calculated for **each row** and for **each column**.

**Example (even parity):** 4 rows of 7 bits each.

```
Data rows              Row parity
1 1 0 0 1 1 0    →         0
1 0 1 1 0 1 0    →         0
0 0 1 1 1 0 0    →         1
1 0 0 0 0 0 1    →         0
─────────────────
Column parity:
1 1 0 0 0 0 1    →         1
```
Transmitted data: rows `11001100`, `10110100`, `00111001`, `10000010` and the parity row `11000011`.

**Error detection/correction:** If **one bit** flips, exactly **one row** and **one column** show wrong parity – the intersection is the wrong bit, so a **single-bit error can be located and corrected**. 2D parity detects any 1, 2 or 3 bit errors, and many burst errors. (It can still miss 4 errors forming a rectangle.)

### 7.3 Practical: Parity in Python
```python
def add_parity(data, even=True):
    p = data.count("1") % 2          # 1 if number of 1s is odd
    if not even:
        p ^= 1
    return data + str(p)

def check_parity(code, even=True):
    ones = code.count("1")
    return (ones % 2 == 0) if even else (ones % 2 == 1)

sent = add_parity("1011001")
print("Sent codeword      :", sent)                        # 10110010
print("Check (no error)   :", check_parity(sent))          # True

one_error = "10110011"                                     # last bit flipped
print("Check (1-bit error):", check_parity(one_error))     # False -> error detected

two_errors = "10010011"                                    # 2 bits flipped
print("Check (2-bit error):", check_parity(two_errors))    # True -> NOT detected!
```
Output:
```
Sent codeword      : 10110010
Check (no error)   : True
Check (1-bit error): False
Check (2-bit error): True
```
The last line demonstrates the main weakness of simple parity.

**2D parity program:**
```python
def parity_2d(rows):
    out = [r + str(r.count("1") % 2) for r in rows]                       # row parity
    last = "".join(str(sum(int(r[i]) for r in out) % 2) for i in range(len(out[0])))
    return out + [last]                                                    # column parity row

for line in parity_2d(["1100110", "1011010", "0011100", "1000001"]):
    print(line)
```
Output:
```
11001100
10110100
00111001
10000010
11000011
```

---

## 8. Checksum (Brief)
The sender divides the data into 16-bit words, **adds them** (with end-around carry, i.e., one's complement addition), and sends the **complement of the sum** as the checksum. The receiver adds all the words including the checksum; if the result is all 1s (after complement, zero) the data is accepted. It is used in **IP, TCP and UDP headers**. It is easy to compute in software but weaker than CRC.

```python
def internet_checksum(words16):
    s = 0
    for w in words16:
        s += w
        s = (s & 0xFFFF) + (s >> 16)      # add the carry back (end-around carry)
    return (~s) & 0xFFFF

# Words of an example IPv4 header with the checksum field set to 0
header = [0x4500, 0x0073, 0x0000, 0x4000, 0x4011, 0xC0A8, 0x0001, 0xC0A8, 0x00C7]
print(hex(internet_checksum(header)))      # 0xb861
```

---

## 9. Single-Bit Error Detection and Correction – Hamming Code

**Hamming code** (invented by Richard Hamming, 1950) can **detect up to 2 errors and correct 1 error** (minimum distance 3). It adds several **parity (check) bits** placed at special positions in the codeword.

### 9.1 How Many Parity Bits Are Needed?
For **m** data bits and **r** parity bits, the total codeword length is **n = m + r**. The r bits must be able to point to any one of the n positions **or** say "no error" (so n + 1 possibilities):

```
2^r  ≥  m + r + 1
```

| Data bits (m) | Parity bits (r) | Codeword (n) | Name |
|---|---|---|---|
| 4 | 3 | 7 | Hamming (7,4) |
| 7 | 4 | 11 | Hamming (11,7) |
| 8 | 4 | 12 | – |
| 11 | 4 | 15 | Hamming (15,11) |

### 9.2 Position of the Bits
Number the bit positions from **1** (left). The **parity bits are placed at positions that are powers of 2** (1, 2, 4, 8, …); all other positions hold data bits.

```
Position:   1    2    3    4    5    6    7
Bit:       p1   p2   d1   p4   d2   d3   d4
```

Each parity bit checks a particular group of positions – those whose **binary position number has a 1 in the bit that parity represents**:

| Parity bit | Checks positions | Reason (binary) |
|---|---|---|
| **p1** (position 1) | 1, 3, 5, 7, 9, 11 … | positions with the 1st (rightmost) bit = 1 |
| **p2** (position 2) | 2, 3, 6, 7, 10, 11 … | positions with the 2nd bit = 1 |
| **p4** (position 4) | 4, 5, 6, 7, 12, 13 … | positions with the 3rd bit = 1 |
| **p8** (position 8) | 8–15 … | positions with the 4th bit = 1 |

### 9.3 Encoding Example (Even Parity)
**Data = 1011** (m = 4, so r = 3, n = 7).

Place data in the data positions: position 3 = 1, position 5 = 0, position 6 = 1, position 7 = 1.

```
Position:   1   2   3   4   5   6   7
Bit:        p1  p2  1   p4  0   1   1
```

- **p1** checks positions 1, 3, 5, 7 → data bits (3,5,7) = 1, 0, 1 → sum = 2 (even) → **p1 = 0**
- **p2** checks positions 2, 3, 6, 7 → bits (3,6,7) = 1, 1, 1 → sum = 3 (odd) → **p2 = 1** (to make it even)
- **p4** checks positions 4, 5, 6, 7 → bits (5,6,7) = 0, 1, 1 → sum = 2 (even) → **p4 = 0**

```
Position:   1   2   3   4   5   6   7
Codeword:   0   1   1   0   0   1   1      → transmitted: 0110011
```

### 9.4 Decoding and Correcting an Error
Suppose **position 5** gets flipped during transmission: received = `0110111`.

```
Position:   1   2   3   4   5   6   7
Received:   0   1   1   0   1   1   1
```

The receiver recalculates each parity group **including the received parity bit**:

- **c1** = parity of positions 1, 3, 5, 7 → 0 + 1 + 1 + 1 = 3 (odd) → **c1 = 1**
- **c2** = parity of positions 2, 3, 6, 7 → 1 + 1 + 1 + 1 = 4 (even) → **c2 = 0**
- **c4** = parity of positions 4, 5, 6, 7 → 0 + 1 + 1 + 1 = 3 (odd) → **c4 = 1**

The **syndrome (error position)** = c4 c2 c1 = `101` (binary) = **5** (decimal) → the bit at **position 5** is wrong. The receiver flips it (1 → 0) and gets the correct codeword `0110011`. Then it removes the parity bits to get the data **1011**.

If the syndrome is `000`, no error was detected.

| Syndrome (c4 c2 c1) | Meaning |
|---|---|
| 000 | No error |
| 001 | Error in position 1 |
| 010 | Error in position 2 |
| 011 | Error in position 3 |
| 100 | Error in position 4 |
| 101 | Error in position 5 |
| 110 | Error in position 6 |
| 111 | Error in position 7 |

### 9.5 Practical: Hamming Code Program in Python
```python
def hamming_encode(data):
    m = len(data)
    r = 0
    while 2**r < m + r + 1:          # find number of parity bits
        r += 1
    n = m + r
    code = [0] * (n + 1)             # index 0 unused, positions 1..n

    j = 0
    for i in range(1, n + 1):        # put data bits in non-power-of-2 positions
        if i & (i - 1) == 0:
            continue                 # power of two -> parity position
        code[i] = int(data[j]); j += 1

    for p in range(r):               # compute each parity bit (even parity)
        pos = 2**p
        s = 0
        for i in range(1, n + 1):
            if i & pos and i != pos:
                s ^= code[i]
        code[pos] = s
    return "".join(map(str, code[1:]))

def hamming_decode(code):
    n = len(code)
    c = [0] + [int(b) for b in code]
    r = 0
    while 2**r < n + 1:
        r += 1
    syndrome = 0
    for p in range(r):
        pos = 2**p
        s = 0
        for i in range(1, n + 1):
            if i & pos:
                s ^= c[i]
        if s:
            syndrome += pos
    if syndrome:
        c[syndrome] ^= 1             # flip the wrong bit
    data = "".join(str(c[i]) for i in range(1, n + 1) if i & (i - 1))
    return syndrome, data

sent = hamming_encode("1011")
print("Codeword sent     :", sent)                       # 0110011

received = list(sent)
received[4] = "1" if received[4] == "0" else "0"         # flip position 5
received = "".join(received)
print("Codeword received :", received)                   # 0110111

pos, data = hamming_decode(received)
print("Error found at position:", pos)
print("Corrected data    :", data)
```
Output:
```
Codeword sent     : 0110011
Codeword received : 0110111
Error found at position: 5
Corrected data    : 1011
```

---

## 10. Double-Error Detection and Double-Error Correction

### 10.1 Double-Error Detection – SEC-DED (Extended Hamming Code)
A plain Hamming code (d_min = 3) cannot reliably handle **two** errors – it may even "correct" the wrong bit and give wrong data. To **detect double errors while still correcting single errors (SEC-DED: Single Error Correction, Double Error Detection)**, add **one extra overall parity bit** over the whole codeword. This raises d_min to **4**.

**Decision table at the receiver:**

| Syndrome (Hamming check) | Overall parity check | Conclusion |
|---|---|---|
| 0 | OK | No error |
| ≠ 0 | **Fail** | **Single error** – located by syndrome, **correct it** |
| 0 | Fail | Error only in the overall parity bit itself |
| ≠ 0 | **OK** | **Double error detected** – cannot correct, request retransmission |

**Example:** Hamming codeword `0110011` has four 1s → overall parity bit = 0 → SEC-DED codeword: `01100110`.
- One bit flips → syndrome points to it, overall parity fails → corrected.
- Two bits flip → syndrome ≠ 0 but overall parity still looks fine → **"double error detected"**.

SEC-DED is used in **ECC memory (RAM) in servers**.

**Python program (builds on the Hamming functions above):**
```python
def secded_encode(data):
    cw = hamming_encode(data)
    return cw + str(cw.count("1") % 2)            # add overall even-parity bit

def secded_decode(code):
    body = code[:-1]
    syndrome, data = hamming_decode(body)
    parity_ok = (code.count("1") % 2 == 0)        # overall parity over entire codeword
    if syndrome == 0 and parity_ok:
        return "No error", data
    if syndrome != 0 and not parity_ok:
        return f"Single error at position {syndrome} -> corrected", data
    if syndrome == 0 and not parity_ok:
        return "Error only in overall parity bit", data
    return "DOUBLE error detected -> cannot correct, resend", None

sent = secded_encode("1011")
print("Sent:", sent)                                         # 01100110

one = list(sent);  one[2] = "0" if one[2] == "1" else "1"    # flip 1 bit
print(secded_decode("".join(one)))

two = list(sent)
for i in (2, 5):                                             # flip 2 bits
    two[i] = "0" if two[i] == "1" else "1"
print(secded_decode("".join(two)))
```
Output:
```
Sent: 01100110
('Single error at position 3 -> corrected', '1011')
('DOUBLE error detected -> cannot correct, resend', None)
```

### 10.2 Double-Error Correction
To **correct two errors** the code needs **d_min ≥ 5** (from d_min ≥ 2t + 1 with t = 2). This needs many more check bits.

**Lower bound on check bits (sphere-packing / Hamming bound):** every possible single and double error pattern must give a *different* syndrome:
```
1 + n + n(n−1)/2  ≤  2^r        (n = m + r)
```
Example: for m = 4 data bits → try r = 5: n = 9 → 1 + 9 + 36 = 46 > 32 ✗; try r = 6: n = 10 → 1 + 10 + 45 = 56 ≤ 64 ✓. So at least **6 check bits** are required for 4 data bits (compared with only 3 for single-error correction).

**Practical codes that correct multiple errors:**

| Code | Capability | Used in |
|---|---|---|
| **BCH codes** (Bose–Chaudhuri–Hocquenghem) | Correct t random errors; e.g., BCH(15,7) corrects **2** errors | Flash memory (SSD), DVB, QR codes |
| **Reed–Solomon codes** | Correct burst errors / symbol errors | CD/DVD, QR codes, satellite, hard disks |
| **Convolutional + Viterbi decoding** | Strong correction for noisy channels | Mobile (GSM), satellite, Wi-Fi |
| **LDPC / Turbo codes** | Near theoretical limit | 5G, Wi-Fi 6, deep-space |

**The simplest double-error-correcting code – repetition code:** send every bit **5 times** (d_min = 5) and the receiver takes the **majority vote**. It corrects any 2 errors per group, but the code rate is only 1/5, so it is very inefficient.

```python
def encode(bits):                       # repeat every bit 5 times
    return [b for b in bits for _ in range(5)]

def decode(coded):                      # majority vote in each group of 5
    return [1 if sum(coded[i:i+5]) >= 3 else 0 for i in range(0, len(coded), 5)]

data = [1, 0, 1, 1]
sent = encode(data)
print("Sent    :", sent)

sent[1] ^= 1; sent[3] ^= 1              # 2 errors inside the first group
print("Received:", sent)
print("Decoded :", decode(sent), "-> correct!" if decode(sent) == data else "-> wrong")
```
Output:
```
Sent    : [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
Received: [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
Decoded : [1, 0, 1, 1] -> correct!
```

---

## 11. Cyclic Redundancy Check (CRC)

**CRC** is the most powerful and most widely used error-**detection** method (not correction). It is used in **Ethernet (CRC-32), Wi-Fi, PPP, USB, ZIP files, storage devices** and many others. It treats the data as a large **binary number (polynomial)** and uses **division** to calculate the check bits (called the CRC or FCS).

### 11.1 Idea
- Sender and receiver agree on a **generator (divisor)** of **r + 1 bits** (the "polynomial").
- Sender appends **r zeros** to the data, divides by the generator using **modulo-2 (XOR) division**, and takes the **r-bit remainder** as the CRC.
- The CRC replaces the appended zeros, and the full codeword is sent (it is now exactly divisible by the generator).
- Receiver divides the received codeword by the same generator: **remainder = 0 → accepted; non-zero → error**.

**Modulo-2 arithmetic:** no carry/borrow. Addition = subtraction = **XOR**: 0⊕0=0, 0⊕1=1, 1⊕0=1, 1⊕1=0.

### 11.2 Polynomial Representation
A bit string is written as a polynomial; each 1 gives a power of x.
- `10011` → x⁴ + x + 1  (bits: x⁴ x³ x² x¹ x⁰ = 1 0 0 1 1)
- `1101` → x³ + x² + 1

### 11.3 Worked Example
**Data = 1101011011, Generator = 10011 (x⁴ + x + 1)** → r = 4.

**Step 1:** Append 4 zeros to data → `11010110110000`.

**Step 2:** Do modulo-2 division by `10011`. At each step look at the leading bit: if it is **1**, XOR with the generator; if it is **0**, XOR with zeros (just shift).

```
Step  Current 5-bit window   Action                     Result (drop leading bit, bring down next bit)
 1    11010                  XOR 10011 → 01001          1001 + next bit(1) → 10011
 2    10011                  XOR 10011 → 00000          0000 + next bit(1) → 00001
 3    00001                  leading 0 → shift          0001 + next bit(0) → 00010
 4    00010                  leading 0 → shift          0010 + next bit(1) → 00101
 5    00101                  leading 0 → shift          0101 + next bit(1) → 01011
 6    01011                  leading 0 → shift          1011 + next bit(0) → 10110
 7    10110                  XOR 10011 → 00101          0101 + next bit(0) → 01010
 8    01010                  leading 0 → shift          1010 + next bit(0) → 10100
 9    10100                  XOR 10011 → 00111          0111 + next bit(0) → 01110
10    01110                  leading 0 → shift          1110  (no more bits)
```
**Remainder (CRC) = 1110**

**Step 3:** Transmitted codeword = data + CRC = `1101011011` + `1110` = **`11010110111110`**.

**Step 4 (Receiver):** divide `11010110111110` by `10011`. The remainder is `0000` → **no error**.
If the received word was corrupted, e.g., `11010010111110`, the remainder would be **non-zero** → error detected → frame discarded.

### 11.4 What Errors Can CRC Detect?
A CRC with an r-bit remainder (degree r generator, including a "+1" term) detects:
- **All single-bit errors**.
- **All double-bit errors** (if the generator has at least three terms and a proper degree).
- **All odd numbers of errors**, if the generator is divisible by (x + 1).
- **All burst errors of length ≤ r**.
- Burst errors of length r + 1 with probability 1 − 2^−(r−1); longer bursts with probability 1 − 2^−r.

For CRC-32, the chance of missing a long random error is about 1 in 4 billion (2⁻³²).

### 11.5 Standard CRC Polynomials

| Name | Bits | Polynomial (hex) | Used in |
|---|---|---|---|
| CRC-8 | 8 | 0x07 | ATM header, small sensors |
| CRC-16 (CCITT) | 16 | 0x1021 | HDLC, Bluetooth, X.25 |
| CRC-16 (IBM) | 16 | 0x8005 | USB, Modbus |
| **CRC-32** | 32 | **0x04C11DB7** | **Ethernet, Wi-Fi, ZIP, PNG** |

### 11.6 Hardware View
CRC is calculated very fast in hardware with a **shift register and XOR gates** placed at positions of the generator's 1 bits – that is why NICs can compute the Ethernet FCS at line speed.

### 11.7 Practical: CRC in Python

**A. Our own modulo-2 division (same method as the hand example)**
```python
def xor(a, b):
    return "".join("0" if x == y else "1" for x, y in zip(a, b))

def crc_remainder(data, generator):
    r = len(generator) - 1
    padded = data + "0" * r                    # append r zeros
    window = padded[:len(generator)]
    for i in range(len(generator), len(padded) + 1):
        if window[0] == "1":
            window = xor(window, generator)    # leading 1 -> XOR with generator
        else:
            window = xor(window, "0" * len(generator))   # leading 0 -> XOR with zeros
        window = window[1:]                    # drop the leading bit
        if i < len(padded):
            window += padded[i]                # bring down next bit
    return window

data, gen = "1101011011", "10011"
crc = crc_remainder(data, gen)
print("CRC (remainder)     :", crc)                        # 1110
codeword = data + crc
print("Transmitted codeword:", codeword)                   # 11010110111110

# Receiver: a valid codeword is exactly divisible by the generator -> remainder 0000
print("Receiver remainder  :", crc_remainder(codeword, gen))        # 0000 -> no error

# Introduce an error (2 bits flipped) and test again
corrupted = "11010010111110"
print("After corruption    :", crc_remainder(corrupted, gen))      # non-zero -> error!
```
Output:
```
CRC (remainder)     : 1110
Transmitted codeword: 11010110111110
Receiver remainder  : 0000
After corruption    : 1111
```

A simpler receiver check (recalculate the CRC on the received data and compare with the received CRC):
```python
def crc_ok(codeword, gen):
    r = len(gen) - 1
    return crc_remainder(codeword[:-r], gen) == codeword[-r:]

print(crc_ok("11010110111110", "10011"))   # True  -> accepted
print(crc_ok("11010010111110", "10011"))   # False -> error detected
```

**B. Real CRC-32 using the standard library (the same algorithm as Ethernet FCS)**
```python
import zlib

frame_data = b"hello"
print(hex(zlib.crc32(frame_data)))                 # 0x3610a686

# Change one character: CRC changes completely
print(hex(zlib.crc32(b"hellp")))
```
Even one-bit change in the data gives a totally different CRC, which is how errors get noticed.

**C. Seeing the Ethernet FCS:** In Wireshark, go to *Edit → Preferences → Protocols → Ethernet* and enable "Validate the Ethernet checksum if possible". Most NICs strip and check the FCS before giving the frame to the OS, so you normally see it only on special capture setups.

### 11.8 Comparison of Error Detection / Correction Methods

| Method | Redundancy | Detects | Corrects | Complexity | Used in |
|---|---|---|---|---|---|
| Simple parity | 1 bit | Odd number of errors | No | Very low | Serial ports, memory |
| 2D parity | Row + column bits | 1–3 errors, many bursts | 1 bit | Low | Old tape/storage |
| Checksum | 16 bits | Most errors | No | Low | IP, TCP, UDP |
| **CRC** | r bits (8–32) | All single/double, bursts ≤ r | No | Medium (fast in hardware) | Ethernet, Wi-Fi, USB, storage |
| **Hamming** | r check bits (log n) | 2 errors | **1 error** | Medium | ECC RAM, simple FEC |
| SEC-DED | Hamming + 1 | 2 errors | 1 error | Medium | Server memory |
| BCH / Reed-Solomon | Many bits | Many | Multiple/burst | High | CD/DVD, SSD, satellite, QR |

---

## Summary of Unit IV

- **Ethernet (IEEE 802.3):** frame = preamble, SFD, destination MAC, source MAC, type/length, data (46–1500 B), CRC-32 FCS; frame size 64–1518 bytes. Standards grew from 10BASE5/10BASE2/10BASE-T (10 Mbps) to Fast (100BASE-TX), Gigabit (1000BASE-T/SX/LX), 10 Gigabit and beyond; switches made full-duplex, collision-free Ethernet.
- **Wi-Fi (IEEE 802.11)** uses CSMA/CA with AP/BSS/ESS architecture; standards a/b/g/n (Wi-Fi 4)/ac (Wi-Fi 5)/ax (Wi-Fi 6)/be (Wi-Fi 7) on 2.4, 5 and 6 GHz bands; security WPA2/WPA3.
- **ZigBee (IEEE 802.15.4)** is a low-power, low-rate (≤250 kbps), mesh-capable technology for IoT with coordinator, router and end devices.
- **Errors** are single-bit or burst; redundancy is added for **detection** (then retransmit) or **correction (FEC)**. **Hamming distance:** detect s errors needs d_min ≥ s+1; correct t errors needs d_min ≥ 2t+1.
- **Parity** (simple, 2D) is simple but weak; **Checksum** is used in IP/TCP/UDP; **Hamming code** (2^r ≥ m+r+1, check bits at power-of-two positions, syndrome gives error position) corrects **single-bit** errors; **extended Hamming (SEC-DED)** adds an overall parity bit to also detect **double** errors; **double-error correction** needs d_min ≥ 5 (BCH, Reed-Solomon, repetition ×5 …).
- **CRC** uses modulo-2 polynomial division with a generator; remainder 0 at the receiver means no error; it detects all single, double (properly chosen generator), odd-number and burst errors ≤ r bits; **CRC-32** is used in Ethernet.
