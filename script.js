const submitBtn = document.getElementById("submit");
    const board = document.getElementById("board");
    const message = document.querySelector(".message");
    const title = document.getElementById("title");

    let player1 = "";
    let player2 = "";
    let currentPlayer = "";
    let currentSymbol = "";
    const cells = [];
    let gameActive = true;

    const winPatterns = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]
    ];

    submitBtn.addEventListener("click", () => {
      player1 = document.getElementById("player1").value;
      player2 = document.getElementById("player2").value;

      if (player1 === "" || player2 === "") {
        alert("Please enter both names!");
        return;
      }

      document.getElementById("input-section").style.display = "none";
      title.style.display = "block";
      board.style.display = "grid";

      currentPlayer = player1;
      currentSymbol = "x";

      message.textContent = `${currentPlayer}, you're up!`;

      createBoard();
    });

    function createBoard() {
      for (let i = 1; i <= 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = i;

        cell.addEventListener("click", () => handleClick(cell));

        cells[i] = "";
        board.appendChild(cell);
      }
    }

    function handleClick(cell) {
      if (!gameActive || cell.textContent !== "") return;

      cells[cell.id] = currentSymbol;
      cell.textContent = currentSymbol;

      if (checkWinner()) {
        message.textContent = `${currentPlayer} congratulations you won!`;
        gameActive = false;
        return;
      }

      switchPlayer();
    }

    function switchPlayer() {
      if (currentPlayer === player1) {
        currentPlayer = player2;
        currentSymbol = "o";
      } else {
        currentPlayer = player1;
        currentSymbol = "X";
      }

      message.textContent = `${currentPlayer}, you're up!`;
    }

    function checkWinner() {
      return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return (
          cells[a] !== "" &&
          cells[a] === cells[b] &&
          cells[b] === cells[c]
        );
      });
    }