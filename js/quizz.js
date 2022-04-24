const myQuestions = [
  {
    question:
      "Which of the following 1966 coup victim was the premier of western region?",
    a: "Sir Ahmadu Bello",
    b: "Michael Okpara",
    c: "Samuel Akintola",
    d: "Obafemi Awolowo",
    correctAnswer: "c",
    hint: "A Univeristy of Technology is named after him in Ogbomosho, his birth place in present Oyo State Nigeria!",
  },
  {
    question:
      "The Western and Eastern Nigeria became self governed in what year?",
    a: "1959",
    b: "1960",
    c: "1957",
    d: "1956",
    correctAnswer: "c",
    hint: "This happened 3 years before independence!",
  },
  {
    question:
      "Which of the following was the  first Executive President of Nigeria?",
    a: "Nnamdi Azikiwe",
    b: "Olusegun Obansanjo",
    c: "Shehu Shagari",
    d: "Goodluck Jonathan",
    correctAnswer: "c",
    hint: "He was conferred with the Turaki of Sokoto and Baba Korede of Ado Ekiti titles!",
  },
  {
    question: "Who was the first woman to drive a car in Nigeria?",
    a: "Patience Jonathan",
    b: "Fumilayo Ransom Kuti",
    c: "Lady Flynn",
    d: "Damilola Isiaq",
    correctAnswer: "b",
    hint: "She was the mother of the music legend Fela Anikulapo!",
  },
  {
    question:
      "Traditional rulers were restricted to ceremonial rules by the local government reforms of?",
    a: "1966",
    b: "1976",
    c: "1984",
    d: "1987",
    correctAnswer: "b",
    hint: "The year the Nigeria constitution styled on American presidential system was published!",
  },
  {
    question: "In what year did Nigeria cut ties with Israel diplomatically?",
    a: "1972",
    b: "1930",
    c: "1989",
    d: "1945",
    correctAnswer: "a",
    hint: "This occurred 6years after the first military coup in Nigeria!",
  },
  {
    question:
      "General Yakubu Gowon established how many states in Nigeria in May 1967?",
    a: "14",
    b: "18",
    c: "9",
    d: "12",
    correctAnswer: "d",
    hint: "Gowon create less than 35% of the current states in NIgeria!",
  },
  {
    question: "Nigerian Civil War began in which year?",
    a: "1960",
    b: "1963",
    c: "1967",
    d: "1970",
    correctAnswer: "c",
    hint: "Civil War started less than 5 years after Nigeria became republic!",
  },
  {
    question: "The last colonial governor general of Nigeria was?",
    a: "James Robertson",
    b: "Jimmy Carter",
    c: "Lord Lugard",
    d: "Huge Clifford",
    correctAnswer: "a",
    hint: "an Alma of University of Oxford!",
  },
  {
    question: "Oil was first discovered by shell-BP in Nigeria in?",
    a: "Oloibiri",
    b: "Idanre",
    c: "Warri",
    d: "kabba",
    correctAnswer: "a",
    hint: "A community in Bayelsa State!",
  },
  {
    question: "Nigeria became 36 states under the regime of",
    a: "Olusegun Obasanjo",
    b: "Sanni Abacha",
    c: "Ibrahim Babagida",
    d: "Yakubu Gowon",
    correctAnswer: "b",
    hint: "The military dictator died of heart attack in 1998!",
  },
  {
    question: "Which of these south western states can oil be found in  Nigeria?",
    a: "Lagos",
    b: "Ogun",
    c: "Ondo",
    d: "Ekiti",
    correctAnswer: "c",
    hint: "Home to mountains and hills. E.g Idanre Hills!",
  },
  {
    question: "The name Nigeria was coined by?",
    a: "Flora Shaw",
    b: "Mary Slessor",
    c: "Lord Esther",
    d: "Damilola Goldie",
    correctAnswer: "a",
    hint: "Wife of Lord Lugard!",
  },
  {
    question: "Which of the following wasn't part of the soldiers who headed the 1983 coup in Nigeria?",
    a: "Muhammadu Buhari",
    b: "Ibrahim Babangida",
    c: "Festus Okotiebo",
    d: "Tunde Idiagbon",
    correctAnswer: "c",
    hint: "He is the first finance minister of Nigeria!",
  },
  {
    question: "The last military head state of Nigeria was?",
    a: "Absulsaleem Abubaka",
    b: "Sanni Abacha",
    c: "Olusegun Obasanjo",
    d: "Yakubu Gowon",
    correctAnswer: "a",
    hint: "He is the convenner of the peace truce in 2015 between Jonathan and Buhari!",
  },
];

const quiz = document.getElementById("quiz");
const answer_list = document.querySelectorAll(".answer");
const question_list = document.getElementById("question");
const a_option = document.getElementById("a_option");
const b_option = document.getElementById("b_option");
const c_option = document.getElementById("c_option");
const d_option = document.getElementById("d_option");
const hint = document.getElementById("hint");
const next_btn = document.getElementById("next");
const progressBar = document.querySelector(".p_bar_full");
const progressCount = document.querySelector(".no_of_quizzes");

let currentQuiz = 0;
let score = 0;
let wrong = myQuestions - score;
let timerId;

next_btn.addEventListener("click", handleNxt);

answer_list.forEach((op) => {
  op.addEventListener("input", handleOptionSelect);
});

loadQuiz();

function loadQuiz() {
  clearInterval(timerId);
  createTimer(1, handleNxt);
  unselectAnswer();
  clearLock();
  const currentQuizData = myQuestions[currentQuiz];
  question_list.innerText = currentQuizData.question;
  a_option.innerText = currentQuizData.a;
  b_option.innerText = currentQuizData.b;
  c_option.innerText = currentQuizData.c;
  d_option.innerText = currentQuizData.d;
  hint.innerText = currentQuizData.hint;
}

function unselectAnswer() {
  answer_list.forEach((answers) => (answers.checked = false));
}

function getSelect() {
  let answer;
  answer_list.forEach((answers) => {
    if (answers.checked) {
      answer = answers.id;
    }
  });
  return answer;
}

function handleNxt() {
  const answer = getSelect();

  if (!answer && timerId) {
    return;
  }

  if (answer === myQuestions[currentQuiz].correctAnswer) {
    score++;
  }

  currentQuiz++;

  if (currentQuiz < myQuestions.length) {
    loadQuiz();
  } else {
    displayResult();
    redirect();
  }

  updateProgressBar();
  updateQuestionCount();
}


/**
 * Once an option has been chosen lock the ability to choose.
 */
function handleOptionSelect() {
  answer_list.forEach((op) => {
    op.setAttribute("disabled", "disabled");
    if (op.checked) {
      op.removeAttribute("disabled");
    }
  });
}

/**
 * Clear the lock on next question.
 */
function clearLock() {
  answer_list.forEach((op) => {
    op.removeAttribute("disabled");
  });
}

/**
 * Create a timer. It will also update the view.
 * @param {Integer} mins - how long should the timer run in minutes.
 * @param {Function} cb - function to call when the time is over.
 */
function createTimer(mins, cb) {
  const timerEl = document.querySelector(".timer");
  let timeRemainsInSeconds = mins * 60;
  timerId = setInterval(() => {
    timeRemainsInSeconds--;
    updateView();

    if (timeRemainsInSeconds <= 0) {
      clearInterval(timerId);
      timerId = null;
      cb();
    }
  }, 1000);

  function updateView() {
    timerEl.textContent = `${parseInt(timeRemainsInSeconds / 60)}:${
      timeRemainsInSeconds % 60
    }`;
  }
}

function updateProgressBar() {
  const width = (currentQuiz / myQuestions.length) * 100;
  progressBar.style = `width: ${width}%`;
}

function updateQuestionCount() {
  progressCount.textContent = `${currentQuiz}/${myQuestions.length}`;
}

/**
 * Update the view depending on the state of the app.
 * that is where it is due to time out or the user has completed it.
 */
function displayResult(isTimeUP = false) {
  let markup = `<h2>You answered ${score}/${myQuestions.length} questions correctly</h2>`;

  if (isTimeUP) {
    markup = `
      <h2>Time's up<br><br>You answered ${score}/${myQuestions.length} questions correctly</h2>`;
  }

  quiz.innerHTML = markup;
}

/**
 * Redirect the user after the quiz has finished.
 */
function redirect() {
  const scorePercent = (score / myQuestions.length) * 100;
  setTimeout(() => {
    const query = `?score=${score}&questions=${myQuestions.length}`;
    if (scorePercent >= 50) {
      window.location = `success_page.html${query}`;
    } else {
      window.location = `failure_page.html${query}`;
    }
  }, 1500);
}
