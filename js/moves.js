
//-----------------MAIN MOVE FUNCTION

function moveTo(squareFrom, squareTo) {
  let commentary = "";

    populateCell64(squareFrom,squareTo);
    let moves = board_places.moves[squareFrom];
    let piece = board_places.piece[squareFrom];

     //-----is an empty square clicked? Or out of bounds?
    if ( (board_places.piece[squareFrom] == ".") || (board_places.number[squareTo] == 100) )  {
      commentary = ("</br>Invalid Move");
      invalidMove(commentary, commentarySide);
      return board_places;}

    turnEval(squareFrom,squareTo);
    if (turnToPlay == false)  {
      commentary = ("</br>It's " + turn + "'s Turn!");
      invalidMove(commentary, commentarySide);
      return board_places;
    };

    isSquareToValid(squareFrom,piece,moves,squareTo);
    castlePlay=false;
    if ( (board_places.piece[squareFrom] == "K") || ( board_places.piece[squareFrom] == "k") ) 
    castleQuery (squareFrom,squareTo);

    if (board_places.moveTo[squareTo] == false)  {
      commentary = ("</br>Invalid Move");
      invalidMove(commentary, commentarySide);
      return board_places.piece;
    }

    if ( (board_places.moveTo[squareTo] == true) && (board_places.capture[squareTo] == true) && (board_places.color[squareTo]=="w")) {
      board_places.Wcaptured.push(board_places.piece[squareTo]);
      board_places.Wcapturedhtml.push(board_places.htmlName[squareTo]);
      commentary += ("</br>" + board_places.standardName[squareFrom] + " captures " + board_places.standardName[squareTo]);
    }

    if ( (board_places.moveTo[squareTo] == true) && (board_places.capture[squareTo] == true) && (board_places.color[squareTo]=="b")) {
      board_places.Bcaptured.push(board_places.piece[squareTo]);
      board_places.Bcapturedhtml.push(board_places.htmlName[squareTo]);
      commentary += ("</br>" + board_places.standardName[squareFrom] + " captures " + board_places.standardName[squareTo]);
    }

    if ( (board_places.moveTo[squareTo] == true) || (board_places.capture[squareTo] == true) || (castlePlay == true) ){

          if (castlePlay == false) {
            commentary += ("</br>" + board_places.standardName[squareFrom] + " moves to " + board_places.square[squareTo] );
            board_places.piece[squareTo]=board_places.piece[squareFrom];
            board_places.piece[squareFrom]=".";  //empty old cell

            if( (board_places.piece[squareTo] == "P") && (board_places.row[squareTo] == 0) ) {
              board_places.piece[squareTo] = "Q";
              commentary = "</br><b>Pawn Queened!</b>"
            }
            if( (board_places.piece[squareTo] == "p") && (board_places.row[squareTo] == 7) )  {
              board_places.piece[squareTo] = "q";
              commentary = "</br><b>Pawn Queened!</b>"
            }
           
          }
          if (castlePlay == true) {
            commentary += ("</br>" + board_places.standardName[squareFrom] + " castles ");
            }
            
       

          if (board_places.color [squareFrom] == "w") {board_places.turn = "b";}
            else if (board_places.color [squareFrom] == "b") {board_places.turn = "w";}

          board_places.halfMove++;
          if (board_places.halfMove > 1) {board_places.halfMove = 0; board_places.fullMove += 1;}
    }

    populateCell64(squareFrom,squareTo);
    printBoard64(commentary);
    sideUpdate();
    printBoardGUI(commentary, commentarySide);
    clearSquaresGUI();
    logFen();
    
    
    round=0; x = board_places.square[squareFrom];
    round=1; y =  board_places.square[squareTo];
console.log (x,y);
    $("#" + x).addClass("boxflash");
  window.setTimeout(function() {
    $("#" + x).removeClass("boxflash");
  }, 1325);

  $("#" + y).addClass("boxflash");
  window.setTimeout(function() {
    $("#" + y).removeClass("boxflash");
  }, 2500);

 

    if ( (board_places.turn == "b") && (computerbox.checked == true) ) {
      let emojiNumber = 0;
      let emojiHTML = "";
      do {
        emojiNumber = parseInt((Math.random())*100); 
        } while (
        (emojiNumber >67) && (emojiNumber <13)
        )
      emojiHTML = "&#" + (128500 + emojiNumber)
      $("#emoji").html(emojiHTML);
      window.setTimeout(function(){     

        RAND()},2500); 
        return board_places;
      }
        
//checkQuery(squareTo);
    return board_places;
    
  };

//-------------TURN TO PLAY QUERY
function turnEval(squareFrom,squareTo){
turnToPlay = true;
  if (board_places.turn != board_places.color[squareFrom]) { turnToPlay = false; console.log(turnToPlay);
    return turnToPlay;
  }
  if (board_places.color[squareTo] == board_places.color[squareFrom]) {
    turnToPlay = false;
      return turnToPlay;
  }
if (board_places.turn =='b') turn = "Black";
else turn = "White";
 return turnToPlay;
};

//-----------Side Comment Box Refresh
function sideUpdate() {
  if (board_places.turn =='b') {
    turn = "Black";
    $("#commentboxSide").css("background-color","Grey");
  }  else {
    turn = "White";
    $("#commentboxSide").css("background-color","White");
  }

  commentarySide = ("</br>" + turn + " To Play");
  $("#commentboxSide").html(commentarySide);
};

//----------------EVALUATION SQUARE TO MOVE TO

function isSquareToValid(squareFrom,piece,moves,squareTo){

      for(i=0; i < moves.length; i++){

          let squareNext = squareFrom;
          squareNext += moves[i];
          if ((board_places.empty[squareFrom] == true) || (board_places.number[squareNext] >= 100) ) {
          }

          if ( (board_places.piece[squareFrom] == "P") || (board_places.piece[squareFrom] == "p") ) {
            pawnStart(squareFrom,squareNext,squareTo,moves[i]);

          } else if (board_places.slide[squareFrom] == true) {
              while( (board_places.empty[squareNext] == true) && (board_places.number[squareNext] != 100) ) {
                 board_places.moveTo[squareNext] = true;
                 squareNext += moves[i];
               }
          } else {
            board_places.moveTo[squareNext] = true;
          }

          captureQuery(squareFrom,squareNext);
          if (board_places.capture[squareNext] == false) board_places.moveTo[squareNext] = false;
          if (board_places.capture[squareNext] == true) board_places.moveTo[squareNext] = true;
    }

    //---------clear GUI squares

    for(i=21;i<=98;i++) {
      if (board_places.moveTo[i] == true) {
          moveFromSquare = board_places.square[i];
          $("#" + moveFromSquare).removeClass("boxflash");
      }
    }

  return board_places;
};
//------------------------ON CLICK NEW PIECE, HIGHLIGHT VLID MOVES ------------------------------------------------

function isSquareToValidFrom(squareFrom){
  let moves = board_places.moves[squareFrom];
  let piece = board_places.piece[squareFrom];
  turnToPlay = true;

  if (board_places.piece[squareFrom] == "."){
    commentary = ("</br>Select Piece");
    invalidMove(commentary, commentarySide);
    return board_places;
  }

  if (board_places.turn == "b") {
    turn = "Black";
  } else turn = "White";

  if (board_places.turn != board_places.color[squareFrom]) {
  turnToPlay = false;
  }

  if (turnToPlay == false)  {
    commentary = ("</br> It's " + turn + "'s Turn To Play!");
    invalidMove(commentary, commentarySide);
    return board_places;
  }

    for(i=0; i < moves.length; i++){

          let squareNext = squareFrom;
          squareNext += moves[i];
          if (board_places.number[squareNext] >= 100) continue;

          if ( ((board_places.piece[squareFrom] == "P") || (board_places.piece[squareFrom] == "p")) && (board_places.empty[squareNext] == true) ) {
                if (  (board_places.piece[squareFrom]=="P") && (board_places.row[squareFrom] == 6) && (board_places.empty[(squareFrom - 20)] == true) && (board_places.empty[(squareFrom - 10)] == true) ) {
                  board_places.moveTo[(squareFrom - 20)] = true;
                }
                if ( (board_places.piece[squareFrom]=="p") && (board_places.row[squareFrom] == 1) && (board_places.empty[(squareFrom + 20)] == true) && (board_places.empty[(squareFrom + 10)] == true) ) {
                  board_places.moveTo[(squareFrom + 20)] = true;
                }

                if ( (board_places.piece[squareFrom]=="P") && (moves[i] == -10) ) {
                  board_places.moveTo[(squareFrom - 10)] = true;
                }

                if ( (board_places.piece[squareFrom]=="p") && (moves[i] == 10) ) {
                          board_places.moveTo[(squareFrom + 10)] = true;
                }
                if  (board_places.empty[squareNext] == false) board_places.moveTo[squareNext] = false;

           }
            else if (board_places.slide[squareFrom] == true) {
              while( (board_places.empty[squareNext] == true) && (board_places.number[squareNext] != 100) ) {
                    board_places.moveTo[squareNext] = true;
                    if  (board_places.color[squareFrom] ==  board_places.color[squareNext]) {
                    board_places.moveTo[squareNext] = false;
                    }
                    squareNext += moves[i];
                 }
            } else if (board_places.color[squareFrom] ==  board_places.color[squareNext]) {
                board_places.moveTo[squareNext] = false;
            } else {
                board_places.moveTo[squareNext] = true;
              }

          captureQuery(squareFrom,squareNext);
          if (board_places.capture[squareNext] == false) board_places.moveTo[squareNext] = false;
          if (board_places.capture[squareNext] == true) board_places.moveTo[squareNext] = true;

    };
      //-----highlight valid moveTo positions---------
      for(i=21;i<=98;i++) {

        if (board_places.moveTo[i] == true) {
            moveFromSquare = board_places.square[i];
            $("#" + moveFromSquare).addClass("boxflash");
        }
      }

      commentary = "</br>" + board_places.standardName[squareFrom] + " on " + board_places.square[squareFrom]
            $("#commentbox").html(commentary);

    printBoardGUI(commentary, commentarySide)

    return board_places;

};


function isSquareToValidFromCheck(squareFrom){
  let moves = board_places.moves[squareFrom];
  let piece = board_places.piece[squareFrom];
  turnToPlay = true;

  //turn to play deleted

    for(i=0; i < moves.length; i++){

          let squareNext = squareFrom;
          squareNext += moves[i];
          if (board_places.number[squareNext] >= 100) continue;

          if ( ((board_places.piece[squareFrom] == "P") || (board_places.piece[squareFrom] == "p")) && (board_places.empty[squareNext] == true) ) {
                if (  (board_places.piece[squareFrom]=="P") && (board_places.row[squareFrom] == 6) && (board_places.empty[(squareFrom - 20)] == true) && (board_places.empty[(squareFrom - 10)] == true) ) {
                  board_places.moveTo[(squareFrom - 20)] = true;
                }
                if ( (board_places.piece[squareFrom]=="p") && (board_places.row[squareFrom] == 1) && (board_places.empty[(squareFrom + 20)] == true) && (board_places.empty[(squareFrom + 10)] == true) ) {
                  board_places.moveTo[(squareFrom + 20)] = true;
                }

                if ( (board_places.piece[squareFrom]=="P") && (moves[i] == -10) ) {
                  board_places.moveTo[(squareFrom - 10)] = true;
                }

                if ( (board_places.piece[squareFrom]=="p") && (moves[i] == 10) ) {
                          board_places.moveTo[(squareFrom + 10)] = true;
                }
                if  (board_places.empty[squareNext] == false) board_places.moveTo[squareNext] = false;

           }
            else if (board_places.slide[squareFrom] == true) {
              while( (board_places.empty[squareNext] == true) && (board_places.number[squareNext] != 100) ) {
                    board_places.moveTo[squareNext] = true;
                    if  (board_places.color[squareFrom] ==  board_places.color[squareNext]) {
                    board_places.moveTo[squareNext] = false;
                    }
                    squareNext += moves[i];
                 }
            } else if (board_places.color[squareFrom] ==  board_places.color[squareNext]) {
                board_places.moveTo[squareNext] = false;
            } else {
                board_places.moveTo[squareNext] = true;
              }

              captureQuery(squareFrom,squareNext);
              if (board_places.capture[squareNext] == false) board_places.moveTo[squareNext] = false;
              if (board_places.capture[squareNext] == true) board_places.moveTo[squareNext] = true;
    
    };
      //-----highlight valid moveTo positions---------
      console.log("board MoveTo",board_places.moveTo);
      let checkStatus = false;

      for(i=21;i<=98;i++) {
        if ( ( (board_places.piece[i] == "K") || (board_places.piece[i] == "k") ) && (board_places.moveTo[i] == true) ) {
            moveFromSquare = board_places.square[i];
            console.log(i,"In CHECK!!");
            $("#" + moveFromSquare).addClass("boxflash");
            commentary = "</br>" + board_places.standardName[i] + " in CHECK!";
            $("#commentbox").html(commentary);
            checkStatus = true;
            checkMateQuery(i);
        }
      }



    printBoardGUI(commentary, commentarySide)

    return board_places.moveTo;

};

//--------------CAPTURE LEGAL?

function captureQuery(squareFrom,squareNext) {
board_places.capture[squareNext] = false;

  if ((board_places.piece[squareFrom] =="P") || (board_places.piece[squareFrom] =="p")) {
      if ( ( board_places.color[squareNext] == board_places.color[squareFrom] ) ) {
        board_places.capture[squareNext] = false;
        return  board_places.capture[squareNext];
      }
      if ( (board_places.empty[squareNext] == true) && ( ((squareNext-squareFrom) %10 ) == 0) )  {
        board_places.capture[squareNext] = true ;
        return  board_places.capture[squareNext];
      }
      if ( (board_places.empty[squareNext] == false) && ( ((squareNext-squareFrom) %10 ) != 0) )  {
        board_places.capture[squareNext] = true ; 
        return  board_places.capture[squareNext];
      } 
    return  board_places.capture[squareNext]
  }

  if ( ( board_places.color[squareNext] != board_places.color[squareFrom] ) ) {
       board_places.capture[squareNext] = true;
       return  board_places.capture[squareNext];
   }

  return  board_places.capture[squareNext];
};

//----------Pawn Moves
function pawnStart(squareFrom,squareNext,squareTo,moves){
  if ( (board_places.empty[squareNext] == true) && (board_places.piece[squareFrom]=="P") && (board_places.row[squareFrom] == 6) && ((squareTo - squareFrom) == -20) ) {
    board_places.moveTo[squareTo] = true;
    return board_places.moveTo[squareTo];
  }
  if ( (board_places.empty[squareNext] == true) && (board_places.piece[squareFrom]=="p") && (board_places.row[squareFrom] == 1) && ((squareTo - squareFrom) == 20) ) {
    board_places.moveTo[squareTo] = true;
    return board_places.moveTo[squareTo];
  }

  if ( (board_places.empty[squareNext] == true) && (board_places.piece[squareFrom]=="P") && (moves == -10) ) {
    board_places.moveTo[squareNext] = true;
  }

    else if ( (board_places.empty[squareNext] == true) && (board_places.piece[squareFrom]=="p") && (moves == 10) ) {
            board_places.moveTo[squareNext] = true;
    }
    return board_places.moveTo[squareNext];
};

function castleQuery(squareFrom,squareTo){
castlePlay=false;

  if ( (squareFrom == 95) && ( squareTo == 97 ) && ( board_places.piece[squareTo + 1] == "R") ) {
    if ( (board_places.empty[97] == true) && (board_places.empty[96] == true) ) {
      board_places.CastleWK = ""; castlePlay = true;
    } else {board_places.CastleWK = "K" };
  }

  if ( ( squareTo == 93 ) && ( board_places.piece[91] == "R") ) {
    if ( (board_places.empty[92] == true) && (board_places.empty[93] == true) && (board_places.empty[94] == true) ) {
      board_places.CastleWQ = ""; castlePlay = true;
      console.log(board_places);
    } else {board_places.CastleWQ = "Q" };
  }

  if ( ( squareTo == 27 ) && ( board_places.piece[squareTo + 1] == "r") ) {
    if ( (board_places.empty[26] == true) && (board_places.empty[27] == true) ) {
      board_places.Castlebk = ""; castlePlay = true;
    } else {board_places.Castlebk = "k" };
  }

  if ( ( squareTo == 23 ) && ( board_places.piece[squareTo - 2] == "r") ) {
    if ( (board_places.empty[22] == true) && (board_places.empty[23] == true) && (board_places.empty[24] == true) ) {
      board_places.Castlebq = ""; castlePlay = true;
    } else {board_places.Castlebq = "q" };
  }

  if (castlePlay == true) castleMove(squareFrom, squareTo);
    return board_places.piece;
};

function castleMove(squareFrom, squareTo){
  castlePlay = true;
  let start = squareFrom;
  if (squareTo == 97) { castleArray = [ ".", "R" , "K" , "." ]; increment = 1;}
  if (squareTo == 93) { castleArray = [ ".", "R",  "K",  ".", "."];increment = -1;}
  if (squareTo == 23) { castleArray = [ ".", "r",  "k",  ".", "."];increment = -1;}
  if (squareTo == 27) { castleArray = [ ".", "r",  "k",  "."]; increment = 1;}
  for (i=0; i<castleArray.length; i++){
    board_places.piece[start] = castleArray [i];
    start= start + increment
  }
  board_places.moveTo[squareTo] = true;
  return board_places.piece;
};

//-----------------Check and CheckMate-----------

function checkQuery(squareTo){
// run the newly positioned piece issquarevalidFrom, if any valid square = opoosite king, then check=true and goto CheckMateQuery

console.log("SquareTo; ",squareTo);
squareFrom = squareTo;

isSquareToValidFromCheck(squareFrom);
for(i=21;i<=98;i++){
  if (board_places.moveTo[i] == true) {
    if ( (board_places.piece[i] == "K") || (board_places.piece == "k") ) {
      commentary = board_places.standardName[i] + "is in CHECK"; 
      checkStatus = true;
      checkMateQuery(i);
      return checkStatus;
    }
  }
}
};
//King must move, no other pieces
function checkMateQuery(i) {

  moves = board_places.moves[i];

  for(n=0; n < moves.length; n++){
  let squareNext = board_places.number[i];
  squareNext += moves[n];

    if (board_places.number[squareNext] >= 100) continue;

    if (board_places.moveTo[squareNext] == true) continue;
    if (board_places.moveTo[squareNext] == false) {
      console.log(n, "Move King here");
      checkMate = true;
      commentary = "Check Mate " + board_places.standardName[i] + "!!"; 
      } else {
      checkMate = false;
    }
  return checkMate;

  }

};