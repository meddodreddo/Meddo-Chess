

 //-------------------------------------RESET Board
function resetBoard() { //Assign "100" to all off board Board_placess
    index = 0
    for (row = 0; row < 12; row++){
      for (column = 0; column < 10; column++){
        board_places.number[index] = 100;
        board_places.empty[index] = true; //1 true
        index++
      }
    }

//Assign 21 to 98 to all ON board Board_placess
    index = 21
    for (row = 0; row <8; row++){
        for (column = 0; column < 8 ; column++){
            board_places.number[index] = index;
            board_places.piece[index] = ".";
            board_places.empty[index] = true; //1 true
            board_places.row[index]=row;
            index++
        }
      index += 2
     }
    return board_places;
};

//-----------------------------------PRINT BOARD

function printBoard(){
      resetBoard();
      let line;
      index = 0

      console.log("\nGAME BOARD\n");
        for (row = 0; row < 12; row++){
            for (column = 0; column < 10; column++){
              line += "  " + board_places.number[index] + "  ";
              index++
            }
        console.log(line);
        line = "";

        }
    return board_places.number;
};

// --------------------RESET BOARD 64
function resetBoard64(){
    board_places.Wcaptured = new Array();
    board_places.Bcaptured = new Array();
    board_places.Wcapturedhtml = new Array();
    board_places.Bcapturedhtml = new Array();
    board_places.turn = "W";

    index = 21
      for (row = 0; row < 8; row++){
        for (column = 0; column < 8; column++){
            board_places.number[index]=index;
            board_places.piece[index] = "."
            board_places.empty[index] = true;
            board_places.row[index] = row;
            board_places.moveTo[index] = false; //----------Delete here
            index++;
        }
        index+=2;
      }
  return board_places;
};

// --------------PRINT BOARD 64
function printBoard64(){
    let line;
    index = 21
    board_places.square[index]="a1"
    console.log("\n---------GAME BOARD---------\n","Color: ", board_places.turn.toUpperCase(),"to play. Move#",board_places.fullMove);
    console.log("White pieces captured: ",board_places.Wcaptured);
    console.log("Black pieces captured: ",board_places.Bcaptured);


      for (row = 0; row < 8; row++){
        for (column = 0; column < 8; column++){
          if (board_places.moveTo[index] == true) {
            line += " |" + board_places.piece[index] + "| ";
            board_places.moveTo[index] = false;
            
          } else {
            line += "  " + board_places.piece[index] + "  ";
          }
          board_places.square[index] = String( (String.fromCharCode(97 + column) + (row+1)) );
          index++
        }
      console.log((row+1), "  " + line);
      line = "";
      index+=2;
    }

    printBoardGUI();

  return board_places;
};

//-------------POPULTE BOARD SQUARES
function populateCell64() {
    for (let index = 21; index <= 98; index++) {
      for(i = 0; i < 13; i++) {
        if (board_places.piece[index]  == pieceData[i][0]) {
              board_places.color[index] = pieceData[i][1];
              board_places.moves[index] = pieceData[i][2];
              board_places.empty[index] = pieceData[i][3];
              board_places.slide[index] = pieceData[i][4];
              board_places.standardName[index] = pieceData[i][5];
              board_places.htmlName[index] = pieceData[i][6];
        }
      }
    }

  return board_places;
};

//FEN writing to board_places array function
function fen_to_board(fen){
    resetBoard64();
    let fenString=Array.from(fen)
    index = 21;
    fenIndex=0;
    let end;

    do { ///reads out string of the FEN

      if (fenString[fenIndex] == "/") {
        index+=2;
        fenIndex++;
      } else if (fenString[fenIndex] > 0) {
            end=fenIndex
              for(i = 0; i < fenString[end]; i++) {
                board_places.piece[index]=".";
                index++;
              }
              fenIndex++;
        } else {
            board_places.piece[index] = fenString[fenIndex];
            index++;
            fenIndex++;
          }
    } while (fenString[fenIndex] != " ");

    // color of side to play
    fenIndex++;
    board_places.turn = fenString[fenIndex];

    //Castlepermission
    fenIndex++;
     if (fenString[fenIndex]="K") {board_places.CastleWK="K"; fenIndex++; }
     if (fenString[fenIndex]="Q") {board_places.CastleWQ="Q"; fenIndex++; }
     if (fenString[fenIndex]="k") {board_places.Castlebk="k"; fenIndex++; }
     if (fenString[fenIndex]="q") {board_places.Castlebq="q"; fenIndex++; }


    //En passant status
    fenIndex+=2;

    if (fenString[fenIndex] == "-") board_places.enpas = "-";
    else {board_places.enpas = "+";};

    //Halfmove clock
    fenIndex+=2;

    board_places.halfMove = Number(fenString[fenIndex]);

    //Full move number
    fenIndex+=2
    board_places.fullMove = Number(fenString[fenIndex]);

  populateCell64();
  printBoardGUI(commentary,commentarySide);
  return board_places;
};


//----------------WRITE FEN

function logFen() {
  let fenString="";
  let line="";
  let emptycell;
  index = 21

    for (row = 0; row < 8; row++){
      emptycell=0
      for (column = 0; column < 8; column++){
        if (board_places.piece[index] == "."){emptycell++; index++; continue;}
        if (emptycell != 0)  { line += emptycell; emptycell=0; line += board_places.piece[index] }
         else line += board_places.piece[index]
        index++
      }
      if (emptycell != 0)  { line += emptycell};
      fenString += line
      if (row != 7) fenString += "/";
    line = "";
    index+=2;
    }

  fenString+=" ";
  fenString += (board_places.turn);
  fenString+=" ";
  fenString += (board_places.CastleWK + board_places.CastleWQ + board_places.Castlebk + board_places.Castlebq);
  fenString+=" ";
  fenString += (board_places.enpas);
  fenString+=" ";
  fenString += (board_places.halfMove);
  fenString+=" ";
  fenString += (board_places.fullMove);

  //--- Add FEN to log of moves
  fenLog.push(fenString);
  $("#fen").html(fenString);
  return fenLog

};

function initBoard(){
  let fenLog="";
  resetBoard();
  printBoard();
  resetBoard64();
  resetBoardGUI();
  fen_to_board("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  populateCell64();
  printBoard64();
  logFen();
  printBoardGUI(commentary, commentarySide);
  console.log(board_places)
  console.log(fenLog)
}

function invalidMove(commentary,commentarySide){
  if ( (board_places.turn == "b") && (computerbox.checked == true) ){
    RAND();
    return board_places;
  }
 
  printBoardGUI(commentary,commentarySide);
    clearSquaresGUI();
    return board_places;
  }

function backFunction(){
  clearSquaresGUI();
  //---Undo last log entry
  let fenPop = fenLog.pop();
  board_places.Wcaptured.pop();
  board_places.Bcaptured.pop();  
  board_places.Wcapturedhtml.pop();
  board_places.Bcapturedhtml.pop();

  $("#fen").html(fenPop);
  captureUpdate();
  fen_to_board(fenPop);
  populateCell64();
  printBoard64();
  sideUpdate();
  printBoardGUI("</br>Last Move", turn);
  return board_places;
}

function captureUpdate() {
  let whiteString=" ";
  let blackString=" ";

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
};
