// Toggle menu script
var coll = document.getElementsByClassName('collapsible');
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }

// Game variables
const cells = document.querySelectorAll(".cell");
const infoText = document.querySelector("#infoText");
const restartButton = document.querySelector("#restartButton");
const startButton = document.querySelector("#startButton");
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let boardState = ["","","","","","","","",""];
let currentPlayer = "x";
let isGameActive = false

// Game script
startButton.addEventListener("click", startGame);

function startGame(){
  
  restartGame();
  isGameActive = true;
  restartButton.addEventListener("click", restartGame);
  infoText.textContent = `${currentPlayer}'s turn`
  for(let i=0; i<=8; i++) {
    cells[i].addEventListener("click", cellClicked);
  }

}

function cellClicked(){

  const cellIndex = this.getAttribute("cellIndex");
  
  if(boardState[cellIndex] == "" && isGameActive == true){
    cells[cellIndex].textContent = currentPlayer;
    boardState[cellIndex] = currentPlayer;
    checkWin();
  }
  else{
    return;
  }

}

function changePlayer(){

  currentPlayer = (currentPlayer == "x") ? "o" : "x"
  infoText.textContent = `${currentPlayer}'s turn`

}

function checkWin(){

  let isWinner = false

  for(i=0;i<winConditions.length;i++){
    const condition = winConditions[i];
    condition1 = boardState[condition[0]];
    condition2 = boardState[condition[1]];
    condition3 = boardState[condition[2]];

    if(condition1 != "" && condition1 == condition2 && condition2 == condition3){
      isWinner = true;
      break;
    }
  }

  if(isWinner){
    infoText.textContent = `${currentPlayer} won!`
    isGameActive = false;
  }
  else if(!boardState.includes("")){
    infoText.textContent = "Draw!";
    isGameActive = false;
  }
  else{
    changePlayer();
  }

}

function restartGame(){

  boardState = ["","","","","","","","",""];
  currentPlayer = "x";
  freeSpaces = [0,1,2,3,4,5,6,7,8];
  for(let i=0; i<=8; i++) {
    cells[i].textContent = "";
  }
  infoText.textContent = `${currentPlayer}'s turn`;
  isGameActive = true;

}
