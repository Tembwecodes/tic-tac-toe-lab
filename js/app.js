console.log('welcome');

//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.


/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
console.log(squareEls);

const messageEl = document.getElementById('message');
console.log(messageEl);

const resetBtnEl = document.getElementById('reset');

/*-------------------------------- Functions --------------------------------*/

const init =()  => {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'x';
    winner = false;
    tie = false;
    render();
};
//console.log(init);


const updateboard =() => {
  board.forEach((square, index) => {
    if (square === 'x') {
squareEls[index].textContent = 'x';
    } else if (square === '0') {
      squareEls[index].textContent = '0';
    } else {
      squareEls[index].textContent = '';
    }
  })
};
//console.log(updateboard);

const updateMessage = () => {
  if (winner === false && tie === false) {
    if (turn === 'x') {
      messageEl.textContent = "x's turn";
    } else {
    messageEl.textContent = "0's turn";
  };
} else if (winner === false && tie === true) {
  messageEl.textContent = "tie!";
} else {
  if (turn === 'x') {
    messageEl.textContent = "x wins!";
  } else {
    messageEl.textContent = "0 wins!";
  };
};
};
//console.log(updateMessage);



const render = () => {
  updateboard();
  updateMessage();
};
//console.log(render);
init();


const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
//console.log(winningCombos);



const placePiece = (squareIndex) => {
  board[squareIndex] = turn;
};
//console.log(placePiece);


const checkWinner = () => {
  winningCombos.forEach(combo => {
    const [a, b, c] = combo;
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
      tie = false;
    }
  });
};
//console.log(checkWinner);


const checkForTie = () => {
  if (board.every(square => square !== '') && !winner) {
    tie = true;
    updateMessage();
  }
};
//console.log(checkTie);


const switchPlayerTurn = () => {
  if (winner === true){
    return
  } 
  if (turn === 'x'){
    turn = '0'
  } else{
    turn = 'x'
  }
};
//console.log(switchTurn);


const handleClick = (event) => {
  const squareIndex = parseInt(event.target.id);
  if (board[squareIndex] !== '' || winner) return;
  placePiece(squareIndex);
  checkWinner();
  switchPlayerTurn();
  checkForTie();
  render()
};
//console.log(handleClick())



/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
  square.addEventListener('click', handleClick); //the parameter of the event is the "click" event
});
resetBtnEl.addEventListener('click', init);



