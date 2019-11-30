import {Component, OnInit} from '@angular/core';
import {CellEnum} from '../cell/CellEnum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  private currentPlayer: CellEnum;
  public board: CellEnum[][];
  private isGameOver: boolean;
  public statusMassage;

  constructor() {
  }

  ngOnInit() {
    this.newGame();
  }

  get gameOver(): boolean {
    return this.isGameOver;
  }

  //crea la matriz vacia 3*3
  newGame() {
    this.board = [];
    for (let row = 0; row < 3; row++) {
      this.board[row] = [];
      for (let col = 0; col < 3; col++) {
        this.board[row][col] = CellEnum.EMPTY;
      }
    }
    this.currentPlayer = CellEnum.x;
    this.isGameOver = false;
    this.statusMassage = `Player ${this.currentPlayer}'s turn`;
  }


  move(row: number, col: number): void {
    if (!this.isGameOver && this.board[row][col] === CellEnum.EMPTY) {
      this.board[row][col] = this.currentPlayer;
      if (this.isDraw()) { //dentra cuando se acaba los espacios
        this.statusMassage = 'Empate';
        this.isGameOver = true;
      } else if (this.isWin()) { //dentra si encontra ganador
        this.statusMassage = `Player ${this.currentPlayer} won!`;
        this.isGameOver = true;
      } else {
        this.currentPlayer = this.currentPlayer === CellEnum.x ? CellEnum.o : CellEnum.x;
        this.statusMassage = `Player ${this.currentPlayer}'s turn`;
      }

    }
  }

  //verifica si hay espacios vacios (retorna false si hay espacios vacios o si hay ganador)
  isDraw(): boolean {
    for (const columns of this.board) {
      for (const col of columns) {
        if (col === CellEnum.EMPTY) {
          return false;
        }
      }
    }
    return !this.isWin(); //true si hay ganador y false si no hay ganador
  }

  //retorna true si hay ganador sino false
  isWin(): boolean {
    // horizontal (analisa fila por fila si hacen un 3 en raya solo horizontalmente)
    for (const columns of this.board) {
      if (columns[0] === columns[1] && columns[0] === columns[2] && columns[0] !== CellEnum.EMPTY) {
        return true;
      }
    }
    // vertical (analisa columna por columna si hacen un 3 en raya solo verticalmente)
    for (let col = 0; col < this.board[0].length; col++) {
      if (
        this.board[0][col] === this.board[1][col] &&
        this.board[0][col] === this.board[2][col] &&
        this.board[0][col] !== CellEnum.EMPTY
      ) {
        return true;
      }
    }
    // Analiza la diagonal principal si hace 3 en raya
    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[0][0] === this.board[2][2] &&
      this.board[0][0] !== CellEnum.EMPTY
    ) {
      return true;
    }
    // Analiza la diagonal secundaria si hace 3 en raya
    if (
      this.board[0][2] === this.board[1][1] &&
      this.board[0][2] === this.board[2][0] &&
      this.board[0][2] !== CellEnum.EMPTY
    ) {
      return true;
    }
    return false;
  }

}
