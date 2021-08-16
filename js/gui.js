//-----------------------------------RESET GUI------------
function resetBoardGUI(){
    let line;
    round = 0;
    index = 21
      for (row = 0; row < 8; row++){
        for (column = 0; column < 8; column++){
          $("#" + board_places.square[index]).html(board_places.htmlName[index]);
          index++
        }

      index+=2;
    }
    let whiteString=" ";
    let blackString=" ";
    commentary = "</br>NEW GAME";
    commentarySide = "</br>White To Start";
    $("#whitecaptures").html(whiteString);
    $("#blackcaptures").html(blackString);
    $("#commentbox").html(commentary);
    $("#commentboxSide").html(commentarySide);

    $("#commentboxSide").css("background-color","White","color","White");

          $("#commentbox").addClass("commentboxflash");
          window.setTimeout(function() {
            $("#commentbox").removeClass("commentboxflash");
          }, 1500);

              $("#commentboxSide").css("background-color","White");

      for(i=21;i<=98;i++) {
            moveFromSquare = board_places.square[i];
            $("#" + moveFromSquare).removeClass("boxflash");
      }

return board_places
};

//-------------------PRINT GUI ----------------------------------------

function printBoardGUI(commentary, commentarySide){
    let line;
    index = 21
      for (row = 0; row < 8; row++){
        for (column = 0; column < 8; column++){
          $("#" + board_places.square[index]).html(board_places.htmlName[index]);
          index++
        }

      index+=2;
    }
    let whiteString="";
    let blackString="";

    for(i = 0; i < 13; i++) {

      if (board_places.Wcapturedhtml[i]  != undefined) {
        whiteString += board_places.Wcapturedhtml[i], " ";
          $("#whitecaptures").html(whiteString);
      }
      if (board_places.Bcapturedhtml[i]  != undefined) {
        blackString += board_places.Bcapturedhtml[i], " ";
            $("#blackcaptures").html(blackString);
      }
    }

    //$("#commentbox").html("</br>" + board_places.turn.toUpperCase() + " turn to play " );
    $("#commentbox").html(commentary);
            $("#commentbox").addClass("commentboxflash");
          window.setTimeout(function() {
            $("#commentbox").removeClass("commentboxflash");
          }, 325);
return board_places
};

function clearSquaresGUI(){
  for(i=21;i<=98;i++) {
    board_places.moveTo[i] = false;
        moveFromSquare = board_places.square[i];
        $("#" + moveFromSquare).removeClass("boxflash");
  }
}






function getHtml(pieceName){

  if (pieceName=="K") { pieceHtml = "&#9812";	return pieceHtml};
  if (pieceName=="Q") { pieceHtml = "&#9813";	return pieceHtml};
  if (pieceName=="R") { pieceHtml = "&#9814";	return pieceHtml};
  if (pieceName=="B") { pieceHtml = "&#9815";	return pieceHtml};
  if (pieceName=="N") { pieceHtml = "&#9816";	return pieceHtml};
  if (pieceName=="P") { pieceHtml = "&#9817";	return pieceHtml};
  if (pieceName=="k") { pieceHtml = "&#9818";	return pieceHtml};
  if (pieceName=="q") { pieceHtml = "&#9819";	return pieceHtml};
  if (pieceName=="r") { pieceHtml = "&#9820";	return pieceHtml};
  if (pieceName=="b") { pieceHtml = "&#9821";	return pieceHtml};
  if (pieceName=="n") { pieceHtml = "&#9822";	return pieceHtml};
  if (pieceName=="p") { pieceHtml = "&#9823";	return pieceHtml};
};
