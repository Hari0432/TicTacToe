import { Component } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  boardSize = 5;
  winLength = 4;
  players = ['X', 'O', 'Δ'];
  board: string[][] = [];
  currentPlayer = 0;
  winner: string | null = null;

  constructor() {
    this.reset();
  }

  reset() {
    this.board = Array.from({ length: this.boardSize }, () => Array(this.boardSize).fill(''));
    this.currentPlayer = 0;
    this.winner = null;
  }

  move(r: number, c: number) {
    if (this.board[r][c] || this.winner) return;
    this.board[r][c] = this.players[this.currentPlayer];
    if (this.isWinner(r, c)) this.winner = this.players[this.currentPlayer];
    else this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
  }

  isWinner(r: number, c: number): boolean {
    const p = this.players[this.currentPlayer];
    return (
      this.check(r, c, 0, 1, p) || 
      this.check(r, c, 1, 0, p) || 
      this.check(r, c, 1, 1, p) || 
      this.check(r, c, 1, -1, p)   
    );
  }

  check(row: number, column: number, xAxis: number, yAxis: number, person: string): boolean {
    let count = 1;
    count += this.count(row, column, xAxis, yAxis, person);
    count += this.count(row, column, -xAxis, -yAxis, person);
    return count >= this.winLength;
  }

  count(row: number, column: number, xAxis: number, yAxis: number, person: string): number {
    let n = 0;
    row += xAxis; column += yAxis;
    while (row >= 0 && column >= 0 && row < this.boardSize && column < this.boardSize && this.board[row][column] === person) {
      n++; row += xAxis; column += yAxis;
    }
    return n;
  }
}
