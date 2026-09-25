// ---- Quiz data ----
const questions = [
  {
    question: "What is the time complexity of binary search on a sorted array of size n?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    answer: 1
  },
  {
    question: "Which data structure uses LIFO (Last In, First Out) order?",
    options: ["Queue", "Stack", "Heap", "Linked List"],
    answer: 1
  },
  {
    question: "What is the average-case time complexity of quicksort?",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    answer: 1
  },
  {
    question: "In Python, which keyword is used to define a function?",
    options: ["func", "def", "function", "lambda"],
    answer: 1
  },
  {
    question: "What does DSA commonly stand for in computer science?",
    options: ["Data Structures and Algorithms", "Data Systems Analysis", "Digital Storage Architecture", "Data Sorting Algorithm"],
    answer: 0
  },
  {
    question: "Which of these is a mutable data type in Python?",
    options: ["tuple", "string", "list", "int"],
    answer: 2
  },
  {
    question: "What is the worst-case time complexity of inserting into a hash table?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: 2
  },
  {
    question: "Which binary tree traversal visits the root node first?",
    options: ["In-order", "Pre-order", "Post-order", "Level-order"],
    answer: 1
  },
  {
    question: "What is the extra space complexity of an in-place quicksort, excluding the recursion stack?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    answer: 0
  },
  {
    question: "In Python, what does len() return when called on a dictionary?",
    options: ["Number of keys only", "Number of values only", "Number of key-value pairs", "Sum of all values"],
    answer: 2
  },
  {
    question: "Which data structure is typically used under the hood to implement recursive function calls?",
    options: ["Queue", "Stack", "Array", "Graph"],
    answer: 1
  },
  {
    question: "What is the time complexity of accessing an element in an array by index?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    answer: 0
  },
  {
    question: "Which of these sorting algorithms has the best worst-case time complexity?",
    options: ["Bubble sort", "Selection sort", "Merge sort", "Insertion sort"],
    answer: 2
  },
  {
    question: "In Python, which construct is used to handle exceptions?",
    options: ["try/except", "catch/throw", "if/else", "switch/case"],
    answer: 0
  },
  {
    question: "What does a typical linked list node consist of?",
    options: ["Only data", "Data and a pointer to the next node", "Only a pointer", "Two data fields only"],
    answer: 1
  },
  {
    question: "Which data structure follows FIFO (First In, First Out) order?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: 1
  },
  {
    question: "What is the best achievable average-case time complexity for comparison-based sorting algorithms?",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(2^n)"],
    answer: 1
  },
  {
    question: "In Python, what does the list method append() do?",
    options: ["Removes the last element", "Adds an element to the end", "Sorts the list", "Reverses the list"],
    answer: 1
  },
  {
    question: "Which of these is NOT considered a linear data structure?",
    options: ["Array", "Linked List", "Tree", "Stack"],
    answer: 2
  },
  {
    question: "What is the time complexity of searching for an element in a balanced binary search tree?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: 1
  },
  {
    question: "In Python, which keyword creates a small anonymous function?",
    options: ["def", "lambda", "func", "anon"],
    answer: 1
  },
  {
    question: "What technique solves a problem by breaking it into overlapping subproblems and reusing stored results?",
    options: ["Greedy algorithm", "Dynamic programming", "Divide and conquer", "Backtracking"],
    answer: 1
  },
  {
    question: "Which data structure is most commonly used to implement an efficient priority queue?",
    options: ["Array", "Linked List", "Heap", "Stack"],
    answer: 2
  },
  {
    question: "What is the time complexity of computing the nth Fibonacci number using plain recursion, without memoization?",
    options: ["O(n)", "O(log n)", "O(2^n)", "O(n^2)"],
    answer: 2
  },
  {
    question: "In Python, what is a 'list comprehension' used for?",
    options: ["Commenting code", "A concise way to build a list", "Deleting a list", "A loop that only works on dictionaries"],
    answer: 1
  }
];

// ---- State ----
let currentIndex = 0;
let score = 0;
let answered = false;

// ---- Elements ----
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionCount = document.getElementById("question-count");
const scoreLive = document.getElementById("score-live");
const progressFill = document.getElementById("progress-fill");
const feedback = document.getElementById("feedback");

const finalScore = document.getElementById("final-score");
const resultHeading = document.getElementById("result-heading");
const resultMessage = document.getElementById("result-message");

// ---- Screen control ----
function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach(s => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

// ---- Quiz flow ----
function startQuiz() {
  currentIndex = 0;
  score = 0;
  showScreen(quizScreen);
  loadQuestion();
}

function loadQuestion() {
  answered = false;
  feedback.textContent = "";
  feedback.className = "feedback";
  nextBtn.disabled = true;

  const q = questions[currentIndex];
  questionText.textContent = q.question;
  questionCount.textContent = `Question ${currentIndex + 1} / ${questions.length}`;
  scoreLive.textContent = `Score: ${score}`;
  progressFill.style.width = `${(currentIndex / questions.length) * 100}%`;

  optionsContainer.innerHTML = "";
  q.options.forEach((optionText, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = optionText;
    btn.addEventListener("click", () => selectAnswer(i, btn));
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(selectedIndex, btnEl) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const allOptions = optionsContainer.querySelectorAll(".option");
  allOptions.forEach(opt => (opt.disabled = true));

  if (selectedIndex === q.answer) {
    score++;
    btnEl.classList.add("correct");
    feedback.textContent = "Correct!";
    feedback.classList.add("correct");
  } else {
    btnEl.classList.add("incorrect");
    allOptions[q.answer].classList.add("correct");
    feedback.textContent = "Not quite.";
    feedback.classList.add("incorrect");
  }

  scoreLive.textContent = `Score: ${score}`;
  nextBtn.disabled = false;
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  progressFill.style.width = "100%";
  showScreen(resultScreen);
  finalScore.textContent = score;

  const pct = score / questions.length;
  if (pct === 1) {
    resultHeading.textContent = "Perfect score!";
    resultMessage.textContent = "You got every question right. Impressive range of knowledge.";
  } else if (pct >= 0.7) {
    resultHeading.textContent = "Nicely done.";
    resultMessage.textContent = "A strong result — only a couple slipped past you.";
  } else if (pct >= 0.4) {
    resultHeading.textContent = "Decent run.";
    resultMessage.textContent = "A solid attempt. Play again to sharpen your score.";
  } else {
    resultHeading.textContent = "Room to grow.";
    resultMessage.textContent = "Everyone starts somewhere — give it another shot.";
  }
}

// ---- Event listeners ----
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);
