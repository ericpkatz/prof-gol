class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }
  iterate(fn){
    for(let i = 0; i < this.height; i++){
      for(let j = 0; j < this.width; j++){
        fn(i, j);
      }
    }
  }
  randomize(){
    this.iterate((i, j)=> {
      this.board[i][j] = Math.round(Math.random());
    });
  }
  clear(){
    this.iterate((i, j)=> {
      this.board[i][j] = 0;
    });
  }
  makeBoard() {
    const rows = [];
    for(let i = 0; i < this.height; i++){
      const row = [];
      rows.push(row);
      for(let j = 0; j < this.width; j++){
        row.push(0);
      }
    }
    return rows;
  }
  tick() {
    const newBoard = this.makeBoard();
    this.iterate((i, j)=> {
      const neighbors = [
        [i - 1, j - 1],
        [i - 1, j],
        [i - 1, j + 1],
        [i, j - 1],
        [i, j + 1],
        [i + 1, j - 1],
        [i + 1, j],
        [i + 1, j + 1],
      ];
      const livingNeighbors = neighbors.reduce((acc, point)=> {
        const [rowIdx, cellIdx] = point;
        const living = this.board[rowIdx] && this.board[rowIdx][cellIdx];
        if(living){
          acc += 1;
        }
        return acc;
      }, 0);
      if(this.board[i][j] && [2, 3].includes(livingNeighbors)){
        newBoard[i][j] = 1;
      }
      if(!this.board[i][j] && livingNeighbors === 3){
        newBoard[i][j] = 1;
      }
    });
    this.board = newBoard;
  }
}
