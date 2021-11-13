const container = document.getElementById('quiz');
const results = document.getElementById('results');
const btn = document.getElementById('submit');

// let myQuestions = [
//     {
//       question: "Who invented JavaScript?",
//       answers: {
//         a: "Douglas Crockford",
//         b: "Sheryl Sandberg",
//         c: "Brendan Eich"
//       },
//       correctAns: "c"
//     },
//     {
//       question: "Which one of these is a JavaScript package manager?",
//       answers: {
//         a: "Node.js",
//         b: "TypeScript",
//         c: "npm"
//       },
//       correctAns: "c"
//     },
//     {
//       question: "Which tool can you use to ensure code quality?",
//       answers: {
//         a: "Angular",
//         b: "jQuery",
//         c: "RequireJS",
//         d: "ESLint"
//       },
//       correctAns: "d"
//     }
//   ];

let myQuestions =[];


const url = 'https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple'
fetch(url)  
.then(res => res.json())
  .then(data => {
    myQuestions = data.results
    console.log(myQuestions.results);
    answers = data.results
    console.log(answers.results)

    // correctAns = data.correct_answer;
    createQuestionItem();
    // createAnswerItem()
    });


let questionContainer = [];
let answers = [];
let correctAns = 0;

function createQuestionItem(){
    questionContainer = [];
    myQuestions.forEach((theQuestion) => {
        questionContainer.push(
            `<div class="question"> ${theQuestion.question}</div>
            <div class="answers"> ${answers.join('')}</div>`
            
        )
    });
    container.innerHTML = questionContainer.join('');
};

function createAnswerItem(){

    answers.forEach((theAnswer, theAnswerNum) => {
        answers = [];
        for(letter in theAnswer.answers){
            answers.push(
                `<label>
                    <input type="radio" name="question${theAnswerNum}" value="${letter}">
                    ${letter} :
                    ${theAnswer.answers[letter]}
                </label>`
            );
        }
    })
}

function resultDisplayed(){
    const answerContainers = container.querySelectorAll('.answers');
    correctAns = 0;

    myQuestions.forEach((theQuestion, theAnswerNum) => {
        const answerContainer = answerContainers;
        const selectedQuestion = `input[name=question ${theAnswerNum}]:checked`;
        const userAnswer = (answerContainer.querySelector(selectedQuestion) || {}).value;

        if(userAnswer === theQuestion.correctAns){
            correctAns++;
            
            answerContainer.style.color = 'green';
        } else{
            answerContainer.style.color = 'red';
        }
        
    });
    results.innerHTML = `${correctAns} out of ${myQuestions.length}`;

};
// document.getElementById("quiz").innerHTML = questionContainer;
btn.addEventListener('click', resultDisplayed);

