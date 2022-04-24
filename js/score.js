const scoreEl = document.querySelector(".score");
const scoreBar = document.querySelector(".score_bar");
const scorePerEl = document.querySelector(".score_percent");

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const score = params.score;
const totalQuestion = params.questions;

if (score && totalQuestion) {
  scoreEl.textContent = `${score}/${totalQuestion}`;
  const scorePercent = (score / totalQuestion) * 100;
  scoreBar.style = `width: ${scorePercent}%`;
  scorePerEl.textContent = scorePercent + " %";
}
