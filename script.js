
class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';

        this.isGameOver = false;

        this.cells = [];

        this.statusEl = document.querySelector('#status')
        this.boardEl = document.querySelector('#board')
        this.resetBtn = document.querySelector('#reset')

        this.init();
    };

    init = () => {
        this.boardEl.innerHTML = '';
        this.cells = [];

        this.board.map((_, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = index; //dominar esto para el buscaminas

            cell.addEventListener('click', () => this.handleMove(index));
            this.boardEl.appendChild(cell);
            this.cells.push(cell);
        });

        this.resetBtn.addEventListener('click', this.resetGame);
    };

    handleMove = (index) => {
        if (this.board[index] || this.isGameOver) return;

        this.board[index] = this.currentPlayer;
        this.cells[index].textContent = this.currentPlayer;

        if (this.checkWin()) {
            this.statusEl.textContent = `Player ${this.currentPlayer} wins`;
        } else if (this.board.every(cell => cell)) {
            this.statusEl.textContent = "It's a draw!";
            this.isGameOver = true;
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.statusEl.textContent = `Player ${this.currentPlayer}'s turn`
        };
    };

    checkWin = () => {
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //Columns
            [0, 4, 8], [2, 4, 6] //Diagonals
        ]

        return winCombos.some(([a, b, c]) => {
            return this.board[a] &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c];
        })
    };

    resetGame = () => {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';

        this.isGameOver = false;

        this.statusEl.textContent = `Player ${this.currentPlayer}'s turn`;
        this.cells.forEach(cell => cell.textContent = '');
    }
}

new TicTacToe();