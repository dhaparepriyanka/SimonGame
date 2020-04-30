var buttonColors =["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomNumber;
var randomChosenColor;
var level =0;

//to start off the game
$(document).one("keypress", function(){
  nextSequence();
  $("h1").text("Level 0");
});


//when player clicks a button
$(".btn").click(function(){
  var userChosenColor = this.id;
  playSound(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  var lastIndex = userClickedPattern.length -1;
  checkAnswer(lastIndex);
});


//generating random sequence
function nextSequence(){
  $("h1").text("Level "+level);
  level=level+1;
  userClickedPattern = [];
  randomNumber = Math.floor(Math.random()*4);
  randomChosenColor = buttonColors[randomNumber];
  playSound(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(500);
  $("#"+randomChosenColor).fadeIn(500);
  gamePattern.push(randomChosenColor);
}

//playing sound
function playSound(name){
  var sound = new Audio("sounds/"+name+".mp3");
  sound.play();
}

//animation
function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
      $("."+currentColor).removeClass("pressed");
  }, 200);
}


//checking answer
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(nextSequence, 1000);
    }
  } else{
    console.log("wrong");
    wrongAnswer();
  }
}


//if answer is wrong
function wrongAnswer(){
  var wrongSound = new Audio("sounds/wrong.mp3");
  wrongSound.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart")
  $(document).one("keypress", function(){
    startOver();
    $("h1").text("Level 0");
  });
}

function startOver(){
  level =0;
  gamePattern = [];
  setTimeout(nextSequence, 500);
}
