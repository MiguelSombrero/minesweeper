
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

    if (!isMine(row, col, board)) {
      board[row][col].isMine = true
      updateAdjacentMinesCount(row, col, board)
      minesLeft -= 1
    }
  }
}

const generateIndex = index => Math.floor(Math.random() * index)

const updateAdjacentMinesCount = (i, j, board) => {
  try {
    if (notFloor(i) && notFloor(j)) {
      board[i - 1][j - 1].value += 1
    }
    if (notOverFromBottom(i, board) && notOverFromRight(j, board)) {
      board[i + 1][j + 1].value += 1
    }
    if (notFloor(i) && notOverFromRight(j, board)) {
      board[i - 1][j + 1].value += 1
    }
    if (notOverFromBottom(i, board) && notFloor(j)) {
      board[i + 1][j - 1].value += 1
    }

    if (notFloor(i)) {
      board[i - 1][j].value += 1
    }
    if (notOverFromBottom(i, board)) {
      board[i + 1][j].value += 1
    }
    if (notOverFromRight(j, board)) {
      board[i][j + 1].value += 1
    }
    if (notFloor(j)) {
      board[i][j - 1].value += 1
    }

  } catch (exception) {
    console.log(exception)
  }
}

const notFloor = index => index > 0
const notOverFromBottom = (index, board) => index < board.length-1
const notOverFromRight = (index, board) => index < board[0].length-1

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
export const toggleFlag = (row, col, board) => board[row][col].isFlagged = !board[row][col].isFlagged
export const isMine = (row, col, board) => board[row][col].isMine
