
export const createBoardOf = (rows, cols, mines) => {
  const newBoard = initializeArray(rows, cols)
  initializeMines(rows, cols, mines, newBoard)
  return newBoard
}

const initializeArray = (rows, cols) =>
  Array.from({ length: rows },
    () => Array.from({ length: cols },
      () =>  initialTile() ))

const initialTile = () => {
  return {
    value: 0,
    isOpen: false,
    isFlagged: false,
    isMine: false
  }
}

const initializeMines = (rows, cols, mines, board) => {
  let minesLeft = mines

  while (minesLeft > 0) {
    let row = generateIndex(rows)
    let col = generateIndex(cols)

    if (!board[row][col].isMine) {
      board[row][col].isMine = true
      updateAdjacentMinesCount(row, col, board)
      minesLeft -= 1
    }
  }
}

const generateIndex = index => Math.floor(Math.random() * index)

const updateAdjacentMinesCount = (i, j, board) => {
  try {
    if (notFloor(i) && notFloor(j) && notMine(i - 1, j - 1, board)) {
      board[i - 1][j - 1].value += 1
    }
    if (notCeiling(i, board) && j < board[0].length-1 && notMine(i + 1, j + 1, board)) {
      board[i + 1][j + 1].value += 1
    }
    if (notFloor(i) && j < board[0].length-1 && notMine(i - 1, j + 1, board)) {
      board[i - 1][j + 1].value += 1
    }
    if (notCeiling(i, board) && notFloor(j) && notMine(i + 1, j - 1, board)) {
      board[i + 1][j - 1].value += 1
    }

    if (notFloor(i) && notMine(i - 1, j, board)) {
      board[i - 1][j].value += 1
    }
    if (notCeiling(i, board) && notMine(i + 1, j, board)) {
      board[i + 1][j].value += 1
    }
    if (j < board[0].length-1 && notMine(i, j + 1, board)) {
      board[i][j + 1].value += 1
    }
    if (notFloor(j) && notMine(i, j - 1, board)) {
      board[i][j - 1].value += 1
    }

  } catch (exception) {
    console.log(exception)
  }
}

const notFloor = index => index > 0
const notCeiling = (index, board) => index < board.length-1
const notMine = (row, col, board) => !board[row][col].isMine

export const cascadeEmptyTiles = (row, col, board) => {
  if (indexOutOfRange(row, col, board) || board[row][col].isOpen) {
    return
  }

  board[row][col].isOpen = true

  if (tileIsEmpty(row, col, board)) {
    cascadeEmptyTiles(row - 1, col - 1, board)
    cascadeEmptyTiles(row + 1, col + 1, board)
    cascadeEmptyTiles(row - 1, col + 1, board)
    cascadeEmptyTiles(row + 1, col - 1, board)

    cascadeEmptyTiles(row, col - 1, board)
    cascadeEmptyTiles(row - 1, col, board)
    cascadeEmptyTiles(row, col + 1, board)
    cascadeEmptyTiles(row + 1, col, board)
  }
}

const tileIsEmpty = (row, col, board) =>
  board[row][col].value === 0 &&
      board[row][col].isMine === false

const indexOutOfRange = (row, col, board) =>
  row < 0 || col < 0 || row > board.length-1 || col > board[0].length-1


export const isWon = game => {
  const a = game.board.filter(row => !isEmptyArray(
    row.filter(isClosedNonMinedTile))
  )

  return isEmptyArray(a)
}

const isEmptyArray = array => array.length === 0
const isClosedNonMinedTile = tile => !tile.isOpen && !tile.isMine
