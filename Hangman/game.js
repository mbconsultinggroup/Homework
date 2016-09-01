(function() {
  $(function() {

    var words = ['test', 'something', 'some'];
    var rand = getRandom(words);
    var ourword = words[rand].toUpperCase();
    var guessed = [];
    var ourWordProgress = [];
    var chances = 10;

    console.log(ourword);
    $('.hangman-chances').html(chances);
    loadWord(ourword);
    loadButtons();

    $('.hangman-button').on('click', function(event) {

      var guess = $(event.target).attr('id');

      if(guessed.indexOf(guess) === -1) {

        guessed.push(guess);
        $('.hangman-guessed').append(guess);

      } else {

        alert('Letter already used!');
        return;
      }

      if(!checkWord(guess, ourword)) {
        chances--;
        $('.hangman-chances').html(chances);

        if(chances === 0) {
          alert('You lose!');
        }
      }

      if(ourWordProgress.length === ourword.length) {
        alert('You win!');
      }

    });

    function checkWord(guess, word) {

      // console.log('hit word check');

      var flag = false;

      for(var i=0; i < word.length; i++) {

        console.log(guess, word[i]);
        if(guess === word[i]) {

          $('.hangman-letters li').eq(i).html(guess);
          ourWordProgress.push(guess);
          flag = true;

        }

      }

      return flag;
    }

    function getRandom(word) {

      return Math.floor(Math.random()*word.length);
    }

    function loadWord(word) {

      for(var i=0; i < word.length; i++) {
        $('.hangman-letters').append('<li>');
      }
    }

    function loadButtons() {

      for(var i = 65; i <= 90; i++) {
        var letter = String.fromCharCode(i);
        $('.hangman-inputs').append('<button class="hangman-button" id="'+letter+'">'+letter+'</button>');
      }
    }
  });
})();
