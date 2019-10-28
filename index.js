//start the quiz by clicking the start quiz button
function startQuiz(){
    $(("#start").on("click", function(event){
        loadsQuestion();
    }))
}
//function that updates the question number and the score
function updatesQuestionAndScore(){
    const qNumberScore = $(`<ul> <li id ="js-qNumber">Question: 
    ${STORE.currentQuestion + 1}/${STORE.questions.length}</li>
    <li id ="js-qScore">Score: ${STORE.score}/${STORE.questions.length}</li>
    </ul>`)
    $(".q-and-s").html(html);
}
//function that loads in the answer options
function answerOptions(){
    let question = STORE.questions
    [STORE.currentQuestion];
    for(i = 0; i < questions.options.length; i++){
        $('.js-options').append(`
        <input type = "radio" name="options" id="option${i+1}" value= "${question.options[i]}" tabindex ="${i+1}"> 
        <label for="option${i+1}"> ${question.options[i]}</label> <br/>
        <span id="js-r${i+1}"></span>
    `);

        )
    }
}
//function to load the questions and adds Html
function loadsQuestions(){
    let question = STORE.questions
    [STORE.currentQuestion];
    updatesQuestionAndScore();
    const htmlQuestion = $(
        `<div>
    <form id="js-questions" class="question-form">
      
      <fieldset>
        <div class="row question">
          <div class="space">
            <legend> ${question.question}</legend>
          </div>
        </div>

        <div class="row options">
          <div class="space">
            <div class="js-options"> </div>
        </div>
      </div>
    

      <div class="row">
        <div class="space">
          <button type = "submit" id="answer" tabindex="5">Submit</button>
          <button type = "button" id="next-question" tabindex="6"> Next >></button>
        </div>
      </div>
    </fieldset>
    </form>
  </div>`
    );
    $("main").html(htmlQuestion);
    answerOptions();
    $("#next-question").hide();
}
//this function checks if the questions are at the end of the list
function endList(){
    $('body').on('click','#next-question', (event) => {
        STORE.currentQuestion === STORE.questions.length?displayResults() : renderAQuestion();
      });
}
//function that checks if the answer is right or wrong
function checkAnswer(){
    $('body').on("submit",'#js-questions', function(event) {
        event.preventDefault();
        let currentQues = STORE.questions[STORE.currentQuestion];
        let selectedOption = $("input[name=options]:checked").val();
        if (!selectedOption) {
          alert("Choose an option");
          return;
        } 
        let id_num = currentQues.options.findIndex(i => i === selectedOption);
        let id = "#js-r" + ++id_num;
        $('span').removeClass("right-answer wrong-answer");
        if(selectedOption === currentQues.answer) {
          STORE.score++; 
          $(`${id}`).append(`You got it right<br/>`);
          $(`${id}`).addClass("right-answer");
        }
        else {
          $(`${id}`).append(`You got it wrong <br/> The answer is "${currentQues.answer}"<br/>`);
          $(`${id}`).addClass("wrong-answer");
        }
    
        STORE.currentQuestion++;
        $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
        $('#answer').hide();
        $("input[type=radio]").attr('disabled', true);
        $('#next-question').show();
      });
}
//function that shows the result of the quiz
function quizResults(){
    let resultHtml = $(
        `<div class="results">
          <form id="js-restart-quiz">
            <fieldset>
              <div class="row">
                <div class="col-12">
                  <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
                </div>
              </div>
            
              <div class="row">
                <div class="col-12">
                  <button type="button" id="restart"> Restart Quiz </button>
                </div>
              </div>
            </fieldset>
        </form>
        </div>`);
        STORE.currentQuestion = 0;
        STORE.score = 0;
      $("main").html(resultHtml);
    }
}
//function that checks if the answer was submitted
function submitAnswer(){}
// this function restarts a new quiz
function restartQuiz(){}
//this function handles and loads all the functions for the quiz
function handlesQuiz(){
 startQuiz();
 checkAnswer();
 endList();
 restartQuiz(); 
}
