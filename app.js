// Quiz
class Quiz
{
    constructor(questions)
    {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    quizIndex()
    {
        return this.questions[this.questionIndex];
    }

    guess(answer)
    {
        if(this.quizIndex().isCorrectAnswer(answer))
        {
            this.score++;
        }
        this.questionIndex++;
    }

    quizEnded()
    {
        return this.questionIndex === this.questions.length;
    }
}

// Questions

class Questions
{
    constructor(text, options, answer)
    {
        this.text = text;
        this.options = options;
        this.answer = answer;
    }

    isCorrectAnswer(selectedchoice)
    {
        return this.answer === selectedchoice;
    }
}

function displayQuestions()
{
    if(quiz.quizEnded())
    {
        showScores();
    }
    else
    {
        let questionElement = document.querySelector('#question');
        questionElement.innerHTML = quiz.quizIndex().text;

        let choices = quiz.quizIndex().options;
        for(let i=0;i<choices.length;i++){
            let choiceElement = document.getElementById('choice'+ i);
            choiceElement.innerHTML = choices[i];
            guess('btn' + i,choices[i]);
        }

        showProgress();
    }
}


function guess(id, guess)
{
    let button = document.getElementById(id);
    button.onclick = function(){
        quiz.guess(guess);
        displayQuestions();       
    };
}

function showProgress()
{   let quizindexincrement = quiz.questionIndex + 1;
    let progressElement = document.getElementById('progress');
    progressElement.innerHTML = `
        Question ${quizindexincrement} of ${quiz.questions.length}
    `;
}


// SHOW SCORES
function showScores() {
    let quizEndHTML =
        `
    <h1>Quiz Completed</h1>
    <h2 id='score'> Your scored: ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="quiz-repeat">
        <a href="index.html">Take Quiz Again</a>
    </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};


let questions = 
[
    new Questions("Hyper Text Markup Language Stands For?",["JQuery", "XHTML", "CSS", "HTML"],"HTML"),
    new Questions("Cascading Style sheet stands for?",["HTML", "JQuery", "CSS", "XML"],"CSS"),
    new Questions("Which is a JavaScript Framework?",["React", "Laravel", "Django", "Sass"],"React"),
    new Questions("Which is a backend language?",["PHP", "HTML", "React", "All"], "PHP"),
    new Questions('Which is best for Artificial intelligence?',["React", "Laravel", "Python", "Sass"],"Python")
];

let quiz = new Quiz(questions);


displayQuestions();
