let buttonColors= ['red','yellow','blue','green'];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level=0;




$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+ level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function (){
    let userChosenColour= $(this).attr("id")
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
})


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");  
        playSound("wrong"); 
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

       
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
    }

   

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("level "+ level);


    let randomNumber = Math.floor(Math.random()*4)
    let randomChosenColour = buttonColors[randomNumber];
gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);


}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
}, 100);
}

function  startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
