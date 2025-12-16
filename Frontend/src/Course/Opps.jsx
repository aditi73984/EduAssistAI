import React, { useState } from "react";

export default function OOPAndDSACourse() {
  const topics = [
    {
      title: "1. Classes & Objects",
      theory: `What & Why (deep)
A class is a blueprint for creating objects (instances). It defines attributes (data) and methods (behavior). Objects are concrete instances created from classes.

Key concepts:
- Class: defines structure and behavior.
- Object/Instance: runtime entity created from a class.
- Attribute: data stored in an object.
- Method: function defined inside a class acting on its instances.
- Constructor (__init__): special method to initialize new objects.

Design notes:
- Use classes to model real-world entities and group related data+behavior.
- Keep methods focused and avoid side-effects when possible.

Common pitfalls:
- Confusing class attributes (shared across instances) vs instance attributes (per-object).
- Overusing mutable class-level defaults.

Mini tips:
- Use __repr__ or __str__ for readable representations in debugging.`,

      example: `# Simple class and objects
class Student:
    def __init__(self, name, age):
        self.name = name   # instance attribute
        self.age = age

    def greet(self):
        return f"Hello, I'm {self.name} and I'm {self.age} years old."

s = Student("Aman", 21)
print(s.greet())  # Hello, I'm Aman and I'm 21 years old.
print(repr(s))`,

      questions: [
        "Define a class Person with attributes name and age and a method introduce() that prints a sentence.",
        "Explain difference between instance attribute and class attribute with an example.",
        "What is the role of __init__ and when is it called?",
      ],
      video: "https://www.youtube.com/embed/JeznW_7DlB0",
    },

    {
      title: "2. Inheritance (single, multilevel, multiple)",
      theory: `Concept (deep)
Inheritance allows a class (child) to acquire attributes and methods from another class (parent). It promotes reuse and logical hierarchy.

Types:
- Single inheritance: Child inherits from one parent.
- Multilevel inheritance: A -> B -> C (chain).
- Multiple inheritance: class C(A, B) (careful with complexity and MRO).

Important details:
- Use super() to call parent constructors/methods safely.
- Method resolution order (MRO) determines which method runs in multiple inheritance.

Design tips:
- Prefer composition over inheritance when relationships are not 'is-a'.
- Keep inheritance shallow; deep hierarchies become brittle.`,

      example: `class Animal:
    def speak(self):
        return "..."

class Dog(Animal):  # single inheritance
    def speak(self):
        return "Woof"

class Puppy(Dog):  # multilevel
    pass

# multiple inheritance example
class Flyer:
    def fly(self):
        return "I'm flying"

class Bird(Animal, Flyer):
    pass

print(Dog().speak())    # Woof
print(Bird().fly())     # I'm flying`,

      questions: [
        "Show how to use super() in a child class constructor to initialize parent attributes.",
        "Explain potential problems with multiple inheritance and how MRO helps.",
        "When would you choose composition over inheritance?",
      ],
      video: "https://www.youtube.com/embed/RSl87lqOXDE",
    },

    {
      title: "3. Polymorphism & Duck Typing",
      theory: `Concepts (deep)
Polymorphism: ability of different classes to respond to the same method name differently. Supports flexible code (write to interface, not implementation).

Duck typing:
- \"If it walks like a duck and quacks like a duck\" — Python uses duck typing: compatibility is based on presence of methods/attributes, not type.

Use-cases:
- Write generic functions that call methods on passed objects (e.g., obj.draw()).

Caveats:
- Rely on clear method names and documentation when using duck typing; add runtime checks or try/except if behavior is uncertain.`,

      example: `class Shape:
    def area(self):
        raise NotImplementedError

class Square(Shape):
    def __init__(self, s): self.s = s
    def area(self): return self.s * self.s

class Circle(Shape):
    def __init__(self, r): self.r = r
    def area(self): return 3.1416 * self.r * self.r

# polymorphic behaviour
shapes = [Square(3), Circle(2)]
for sh in shapes:
    print(sh.area())`,
      questions: [
        "Explain duck typing with an example.",
        "How is polymorphism useful in designing APIs?",
        "What happens if an object passed to polymorphic code lacks required method?",
      ],
      video: "https://www.youtube.com/embed/BJ-VvGyQxho",
    },

    {
      title: "4. Encapsulation & Abstraction",
      theory: `Encapsulation (deep)
- Encapsulation hides internal state and restricts direct access. In Python, use naming conventions: _protected, __private (name mangling).
- Use properties (@property) to provide controlled access.

Abstraction:
- Expose a simple interface while hiding complex internals.
- Abstract Base Classes (abc module) allow defining interfaces.

Best practices:
- Use encapsulation to protect invariants.
- Use explicit getter/setter only when needed; prefer properties to preserve clean API.`,

      example: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.__balance = balance  # private attribute

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            return amount
        raise ValueError("Insufficient funds")

    @property
    def balance(self):
        return self.__balance

acc = BankAccount("Aman", 100)
acc.deposit(50)
print(acc.balance)  # 150
# acc.__balance  # AttributeError (name mangled)`,
      questions: [
        "Show how to use @property to create a read-only attribute.",
        "What does name-mangling do for __private attributes?",
        "When should you use abstraction (an ABC) in Python?",
      ],
      video: "https://www.youtube.com/embed/BJ-VvGyQxho",
    },

    {
      title: "5. Stacks (DSA)",
      theory: `Definition & operations
A stack is LIFO (Last In First Out). Core operations: push (insert), pop (remove), peek (top), is_empty.

Implementations:
- Simple list-based: use list.append() and list.pop() — fast and simple.
- For thread-safety or specialized behavior use deque or custom class.

Use-cases:
- Function call stacks, undo/redo, parsing, expression evaluation.

Complexity:
- push/pop are O(1) on average when using list append/pop from end.`,

      example: `# stack using list
stack = []
stack.append(10)   # push
stack.append(20)
top = stack.pop()  # pop -> 20
print(stack)       # [10]

# class wrapper
class Stack:
    def __init__(self): self._data = []
    def push(self, x): self._data.append(x)
    def pop(self): return self._data.pop()
    def peek(self): return self._data[-1] if self._data else None
    def is_empty(self): return not self._data`,
      questions: [
        "Implement stack push/pop and show time complexity.",
        "Give 3 real-world use-cases of stacks.",
        "Why is list.append/pop from end O(1)?",
      ],
      video: "https://www.youtube.com/embed/wqB_8TjFqkQ",
    },

    {
      title: "6. Queues (DSA)",
      theory: `Definition & operations
A queue is FIFO (First In First Out). Core operations: enqueue, dequeue, peek, is_empty.

Implementations:
- list with pop(0) is O(n) — avoid for large queues.
- Use collections.deque for efficient O(1) appends/pops from both ends.
- For priority needs use heapq (priority queue).

Use-cases:
- Task scheduling, buffering, BFS traversal.

Complexity:
- deque append/pop from left/right are O(1).`,

      example: `from collections import deque

q = deque()
q.append(1)     # enqueue
q.append(2)
print(q.popleft())  # dequeue -> 1

# class wrapper
class Queue:
    def __init__(self): self._d = deque()
    def enqueue(self, x): self._d.append(x)
    def dequeue(self): return self._d.popleft()
    def is_empty(self): return not self._d`,
      questions: [
        "Why is collections.deque preferred over list for queue?",
        "Implement a queue using two stacks and explain complexity.",
        "List real-world systems that use queues.",
      ],
      video: "https://www.youtube.com/embed/wqB_8TjFqkQ",
    },

    {
      title: "7. Linked Lists (Singly & Doubly)",
      theory: `Concept
Linked lists store nodes where each node points to the next. Singly linked lists have next pointer; doubly linked lists also have prev pointer.

Advantages:
- Efficient insert/delete at known node without shifting elements (unlike arrays).

Disadvantages:
- No random access (O(n) to access by index).
- Extra memory for pointers.

Use-cases:
- Implementing other data structures (stacks, queues), adjacency lists for graphs.

Important operations:
- Insert at head/tail, delete node, traverse, search.`,

      example: `# Singly linked list node
class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None

    def insert_head(self, val):
        node = Node(val)
        node.next = self.head
        self.head = node

    def traverse(self):
        cur = self.head
        while cur:
            print(cur.val)
            cur = cur.next`,
      questions: [
        "Write code to reverse a singly linked list (iteratively).",
        "Explain advantages of doubly linked list over singly linked list.",
        "How to detect a cycle in a linked list? (Hint: Floyd's algorithm)",
      ],
      video: "https://www.youtube.com/embed/NObJ3F3k3sQ",
    },

    {
      title: "8. Trees & Binary Trees",
      theory: `Overview
A tree is a hierarchical data structure. A binary tree has up to two children per node. Special tree: binary search tree (BST) with ordering property.

Traversals:
- Pre-order (root, left, right)
- In-order (left, root, right)
- Post-order (left, right, root)
- Level-order (BFS using a queue)

Use-cases:
- Hierarchical data, expression parsing, search trees (BST), heaps, tries (prefix trees).

Complexities:
- Balanced tree operations O(log n), unbalanced O(n).`,

      example: `# simple binary tree node and inorder traversal
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def inorder(root):
    if root:
        inorder(root.left)
        print(root.val)
        inorder(root.right)`,
      questions: [
        "Implement in-order traversal iteratively using a stack.",
        "What is a BST and how do insert/search operate in average and worst case?",
        "Explain why balancing (AVL/Red-Black) matters for trees.",
      ],
      video: "https://www.youtube.com/embed/Oy5wWXRzE6A",
    },

    {
      title: "9. Searching (Linear & Binary)",
      theory: `Linear Search:
- Scan elements one by one, O(n) complexity.

Binary Search:
- Requires sorted array. Repeatedly divide search interval in half.
- O(log n) time complexity.

Important:
- Be careful with mid calculation to avoid overflow in other languages (mid = lo + (hi-lo)//2).
- For Python, use integer division // and test off-by-one boundaries carefully.`,

      example: `# Binary search iterative
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
      questions: [
        "Write binary search recursively and iteratively.",
        "When is binary search not applicable?",
        "Explain time complexity difference between linear and binary search.",
      ],
      video: "https://www.youtube.com/embed/pkkFqlG0Hds",
    },

    {
      title: "10. Sorting (Bubble, Insertion, Selection) + Notes",
      theory: `Overview (simple sorts)
- Bubble sort: Repeated swapping, O(n^2).
- Insertion sort: Build sorted prefix, good for nearly-sorted data, O(n^2) worst, O(n) best.
- Selection sort: Repeatedly pick min element and place it, O(n^2).

Notes:
- For practical use, prefer Timsort (Python's sorted()) or quicksort/mergesort (O(n log n)).
- Understand simple sorts for algorithmic thinking and small inputs.`,

      example: `# Insertion sort
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = key
    return arr`,
      questions: [
        "Explain why insertion sort performs well on nearly-sorted arrays.",
        "Implement bubble sort and analyze its time complexity.",
        "Why should you prefer Python's built-in sorted() for production code?",
      ],
      video: "https://www.youtube.com/embed/pkkFqlG0Hds",
    },
  ];

  const [index, setIndex] = useState(0);
  const selectedTopic = topics[index];

  const next = () => {
    if (index < topics.length - 1) setIndex((i) => i + 1);
  };

  const prev = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 md:p-12 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-gray-100 rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-extrabold mb-4 text-gray-900">OOP & DSA — Full Course</h2>
        <p className="text-sm mb-4 text-gray-600">Click a topic to view deep theory, examples & questions:</p>
        <ul className="space-y-2">
          {topics.map((t, i) => (
            <li
              key={i}
              onClick={() => setIndex(i)}
              className={`cursor-pointer p-2 rounded-md transition font-medium hover:bg-indigo-100 ${
                index === i ? "bg-indigo-200 text-indigo-900" : "text-gray-700"
              }`}
            >
              {t.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 bg-indigo-50/50 rounded-lg p-6 shadow-md flex flex-col gap-4">
        <h3 className="text-2xl font-extrabold text-indigo-800 border-b pb-2">{selectedTopic.title}</h3>

        <p className="text-gray-700 whitespace-pre-line leading-relaxed text-base">{selectedTopic.theory}</p>

        <div className="aspect-w-16 aspect-h-9 mt-4">
          <iframe
            className="w-full h-full rounded-md"
            src={selectedTopic.video}
            title={selectedTopic.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div>
          <h4 className="text-lg font-bold text-indigo-700">Example Code</h4>
          <pre className="bg-black text-white p-4 rounded-md text-sm whitespace-pre-wrap">{selectedTopic.example}</pre>
        </div>

        <div>
          <h4 className="text-xl font-bold text-indigo-700 mb-2">Practice Questions</h4>
          <ul className="list-disc pl-6 space-y-2">
            {selectedTopic.questions.map((q, i) => (
              <li key={i} className="text-gray-800 text-md">
                {q}
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prev}
            disabled={index === 0}
            className={`px-4 py-2 rounded-md font-semibold shadow ${
              index === 0 ? "bg-gray-300 text-gray-500" : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Previous
          </button>

          <button
            onClick={next}
            disabled={index === topics.length - 1}
            className={`px-4 py-2 rounded-md font-semibold shadow ${
              index === topics.length - 1 ? "bg-gray-300 text-gray-500" : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
