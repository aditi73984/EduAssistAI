import React, { useState } from "react";

export default function PythonCourse() {
  const topics = [
    {
      title: "Python Introduction",
      theory: `What it is (short)
Python is a high-level, interpreted, general-purpose language that emphasizes readability and developer productivity.

Deep explanation
- Execution model: Python code runs on an interpreter (CPython is the reference). The interpreter parses source code into bytecode and executes it. This allows quick edit-run-debug cycles and interactive REPL use.
- Syntax & indentation: Python uses indentation (whitespace) to mark block structure. This design choice favors readable code but means inconsistent indentation (mixing tabs and spaces) will produce IndentationError or change program logic.
- Typing model: Python is dynamically typed (variables are names bound to objects) and uses strong typing (you cannot implicitly combine incompatible types without explicit conversion).
- Versions: Use Python 3.x. Python 2 reached end-of-life in 2020 — libraries and tutorials assume Python 3 now.
- Where it's used: web backends (Django, Flask), data science and ML (NumPy, Pandas, scikit-learn, TensorFlow), scripting, automation, testing, DevOps utilities, and education.

Common pitfalls & advice
- Mixing tabs and spaces — always configure your editor to use spaces (PEP8 recommends 4 spaces).
- Relying on global state — prefer local state and function parameters.
- Floating point equality — use tolerances or math.isclose() for comparisons.

Practical starter tips
- Install Python 3, create a virtual environment (python -m venv venv) and activate it before installing packages.
- Learn to use the REPL (python) and ipython for faster experimentation.`,
      example:
        "print('Hello Python!')\n# Basic variables\nname = 'Aman'\nage = 21\npi = 3.1415\nprint(f'Name: {name}, Age: {age}, Pi: {pi}')",
      questions: [
        "Explain how Python's interpreter model affects development and debugging.",
        "Why is consistent indentation important in Python? Give an example of what can go wrong.",
        "List three domains where Python is commonly used and an example library for each.",
        "Write a script that prints a variable and its type (use type()).",
      ],
      video: "https://www.youtube.com/embed/kqtD5dpn9C8",
    },

    {
      title: "Python Basics (Variables & Types)",
      theory: `What variables are
- A variable name in Python is a label pointing to an object/value. Assignment binds names to objects: x = 5 binds the name x to the integer object 5.

Detailed data types
- Numeric: int (arbitrary precision), float (double-precision), complex
- Text: str (immutable sequence of Unicode characters). Use .format() or f-strings (f"...") for formatting.
- Boolean: bool — True or False (subclass of int).
- NoneType: None indicates absence of value.
- Sequence & mapping types are covered later, but they are also fundamental.

Input / output & conversions
- input() returns a string. Convert to int/float when needed: age = int(input("Age: ")).
- Always validate/guard conversions with try/except when parsing user input.

Operators explained
- / (true division) returns float even for integers (5 / 2 == 2.5).
- // (floor division) returns the floor integer (5 // 2 == 2).
- % is modulo, ** is exponentiation.
- Comparison operators return bool values.

Common mistakes & best practices
- Using '=' when you meant '==' for comparisons.
- Relying on float equality checks; prefer math.isclose.
- Prefer descriptive variable names and follow PEP8 naming: lower_case_with_underscores for variables and functions.

Mini workflow tip
- Use interactive experiments in REPL to inspect types: type(x), isinstance(x, int).`,
      example:
        "x = 10                # int\nprice = 99.9          # float\nname = 'Aman'         # str\nactive = True          # bool\n\n# Conversion example (guarded)\n# try:\n#     age = int(input('Enter age: '))\n# except ValueError:\n#     print('Please enter a valid integer')",
      questions: [
        "Explain the difference between true division (/) and floor division (//) with examples.",
        "Why should we handle exceptions when converting user input to numbers? Show a small try/except example.",
        "Demonstrate two safe ways to combine strings and numbers for printing (concatenation vs f-strings).",
        "Write a short program that reads width and height (as ints) and prints rectangle area.",
      ],
      video: "https://www.youtube.com/embed/_uQrJ0TkZlc",
    },

    {
      title: "Control Flow (Conditionals & Loops)",
      theory: `Overview
Control flow is how programs make decisions and repeat actions — essential for implementing logic.

Conditionals (if / elif / else)
- Evaluate boolean expressions and branch execution.
- elif allows multiple mutually exclusive checks.
- Use short, clear conditions and avoid deeply nested conditionals; extract logic into functions if complex.

Example patterns
- Guard clauses: check for invalid cases early and return/exit, reducing nesting.
- Chained comparisons: 0 <= x < 10 evaluates as expected (Python supports chained comparisons).

Loops
- for loops iterate over iterable objects (lists, tuples, strings, ranges). They are preferred when you have a sequence to iterate.
- while loops run while a condition is True — useful for indefinite repetition but risk infinite loops if loop variable not updated.

Loop controls
- break — exits the nearest loop immediately.
- continue — skips to next iteration.
- else on loops — executes when loop completes without break (rare but useful for search patterns).

Performance & style
- Prefer iterating over items directly (for item in my_list) rather than using range(len(...)) unless index is required.
- Use enumerate() when you need both index and value.

Common pitfalls
- Off-by-one errors with ranges (range(n) goes from 0..n-1).
- Infinite loops from incorrect loop conditions.

Testing tip
- Add small prints or use debugger to check loop variables when debugging loops.`,
      example:
        "# Conditional example\nscore = 82\nif score >= 90:\n    grade = 'A'\nelif score >= 75:\n    grade = 'B'\nelse:\n    grade = 'C'\nprint('Grade:', grade)\n\n# For-loop example\nfor i in range(5):\n    print(i)\n\n# While-loop example\nx = 0\nwhile x < 5:\n    print(x)\n    x += 1",
      questions: [
        "When is a for loop more appropriate than a while loop? Give an example.",
        "What is an off-by-one error? Show an example using range().",
        "Write a program that prints even numbers between 1 and 20 (inclusive).",
        "Explain the for-else construct and provide a realistic use-case (e.g., searching).",
      ],
      video: "https://www.youtube.com/embed/6iF8Xb7Z3wQ",
    },

    {
      title: "Functions (Definition, Scope & Best Practices)",
      theory: `Why functions matter
Functions group related logic into named, reusable units — improving readability, testability, and reuse.

Definition & call
- Use def func_name(params): to define.
- Use return to give back a result. If omitted, function returns None.

Parameters, arguments, defaults
- Positional arguments: values passed by position.
- Keyword arguments: values passed by name (func(x=1)).
- Default arguments: provide defaults in signature (def f(x=10)).
- Avoid mutable default arguments (e.g., def f(a=[]): ...) because the same object is reused across calls; instead use None and inside the function assign a new list.

Scope & closures
- Local variables live inside function; globals at module level.
- Python supports closures and nested functions; functions are first-class values (store in vars, pass as arguments, return from functions).

Lambda & higher-order functions
- lambda expression: small anonymous functions (lambda x: x*2) — use sparingly for simple expressions.
- Higher-order functions: map, filter, reduce (or comprehensions and generator expressions) and passing functions to other functions.

Documentation & testing
- Use docstrings ("""Description""") for functions; helps auto-generators and interactive help.
- Write unit tests for functions (pytest/unittest).

Design tips
- Single Responsibility Principle: each function should do one thing.
- Prefer small, pure functions (no side effects) for easier testing.`,
      example:
        "def add(a, b):\n    \"\"\"Return the sum of a and b.\"\"\"\n    return a + b\n\nprint(add(3, 5))\n\n# Factorial (iterative)\ndef factorial(n):\n    result = 1\n    for i in range(2, n+1):\n        result *= i\n    return result\n\nprint(factorial(5))",
      questions: [
        "What is a docstring? Write a small function with a docstring and show how to access it (help or __doc__).",
        "Explain why mutable default arguments are dangerous and show a correct pattern using None.",
        "Implement a function that computes factorial both iteratively and recursively; discuss trade-offs.",
        "Demonstrate positional vs keyword arguments with a sample function definition and calls.",
      ],
      video: "https://www.youtube.com/embed/9Os0o3wzS_I",
    },

    {
      title: "Data Structures (List, Tuple, Set, Dict)",
      theory: `Overview & use-cases
- Lists: ordered, mutable sequences. Use when you need an ordered collection that you will modify.
- Tuples: ordered, immutable sequences. Use for fixed collections or when immutability is desired (e.g., dictionary keys).
- Sets: unordered collection of unique elements. Great for membership tests and mathematical set operations (union, intersection).
- Dictionaries: key-value mappings. Fast lookup by key; ideal for representing structured records.

Important methods & idioms
- List comprehensions: concise and often faster alternative to building lists in loops (e.g., [x*x for x in nums]).
- Dict methods: .get(key, default), .items(), .keys(), .values(), dict comprehensions.
- Use collections module (namedtuple, deque, defaultdict, Counter) for specialized needs.

Memory & performance notes
- Large lists store references to objects — for memory-sensitive pipelines prefer generators (generator expressions) that yield values lazily.
- For heavy numeric data, prefer NumPy arrays for speed and memory efficiency.

Common tasks & tips
- Remove duplicates while preserving order:
  - Use an ordered dict or iterate & build a result list with a seen set.
- When to use tuple: function returns of fixed size, keys in dicts, or constant records.

Example patterns & pitfalls
- Don't use mutable structures as default argument values.
- Beware of copying lists: list2 = list1 creates a reference; use list1.copy() or list(list1) for shallow copy; use copy.deepcopy for nested copies.`,
      example:
        "# List example\nnumbers = [1, 2, 3]\nnumbers.append(4)\nprint(numbers)\n\n# Tuple example\nt = (1, 2, 3)\nprint(t[0])\n\n# Set example\ns = {1, 2, 2, 3}\nprint(list(s))  # duplicates removed\n\n# Dict example\nstudent = {'name': 'Aman', 'age': 21}\nprint(student.get('name'))\n\n# List comprehension example\nsquares = [x*x for x in range(6)]\nprint(squares)",
      questions: [
        "When is a tuple better than a list? Give a realistic example.",
        "Write code to remove duplicates from a list while preserving original order.",
        "Show how to invert a dictionary (swap keys and values) and explain when it is safe to do so.",
        "Explain memory differences and trade-offs between list comprehensions and generator expressions.",
      ],
      video: "https://www.youtube.com/embed/R-HLU9Fl5ug",
    },

    {
      title: "Modules & Libraries (Using & Packaging)",
      theory: `Why modules exist
- Modules let you split code into files and reuse logic across projects. A .py file is a module; a package is a folder with __init__.py (Python 3.3+ allows implicit namespaces too).

Import mechanics
- import module: module.name is used
- from module import name: direct access to name
- relative imports are used inside packages (from .submodule import X)

Standard library highlights
- os (filesystem operations), sys (interpreter utilities), math (math functions), datetime (dates/times), json (data interchange), itertools (efficient iterators), collections (specialized containers).

Third-party packages
- Use pip to install: pip install package_name
- Isolate dependencies with virtual environments: python -m venv venv; activate and then pip install.
- Use requirements.txt (pip freeze > requirements.txt) or pyproject.toml/poetry for reproducible dependency management.

Packaging & publishing
- For distribution: write setup.py or pyproject.toml, include metadata, use twine to upload to PyPI.
- Structure: keep small, well-documented modules and tests.

Security & sanity checks
- Prefer well-maintained packages (many downloads, active repo).
- Avoid running random scripts from unknown sources; inspect package code if security-critical.

Practical workflow
- To create a module: add mymodule.py with functions; import it with import mymodule (ensure the module is in PYTHONPATH or same folder).`,
      example:
        "import math\nprint(math.sqrt(16))\n\nfrom datetime import date\nprint(date.today())\n\n# Example your_module.py content:\n# def greet(name):\n#     return f'Hello {name}'\n# then in another file: from your_module import greet",
      questions: [
        "Explain how to create and import your own module. What is PYTHONPATH?",
        "Why should you use virtual environments? Show commands to create and activate one on Windows and macOS/Linux.",
        "Name three standard library modules and a short use-case for each.",
        "What precautions should you take when installing packages from PyPI?",
      ],
      video: "https://www.youtube.com/embed/CqvZ3vGoGs0",
    },
  ];

  const [index, setIndex] = useState(0);
  const selectedTopic = topics[index];

  const next = () => {
    if (index < topics.length - 1) setIndex((idx) => idx + 1);
  };

  const prev = () => {
    if (index > 0) setIndex((idx) => idx - 1);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 md:p-12 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-gray-100 rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-extrabold mb-4 text-gray-900">Python Full Course</h2>
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
      <div className="md:w-3/4 bg-indigo-50 rounded-lg p-6 shadow-md flex flex-col gap-4">
        <h3 className="text-2xl font-extrabold text-indigo-800 border-b pb-2">{selectedTopic.title}</h3>

        <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg">{selectedTopic.theory}</p>

        <iframe className="w-full h-72 rounded-md mt-4" src={selectedTopic.video} title={selectedTopic.title} allowFullScreen></iframe>

        <div>
          <h4 className="text-lg font-bold text-indigo-700">Example Code</h4>
          <pre className="bg-black text-white p-4 rounded-md text-sm whitespace-pre-wrap">{selectedTopic.example}</pre>
        </div>

        <div>
          <h4 className="text-xl font-bold text-indigo-700 mb-2">Practice Questions</h4>
          <ul className="list-disc pl-6 space-y-2">
            {selectedTopic.questions.map((q, i) => (
              <li key={i} className="text-gray-800 text-md">{q}</li>
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
