
let squareclick1 = new Array();;
let round=0;
let moveFromSquare = "";
let moveToSquare = "";
let squareFrom = 0;
let squareTo = 0;
let turnToPlay = true;
let commentarySide = "White To Play";
let commentary = "</br>NEW GAME";
let castlePlay = false;

// Move definitions
let moves=new Array();

//write board_places function loop
let row = 0;
let column = 0;
let index = 0;

const fenLog=new Array();

const board_places ={};
 board_places.number = new Array();
 board_places.square = new Array();
 board_places.standardName = new Array();
 board_places.piece  = new Array();
 board_places.fen  = new Array();
 board_places.color = new Array();
 board_places.moves = new Array();
 board_places.underattack = new Array();
 board_places.moveTo = new Array(2);
 board_places.empty = new Array();
 board_places.turn = new Array();
 board_places.capture = new Array();
 board_places.CastleWK = "K";
 board_places.CastleWQ = "Q";
 board_places.Castlebk = "k";
 board_places.Castlebq = "q";
 board_places.enpas = 0;
 board_places.halfMove = 0;
 board_places.fullMove = 0;
 board_places.slide = new Array();
 board_places.row = new Array();
 board_places.Wcaptured = new Array();
 board_places.Bcaptured = new Array();
 board_places.Wcapturedhtml = new Array();
 board_places.Bcapturedhtml = new Array();
 board_places.htmlName = new Array();

 const blackPawnMoves = [ 10 , 9 , 11 ];
 const rookMoves = [1, 10, -1, -10];
 const knightMoves = [-21, -12, 8, 19, 21, 12, -8, -19];
 const bishopMoves = [-9,-11,9,11];
 const queenMoves = [1, 10, -1, -10, -9,-11, 9, 11];
 const whitePawnMoves = [-10, -9, -11];
 const kingMoves = queenMoves;

/* White King	&#9812;	♕	White Queen	&#9813;
 ♖	White Rook	&#9814;	♗	White Bishop	&#9815;
 ♘	White Knight	&#9816;	♙	White Pawn	&#9817;

 ♚	Black King	&#9818;	♛	Black Queen	&#9819;
 ♜	Black Rook	&#9820;	♝	Black Bishop	&#9821;
 ♞	Black Knight	&#9822;	♟	Black Pawn	&#9823; */

 //Data to load into cells
let pieceData = new Array()
pieceData= [
   ["p","b",blackPawnMoves,false,false,"Black Pawn","&#9823"] ,
   ["r","b",rookMoves,false,true,"Black Rook","&#9820"] ,
   ["n","b",knightMoves,false,false,"Black Knight","&#9822"] ,
   ["b","b",bishopMoves,false,true,"Black Bishop","&#9821"] ,
   ["q","b",queenMoves,false,true,"Black Queen","&#9819"] ,
   ["k","b",kingMoves,false,false,"Black King","&#9818"] ,

   ["P","w",whitePawnMoves,false,false, "White Pawn","&#9817"] ,
   ["R","w",rookMoves,false,true,"White Rook","&#9814"] ,
   ["N","w",knightMoves,false,false,"White Knight","&#9816"] ,
   ["B","w",bishopMoves,false,true,"White Bishop","&#9815"] ,
   ["Q","w",queenMoves,false,true,"White Queen","&#9813"] ,
   ["K","w",kingMoves,false,false,"White King","&#9812"] ,
   ["."," ",[0,0],true,false,"empty","  "]
];


