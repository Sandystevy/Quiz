const questionContainer = document.getElementById('quiz');
const results = document.getElementById('results');
const btn = document.getElementById('submit');


let myQuestions=[];
function fetchQuestion(){
  const url = 'https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple'
  fetch(url)  
  .then(res => res.json())
    .then(data => {
      myQuestions = data.results;
      createAllQuestions(data.results);
    });
};

function createAllQuestions(allQuestions){
  for (let i = 0; i < allQuestions.length; i++) {
    let questionNumber = i + 1;
    createQuestionItem(allQuestions[i], questionNumber);       
  };
};

function createQuestionItem(question, questionNum){
  let questionText = question.question;
  let correctAnswer = question.correct_answer;
  let incorrectAnswers = question.incorrect_answers;

  let allAnswers = [...incorrectAnswers];
  allAnswers.push(correctAnswer);

  let options = [];
  let questionWrapper =[];
  allAnswers.forEach((answer) => {
    options.push(
      `<label>
        <input type="radio" name="question ${questionNum}" value="${answer}">
        ${answer}
      </label>`
    );
  });

  questionWrapper.push(
    `<div class="questionDiv">
      <div class="question">${questionNum}. ${questionText} </div>
      <div class="answers"> ${options.join("")} </div>
    </div>`
  );

  questionContainer.innerHTML += questionWrapper.join(""); 

};

fetchQuestion();


// function calculateResult() {
//   const answerContainers = questionContainer.querySelectorAll('.answers');
//   let correctNum = 0;

//   myQuestions.forEach((question, questionNum) => {
//     console.log(questionText);
//     console.log(questionNum);
//     const answerContainer = answerContainers[questionNum];
//     const selectedQuestion = `input[type="radio"]:checked`;
//     const userAnswer = (answerContainer.querySelector(selectedQuestion) || {}).value;
//     if(userAnswer === question.correctAnswer){
//       correctNum += 1;
//       answerContainer.style.color = 'lightgreen';
//     }
//     else {
//       answerContainer.style.color = 'red';
//     }
//   });

//   results.innerHTML = `${correctNum} out of ${myQuestions.length}`;
// };


function calculateResults() {
  let resultCounter = 0;
  myQuestions.forEach((question, questionNum) => {
    const questionOptions = document.querySelectorAll(`input[name="question ${questionNum + 1}"]`);
    // console.log('correctanswer =', question.correct_answer);
    
    questionOptions.forEach((inputEl) => {
      if(inputEl.checked) {
        inputEl.value === question.correct_answer ? resultCounter++ : "";
      }
    });
  });

results.innerHTML = `${resultCounter} out of ${myQuestions.length}`;
  
};

btn.addEventListener('click', calculateResults)
