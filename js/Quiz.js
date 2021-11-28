class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    background("Yellow");
    fill(0);
    textSize(26);
    text("Resultado de la revolucion",340, 50);
    text("----------------------------------------",320, 65);
    Contestant.getPlayerInfo();
    if(allContestans !== undefined){
      debugger;
      var display_Answers = 230;
      fill("blue");
      textSide(20);
      text("*NOTA: ¡El concursante que fue elegido kaiser, esta resaltado de color verde!",30,230);

      for(var plr in allContestans){
        debugger;
        var CorrectAns = "4";
        if (CorrectAns === allContestans[plr].answer)
        fill("Green")
        else
        fill("red");

        display_Answers+=30;
        textSide(20);
        text(allContestans[plr].name + ":" + allContestans[plr].answer, 250,display_Answers)
      }
    }
  }
}
