// 1. Deposite from user
/* 2. Determine number of lines to bet on
3. Collect a bet amount
4. Spin the slot machine
5. Check if the user won
6. give the user their winnings
7. play again
*/

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNTS = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOLS_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposite amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Please Enter a Valid Number!");
    } else {
      return numberDepositAmount;
    }
  }
};

const numberOfLines = () => {
  while (true) {
    const lines = prompt("Number of lines to bet on (1-3): ");
    const numberLines = parseFloat(lines);

    if (isNaN(numberLines) || numberLines <= 0 || numberLines > 3) {
      console.log("Invalid number of lines!");
    } else {
      return numberLines;
    }
  }
};
const getBet = (balance, numberOfLines) => {
  while (true) {
    const betPerLine = prompt("Enter bet per line: ");
    const numberBet = parseFloat(betPerLine);

    if (
      isNaN(numberBet) ||
      numberBet <= 0 ||
      numberBet > balance / numberOfLines
    ) {
      console.log("Invalid Bet!!");
    } else {
      return numberBet;
    }
  }
};
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNTS)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbol = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbol.length);
      const selectedSymbol = reelSymbol[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbol.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};
const getWinnings = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) winnings += bet * SYMBOLS_VALUES[symbols[0]];
  }
  return winnings;
};

const game = () => {
  let balance = deposit();

  while (true) {
    console.log("Your balance is $" + balance);
    const lines = numberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * lines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, lines);
    balance += winnings;
    console.log("You won $ " + winnings.toString());

    if (balance <= 0) {
      console.log("You ran out of money!");
      break;
    }
    const playAgain = prompt("Do you want to play again(y/n)?");
    if (playAgain != "y") break;
  }
};
game();
