// Questions data and answer key for the Computer Science Exam

const QUESTIONS = [
    {
        id: 101,
        text: `Determine the maximum length of the cable (in km) for transmitting data at a rate of 500 Mbps in an Ethernet LAN with frames of size 10,000 bits. Assume the signal speed in the cable to be 2,00,000 km/s.`,
        options: {
            A: "1",
            B: "2",
            C: "2.5",
            D: "5"
        }
    },
    {
        id: 102,
        text: `Consider a token ring network with a length of 2 km having 10 stations including a monitoring station. The propagation speed of the signal is 2 108 m/s and the token transmission time is ignored. If each station is allowed to hold the token for 2 msec, the minimum time for which the monitoring station should wait (in msec) before assuming that the token is lost is _________`,
        options: {
            A: "28 to 30",
            B: "20 to 22",
            C: "0 to 2",
            D: "31 to 33"
        }
    },
    {
        id: 103,
        text: `How many 8-bit characters can be transmitted per second over a 9600 baud serial communication link using asynchronous mode of transmission with one start bit, eight data bits, two stops bits, and one parity bit?`,
        options: {
            A: "600",
            B: "800",
            C: "876",
            D: "1200"
        }
    },
    {
        id: 104,
        text: `One of the header fields in an IP datagram is the Time to Live(TTL)field. Which of the following statements best explains the need for this field?`,
        options: {
            A: "It can be used to prioritize packets",
            B: "It can be used to reduce delays",
            C: "It can be used to optimize throughput",
            D: "It can be used to prevent packet looping"
        }
    },
    {
        id: 105,
        text: `Which of the following assertions is FALSE about the Internet Protocol (IP)?`,
        options: {
            A: "It is possible for a computer to have multiple IP address",
            B: "IP packets from the same source to the same destination can take different routes in the network",
            C: "IP ensures that a packet is discarded if it is unable to reach its destination within a given number of hops",
            D: "The packet source cannot set the route of an outgoing packets; the route is determined only by the routing tables in the routers on the way"
        }
    },
    {
        id: 107,
        text: `In the TCP/IP protocol suite, which one of the following is NOT part of the IP header?`,
        options: {
            A: "Fragment Of fset",
            B: "Source IP address",
            C: "Destination IP address",
            D: "Destination port number"
        }
    },
    {
        id: 108,
        text: `If block contains 32 IP address which of the following is first address of the block?`,
        options: {
            A: "10.0.0.5",
            B: "10.0.0.16",
            C: "10.0.0.32",
            D: "10.0.0.160"
        },
        cancelled: true
    },
    {
        id: 109,
        text: `The transport layer protocols used for real time multimedia, file transfer, DNS and e-mail, respectively are:`,
        options: {
            A: "TCP , UDP, UDP and TCP",
            B: "UDP , TCP, TCP and UDP",
            C: "UDP , TCP, UDP and TCP",
            D: "TCP , UDP, TCP and UDP"
        }
    },
    {
        id: 110,
        text: `Which of the following is/are example(s) of stateful application layer protocols? I) HTTP II) FTP III) TCP IV) POP3`,
        options: {
            A: "I and II only",
            B: "II and III only",
            C: "II and IV only",
            D: "IV only"
        }
    },
    {
        id: 111,
        text: `GSM is the digital standard for Europe; What do the letters GSM currently mean?`,
        options: {
            A: "Global Special Mobile",
            B: "Greater System s Mobile",
            C: "Global Systems for Mobile Communications",
            D: "None of the above"
        }
    },
    {
        id: 112,
        text: `In cellular networks, simultaneous users over the same channel is achieved by: I) Digital Technology II) Frequency re-use III) CDMA and TDMA IV) Using VLRs in each area and the HLR in the network switching center.`,
        options: {
            A: "I and II",
            B: "I and III",
            C: "II and III",
            D: "IV only"
        }
    },
    {
        id: 113,
        text: `Which of the following statement is true about spread spectrum:`,
        options: {
            A: "It uses a narrow band frequency",
            B: "Spread spectrum allocates disjoint resources (frequency or time slots depending on the access system) to each user",
            C: "Spread spectrum signals can be picked up by simple receivers",
            D: "Spread spectrum signals are hard to jam and identify"
        }
    },
    {
        id: 114,
        text: `Fragment life cycle in android is ____________`,
        options: {
            A: "onReceive()",
            B: "onCreate()",
            C: "onAttach()->onCreate() - > onCreateView() - > on ActivityCreated() - > onStart() - > onResume()",
            D: "None of the above"
        }
    },
    {
        id: 115,
        text: `What are return types of startActivityForResult() in android?`,
        options: {
            A: "RESUL T_OK",
            B: "RESUL T_CANCEL",
            C: "RESUL T_CRASH",
            D: "(A) and (B)"
        }
    },
    {
        id: 116,
        text: `What is the 9 patch tool in android?`,
        options: {
            A: "Using with tool, we can redraw images in 9 sections",
            B: "image extension tool",
            C: "image editable tool",
            D: "Device feature"
        }
    },
    {
        id: 117,
        text: `Base Adaptor in android is`,
        options: {
            A: "A common class for any adaptor, which can we use for both List view and spinner",
            B: "A kind of adapter",
            C: "Data storage space",
            D: "None of the above"
        }
    },
    {
        id: 118,
        text: `What was the first phone released that ran Android OS?`,
        options: {
            A: "Google gPhone",
            B: "T -mobile G1",
            C: "Motorola Droid",
            D: "HTC Hero"
        }
    },
    {
        id: 119,
        text: `Which of the following is NOT a part of Android native libraries?`,
        options: {
            A: "W ebkit",
            B: "Dalvik",
            C: "OpenGL",
            D: "SQLite"
        }
    },
    {
        id: 120,
        text: `Status data will be exposed to the rest of the Android system via:`,
        options: {
            A: "Intents",
            B: "A content provider",
            C: "Network receivers",
            D: "Altering permissions"
        }
    },
    {
        id: 121,
        text: `If the User Interface (UI) begins to behave sluggishly or crash while making network calls, this is likely due to _________`,
        options: {
            A: "Network latency",
            B: "Hardware malfunctions",
            C: "V irus on the server",
            D: "Activity manager contains too much content"
        }
    },
    {
        id: 122,
        text: `Which of these are not one of the three main components of the APK?`,
        options: {
            A: "Dalvik Executable",
            B: "Resources",
            C: "Native libraries",
            D: "W ebkit"
        }
    },
    {
        id: 123,
        text: `Which one of the following belong to Parent Class of activity`,
        options: {
            A: "Object",
            B: "Context",
            C: "Activity Group",
            D: "Context Theme Wrapper"
        }
    },
    {
        id: 124,
        text: `Once installed on a device, each Android application lives in ______?`,
        options: {
            A: "device memory",
            B: "external memory",
            C: "security sandbox",
            D: "None of the above"
        }
    },
    {
        id: 125,
        text: `The operating system used for Android stack is ________`,
        options: {
            A: "Linux",
            B: "W indows",
            C: "Java",
            D: "XML"
        }
    },
    {
        id: 126,
        text: `Built-in database in Android _________`,
        options: {
            A: "SQLite",
            B: "DB2",
            C: "MySQL",
            D: "Oracle"
        }
    },
    {
        id: 127,
        text: `What is the name of the program that converts Java byte code into Dalvik byte code?`,
        options: {
            A: "Android Interpretive Compiler (AIC)",
            B: "Dalvik Converter",
            C: "Dex Compiler",
            D: "Mobile Interpretive Compiler (MIC)"
        }
    },
    {
        id: 128,
        text: `When an activity doesn t exist in memory it is in _________`,
        options: {
            A: "Starting state",
            B: "Running state",
            C: "Loading state",
            D: "Inexistent state"
        }
    },
    {
        id: 129,
        text: `What does .apk stands for`,
        options: {
            A: "Application Package",
            B: "Application Program Kit",
            C: "Android Proprietary Kit",
            D: "Android Package"
        }
    },
    {
        id: 130,
        text: `How does Google check for malicious software in the android market?`,
        options: {
            A: "Every new app is scanned by a virus scanner",
            B: "Users report malicious software to Google",
            C: "Google employees verify each new app",
            D: "A separate company monitors the Android Market for Google"
        }
    },
    {
        id: 131,
        text: `Insertion of data into B-tree may cause`,
        options: {
            A: "Increase in height",
            B: "No change in height and no change in number of nodes",
            C: "Split of node",
            D: "Any of the above"
        }
    },
    {
        id: 132,
        text: `Which of the following contains overflow pages`,
        options: {
            A: "B trees",
            B: "B+ trees",
            C: "ISAM trees",
            D: "None of the above"
        }
    },
    {
        id: 133,
        text: `The minimum and maximum number of keys in the internal nodes of B Tree, with order 4 is, respectively are`,
        options: {
            A: "1,3",
            B: "2,4",
            C: "1,4",
            D: "2,3"
        }
    },
    {
        id: 134,
        text: `Minimum order of time required to interchange the mth and nth elements of a single linked list is`,
        options: {
            A: "Max(m, n)",
            B: "Min(m, n)",
            C: "m + n",
            D: "m + min(m, n)"
        }
    },
    {
        id: 135,
        text: `The inorder and preorder traversals of a binary tree respectively are dbeafcg and abdecfg , then the postorder traversal of that binary tree is`,
        options: {
            A: "debfgca",
            B: "edbgfca",
            C: "edbfgca",
            D: "defgbca"
        }
    },
    {
        id: 136,
        text: `If the numbers 10, 1, 3, 5, 15, 12, 16 are inserted into an empty binary search tree as per the order given, then the height of the binary search tree is`,
        options: {
            A: "2",
            B: "3",
            C: "4",
            D: "6"
        }
    },
    {
        id: 137,
        text: `The recurrence relation formed for the complexity of binary search is`,
        options: {
            A: "T(n) = T(n/2) +k, k a constant",
            B: "T(n) = 2.T(n/2) +k, k is a constant",
            C: "T(n) = T(n/2) + log n",
            D: "T(n) = T(n/2) + n"
        }
    },
    {
        id: 138,
        text: `Match the following pairs: I. O(log n) (M) Heap sort II. O(n) (N) DFS III. (nlogn) (O) Binary search IV . O(n2) (P) Selecting Kth smallest elements`,
        options: {
            A: "I-P , II-M, III-N, IV-O",
            B: "I-O, II-P, III-M, IV-N",
            C: "I-O, II-N, III-M, IV-P",
            D: "I-O, II-N, III-P, IV-M"
        },
        has_table: true,
        table_type: "matching_table"
    },
    {
        id: 139,
        text: `Find the solution for the following recurrence relation an = 5n2an 1 with a0 = 5`,
        options: {
            A: "an = (n!)2",
            B: "an = 5 (n!)2",
            C: "an = 5n (n!)2",
            D: "an = 5n + 1(n!)2"
        }
    },
    {
        id: 140,
        text: `In a sorted set of n distinct elements we want to find the next higher element after some element y in the set using binary search. What is the runtime complexity of this operation?`,
        options: {
            A: "O(n)",
            B: "O(log n)",
            C: "O(n log n)",
            D: "O(n2)"
        }
    },
    {
        id: 141,
        text: `Consider the following tree and locking sequences:

[TREE DIAGRAM - Please refer to the original PDF or add mermaid diagram]
Tree structure: A at root, B and C as children of A, D and E as children of B, F and G as children of C, H and I as children of E

I. Lock-X(A), Lock-X(B), Lock-X(D), unlock(D), lock-X(F), unlock(F), unlock (B), unlock (A)
II. Lock-X(A), lock-X(E), lock-X(H), unlock (H), unlock(E), unlock (A)
III. Lock-X(B), lock-X(F), lock-X(E), unlock (F), unlock(E), unlock (B)

Which of the above is (are) the valid locking sequence(s) for tree-based protocol?`,
        options: {
            A: "II and III only",
            B: "I only",
            C: "I and III only",
            D: "II only"
        },
        has_diagram: true,
        diagram_type: "tree"
    },
    {
        id: 142,
        text: `The number of different locks used in multi-version two phase locking, is equal to`,
        options: {
            A: "2",
            B: "3",
            C: "4",
            D: "5"
        }
    },
    {
        id: 143,
        text: `Locks held for a short duration are termed as _______`,
        options: {
            A: "Shared locks",
            B: "Exclusive locks",
            C: "Latches",
            D: "Certify locks"
        }
    },
    {
        id: 144,
        text: `Multiple granularity level protocol is especially suited when processing __________ transactions.`,
        options: {
            A: "short transactions that access only a few items(records)",
            B: "long transaction that access entire files",
            C: "Both (A) and (B)",
            D: "None of the above"
        }
    },
    {
        id: 145,
        text: `Consider the transactions T1, T2, T3 with the following schedule S: S : T1: Read (x); T2: Read (z); T1:Read(z); T3:Read(x);T3:Read(y); T1:Write(x); T3:W rite (y);T2:Read(y); T2:W rite(z); T2:Write(y) If the schedule S is serializable, the equivalent serial schedule is ____.`,
        options: {
            A: "it cannot be decided",
            B: "T1,T2,T3",
            C: "T2,T1,T3",
            D: "T3,T2,T1"
        }
    },
    {
        id: 146,
        text: `Which of the following is a false statement?`,
        options: {
            A: "A schedule which is allowed under strict 2PL is always allowed under Basic 2PL",
            B: "A schedule which is allowed under Basic Timestamp protocol is always allowed under Thomas write rule",
            C: "A schedule which is allowed under basic 2PL is always allowed under multi-version 2PL",
            D: "A schedule which is allowed under multi-version 2PL is always allowed under multi-version timestamp protocol"
        }
    },
    {
        id: 147,
        text: `What is true about Thomas s Write rule?`,
        options: {
            A: "Thomas s write rule provides lesser concurrency than time stamp order protocol",
            B: "Thomas s write rule and time stamp order protocol provides same concurrency",
            C: "No comparison between Thomas s write rule time stamp order protocol",
            D: "Thomas s write rule provides greater concurrency than time stamp order protocol"
        }
    },
    {
        id: 148,
        text: `Match the following:

| Term | Definition |
|------|------------|
| P. Recoverable | 1. Tj reads data items written by Ti, the Tj commits after Ti commits |
| Q. Cascadeless | 2. Reading uncommitted data |
| R. Dirty read | 3. Tj reads data items written by Ti, the Ti commits after Tj commits |
| S. Non recoverable | 4. Tj reads data items written by Ti, the commit operation of Ti appears before the read operation of Tj |`,
        options: {
            A: "P-2, Q-1, R-4, S-3",
            B: "P-3, Q-4, R-2, S-1",
            C: "P-2, Q-3, R-4, S-1",
            D: "P-1, Q-4, R-2, S-3"
        },
        has_table: true,
        table_type: "definition_matching"
    },
    {
        id: 149,
        text: `Consider the schedule: T1: R(X) ; T2: R(Y) ; T3:W(X) ; T2:R(X) ; T1:R(Y) The schedule T1 is`,
        options: {
            A: "Not conflict and not view serializable",
            B: "Conflict and view serializable",
            C: "Not conflict, but view serializable",
            D: "Conflict, but not view serializable"
        }
    },
    {
        id: 150,
        text: `Problem of testing view serializability is`,
        options: {
            A: "P Problem",
            B: "NP problem",
            C: "NP hard",
            D: "NP complete"
        }
    },
    {
        id: 151,
        text: `Which of the following is false?`,
        options: {
            A: "Ensuring durability is the responsibility of recovery management component",
            B: "Ensuring isolation is the responsibility of concurrency management",
            C: "Ensuring atomicity or consistency is the responsibility of recovery management component",
            D: "None of the above"
        }
    },
    {
        id: 152,
        text: `Consider the following scenario: T1 consists of 5 operations and T2 consists of 4 operations, then the number of concurrent schedules possible is`,
        options: {
            A: "9!",
            B: "126",
            C: "5!*4!",
            D: "None of the above"
        }
    },
    {
        id: 153,
        text: `Which of the following is true?`,
        options: {
            A: "Schedules which are allowed under Thomas write rule are also allowed under basic timestamp protocol",
            B: "All the schedules which are allowed under basic timestamp are also allowed under multi-version timestamp protocol",
            C: "All the schedules which are allowed under multi-version timestamp protocol are also allowed under Thomas write rule",
            D: "All of the above are true"
        }
    },
    {
        id: 154,
        text: `If transaction T1 is holding an intension exclusive lock (IX) on data item A , then which of the following locks requested on data item A by another transaction T2 cannot be granted in multiple granularity protocol?`,
        options: {
            A: "Intension shared (IS)",
            B: "Intension Exclusive (IX)",
            C: "Shared (S)",
            D: "Both (B) & (C)"
        }
    },
    {
        id: 155,
        text: `Which of the following is a correct statement`,
        options: {
            A: "Every subordinate entity is a weak entity",
            B: "Every weak entity is a subordinate entity",
            C: "Relations produced from an E-R model will always be in BCNF",
            D: "All of the above"
        }
    },
    {
        id: 156,
        text: `Identify the correct statement regarding view in SQL:`,
        options: {
            A: "V iew provides automatic security for hidden data",
            B: "V iews allow the same data to be seen by different users in different ways at the same time",
            C: "V iews can provide logical data independence",
            D: "All of the above"
        }
    },
    {
        id: 157,
        text: `Suppose an undirected graph with n vertices and e edges are represented by an adjacency matrix. Then the time required to determine the degree of any vertex is`,
        options: {
            A: "O(e)",
            B: "O(n)",
            C: "O(n2)",
            D: "O(e + n)"
        }
    },
    {
        id: 158,
        text: `Assume a graph is having 10 vertices and 20 edges. In Krushkal s minimum spanning tree method, 5 edges are rejected. How many edges are not considered during execution of algorithm on the given graph?`,
        options: {
            A: "5",
            B: "4",
            C: "6",
            D: "10"
        }
    },
    {
        id: 159,
        text: `Using the Cyclomatic complexity of a graph G having 13 vertices, 4 decision vertices, 1 connector, the number of edges in G is`,
        options: {
            A: "13",
            B: "10",
            C: "9",
            D: "8"
        },
        cancelled: true
    },
    {
        id: 160,
        text: `If every node in a graph G is adjacent to equal number of nodes, then the graph G is said to be`,
        options: {
            A: "Regular",
            B: "Complete",
            C: "Finite",
            D: "Strongly connected"
        }
    },
    {
        id: 161,
        text: `With the following as adjacency matrix of an undirected graph G, the number of bridge(s) is

Adjacency Matrix:
\`\`\`
    p  q  r  s  t  u
p   0  1  1  0  0  0
q   1  0  0  1  0  0
r   1  0  0  1  1  0
s   0  1  1  0  0  0
t   0  0  1  0  0  1
u   0  0  0  0  1  0
\`\`\``,
        options: {
            A: "3",
            B: "2",
            C: "1",
            D: "5"
        },
        has_table: true,
        table_type: "adjacency_matrix"
    },
    {
        id: 162,
        text: `How many distinct spanning trees do exist in an undirected cycle graph of n vertices?`,
        options: {
            A: "n",
            B: "n 1",
            C: "n+1",
            D: "n+2"
        }
    },
    {
        id: 163,
        text: `Let G be a connected graph of order n. What is the maximum number of cut vertices that G can contain?`,
        options: {
            A: "n",
            B: "n 2",
            C: "n 1",
            D: "n2 1"
        }
    },
    {
        id: 164,
        text: `An undirected graph G has n nodes. Its adjacency matrix is given by an nxn square matrix whose (I) diagonal elements are 0 s (II) Non-diagonal elements are 1 s. Which one of the following is True?`,
        options: {
            A: "Graph G has no minimum spanning tree (MST)",
            B: "Graph G has unique MST s each of cost n 1",
            C: "Graph G has multiple distinct MST s each of cost n 1",
            D: "Graph G has multiple spanning trees of different costs"
        }
    },
    {
        id: 165,
        text: `Match the pairs: a) 0/1 knapsack 1.O( n2 2n ) b) All pairs shortest path 2.O( 2n ) c) Optimal cost binary search tree 3.O( n3 ) d) Travelling sales person 4.O( n2 )`,
        options: {
            A: "a-1, b-2, c-3, d-4",
            B: "a-2, b-3, c-4, d-1",
            C: "a-2, b-4, c-3, d-1",
            D: "a-2, b-3, c-4, d-1"
        },
        has_table: true,
        table_type: "algorithm_complexity_table"
    },
    {
        id: 166,
        text: `Dijkstra algorithm is for finding`,
        options: {
            A: "Shortest paths from single source to several sinks",
            B: "Minimum spanning tree for graph",
            C: "Sorted list of nodes in a undirected graph with negative edge weights",
            D: "All the above"
        }
    },
    {
        id: 167,
        text: `Suppose a hash table can contain 10-entries and if require, it uses linear probing to resolve collisions. Using key % 10 as has function, if key values 43, 165, 62, 123, 142 are hashed, then the location the key 142 is ________`,
        options: {
            A: "2",
            B: "3",
            C: "4",
            D: "6"
        }
    },
    {
        id: 168,
        text: `Construct a min heap from the following sequence of integer elements 120 140 40 50 80 70 60 90 20 100 After deleting a root element from the heap, what will be the post order traversal of the heap?`,
        options: {
            A: "140 100 90 80 50 120 70 60 40",
            B: "140 100 90 80 120 70 50 60 40",
            C: "140 100 80 90 120 70 50 60 40",
            D: "140 90 100 50 80 40 120 60 70"
        }
    },
    {
        id: 169,
        text: `Consider a file consisting of 30,000 fixed length records of size 100 bytes. With disk block size of 1024 bytes and block pointer size of 6 bytes, if we construct a multilevel index on key field of length 9 bytes, then the total number of blocks required to access a record by searching is ________`,
        options: {
            A: "3 blocks",
            B: "4 blocks",
            C: "5 blocks",
            D: "More then 5 blocks"
        }
    },
    {
        id: 170,
        text: `An index is clustered, if`,
        options: {
            A: "it is on a set of fields that forms a candidate key",
            B: "it is on a set of fields that includes the primary key",
            C: "the data records of the file are organized in the same order as the data entries of the index",
            D: "the data records of the file are organized not in the same order as the data entries of the index"
        }
    },
    {
        id: 171,
        text: `Consider a file of 8192 records with each record having 16 bytes stored in a file system with block size of 512 bytes. Assume that the key pointer pair in index file takes 8 bytes. The file is ordered on a non-key field and the file organization is un-spanned. If the secondary index is built on the key field of the file then number of blocks in the first level is`,
        options: {
            A: "512",
            B: "8192",
            C: "64",
            D: "128"
        }
    },
    {
        id: 172,
        text: `If every non-key attribute is functionally dependent on the primary key, then the relation will be in`,
        options: {
            A: "First normal form",
            B: "Second normal form",
            C: "Third normal form",
            D: "No normal form"
        }
    },
    {
        id: 173,
        text: `Which of the following set of dependencies is suitable for making a relation R(ABCD) to be in 3 NF but not in BCNF.`,
        options: {
            A: "{ AB CD, A C, D B}",
            B: "{AB CD, C DA}",
            C: "{A BCD,B CD, C D",
            D: "{ AB CD, C A, D B}"
        }
    },
    {
        id: 174,
        text: `If a functional dependency set F is { A B, BC E, ED A, EF G, E F}, find the closure of attribute set (AC)`,
        options: {
            A: "{A,B,C,D,E,F,G}",
            B: "{A,B,C,D,E,F}",
            C: "{A,B,C,D,E,G}",
            D: "{A,B,C,E,F,G}"
        }
    },
    {
        id: 175,
        text: `A relation R(ABC) is having the following 4 tuples: (1,2,3), (4,2,3), (5,3,3) and (2,4,4). Which of the following dependencies can you infer doesn t hold over relation R?`,
        options: {
            A: "A B",
            B: "B C",
            C: "AB C",
            D: "C B"
        }
    },
    {
        id: 176,
        text: `A table may have partial dependencies, if table consists of`,
        options: {
            A: "one prime attribute",
            B: "only one attribute",
            C: "only two attributes",
            D: "two prime attributes"
        }
    },
    {
        id: 177,
        text: `Consider a relation R (ABCDEFGHIJ) with FD set = {AB C, A DE, B F, F GH, D IJ}. If R is split into ABC, ADE, BF, FGH, DIJ then this decomposition is`,
        options: {
            A: "Lossy and dependency preserving",
            B: "Loss less and dependency preserving",
            C: "Lossy and not dependency preserving",
            D: "Loss less and not dependency preserving"
        }
    },
    {
        id: 178,
        text: `Suppose a relation R is in 3NF. Then an FD: X A is not valid on R, if I. X is a proper subset of some key II. X is a not a proper subset of any key III. X is a key IV . A is a part of some key`,
        options: {
            A: "I & III are correct",
            B: "I & II are correct",
            C: "III & IV are correct",
            D: "I & II are not correct"
        }
    },
    {
        id: 179,
        text: `Let R be a relationship between the entity sets E1 and E2 with primary keys X an Y respectively. If R is a one relationship between entities E1 and E2 then which of the following FDs hold?`,
        options: {
            A: "Y X only",
            B: "X Y only",
            C: "Both Y X and X Y",
            D: "neither of them"
        }
    },
    {
        id: 180,
        text: `A problem L is NP-Complete if and only if`,
        options: {
            A: "L is NP-Hard",
            B: "L is NP",
            C: "L is NP and NP-Hard",
            D: "L is non-polynomial"
        },
        cancelled: true
    },
    {
        id: 181,
        text: `Let R be a relation of degree n. How many different projections on R are possible`,
        options: {
            A: "n",
            B: "n 1",
            C: "n+1",
            D: "2n 1"
        }
    },
    {
        id: 182,
        text: `Two relations are A(x,y) and B(y). Then the relation algebra operation Division i.e. A/B is`,
        options: {
            A: "x (A) xC ( x((A B) A)",
            B: "x (A) x ( x((A B) A)",
            C: "x (A) x (C x( (A) B) A)",
            D: "A xC ( x(A ) B)"
        }
    },
    {
        id: 183,
        text: `Find equivalent relational algebraic expression for the following SQL query select C.sid from catalog C, parts P where (P.color = red or P.color = green) and P.pid = C.pid`,
        options: {
            A: "sid ( color=red or color=green (parts) pid catalog)",
            B: "sid ( color=red or color=red (parts) pid catalog)",
            C: "pid ( color=red or color=green (parts) pid catalog)",
            D: "pid ( color=red or color=green (parts) sid catalog)"
        }
    },
    {
        id: 184,
        text: `The input to a bubble sort algorithm is 28, 3, 9, 6, 12, 1, 45, 32, 29, 15, 40, 5 If a list is outputted at the end of each complete pass. Which of the following is not a valid intermediate list?`,
        options: {
            A: "3,9,6,12,1,28,32,29,15,40,5,45",
            B: "3,6,9,12,1,28,32,29,15,5,40,45",
            C: "3,6,9,1,12,28,29,15,32,5,40,45",
            D: "None"
        }
    },
    {
        id: 185,
        text: `Which of the following sorting algorithms has the lowest worst-case time complexity?`,
        options: {
            A: "Quick sort",
            B: "Bubble sort",
            C: "Merge sort",
            D: "Selection sort"
        }
    },
    {
        id: 186,
        text: `Which of the following is not an in-place sorting algorithm?`,
        options: {
            A: "Bubble sort",
            B: "Merge sort",
            C: "Insertion sort",
            D: "Heap sort"
        }
    },
    {
        id: 187,
        text: `Map the following statements to true (T) / False(F) respectively S1 : Selection sort is in-place but unstable S2 : Merge sort is unstable S3 : Heap sort is in-place but unstable S4 : In-Place algorithms require constant amount of extra storage space for transforming input set into output`,
        options: {
            A: "TTFT",
            B: "TTTT",
            C: "TFTT",
            D: "FFFT"
        }
    },
    {
        id: 188,
        text: `Consider the following commands: CREATE TABLE DEPT( dno int PRIMARY KEY , dname varchar (30)); CREATE TABLE EMP( eno int PRIMARY KEY , ename varchar(30), dno int references DEPT(dno)); Which of the following operations may cause violation of referential integrity constraint?`,
        options: {
            A: "Delete on EMP",
            B: "Insert into DEPT",
            C: "Update on DEPT",
            D: "Both (A) & (C)"
        }
    },
    {
        id: 189,
        text: `The relation movie (title, budget) contains the titles and budgets of different movies. Assuming that no two movies have the same budget, what does the following SQL query list? Select title from movie m where (select count (*) from movie n where n.budget > m.budget) <4`,
        options: {
            A: "Titles of the three most expensive movies",
            B: "Titles of the fourth most inexpensive movie",
            C: "Title of the fourth most expensive movie",
            D: "Titles of the four most expensive movies"
        }
    },
    {
        id: 190,
        text: `One of the following statements is FALSE regarding recursion.`,
        options: {
            A: "If a function is recurring infinitely then it will generate stack overflow error",
            B: "Any iterative procedure can be converted in to a recursive procedure",
            C: "Any task that can be accomplished using recursion can also be done without using recursion",
            D: "Stack is used to keep track of recursion"
        }
    },
    {
        id: 191,
        text: `The minimum spanning tree problem belong to`,
        options: {
            A: "Greedy",
            B: "Divide and conquer",
            C: "Dynamic programming",
            D: "None of these"
        }
    },
    {
        id: 192,
        text: `Which of the following statements is/are true? I. Adjacency list representation is better for sparse graph than adjacency matrix representation. II. Finding whether there is an edge between any two node s in a graph is easier in Adjacency list representation. III. Adding a vertex in adjacency list representation is easier than adjacency Matrix representation.`,
        options: {
            A: "I only",
            B: "II & III only",
            C: "I & III only",
            D: "I, II & III"
        }
    },
    {
        id: 193,
        text: `Computer system assets can be modified only by authorized parties is termed as ____________`,
        options: {
            A: "Confidentiality",
            B: "Integrity",
            C: "Availability",
            D: "Authenticity"
        }
    },
    {
        id: 194,
        text: `Consider the following two statements: I. A worm mails a copy of itself to other systems. II. A worm executes a copy of itself on another system. Which of the following is true?`,
        options: {
            A: "I is true and II is false",
            B: "I is false and II is true",
            C: "Both I and II are true",
            D: "Both I and II are false"
        }
    },
    {
        id: 195,
        text: `___________ code recognizes some special sequence of input or is triggered by being run from a certain user ID of by unlikely sequence of events.`,
        options: {
            A: "Trap Doors",
            B: "Trojan Horse",
            C: "Logic Bomb",
            D: "Virus"
        }
    },
    {
        id: 196,
        text: `Which of the following malicious program do not replicate automatically?`,
        options: {
            A: "Trojan Horse",
            B: "Virus",
            C: "Worm",
            D: "Zombie"
        }
    },
    {
        id: 197,
        text: `________ can shield electronic equipment from power spikes.`,
        options: {
            A: "Encryption program",
            B: "Surge Protector",
            C: "Firewall",
            D: "UPS"
        }
    },
    {
        id: 198,
        text: `What is the name of the application program that gathers user information and send it to someone through the Internet?`,
        options: {
            A: "A Virus",
            B: "Logic Bomb",
            C: "Spybot",
            D: "Security Patch"
        }
    },
    {
        id: 199,
        text: `HTML viruses infect`,
        options: {
            A: "your computer",
            B: "a web page in the HTML code",
            C: "Both a Web page and the computer that is viewing it",
            D: "None of the above"
        }
    },
    {
        id: 200,
        text: `10.11.144/27, the fourth octet (in decimal) of the last IP address of the network which can be assigned to a host is`,
        options: {
            A: "158",
            B: "255",
            C: "222",
            D: "223"
        }
    },
    {
        id: 200,
        text: `What is the referent object in contemporary cyber security?`,
        options: {
            A: "Digitalized sensitive information",
            B: "Critical Information infrastructure",
            C: "Government IT systems",
            D: "Telecommunication networks"
        }
    },
    {
        id: 201,
        text: `When a customer of a web site is unable to access the site due to a bombardment of fake traffic is termed as ___________`,
        options: {
            A: "Cracking",
            B: "A Virus",
            C: "a denial of service attack",
            D: "A Trojan horse"
        }
    },
    {
        id: 202,
        text: `Collecting personal information and effectively posting as another individual is termed ________`,
        options: {
            A: "Spooling",
            B: "Identity theft",
            C: "Spoofing",
            D: "Hacking"
        }
    },
    {
        id: 203,
        text: `Sending data electronically off-site via a remote backup service is called ________.`,
        options: {
            A: "Remote Journaling",
            B: "Database shadowing",
            C: "Electronic Vaulting",
            D: "Logging"
        }
    },
    {
        id: 204,
        text: `The common name used for crime of stealing password is called _____.`,
        options: {
            A: "Spooling",
            B: "Spoofing",
            C: "Polling",
            D: "Identify theft"
        }
    },
    {
        id: 205,
        text: `Malware means ________`,
        options: {
            A: "A virus or worm",
            B: "A Trojan Horse",
            C: "A Hacker tool",
            D: "A corrupted program"
        },
        cancelled: true
    },
    {
        id: 206,
        text: `Infrastructure as a Service (IaaS) provides __________`,
        options: {
            A: "Virtual Machine, Virtual Storage, Virtual Infrastructure",
            B: "Virtual machine, Operating Systems, Applications",
            C: "Operating environment with Applications",
            D: "Physical Machines with Network"
        }
    },
    {
        id: 207,
        text: `Which one among the following is a disadvantage of cloud computing?`,
        options: {
            A: "Quality of Service cannot be guaranteed",
            B: "Cloud applications suffer from inherent latency",
            C: "Cloud computing applications are not reliable",
            D: "Utilization is poor"
        }
    },
    {
        id: 208,
        text: `Which one of the following business types is least suitable for deploying on cloud?`,
        options: {
            A: "Web content delivery services",
            B: "Data analytics and computation",
            C: "CRM Applications",
            D: "Billing Applications"
        }
    },
    {
        id: 209,
        text: `Which one among the following is not a possible parameter of Service Level Agreement, in cloud?`,
        options: {
            A: "Availability of the Service",
            B: "Response Times or Latency",
            C: "Electricity Cost",
            D: "Warranty of the Service"
        }
    },
    {
        id: 210,
        text: `Which one of the following is a wrong statement?`,
        options: {
            A: "The large scale of cloud computing systems was enabled by the popularization of the Internet",
            B: "Soft computing represents a real paradigm shift in the way in which systems are deployed",
            C: "Cloud computing makes the long-held dream of utility computing possible",
            D: "All of the above"
        }
    },
    {
        id: 211,
        text: `The reliability of a system with n redundant components each having a reliability of r is:`,
        options: {
            A: "1 (1 r)n",
            B: "1 (1+r)n",
            C: "1+(1 r)n",
            D: "(1+r)n"
        }
    },
    {
        id: 212,
        text: `_________ is a function of the particular enterprise and application is an on-premises deployment.`,
        options: {
            A: "Vendor lock",
            B: "Vendor lock-in",
            C: "Vendor lock-ins",
            D: "None of the above"
        }
    },
    {
        id: 213,
        text: `One of the important unique property of a cloud is:`,
        options: {
            A: "Utility type of service delivery",
            B: "Elasticity",
            C: "Easy initial entry",
            D: "All of the above"
        }
    },
    {
        id: 214,
        text: `What is the full form of CaaS?`,
        options: {
            A: "Cloud as a Service",
            B: "Communication as a Service",
            C: "Computer as a Service",
            D: "Compliance as a Service"
        }
    },
    {
        id: 215,
        text: `A low level program that provides system resources to virtual machines is called _________`,
        options: {
            A: "Guest Operating System",
            B: "Host Operating System",
            C: "Hypervisor",
            D: "VM Box"
        }
    },
    {
        id: 216,
        text: `In capacity planning scale-out refers to`,
        options: {
            A: "Increase the capacity by adding more number individual nodes",
            B: "Increase the capacity by adding more powerful resources",
            C: "Reduce capacity by keeping out some nodes",
            D: "Reduce the capacity by replacing nodes with less powerful nodes"
        }
    },
    {
        id: 217,
        text: `Online content that is not indexed by search Engines is called ______`,
        options: {
            A: "Disconnected Web",
            B: "Hidden Documents",
            C: "Private Documents",
            D: "Deep Web"
        }
    },
    {
        id: 218,
        text: `Microsoft Azure AppFabric provides ___________`,
        options: {
            A: "Application hosting environment",
            B: "Application container",
            C: "Store for documents",
            D: "Store for database"
        }
    },
    {
        id: 219,
        text: `If Operating System and applications stack is added to the cloud, then the model is called ________`,
        options: {
            A: "SaaS",
            B: "PaaS",
            C: "IaaS",
            D: "All of the above"
        }
    },
    {
        id: 220,
        text: `For a server with a five-year lifetime, you would therefore need to include an overhead of _______ percent of the system s acquisition cost.`,
        options: {
            A: "10",
            B: "20",
            C: "30",
            D: "40"
        }
    },
    {
        id: 221,
        text: `Communication between services is done using ________ protocol.`,
        options: {
            A: "RESTful",
            B: "REST",
            C: "SOAP",
            D: "XML"
        }
    },
    {
        id: 222,
        text: `Applications such as web server and database server that can run on a virtual machine image are called as:`,
        options: {
            A: "Virtual Machine System",
            B: "Virtual Server",
            C: "Pseudo Server",
            D: "Virtual Appliances"
        }
    },
    {
        id: 223,
        text: `Which one of the following is a third-party VPN that is based on Google s Google Talk?`,
        options: {
            A: "Skyoe",
            B: "Hostspot VPN",
            C: "AnchorFree Hotspot Shield",
            D: "GBridge"
        }
    },
    {
        id: 224,
        text: `Rackspace Cloud Service is an example for ______`,
        options: {
            A: "IaaS",
            B: "SaaS",
            C: "CaaS",
            D: "PaaS"
        }
    },
    {
        id: 225,
        text: `Which one of the following uses a set of e-mail extensions to provide access to mobile devices?`,
        options: {
            A: "B2B Profile",
            B: "Black Profile",
            C: "Lemonade Profile",
            D: "B2C Profile"
        }
    },
    {
        id: 226,
        text: `Which one of the following service provides, a means for advertising services, on small networks using a multicast protocol?`,
        options: {
            A: "WS-WCF",
            B: "WS-Discovery",
            C: "WS-API",
            D: "None of the above"
        }
    },
    {
        id: 227,
        text: `Which feature is the most emphasized in open system for mobile applications?`,
        options: {
            A: "integrity",
            B: "interoperability",
            C: "scalability",
            D: "transparency"
        }
    },
    {
        id: 228,
        text: `Which one of the following has no support for Java on its platform?`,
        options: {
            A: "Microsoft",
            B: "Apple",
            C: "Google",
            D: "Yahoo"
        }
    },
    {
        id: 229,
        text: `Which of the following is the largest video sharing site?`,
        options: {
            A: "YouTube",
            B: "YuMe",
            C: "Yahoo Video",
            D: "Linkedln"
        }
    },
    {
        id: 230,
        text: `Which encryption algorithm is used in Skype communication?`,
        options: {
            A: "RSA",
            B: "DES",
            C: "AES",
            D: "SHA"
        }
    },
    {
        id: 231,
        text: `Which one of the following transmission protocol is used in transferring media?`,
        options: {
            A: "TCP",
            B: "UDP",
            C: "HTTP",
            D: "PCT"
        }
    },
    {
        id: 232,
        text: `Which language is used to build twitter message server queue?`,
        options: {
            A: "Scala",
            B: "Java",
            C: "Python",
            D: "Ruby"
        }
    },
    {
        id: 233,
        text: `The file attribute flag used by the backup software is _______`,
        options: {
            A: "Passive Bit",
            B: "Active Bit",
            C: "System/User Bit",
            D: "Archive Bit"
        }
    },
    {
        id: 234,
        text: `The property that makes cloud storage systems highly reliable is _____`,
        options: {
            A: "Redundant Name Servers",
            B: "Redundant Network Links",
            C: "Replication of Data",
            D: "All of the above"
        }
    },
    {
        id: 235,
        text: `System analysis, System design and System postulation are the examples of:`,
        options: {
            A: "Types of system",
            B: "Types of information",
            C: "Types of entities",
            D: "Types of system study"
        }
    },
    {
        id: 236,
        text: `ARENA is an example simulation software for`,
        options: {
            A: "Continuous Time System Simulation",
            B: "Discrete Time System Simulation",
            C: "Linear System Simulation",
            D: "All of the above"
        }
    },
    {
        id: 237,
        text: `MATLAB Simulink is useful to simulate and analyze _________`,
        options: {
            A: "Non Linear Systems",
            B: "Linear Systems",
            C: "Continuous time, sampled time or mixture of both",
            D: "All of the above"
        }
    },
    {
        id: 238,
        text: `If the death rate is equal to birth rate than ________`,
        options: {
            A: "the population grows",
            B: "the population gets smaller",
            C: "the population is stable",
            D: "all answers are incorrect"
        },
        cancelled: true
    },
    {
        id: 239,
        text: `What is process oriented simulation system?`,
        options: {
            A: "Obtained real world behaviour is coded in number of cooperating processes",
            B: "Number of processes run simultaneously",
            C: "Activities of real world are processed",
            D: "None of the above"
        }
    },
    {
        id: 240,
        text: `A real world system is called relative to the true model structure at RS if: (I) Parameter identifiable if there exists an input sequence { UK} such that and RS are distinguishable for all RS (II) System identifiable if there exist an input sequence { UK} such that and RS are distinguishable for all RS but a finite set (III) Unidentifiable in all other cases`,
        options: {
            A: "(I) only to be satisfied",
            B: "(I) and (II) to be satisfied",
            C: "(II) and (III) to be satisfied",
            D: "(I), (II), (III) to be satisfied"
        }
    },
    {
        id: 241,
        text: `What is HLA in a distributed simulation system?`,
        options: {
            A: "High Level Assembly",
            B: "High Level Architecture",
            C: "High level Language Agent",
            D: "Home Loan Asset System"
        }
    },
    {
        id: 242,
        text: `The set Ax = b with r = rank[A], m equations and n unknowns has an infinite number of solutions if:`,
        options: {
            A: "rank[A] = rank[Ab] and r < n",
            B: "rank[A] = rank[Ab]",
            C: "r < n",
            D: "r > n"
        }
    },
    {
        id: 243,
        text: `What is an empirical model?`,
        options: {
            A: "It is model constructed based on the experimental measurements of the real world system.",
            B: "It is a model based on the derivation of essential relations of the dynamic system.",
            C: "It is a model based on the mathematical equations with error correcting measurements.",
            D: "None of the above"
        }
    },
    {
        id: 244,
        text: `Among the following which one is not an activity of Risk Management`,
        options: {
            A: "Identify potential sources of risk and identify risk drivers",
            B: "Quantify risk s probability of occurrence and its impact",
            C: "Determine and evaluate alternative approaches to mitigate moderate and high risks",
            D: "Observation of the Systems Engineering process"
        }
    },
    {
        id: 245,
        text: `Systems Engineering Master Schedule (SEMS) is a _________`,
        options: {
            A: "A tool for project drawing",
            B: "A timeline for design",
            C: "A tool for controlled execution of the project",
            D: "Entity Relationship Modelling"
        }
    },
    {
        id: 246,
        text: `Order the following tasks of Systems Engineering: I. Establish Performance Requirements II. Establish the Functionality III. Evolve Design and Operations Concepts IV . Define the System Objectives`,
        options: {
            A: "IV , II, I, III",
            B: "IV , I, III, II",
            C: "II, IV , III, I",
            D: "II, I, III, IV"
        }
    },
    {
        id: 247,
        text: `What is the first task/phase in a system life cycle?`,
        options: {
            A: "Prototyping, Test & Evaluation",
            B: "Concept Design and Update",
            C: "Operational Test and Evaluation",
            D: "System Analysis"
        }
    },
    {
        id: 248,
        text: `The __________ model is designed to bring prices down by increasing the number of customers who buy a particular product at once`,
        options: {
            A: "Demand Sensitive",
            B: "Supply sensitive",
            C: "Dynamic pricing",
            D: "Static pricing"
        }
    },
    {
        id: 249,
        text: `Which of the following is True?`,
        options: {
            A: "In a revere auction, the seller sets a price and customers make individual bids to buy an item",
            B: "A reserve price is the highest bid a customer is willing to make.",
            C: "A shopping cart allows customers to continue to brows after selecting each item they wish to purchase.",
            D: "12 address lines and 8 data lines."
        }
    },
    {
        id: 250,
        text: `Which of the following is false?`,
        options: {
            A: "An e-commerce site must establish a merchant account with a bank before credit card orders can be processed online.",
            B: "e-Cash is accepted by all e-commerce web sites as a form of payment.",
            C: "Micropayments ar.small sums of money that can be charged to a user for products and services bought online.",
            D: "When purchasing on the Web, the card number and expiry date can be provided, but the merchant does not see the actual card used in the purchase."
        }
    },
    {
        id: 251,
        text: `CDMA in wireless Internet domain stands for`,
        options: {
            A: "Code Division Multiple Access",
            B: "Channel Division Multiple Access",
            C: "Circuit Division Multiple Access",
            D: "Class Division Multiple Access"
        }
    },
    {
        id: 252,
        text: `A switching circuit that produces one in a set of input bits as an output, based on the control value of control bits is termed as`,
        options: {
            A: "Full Adders",
            B: "Inverter",
            C: "Multiplexer",
            D: "Converter"
        },
        cancelled: true
    },
    {
        id: 253,
        text: `The Acronym TLB stands for`,
        options: {
            A: "Truncated Least Significant Bit",
            B: "Translation Look-aside Buffer",
            C: "Translation Law Buffer",
            D: "Translation Look-back Buffer"
        }
    },
    {
        id: 254,
        text: `A connection from one computer to another through a connection-oriented network with frame relay is termed as`,
        options: {
            A: "PVC",
            B: "TCP/IP",
            C: "RARP",
            D: "Netware"
        }
    },
    {
        id: 255,
        text: `E-commerce is not suitable for`,
        options: {
            A: "Sale/Purchase of expensive Laptops.",
            B: "Sale/Purchase of Smart phones.",
            C: "Sales/Purchase of branded Dresses.",
            D: "Online job searching."
        }
    },
    {
        id: 256,
        text: `SWIFT stands for ___________`,
        options: {
            A: "Society for Worldwide Internet Financial Telecommunications",
            B: "Society for Worldwide Interbank Financial Telecommunications",
            C: "Secret Wide Interbank Financial Telecommunications",
            D: "None of the Above"
        }
    },
    {
        id: 257,
        text: `Which of the following is true with reference to the benefits of E-marketing? i) Speed ii) Reach and Penetration iii) Ease and Efficiency iv) Low Cost v) Targeted audience`,
        options: {
            A: "i, ii, iii and iv only",
            B: "ii, iii, iv and v only",
            C: "i, iii, iv and v only",
            D: "i, ii, iii, iv and v"
        }
    },
    {
        id: 258,
        text: `Assume that source S and destination D are connected through two intermediate Routers labeled R. Determine how many times each packet has to visit the network layer and the data link layer during a transmission from S to D. S R R D`,
        options: {
            A: "Network layer 4 times and Data link layer 4 times",
            B: "Network layer 4 times and Data link layer 3 times",
            C: "Network layer 4 times and Data link layer 6 times",
            D: "Network layer 2 times and Data link layer 6 times"
        },
        has_diagram: true,
        diagram_type: "network_diagram"
    },
    {
        id: 259,
        text: `Which of the following is an example of SPOOLED device?`,
        options: {
            A: "The terminal used to enter the input data for a program being executed",
            B: "A line printer used to print the output of a number of jobs",
            C: "The secondary memory device in a virtual memory system",
            D: "The graphic display device"
        }
    },
    {
        id: 260,
        text: `Determine the number of page faults when references to pages occur in the order 1, 2, 4, 5, 2, 1, 2, 4. Assume that the main memory can accommodate 3 pages and the main memory already has the pages 1 and 2, with page 1 having been brought earlier than page 2. (Assume LRU Algorithm)`,
        options: {
            A: "3",
            B: "4",
            C: "5",
            D: "6"
        }
    },
    {
        id: 261,
        text: `In a paged segmentation scheme of memory management, the segment table itself must have a page table because`,
        options: {
            A: "the segment table is often too large to fit in one page",
            B: "the segment is spread over a number of multiple pages",
            C: "segment tables point to page tables and not to the physical location of the segment",
            D: "the processor s description base register points to a page table"
        }
    },
    {
        id: 262,
        text: `Locality of reference implies that the page reference begin made by a process`,
        options: {
            A: "will always be to the page used in previous page reference",
            B: "will always be one of the pages existing in memory",
            C: "will always leads to a page fault",
            D: "is likely to be one of the pages used in the last few page references"
        }
    },
    {
        id: 263,
        text: `DMA module takes control of bus in order to transfer data when`,
        options: {
            A: "The data is ready for transfer",
            B: "Only when the CPU does not need the bus",
            C: "Interrupt is being serviced by CPU",
            D: "None of the above"
        }
    },
    {
        id: 264,
        text: `Thrashing`,
        options: {
            A: "reduces page I/O",
            B: "decreases the degree of multiprogramming",
            C: "implies excessive page I/O",
            D: "improves the system performance"
        }
    },
    {
        id: 265,
        text: `Which level of RAID refers to disk mirroring with block striping?`,
        options: {
            A: "RAID level 0",
            B: "RAID level 1",
            C: "RAID level 2",
            D: "RAID level 3"
        }
    },
    {
        id: 266,
        text: `In OSI model dialog control and token management are responsibilities of`,
        options: {
            A: "Session Layer",
            B: "Network Layer",
            C: "Transport Layer",
            D: "Data link Layer"
        }
    },
    {
        id: 267,
        text: `Unlike Ipv4, Ipv6 does not include the following field in the base header`,
        options: {
            A: "Next Header field",
            B: "Field for fragmentation information",
            C: "Flow Label",
            D: "Kind field"
        }
    },
    {
        id: 268,
        text: `The simplified form of the Boolean expression (P + Q' + R').(P + Q' + R).(P + Q + R') is`,
        options: {
            A: "(P'Q + R')",
            B: "(P + Q'R')",
            C: "P'Q + R)",
            D: "(PQ + R)"
        }
    },
    {
        id: 269,
        text: `The minimum number of D flip-flops needed to design a mod-258 counter is`,
        options: {
            A: "9",
            B: "8",
            C: "512",
            D: "258"
        },
        cancelled: true
    },
    {
        id: 270,
        text: `Memory access in RISC architecture is limited to instructions`,
        options: {
            A: "CALL and RET",
            B: "PUSH and POP",
            C: "STA and LDA",
            D: "MOV and JMP"
        }
    },
    {
        id: 271,
        text: `An interactive process of system development in which requirements are converted to a working system that is continually revised through close work between an analyst and user is called`,
        options: {
            A: "Waterfall modelling",
            B: "Iterative modelling",
            C: "Spiral modelling",
            D: "ER Model"
        }
    },
    {
        id: 272,
        text: `How many edges does a full 5-ary tree with 1000 internal vertices have?`,
        options: {
            A: "2000",
            B: "1999",
            C: "2001",
            D: "5000"
        }
    },
    {
        id: 273,
        text: `The write ahead protocol simply means that _________`,
        options: {
            A: "Writing of data should be done ahead of any logging operation.",
            B: "Log record for an operation must be written before the actual data is written.",
            C: "All log records should be written before new transaction begins the execution.",
            D: "The log never needs to be written to the disk."
        }
    },
    {
        id: 274,
        text: `Floating point numbers in a computer are represented using a 10-bit mantissa (including a sign bit) and a 7-bit exponent (including a sign bit). What is the approximate value of the maximum number, which can be represented? Assume that the mantissa is stored in the normalised form, that is, without leading zeroes.`,
        options: {
            A: "2128",
            B: "2127",
            C: "264",
            D: "263"
        }
    },
    {
        id: 275,
        text: `The principal of locality justifies the use of`,
        options: {
            A: "Interrupts",
            B: "DMA",
            C: "Polling",
            D: "Cache Memory"
        }
    },
    {
        id: 276,
        text: `Which scheduling policy is most suitable for a time-shared operating System?`,
        options: {
            A: "Shortest Job First",
            B: "Round robin",
            C: "FCFS",
            D: "Elevator"
        }
    },
    {
        id: 277,
        text: `What is the major advantage of using incremental model?`,
        options: {
            A: "Customer can respond to each increment",
            B: "Easier to test and debug",
            C: "It is used when there is a need to get a product to the market early",
            D: "Both (B) and (C)"
        }
    },
    {
        id: 278,
        text: `The spiral model has two dimensions namely ______ and ______.`,
        options: {
            A: "Diagonal, angular",
            B: "Radial, perpendicular",
            C: "Radial, angular",
            D: "Diagonal, perpendicular"
        }
    },
    {
        id: 279,
        text: `The coupling between different modules of a software is categorized as follows: I. Content coupling II. Common coupling III. Control coupling IV . Stamp coupling V . Data coupling Coupling between modules can be ranked in the order of strongest (least desirable) to weakest (most desirable) as follows:`,
        options: {
            A: "I-II-III-IV-V",
            B: "I-III-V-II-IV",
            C: "V-IV-III-II-I",
            D: "IV-II-V-III-I"
        }
    },
    {
        id: 280,
        text: `Which of the following statements is False:`,
        options: {
            A: "HTTP runs over TCP",
            B: "HTTP describes the structure of web pages",
            C: "HTTP allows information to be stored in URL",
            D: "HTTP can be used to test the validity of a hyper text link"
        }
    },
    {
        id: 281,
        text: `Which of the following scheduling algorithm is likely to give better throughput?`,
        options: {
            A: "FCFS",
            B: "SCAN",
            C: "C-SCAN",
            D: "SSTF"
        }
    },
    {
        id: 282,
        text: `Vision of IT/ITeS policy of Gujarat is framed based on equation`,
        options: {
            A: "Information Technology + Information Technology = Information Technology",
            B: "Indian Talent + Information Technology = India Tomorrow",
            C: "India Tomorrow = India Talent Information Technology",
            D: "Both (A) and (C) are true"
        }
    },
    {
        id: 283,
        text: `Which of the following is not the mission statement of IT/ITeS policy of Gujarat`,
        options: {
            A: "Enabling Information Technology for all sections of Society",
            B: "Facilitating MSMEs as not Key drivers of growth",
            C: "Empowering youth on ICT skills",
            D: "Making Gujarat a preferred destination for Global Knowledge Workforce and Industry"
        }
    },
    {
        id: 284,
        text: `Which of the following statement is not the key objectives of Gujarat IT/ITeS Policy: I. To increase the current investment in IT/ITeS sector by 30 times. II. To increase the turnover up to USD 15 Bn. III. To increase IT exports from the State up to USD 2 Bn. IV . To promote and develop employment opportunities in the IT and ITeS Sector and provide direct employment to 10 lakh persons.`,
        options: {
            A: "Statement I",
            B: "Statement II",
            C: "Statement III",
            D: "Statement IV"
        }
    },
    {
        id: 285,
        text: `GFCI means`,
        options: {
            A: "Gross Fixed Capital Investment",
            B: "Gross Food Corporation of India",
            C: "Gross Fibre Capital Investment",
            D: "Gross Fixed Corporation of India"
        }
    },
    {
        id: 286,
        text: `What are ACID properties of a Transaction?`,
        options: {
            A: "Atomicity, Consistency, Isolation, Database",
            B: "Atomicity, Consistency, Isolation, Durability",
            C: "Atomicity, Consistency, Inconsistent, Durability",
            D: "Automatically, Concurrency, Isolation, Durability"
        }
    },
    {
        id: 287,
        text: `Expansion of SMAC is`,
        options: {
            A: "Social Media, Maths, Atomicity, Cloud",
            B: "Social Media, Mobility, Analytics, Cloud",
            C: "Social Media, Maths, Accuracy, Cloud",
            D: "Social Media, Material, Atomicity, Cloud"
        }
    },
    {
        id: 288,
        text: `Which of the following is true? I. R is Open Source II. R is Statistical Programming Language`,
        options: {
            A: "I is true",
            B: "II is true",
            C: "Both I and II are true",
            D: "Both I and II are False"
        }
    },
    {
        id: 289,
        text: `Spell out the Acronym SMIL`,
        options: {
            A: "Synchronized Meta Integration Language",
            B: "Synchronized Multimedia Integration Language",
            C: "Sequential Meta Integration Language",
            D: "Sequential Multimedia Integration Language"
        }
    },
    {
        id: 290,
        text: `Spell out Acronym CSS`,
        options: {
            A: "Cascading Style Sheet",
            B: "Cascading Show Sheet",
            C: "Circular Style Sheet",
            D: "Circular Show Sheet"
        }
    },
    {
        id: 291,
        text: `When using the Script (<Script>) tag within an HTML document, the default language is _________`,
        options: {
            A: "Multimedia Script",
            B: "Java",
            C: "Python",
            D: "JavaScript"
        }
    },
    {
        id: 292,
        text: `In early stages, e-learning was delivered through _______ usually delivered to the desktop via CD ROM`,
        options: {
            A: "Computer Based Test",
            B: "Computer Beta Test",
            C: "computer Based Training",
            D: "Computer Beta Training"
        }
    },
    {
        id: 293,
        text: `Query Language such as _______ are used to retrieve data from the structured database`,
        options: {
            A: "NoSQL",
            B: "SQL",
            C: "DB2",
            D: "MSSQL"
        }
    },
    {
        id: 294,
        text: `Data may be retrieved from database using ______ and ActiveX Data Object (ADO)`,
        options: {
            A: "Active Server Pages",
            B: "Passive Server Pages",
            C: "Authorized Server Pages",
            D: "JavaScript"
        }
    },
    {
        id: 295,
        text: `Which of the following statements are true? I. W3C stands for World Wide Web Consortium II. WAI stands Web Accessibility Initiative`,
        options: {
            A: "I is true and II is false",
            B: "I is false and II is true",
            C: "Both I and II are true",
            D: "Both I and II are false"
        }
    },
    {
        id: 296,
        text: `________ uses algorithms and statistical tools to determine patterns in data gathered from customer visits`,
        options: {
            A: "Data Warehousing",
            B: "Data Mining",
            C: "Data Dredging",
            D: "Data Cleaning"
        }
    },
    {
        id: 297,
        text: `A pay per sale model is also known as a ______`,
        options: {
            A: "Commission based model",
            B: "T rusted model",
            C: "un-trusted model",
            D: "CPM model"
        }
    },
    {
        id: 298,
        text: `Choose the incorrect statement:`,
        options: {
            A: "A relation in 2NF must also be in 1NF",
            B: "A relation in 3NF must also abe in 2NF",
            C: "A relation in 3NF must also be in BCNF",
            D: "A relation in BCNF must also be in 3NF"
        }
    },
    {
        id: 299,
        text: `Which of the following statements are true? I. Entity Relationship Model is process oriented Model II.Entity Relationship model belong to Semantic model category`,
        options: {
            A: "I only true",
            B: "II only true",
            C: "Both I and II are true",
            D: "Both I and II are false"
        }
    },
    {
        id: 300,
        text: `Choose the correct order of operations in a SELECT statement:`,
        options: {
            A: "WHERE, GROUP BY , HA VING",
            B: "HA VING, GROUP BY , WHERE",
            C: "WHERE, HA VING, GROUP BY",
            D: "HA VING, WHERE, GROUP BY"
        }
    }
];


// Complete answer key based on the provided answer sheet
const ANSWER_KEY = {
    101: 'B', 102: 'A', 103: 'B', 104: 'D', 105: 'D', 106: 'A', 107: 'D', 108: null, 109: 'C', 110: 'C',
    111: 'C', 112: 'C', 113: 'D', 114: 'C', 115: 'D', 116: 'A', 117: 'A', 118: 'B', 119: 'B', 120: 'B',
    121: 'A', 122: 'D', 123: 'D', 124: 'C', 125: 'A', 126: 'A', 127: 'C', 128: 'A', 129: 'A', 130: 'B',
    131: 'D', 132: 'C', 133: 'A', 134: 'A', 135: 'A', 136: 'B', 137: 'A', 138: 'C', 139: 'D', 140: 'B',
    141: 'C', 142: 'B', 143: 'C', 144: 'C', 145: 'D', 146: 'D', 147: 'D', 148: 'D', 149: 'D', 150: 'D',
    151: 'C', 152: 'B', 153: 'B', 154: 'C', 155: 'D', 156: 'D', 157: 'C', 158: 'A', 159: 'B', 160: 'A',
    161: 'B', 162: 'A', 163: 'B', 164: 'C', 165: 'C', 166: 'A', 167: 'D', 168: 'D', 169: 'B', 170: 'C',
    171: 'D', 172: 'B', 173: 'D', 174: 'D', 175: 'D', 176: 'D', 177: 'B', 178: 'B', 179: 'C', 180: 'C',
    181: 'D', 182: 'A', 183: 'A', 184: 'B', 185: 'C', 186: 'B', 187: 'C', 188: 'C', 189: 'D', 190: 'B',
    191: 'A', 192: 'C', 193: 'B', 194: 'C', 195: 'A', 196: 'A', 197: 'B', 198: 'C', 199: 'B', 200: 'B',
    201: 'C', 202: 'B', 203: 'C', 204: 'B', 205: null, 206: 'A', 207: 'B', 208: 'D', 209: 'C', 210: 'B',
    211: 'A', 212: 'B', 213: 'D', 214: 'D', 215: 'C', 216: 'A', 217: 'D', 218: 'A', 219: 'A', 220: 'B',
    221: 'C', 222: 'D', 223: 'D', 224: 'A', 225: 'B', 226: 'B', 227: 'B', 228: 'B', 229: 'A', 230: 'C',
    231: 'A', 232: 'A', 233: 'D', 234: 'D', 235: 'D', 236: 'B', 237: 'D', 238: 'C', 239: 'A', 240: 'D',
    241: 'B', 242: 'A', 243: 'A', 244: 'D', 245: 'C', 246: 'A', 247: 'D', 248: 'A', 249: 'C', 250: 'B',
    251: 'A', 252: 'C', 253: 'B', 254: 'A', 255: 'D', 256: 'B', 257: 'D', 258: 'C', 259: 'B', 260: 'B',
    261: 'B', 262: 'D', 263: 'C', 264: 'C', 265: 'B', 266: 'A', 267: 'B', 268: 'B', 269: 'A', 270: 'C',
    271: 'C', 272: 'A', 273: 'B', 274: 'D', 275: 'D', 276: 'B', 277: 'D', 278: 'C', 279: 'C', 280: 'B',
    281: 'D', 282: 'B', 283: 'B', 284: 'A', 285: 'A', 286: 'B', 287: 'B', 288: 'C', 289: 'B', 290: 'A',
    291: 'D', 292: 'C', 293: 'B', 294: 'A', 295: 'C', 296: 'B', 297: 'A', 298: 'C', 299: 'B', 300: 'A'
};

// Cancelled questions (marked with * in answer key)
const CANCELLED_QUESTIONS = [108, 159, 180, 205, 238, 252, 269];

// Questions per page
const QUESTIONS_PER_PAGE = 10;
const TOTAL_PAGES = 20;
const TOTAL_QUESTIONS = 200;

// Timer configuration (in milliseconds)
const TIMER_CONFIG = {
    TOTAL_TIME: 2 * 60 * 60 * 1000, // 2 hours
    WARNING_TIMES: [
        { time: 30 * 60 * 1000, message: "30 minutes remaining!" },
        { time: 10 * 60 * 1000, message: "10 minutes remaining!" },
        { time: 5 * 60 * 1000, message: "5 minutes remaining!" }
    ]
};

// Since we only have the first 10 questions in detail, we'll generate placeholder questions
// for questions 111-300 for demonstration purposes. In a real implementation, 
// you would have all the actual question text.

function generateAllQuestions() {
    const allQuestions = [...QUESTIONS];
    
    // Generate placeholder questions for 111-300
    for (let i = 111; i <= 300; i++) {
        allQuestions.push({
            id: i,
            text: `Question ${i}: This is a placeholder question text for question number ${i}. In the actual implementation, this would contain the real question from the exam paper.`,
            options: {
                A: `Option A for question ${i}`,
                B: `Option B for question ${i}`,
                C: `Option C for question ${i}`,
                D: `Option D for question ${i}`
            },
            cancelled: CANCELLED_QUESTIONS.includes(i)
        });
    }
    
    return allQuestions;
}

// Export for use in other modules
window.EXAM_DATA = {
    QUESTIONS: generateAllQuestions(),
    ANSWER_KEY,
    CANCELLED_QUESTIONS,
    QUESTIONS_PER_PAGE,
    TOTAL_PAGES,
    TOTAL_QUESTIONS,
    TIMER_CONFIG
};