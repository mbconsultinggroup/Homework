
  
  var seconds;
  var temp;
 
  function countdown() {
    seconds = document.getElementById('countdown').innerHTML;
    seconds = parseInt(seconds, 30);
 
    if (seconds == 1) {
      temp = document.getElementById('countdown');
      temp.innerHTML = "Time is up!";
      return;
    }
 
    seconds--;
    temp = document.getElementById('countdown');
    temp.innerHTML = seconds;
    timeoutMyOswego = setTimeout(countdown, 1000);
  };


(function() {
  var questions = [{
    question: "What percentage of Trump's public statements are true?",
    choices: [15, 25, 50, 75, 100],
    correctAnswer: 0
  }, {
    question: "How much would Trump's economic 'plan' add to the US debt?",
    choices: ["None", "25 Billion", "100 Billion", "500 Billion", "18 Trillion"],
    correctAnswer: 4
  }, {
    question: "Why does Trump need constant validation?",
    choices: ["He has a very small penis", "He is obese", "He has never gotten any without paying for it", "All of the above"],
    correctAnswer: 3
  }, {
    question: "What made Trump the racist he is?",
    choices: ["He has never met anyone who is not white", "He is afraid of anyone different than himself", "He has rabies", "He is just ignorant", "As a priviledged white man he thinks it makes him honest"],
    correctAnswer: 3
  }, {
    question: "Why does anyone support Trump, or even listen to him",
    choices: ["They are ignorant", "They are afraid of losing their entitlements to hard working minorities", "They watch too much TV news", "They never felt an education was necessary", "All of the above"],
    correctAnswer: 4
  }];
  
  var questionCounter = 0;
  var selections = [];
  var quiz = $('#quiz');

  displayNext();
  
  $('#next').on('click', function (e) {
    e.preventDefault();
    

    choose();

    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  

 
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();