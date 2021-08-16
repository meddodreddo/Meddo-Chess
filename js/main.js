


//------GAME START INITIALIZATION-----
initBoard();


//----------------MOUSE HANDLER-----------
$("#SetFen").click(function () {
  let fen = $("#fenIn").val();
  fen_to_board(fen);
});

//-----------NEW GAME BUTTON---------
$(document).on('click','#ResetButton', function(e){
  initBoard();
  });

//--------Back Button------
$(document).on('click','#BackButton', function(e){

    backFunction();
    });

//-----------------MOVE HANDLER-----------
$(document).on('click','.box', function(e){
  
        squareclick1 = e.target.id;
        logClick(round,squareclick1);
        round ++
        if (round > 1) {
            moveTo(squareFrom,squareTo);round = 0;moveFromSquare="", moveToSquare="";
          };
        return squareclick1;
      });

//-----------lOG BOX CLICKED FOR MOVE---------
function logClick(round,squareclick1){
    if (round == 0){
      clearSquaresGUI();
        moveFromSquare = squareclick1;
        getNumber(moveFromSquare,moveToSquare,round);
        isSquareToValidFrom(squareFrom);
      }

    if (round == 1){

        moveToSquare = squareclick1;
        getNumber(moveFromSquare,moveToSquare,round);

        if (board_places.color[squareTo] == board_places.color[squareFrom]) {
          //squareFrom = squareTo;
          round = 0;
          logClick(round,squareclick1);
          return round
        }

    }

};

//-------------GET SQUARE NUMBER FROM SQUARE'S SQUARE NAME ------
function getNumber(moveFromSquare,moveToSquare,round){

  if (round == 0) {
    for(i=21;i<=98;i++) {
      if (board_places.square[i] == moveFromSquare) {
              $("#" + moveFromSquare).addClass("boxflash");
            squareFrom = i;
            return squareFrom
        }
    };
  };

  if (round == 1) {
      for(i=21;i<=98;i++) {
          if (board_places.square[i] == moveToSquare) {
            squareTo = i;
            return squareTo
          };
      }
  };

};

function RAND() { 
  let randomnumber = 0;
  do {
	randomNumber = parseInt((Math.random())*100); 
  } while (
  (randomNumber <21) || 
  (randomNumber > 98) ||
  (board_places.empty[randomNumber] == true) ||
  (board_places.color[randomNumber] != "b") 
    );
computerPlaySquareFrom(randomNumber);
return randomNumber;
};

function computerPlaySquareFrom(randomNumber){
  squareTo = 0;
  isSquareToValidFrom(randomNumber);
  console.log("RANDOM NUMBER", randomNumber);
  console.log("Piece: ",board_places.piece[randomNumber]);
  console.log("Move To: ",board_places)

  for(i=98;i>=21;i--) {

    if ( (board_places.moveTo[i] == true) && (board_places.color != board_places.color[randomNumber]) ) {
      squareTo = board_places.number[i];
      moveTo(randomNumber,squareTo);
      return randomNumber;
    }
  }

  for(i=98;i>=21;i--) {

    if (board_places.moveTo[i] == true) {
      squareTo = board_places.number[i];
      moveTo(randomNumber,squareTo);
      return randomNumber;
    }

  }
    RAND();
  return randomNumber;
}



let computerbox = document.querySelector('input[value="on"]');
/*
computerbox.addEventListener('change', () => {
  if(computerbox.checked) {
    console.log("Checked!!!",computerbox.checked);
  } else {
    console.log("UNChecked!!!");
  }
});
*/

